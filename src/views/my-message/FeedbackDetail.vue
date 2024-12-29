<template>
  <div class="submit-response-page">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/my-feedback">我的反馈</el-breadcrumb-item>
      <el-breadcrumb-item>提交回复</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 反馈信息展示 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>反馈详情</span>
      </div>

      <div class="feedback-detail">
        <el-row>
          <el-col :span="6"><strong>问题标题：</strong></el-col>
          <el-col :span="18">{{ feedback.title }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><strong>提出人：</strong></el-col>
          <el-col :span="18">{{ feedback.username }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><strong>问题描述：</strong></el-col>
          <el-col :span="18">{{ feedback.description }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><strong>提出时间：</strong></el-col>
          <el-col :span="18">{{ formatDate(feedback.createdAt) }}</el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 回复区 -->
    <el-card class="box-card reply-card">
      <div slot="header" class="clearfix">
        <span>回复内容</span>
      </div>
      <el-input
        type="textarea"
        placeholder="请输入您的回复内容"
        v-model="responseContent"
        rows="5"
      ></el-input>
      <div class="submit-btn">
        <el-button type="primary" @click="submitResponse">提交回复</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedback: {}, // 反馈详情
      responseContent: "", // 回复内容
      currentUser: "", // 当前登录用户
    };
  },
  computed: {
    // 获取反馈ID
    feedbackId() {
      return this.$route.params.id;
    },
  },
  methods: {
    // 格式化时间
    formatDate(date) {
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    // 获取当前登录用户
    getCurrentUser() {
      const token = localStorage.getItem("token");
      if (token) {
        // 假设token中存储了用户名等信息
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // 解码token
        this.currentUser = decodedToken.username || "匿名用户"; // 获取用户名
      }
    },
    // 获取反馈详情
    async fetchFeedbackDetail() {
      try {
        const response = await this.$api.get(`/feedback/${this.feedbackId}`);
        if (response.data) {
          this.feedback = response.data;
        }
      } catch (error) {
        this.$message.error("获取反馈详情失败");
      }
    },
    // 提交回复
    async submitResponse() {
      if (!this.responseContent) {
        this.$message.error("回复内容不能为空");
        return;
      }

      const responseData = {
        response: this.responseContent, // 提交字符串
        responseUser: this.currentUser, // 使用当前用户的用户名
      };

      const token = localStorage.getItem("token"); // 假设你将 token 存储在 localStorage 中

      if (!token) {
        this.$message.error("未登录或 token 无效");
        return;
      }

      try {
        // 设置 Authorization 头
        const response = await this.$api.put(
          `/feedback/${this.feedbackId}`,
          responseData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          this.$message.success("回复提交成功");
          this.$router.push("/my-feedback"); // 提交后返回到反馈列表
        }
      } catch (error) {
        this.$message.error("提交回复失败");
      }
    },
  },
  mounted() {
    this.getCurrentUser(); // 页面加载时获取当前用户信息
    this.fetchFeedbackDetail(); // 页面加载时获取反馈详情
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

.submit-response-page {
  padding: 40px;
  background-color: #fff;
}

.box-card {
  padding: 20px;
}

.feedback-detail {
  margin-bottom: 20px;
}

.reply-card {
  margin-top: 20px;
}

.submit-btn {
  text-align: right;
  margin-top: 20px;
}
</style>
