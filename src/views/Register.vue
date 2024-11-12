<template>
  <div class="register-page">
    <!-- 背景图层 -->
    <div class="background"></div>

    <!-- 注册表单容器 -->
    <div class="form-container">
      <h2 class="form-title">注册</h2>

      <!-- 输入框 -->
      <input type="text" v-model="studentId" placeholder="学号" />
      <input type="text" v-model="fullName" placeholder="姓名" />
      <input type="password" v-model="password" placeholder="密码" />
      <input type="password" v-model="confirmPassword" placeholder="确认密码" />

      <!-- 注册按钮 -->
      <button @click="register" class="register-button">注册</button>

      <!-- 登录提示 -->
      <p class="login-prompt">
        已有账号？<router-link to="/login">登录</router-link>
      </p>

    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      studentId: "",
      fullName: "",
      department: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert("密码不一致，请重新确认。");
        return;
      }
      // 这里可以添加注册的逻辑
      console.log("注册信息:", this.studentId, this.fullName, this.department);
    }
  }
};
</script>

<style scoped>
/* 页面背景图层 */
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
  background-image: url('D:/Web前端/task-publishing-system/src/assets/chi.jpg');
  /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  z-index: -1;
}

/* 注册表单容器样式 */
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

.form-container input {
  width: 92%;
  padding: 12px;
  border-radius: 25px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
}

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

.register-button:hover {
  background-color: #333;
}

.login-prompt {
  font-size: 12px;
  color: white;
}

.login-prompt a {
  color: #00bfff;
  text-decoration: none;
}
</style>
