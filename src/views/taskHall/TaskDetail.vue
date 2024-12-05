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

    <!-- 返回按钮 -->
    <el-button
      class="back-button"
      @click="goBack"
      icon="el-icon-arrow-left"
      type="text"
      >返回</el-button
    >

    <!-- 任务详情展示 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务详情</span>
      </div>

      <el-descriptions title="任务信息" direction="vertical" :column="2" border>
        <el-descriptions-item label="任务名称">{{
          task.taskName
        }}</el-descriptions-item>
        <el-descriptions-item label="发布人">{{
          task.publisher
        }}</el-descriptions-item>
        <el-descriptions-item label="截止日期">{{
          task.dueDate
        }}</el-descriptions-item>
        <el-descriptions-item label="佣金"
          >{{ task.commission }} 元</el-descriptions-item
        >
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
        <el-descriptions-item label="任务描述">{{
          task.description
        }}</el-descriptions-item>
      </el-descriptions>

      <el-divider></el-divider>

      <div class="task-actions">
        <el-button
          type="primary"
          @click="handleAccept"
          :disabled="task.isAccepted"
        >
          {{ task.isAccepted ? "已接单" : "接单" }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>
  
  <script>
export default {
  props: ["taskId"], // 接收路由参数 taskId
  data() {
    return {
      task: {}, // 任务详情对象
    };
  },
  created() {
    this.fetchTaskDetail(this.taskId); // 获取任务详情
  },
  methods: {
    fetchTaskDetail(taskId) {
      // 模拟获取任务详情的 API 调用
      const task = {
        id: taskId,
        taskName: "任务" + taskId,
        publisher: "张三",
        dueDate: "2024-12-15",
        commission: 100,
        urgency: "高",
        description:
          "这是任务的详细描述内容，可以包含任务的具体要求、注意事项等。",
        isAccepted: false, // 默认未接单
      };
      this.task = task;
    },
    handleAccept() {
      this.task.isAccepted = true;
      this.$message.success("接单成功");
    },
    // 返回按钮的处理方法
    goBack() {
      this.$router.go(-1); // 跳转到上一个页面
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

.breadcrumb {
  margin-bottom: 20px;
}

.box-card {
  padding: 20px;
}

.task-actions {
  margin-top: 20px;
  text-align: center;
}

.el-descriptions-item {
  font-size: 16px;
}

.back-button {
  margin-bottom: 20px;
}
</style>
  