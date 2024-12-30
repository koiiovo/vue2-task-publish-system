<template>
  <div class="submit-feedback-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/my-message/feedback"
        >问题反馈</el-breadcrumb-item
      >
      <el-breadcrumb-item>提交问题</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 返回按钮和标题 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          icon="el-icon-arrow-left"
          size="mini"
          @click="$router.go(-1)"
          class="back-btn"
        ></el-button>
        <span>提交问题反馈</span>
      </div>

      <!-- 问题反馈表单 -->
      <el-form :model="feedbackForm" ref="feedbackForm" label-width="100px">
        <el-form-item
          label="问题标题"
          :rules="[
            { required: true, message: '请输入问题标题', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="feedbackForm.title"
            placeholder="请输入问题标题"
            rows="2"
          />
        </el-form-item>

        <el-form-item
          label="问题描述"
          :rules="[
            { required: true, message: '请输入问题描述', trigger: 'blur' },
          ]"
        >
          <el-input
            type="textarea"
            v-model="feedbackForm.description"
            placeholder="请输入问题描述"
            rows="9"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交反馈</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedbackForm: {
        title: "",
        description: "",
        username: "", // 提出人
      },
    };
  },
  methods: {
    async handleSubmit() {
      // 表单验证
      this.$refs.feedbackForm.validate((valid) => {
        if (valid) {
          const token = localStorage.getItem("token");
          const refreshToken = localStorage.getItem("refreshToken");

          console.log("当前 token: ", token);
          console.log("问题反馈数据: ", this.feedbackForm);

          // 使用 token 提交请求
          this.submitFeedback(token, refreshToken);
        } else {
          this.$message.error("请完善表单信息");
          return false;
        }
      });
    },

    async submitFeedback(token, refreshToken) {
      try {
        // 使用 token 发起请求
        if (token) {
          const response = await this.$api.post(
            "/feedback",
            this.feedbackForm,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("反馈提交成功:", response);
          this.$message.success("反馈提交成功！");

          // 提交成功后跳转回问题反馈页面
          this.$router.push("/my-message/feedback");

          this.resetForm();
        } else {
          console.log("Token 过期或不存在，正在刷新 Token...");
          this.refreshToken(refreshToken)
            .then((newToken) => {
              this.submitFeedback(newToken, refreshToken);
            })
            .catch((error) => {
              console.log("刷新 Token 失败:", error);
              this.$message.error("令牌已过期，请重新登录");
              this.$router.push("/"); // 跳转到登录页面
            });
        }
      } catch (error) {
        console.error("提交反馈失败:", error);
        this.$message.error("提交反馈失败");
      }
    },

    // 刷新 Token 方法
    refreshToken(refreshToken) {
      return new Promise((resolve, reject) => {
        this.$api
          .post("/loginUser/refresh-token", { refreshToken })
          .then((response) => {
            const newToken = response.data;
            localStorage.setItem("token", newToken);
            resolve(newToken);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 重置表单
    resetForm() {
      this.$refs.feedbackForm.resetFields();
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

.submit-feedback-page {
  padding: 40px;
  background-color: #fff;
}

.box-card {
  padding: 20px;
}

.el-form-item {
  margin-bottom: 20px;
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
