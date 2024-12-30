<template>
  <div class="task-detail">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的任务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/my-task/completed' }">
        已完成任务
      </el-breadcrumb-item>
      <el-breadcrumb-item>任务详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 任务详情卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          icon="el-icon-arrow-left"
          size="mini"
          @click="$router.go(-1)"
          class="back-btn"
        ></el-button>
        <span>任务详情</span>
      </div>

      <!-- 任务信息 -->
      <el-descriptions
        title="任务信息"
        direction="horizontal"
        :column="3"
        border
      >
        <el-descriptions-item label="任务名称">
          {{ task.taskName }}
        </el-descriptions-item>
        <el-descriptions-item label="提交方式">
          {{ task.submissionMethod }}
        </el-descriptions-item>
        <el-descriptions-item label="任务发布人">
          {{ task.publisher }}
        </el-descriptions-item>
        <el-descriptions-item label="佣金">
          {{ task.commission }} 元
        </el-descriptions-item>
        <el-descriptions-item label="截止日期">
          {{ task.dueDate }}
        </el-descriptions-item>
        <el-descriptions-item label="紧急程度">
          <el-tag
            :type="
              task.urgency === '高'
                ? 'danger'
                : task.urgency === '中'
                ? 'warning'
                : 'success'
            "
          >
            {{ task.urgency }}
          </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="任务描述" :span="2">
          <div class="task-description">
            {{ task.description }}
          </div>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 步骤条和任务完成信息区域 -->
      <div class="completion-section">
        <div class="steps-container">
          <el-steps direction="vertical" :active="activeStep">
            <el-step
              title="任务交付"
              :icon="activeStep > 0 ? 'el-icon-check' : ''"
            ></el-step>
            <el-step
              title="任务审核"
              :icon="activeStep > 1 ? 'el-icon-check' : ''"
            ></el-step>
            <el-step
              title="任务完成"
              :icon="activeStep > 2 ? 'el-icon-check' : ''"
            ></el-step>
          </el-steps>
        </div>

        <!-- 右侧区域，显示任务完成信息 -->
        <div class="status-container">
          <h3>任务已完成！</h3>
          <p>已赚取 {{ task.commission }} 元</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["taskName"],
  data() {
    return {
      task: {},
      activeStep: 3, // 设置为任务完成步骤
    };
  },
  created() {
    this.fetchTaskDetail(this.taskName);
  },
  methods: {
    async fetchTaskDetail(taskName) {
      try {
        const response = await this.$api.get(`my-task/detail/${taskName}`);
        if (response && response.data) {
          this.task = response.data;
        } else {
          console.error("返回的数据为空", response);
          this.$message.error("任务详情为空");
        }
      } catch (error) {
        console.error("请求错误:", error);
        if (error.response) {
          console.error("后端返回错误：", error.response.data);
          this.$message.error(
            "获取任务详情失败：" + error.response.data.message
          );
        } else if (error.request) {
          console.error("请求未收到响应：", error.request);
          this.$message.error("网络问题，无法获取任务详情");
        } else {
          console.error("错误信息：", error.message);
          this.$message.error("获取任务详情失败：" + error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  position: sticky;
  top: 0;
  z-index: 10;
  font-size: 18px;
  margin-bottom: 20px;
}

/* 增大每个面包屑项的字体 */
.el-breadcrumb-item {
  font-size: 18px;
}

.task-detail {
  padding: 40px;
  background-color: #fff;
}

.el-tag.danger {
  background-color: #f56c6c;
  color: #fff;
}

.el-tag.warning {
  background-color: #f7a800;
  color: #fff;
}

.el-tag.success {
  background-color: #67c23a;
  color: #fff;
}

.box-card {
  padding: 20px;
}

.el-descriptions {
  width: 60%;
  margin: 0 auto;
}

.task-description {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 202px; /* 限制最大高度 */
  overflow-y: auto;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.completion-section {
  display: flex;
  margin-top: 20px;
}

.steps-container {
  width: 200px;
  margin-left: 100px;
  margin-right: 15px;
}

.status-container {
  flex: 1;
  text-align: center;
  padding: 20px;
}

.status-container h3 {
  font-size: 24px;
  color: #67c23a;
}

.status-container p {
  font-size: 18px;
  color: #f56c6c;
}

.accept-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
}

.disabled-button {
  background-color: #f0a500;
  color: #fff;
  border-color: #f0a500;
}

.back-btn {
  margin-right: 10px;
  padding: 0;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fcb7c1b2;
  color: #fff;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
