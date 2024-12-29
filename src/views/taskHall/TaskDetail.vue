<template>
  <div class="task-detail">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务大厅</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/view-task' }"
        >查看任务</el-breadcrumb-item
      >
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
        <el-descriptions-item label="任务名称">{{
          task.taskName
        }}</el-descriptions-item>
        <el-descriptions-item label="提交方式">{{
          task.submissionMethod
        }}</el-descriptions-item>
        <el-descriptions-item label="任务发布人">{{
          task.publisher
        }}</el-descriptions-item>
        <el-descriptions-item label="佣金"
          >{{ task.commission }} 元</el-descriptions-item
        >
        <el-descriptions-item label="截止日期">{{
          task.dueDate
        }}</el-descriptions-item>
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
          <div class="task-description">{{ task.description }}</div>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 操作按钮 -->
      <div class="accept-button-container">
        <!-- 已发布状态下，显示接单按钮 -->
        <el-button
          v-if="task.status === '已发布'"
          type="primary"
          @click="handleAccept"
        >
          接单
        </el-button>

        <!-- 进行中状态下，显示任务正在进行中的禁用按钮 -->
        <el-button
          v-if="task.status === '进行中'"
          type="primary"
          :disabled="true"
          class="disabled-button ongoing"
        >
          该任务正在进行中
        </el-button>

        <!-- 审核中状态下，显示任务正在审核中的禁用按钮 -->
        <el-button
          v-if="task.status === '审核中'"
          type="primary"
          :disabled="true"
          class="disabled-button reviewing"
        >
          该任务正在审核中
        </el-button>

        <!-- 已完成状态下，显示任务已完成的禁用按钮 -->
        <el-button
          v-if="task.status === '已完成'"
          type="primary"
          :disabled="true"
          class="disabled-button completed"
        >
          任务已完成
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
        const response = await this.$api.get(`/task/detail/${taskName}`);
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
    async handleAccept() {
      try {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        const response = await this.$api.put(
          `/task/accept/${this.task.taskName}`,
          { assignee: username },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.code === 200) {
          this.task.status = "进行中";
          this.task.assignee = username;
          // 重新获取任务详情，以确保数据刷新
          await this.fetchTaskDetail(this.task.taskName);
          // 显示成功消息
          this.$message.success(response.data.msg);
        }
      } catch (error) {
        console.error("请求错误:", error);
        this.$message.error("接单失败");
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
  max-height: 202px;
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
/* 按钮颜色样式 */
.accept-button-container .el-button:disabled {
  color: #fff;
  border-color: #dcdfe6;
}

/* 已发布状态按钮：蓝色 */
.accept-button-container .el-button[type="primary"]:not(:disabled) {
  background-color: #409eff;
  border-color: #409eff;
}

/* 进行中任务禁用按钮：橙色 */
.accept-button-container .el-button.ongoing:disabled {
  background-color: #f0a500;
  border-color: #f0a500;
}

/* 审核中任务禁用按钮：绿色 */
.accept-button-container .el-button.reviewing:disabled {
  background-color: #67c23a;
  border-color: #67c23a;
}

/* 已完成任务禁用按钮：灰色 */
.accept-button-container .el-button.completed:disabled {
  background-color: #909399;
  border-color: #909399;
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
