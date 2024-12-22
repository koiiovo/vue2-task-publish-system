<template>
  <div class="register-page">
    <!-- 背景图层 -->
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

      <!-- 姓名输入框 -->
      <input type="text" v-model="fullName" placeholder="姓名" />

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

      <!-- 如果密码不一致且确认密码框有值，显示错误提示 -->
      <p v-if="passwordError && confirmPassword" class="error-message">
        密码不一致，请重新确认。
      </p>

      <!-- 如果学号已存在，显示学号已存在的错误提示 -->
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
        已有账号？<router-link to="/login">登录</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register", // 组件的名称
  data() {
    return {
      username: "", // 用户名
      studentId: "", // 学号
      fullName: "", // 姓名
      password: "", // 密码
      confirmPassword: "", // 确认密码
      passwordError: false, // 密码一致性错误
      accountExists: false, // 是否已注册
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
      // 调用后端注册接口
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
              this.$router.push("/login"); // 注册成功后跳转到登录页面
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
/* 页面背景图层样式 */
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

/* 背景图样式 */
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
  z-index: -1; /* 背景位于最底层 */
}

/* 注册表单容器样式 */
.form-container {
  width: 320px; /* 设置表单容器的宽度 */
  padding: 40px;
  background: rgba(255, 255, 255, 0.1); /* 半透明背景 */
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* 为表单容器加上阴影 */
  display: flex;
  flex-direction: column; /* 让表单元素垂直排列 */
  align-items: center; /* 水平居中对齐 */
  gap: 12px; /* 元素之间的间隙 */
  z-index: 1; /* 使表单处于背景之上 */
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
  width: 92%; /* 输入框宽度 */
  padding: 12px;
  border-radius: 25px; /* 圆角效果 */
  border: none; /* 去除边框 */
  background: rgba(255, 255, 255, 0.9); /* 背景半透明 */
}

/* 注册按钮样式 */
.register-button {
  width: 100%; /* 注册按钮宽度填充父容器 */
  padding: 12px;
  border-radius: 25px;
  background-color: #000000; /* 按钮背景色 */
  color: white; /* 按钮文字颜色 */
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: none; /* 去除按钮边框 */
}

/* 注册按钮的悬浮状态 */
.register-button:hover {
  background-color: #333; /* 鼠标悬浮时按钮颜色变暗 */
}

/* 登录提示样式 */
.login-prompt {
  font-size: 12px;
  color: white;
}

/* 登录提示链接样式 */
.login-prompt a {
  color: #00bfff; /* 设置链接的颜色 */
  text-decoration: none; /* 去除链接的下划线 */
}

/* 错误提示样式 */
.error-message {
  font-size: 12px;
  color: red; /* 设置错误信息的字体颜色 */
}
</style>
