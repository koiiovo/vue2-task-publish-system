<template>
  <div class="task-detail">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的任务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/my-task/reviewing' }">
        审核中任务
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

      <!-- 步骤条和资料上传区域 -->
      <div class="upload-section">
        <div class="steps-container">
          <el-steps direction="vertical" :active="activeStep">
            <el-step
              title="任务交付"
              :icon="activeStep > 0 ? 'el-icon-check' : ''"
            ></el-step>
            <el-step title="任务审核"></el-step>
            <el-step title="任务完成"></el-step>
          </el-steps>
        </div>

        <!-- 右侧区域，显示资料上传成功提示 -->
        <div class="status-container">
          <h3>资料已上传成功</h3>
          <p>正在审核中...</p>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="accept-button-container">
        <!-- 修改为验证密码，完成任务 -->
        <el-button
          v-if="!task.isCompleted"
          type="primary"
          @click="handlePasswordVerification"
        >
          发布人忘记验收？自行输入密码验收
        </el-button>
        <el-button
          v-if="task.isCompleted"
          type="primary"
          :disabled="true"
          class="disabled-button"
        >
          任务已完成
        </el-button>
      </div>

      <!-- 密码验证弹框 -->
      <el-dialog title="请输入密码" :visible.sync="dialogVisible" width="400px">
        <el-input
          v-model="password"
          type="password"
          placeholder="请输入您的密码"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="verifyPassword">确认</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["taskName"],
  data() {
    return {
      task: {},
      activeStep: 1, // 设置为审核中步骤
      dialogVisible: false, // 控制密码输入框显示
      password: "", // 存储输入的密码
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

    handlePasswordVerification() {
      // 打开密码验证弹框
      this.dialogVisible = true;
    },

    async verifyPassword() {
      // 直接验证密码是否为“666”
      const isPasswordCorrect = this.password === "666";
      if (isPasswordCorrect) {
        this.task.isCompleted = true;
        this.activeStep = 2; // 设置步骤为“任务完成”

        this.updateTaskStatusToCompleted();

        // 更新任务状态后，跳转到任务完成页面
        this.$router.push(`/my-task/completed/detail/${this.task.taskName}`);

        this.$message.success("任务已完成，跳转到任务完成页面！");
        this.dialogVisible = false;
      } else {
        this.$message.error("密码错误，请重新输入");
      }
    },
    // 更新任务状态为已完成
    async updateTaskStatusToCompleted() {
      try {
        await this.$api.put(`/task/update-completed/${this.task.taskName}`);
        this.$message.success("任务状态已更新为已完成");
      } catch (error) {
        console.error("更新任务状态失败", error);
        this.$message.error("更新任务状态失败");
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

.upload-section {
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
