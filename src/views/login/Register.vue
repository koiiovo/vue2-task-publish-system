<template>
  <div class="register-page">
    <div class="background"></div>

    <!-- 注册表单容器 -->
    <div class="form-container">
      <!-- Logo 图片 -->
      <img src="@/assets/fa.png" alt="Logo" class="logo" />

      <h2 class="form-title">注册</h2>

      <!-- 用户名输入框 -->
      <input type="text" v-model="username" placeholder="用户名" />

      <!-- 学号输入框，失去焦点时检查学号是否已存在 -->
      <input
        type="text"
        v-model="studentId"
        placeholder="学号"
        @blur="checkStudentId"
      />

      <!-- 真实姓名输入框 -->
      <input type="text" v-model="fullName" placeholder="真实姓名" />

      <!-- 密码输入框，输入时触发密码一致性检查 -->
      <input
        type="password"
        v-model="password"
        placeholder="密码"
        @input="checkPassword"
      />

      <!-- 确认密码输入框，输入时触发密码一致性检查 -->
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="确认密码"
        @input="checkPassword"
      />

      <p v-if="passwordError && confirmPassword" class="error-message">
        密码不一致，请重新确认。
      </p>

      <p v-if="accountExists" class="error-message">
        该账号已存在，请换个学号。
      </p>

      <!-- 注册按钮，禁用状态：密码不一致或账号已存在时禁用 -->
      <button
        @click="register"
        class="register-button"
        :disabled="passwordError || accountExists"
      >
        注册
      </button>

      <!-- 登录提示，点击跳转到登录页面 -->
      <p class="login-prompt">
        已有账号？<router-link to="/">登录</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      studentId: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      passwordError: false,
      accountExists: false,
    };
  },
  methods: {
    checkPassword() {
      this.passwordError = this.password !== this.confirmPassword;
    },

    checkStudentId() {
      this.$api
        .get(`/loginUser/query?studentId=${this.studentId}`)
        .then((response) => {
          this.accountExists = response.data.exists;
        });
    },

    register() {
      if (!this.passwordError && !this.accountExists) {
        this.$api
          .post("/loginUser/register", {
            username: this.username,
            studentId: this.studentId,
            fullName: this.fullName,
            password: this.password,
          })
          .then((response) => {
            console.log("注册成功:", response);
            if (response.data.success) {
              this.$router.push("/");
            } else {
              alert("注册失败，请重试");
            }
          })
          .catch((error) => {
            console.error("注册失败:", error);
            alert("注册失败，请重试");
          });
      }
    },
  },
};
</script>
<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/chi.jpg"); /* 背景图片路径 */
  background-size: cover;
  background-position: center;
  filter: blur(10px); /* 设置背景模糊 */
  z-index: -1;
}

/* 注册表单容器样式 */
.form-container {
  width: 320px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1); /* 半透明背景 */
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 1;
}

.logo {
  width: 45px;
  height: 45px;
}

/* 表单标题样式 */
.form-title {
  font-size: 22px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  margin-bottom: 16px;
}

/* 输入框样式 */
.form-container input {
  width: 92%;
  padding: 12px;
  border-radius: 25px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
}

/* 注册按钮样式 */
.register-button {
  width: 100%;
  padding: 12px;
  border-radius: 25px;
  background-color: #000000;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

/* 注册按钮的悬浮状态 */
.register-button:hover {
  background-color: #333;
}

/* 登录提示样式 */
.login-prompt {
  font-size: 12px;
  color: white;
}

/* 登录提示链接样式 */
.login-prompt a {
  color: #00bfff;
  text-decoration: none;
}

/* 错误提示样式 */
.error-message {
  font-size: 12px;
  color: red;
}
</style>
