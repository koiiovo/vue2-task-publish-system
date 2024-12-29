<template>
  <div class="task-detail">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的任务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/my-task/published' }">
        已发布任务
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
        <el-descriptions-item label="任务接单人">
          {{ task.assignee }}
        </el-descriptions-item>
        <el-descriptions-item label="佣金">
          {{ task.commission }} 元
        </el-descriptions-item>
        <el-descriptions-item label="截止日期">
          {{ task.dueDate }}
        </el-descriptions-item>
        <el-descriptions-item label="紧急程度">
          <el-tag :type="getUrgencyType(task.urgency)">
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

      <!-- 操作按钮 -->
      <div class="accept-button-container">
        <el-button
          v-if="task.status !== '已完成' && !task.isPassed"
          type="primary"
          @click="handleApprove"
        >
          通过审核
        </el-button>

        <!-- 如果任务已完成，显示已完成按钮并禁用 -->
        <el-button
          v-if="task.status === '已完成'"
          type="primary"
          :disabled="true"
          class="disabled-button"
        >
          任务已被完成
        </el-button>
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

    // 任务状态更新函数
    async handleApprove() {
      try {
        // 调用后端 API 更新任务状态为已完成
        await this.$api.put(`/task/update-passed/${this.task.taskName}`);
        this.$message.success("任务已审核通过，状态已更新为已完成");
        // 更新任务状态
        this.task.status = "已完成";
      } catch (error) {
        console.error("请求错误:", error);
        this.$message.error("更新任务状态失败");
      }
    },

    // 获取紧急程度的标签类型
    getUrgencyType(urgency) {
      return urgency === "高"
        ? "danger"
        : urgency === "中"
        ? "warning"
        : "success";
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

.accept-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
}

.disabled-button {
  background-color: #d3d3d3; /* 灰色背景 */
  color: #fff;
  border-color: #d3d3d3; /* 灰色边框 */
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

/* 返回按钮样式 */
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
