<template>
  <div class="login-page">
    <!-- 背景图层 -->
    <div class="background"></div>

    <!-- 登录表单容器 -->
    <div class="form-container">
      <h2 class="form-title">登录</h2>

      <!-- 输入框 -->
      <div class="input-container">
        <input type="text" v-model="usernameOrStudentId" placeholder="姓名/学号" />
      </div>
      <div class="input-container password-container">
        <input type="password" v-model="password" placeholder="密码" />
        <p class="forgot-password"><a href="#">忘记密码？</a></p>
      </div>

      <!-- 登录按钮 -->
      <button @click="login" class="login-button">登录</button>

      <!-- 没有账号提示 -->
      <p class="register-prompt">
        还没有账号？<router-link to="/register">注册</router-link>
      </p>


      <!-- 第三方登录选项 -->
      <p class="or-text">或</p>
      <div class="login-options">
        <button class="third-party-login" @click="loginWithWeChat">微信登录</button>
        <button class="third-party-login" @click="loginWithAlipay">支付宝登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      usernameOrStudentId: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (!this.usernameOrStudentId || !this.password) {
        alert("请输入学号/姓名和密码！");
        return;
      }
      // 登录逻辑
      console.log("登录信息:", this.usernameOrStudentId, this.password);
      // 这里可以处理登录验证逻辑
      if (this.usernameOrStudentId !== "test" || this.password !== "123456") {
        alert("用户名或密码错误！");
        return;
      }
      console.log("登录成功！");
    },
    loginWithWeChat() {
      console.log("使用微信登录");
    },
    loginWithAlipay() {
      console.log("使用支付宝登录");
    }
  }
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
  background-image: url('D:/Web前端/task-publishing-system/src/assets/chi.jpg');
  /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  /* 模糊效果 */
  z-index: -1;
  /* 置于底层 */
}

/* 登录表单容器样式 */
.form-container {
  width: 320px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 1;
}

.form-title {
  font-size: 22px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
}

/* 输入框容器样式 */
.input-container {
  width: 100%;
}

.input-container input {
  width: 92%;
  padding: 12px;
  border-radius: 25px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
}

.password-container {
  position: relative;
}

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
  width: 100%;
  padding: 12px;
  border-radius: 25px;
  background-color: #000000;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-top: 20px;
  /* 增加上边距来让按钮下移 */
}

.login-button:hover {
  background-color: #333;
}

.register-prompt {
  font-size: 12px;
  color: white;
  margin-top: 10px;
}

.register-prompt a {
  color: #00bfff;
  text-decoration: none;
}

.or-text {
  font-size: 12px;
  color: white;
  margin: 8px 0;
}

.login-options {
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
}

.third-party-login {
  flex: 1;
  padding: 10px;
  border-radius: 25px;
  border: none;
  background: rgba(72, 72, 72, 0.2);
  cursor: pointer;
  color: black;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.third-party-login:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>