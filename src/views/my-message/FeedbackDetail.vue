<template>
  <div class="view-response-page">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/my-message/feedback"
        >问题反馈</el-breadcrumb-item
      >
      <el-breadcrumb-item>查看详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 返回按钮和标题 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          icon="el-icon-arrow-left"
          size="mini"
          @click="$router.push('/my-message/feedback')"
          class="back-btn"
        ></el-button>
        <span>问题详情</span>
      </div>

      <!-- 反馈信息展示 -->
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
    <el-card v-if="feedback.response" class="box-card reply-card">
      <div slot="header" class="clearfix">
        <span>回复内容</span>
      </div>
      <div class="response-detail">
        <el-row>
          <el-col :span="6"><strong>回复人：</strong></el-col>
          <el-col :span="18">{{ feedback.responseUser }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><strong>回复时间：</strong></el-col>
          <el-col :span="18">{{ formatDate(feedback.responseAt) }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><strong>回复内容：</strong></el-col>
          <el-col :span="18">{{ feedback.response }}</el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 没有回复时，显示输入框提交回复 -->
    <el-card v-else class="box-card reply-card">
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
      feedback: {},
      responseContent: "",
      currentUser: "",
    };
  },
  computed: {
    feedbackId() {
      return this.$route.params.id;
    },
  },
  methods: {
    formatDate(date) {
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },

    getCurrentUser() {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        this.currentUser = decodedToken.username || "匿名用户";
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

      this.getCurrentUser();

      const responseData = {
        response: this.responseContent,
        responseUser: this.currentUser,
      };

      const token = localStorage.getItem("token");

      if (!token) {
        this.$message.error("未登录或 token 无效");
        return;
      }

      try {
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
          this.fetchFeedbackDetail();
        }
      } catch (error) {
        this.$message.error("提交回复失败");
      }
    },
  },
  mounted() {
    this.getCurrentUser();
    this.fetchFeedbackDetail();
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

.view-response-page {
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

.response-detail {
  margin-top: 20px;
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
