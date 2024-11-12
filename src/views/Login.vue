<template>
  <div class="login-page">
    <!-- 背景图层 -->
    <div class="background"></div>

    <!-- 登录表单容器 -->
    <div class="form-container">
      <h2 class="form-title">登录</h2>

      <!-- 姓名或学号输入框 -->
      <div class="input-container">
        <input
          type="text"
          v-model="usernameOrStudentId"
          placeholder="姓名/学号"
        />
      </div>

      <!-- 密码输入框 -->
      <div class="input-container password-container">
        <input type="password" v-model="password" placeholder="密码" />

        <!-- 忘记密码链接 -->
        <p class="forgot-password">
          <router-link to="/forgot-password">忘记密码？</router-link>
        </p>
      </div>

      <!-- 登录按钮 -->
      <button @click="login" class="login-button">登录</button>

      <!-- 注册提示 -->
      <p class="register-prompt">
        还没有账号？<router-link to="/register">注册</router-link>
      </p>

      <!-- 第三方登录选项 -->
      <p class="or-text">或</p>
      <div class="login-options">
        <button class="third-party-login" @click="loginWithWeChat">
          微信登录
        </button>
        <button class="third-party-login" @click="loginWithAlipay">
          支付宝登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login", // 组件名称
  data() {
    return {
      usernameOrStudentId: "", // 存储输入的学号或姓名
      password: "", // 存储输入的密码
    };
  },
  methods: {
    /**
     * 登录方法
     * 检查学号/姓名和密码是否填写，如果填写，执行验证逻辑
     */
    login() {
      if (!this.usernameOrStudentId || !this.password) {
        alert("请输入学号/姓名和密码！"); // 提示用户输入完整信息
        return;
      }

      // 打印登录信息（可以替换为实际的登录逻辑）
      console.log("登录信息:", this.usernameOrStudentId, this.password);

      // 模拟用户名和密码检查
      if (this.usernameOrStudentId !== "test" || this.password !== "123456") {
        alert("用户名或密码错误！"); // 登录失败提示
        return;
      }

      console.log("登录成功！"); // 登录成功信息
    },

    /**
     * 微信登录方法
     */
    loginWithWeChat() {
      console.log("使用微信登录");
      // 在实际应用中，可在这里添加第三方登录逻辑
    },

    /**
     * 支付宝登录方法
     */
    loginWithAlipay() {
      console.log("使用支付宝登录");
      // 在实际应用中，可在这里添加第三方登录逻辑
    },
  },
};
</script>

<style scoped>
/* 页面背景图层 */
.login-page {
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
  background-image: url("D:/Web前端/task-publishing-system/src/assets/chi.jpg");
  /* 背景图片路径 */
  background-size: cover;
  background-position: center;
  filter: blur(10px); /* 模糊效果 */
  z-index: -1; /* 置于底层 */
}

/* 登录表单容器样式 */
.form-container {
  width: 320px; /* 设置容器宽度 */
  padding: 40px;
  background: rgba(255, 255, 255, 0.1); /* 半透明背景 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* 阴影效果 */
  display: flex;
  flex-direction: column; /* 垂直排列元素 */
  align-items: center;
  gap: 12px; /* 元素之间的间隙 */
  z-index: 1; /* 显示在背景之上 */
}

.form-title {
  font-size: 22px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
}

/* 输入框容器 */
.input-container {
  width: 100%; /* 宽度为容器的 100% */
}

.input-container input {
  width: 92%; /* 输入框宽度 */
  padding: 12px;
  border-radius: 25px; /* 圆角效果 */
  border: none; /* 去除边框 */
  background: rgba(255, 255, 255, 0.9); /* 背景半透明 */
}

/* 密码输入框容器 */
.password-container {
  position: relative;
}

/* 忘记密码提示 */
.forgot-password {
  position: absolute;
  right: 0px;
  bottom: -35px;
  font-size: 12px;
  color: #00bfff;
  text-decoration: none;
}

.forgot-password a {
  color: rgb(56, 56, 56);
  text-decoration: none;
}

/* 登录按钮 */
.login-button {
  width: 100%; /* 按钮宽度 */
  padding: 12px;
  border-radius: 25px; /* 圆角 */
  background-color: #000000; /* 按钮背景色 */
  color: white; /* 按钮文字颜色 */
  font-size: 14px;
  font-weight: bold;
  cursor: pointer; /* 鼠标悬停时变为指针 */
  border: none;
  margin-top: 20px; /* 按钮上边距 */
}

.login-button:hover {
  background-color: #333; /* 悬停时按钮颜色变暗 */
}

/* 注册提示文本 */
.register-prompt {
  font-size: 12px;
  color: white;
  margin-top: 10px;
}

.register-prompt a {
  color: #00bfff;
  text-decoration: none;
}

/* “或”文本样式 */
.or-text {
  font-size: 12px;
  color: white;
  margin: 8px 0;
}

/* 第三方登录选项容器 */
.login-options {
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
}

/* 第三方登录按钮样式 */
.third-party-login {
  flex: 1; /* 各按钮等宽 */
  padding: 10px;
  border-radius: 25px; /* 圆角 */
  border: none;
  background: rgba(255, 240, 240, 0.7); /* 背景半透明 */
  cursor: pointer; /* 鼠标悬停时变为指针 */
  color: black; /* 按钮文字颜色 */
  font-size: 12px;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.third-party-login:hover {
  background: rgba(255, 255, 255, 0.5); /* 悬停时背景变浅 */
}
</style>
