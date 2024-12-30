<template>
  <div class="login-page">
    <div class="background"></div>

    <!-- 登录表单容器 -->
    <div class="form-container">
      <!-- Logo 图片 -->
      <img src="@/assets/fa.png" alt="Logo" class="logo" />

      <h2 class="form-title">登录</h2>

      <!-- 切换登录类型 -->
      <div class="login-type">
        <button :class="{ active: isUserLogin }" @click="toggleLoginType(true)">
          用户登录
        </button>
        <button
          :class="{ active: !isUserLogin }"
          @click="toggleLoginType(false)"
        >
          管理员登录
        </button>
      </div>

      <!-- 用户名或学号输入框 -->
      <div class="input-container">
        <input
          type="text"
          v-model="usernameOrId"
          :placeholder="isUserLogin ? '请输入用户名' : '请输入管理员用户名'"
        />
      </div>

      <!-- 密码输入框 -->
      <div class="input-container password-container">
        <input type="password" v-model="password" placeholder="请输入密码" />

        <p class="forgot-password">
          <router-link to="/forgot-password">忘记密码？</router-link>
        </p>
      </div>

      <!-- 服务协议复选框 -->
      <div class="terms-container">
        <input type="checkbox" v-model="agreeToTerms" id="terms-checkbox" />
        <label for="terms-checkbox">
          我已阅读并同意
          <a href="#" @click.prevent="showTerms">服务协议与使用条款</a>
        </label>
      </div>

      <!-- 登录按钮 -->
      <button
        @click="handleLogin"
        class="login-button"
        :class="{ disabled: !agreeToTerms }"
        :disabled="!agreeToTerms"
      >
        登录
      </button>

      <!-- 注册提示 -->
      <p class="register-prompt">
        还没有账号？<router-link to="/register">注册</router-link>
      </p>
    </div>

    <!-- 服务协议模态框 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>服务协议与使用条款</h3>
        <p>
          这是服务协议的内容...我也不知道写什么，随便打几个字吧，看起来字多一点，有点好看吧
        </p>
        <button @click="closeTerms">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      usernameOrId: "",
      password: "",
      isUserLogin: true, // 登录类型切换，默认为用户登录
      agreeToTerms: false,
      showModal: false,
      users: [],
      currentUser: null,
    };
  },
  created() {
    this.checkLoginStatus();

    this.fetchUsers();
  },
  methods: {
    toggleLoginType(isUser) {
      this.isUserLogin = isUser;
    },
    fetchUsers() {
      this.$api
        .get("/loginUser/query")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("获取用户信息失败", error);
        });
    },
    validateUsername() {
      const user = this.users.find(
        (user) => user.username === this.usernameOrId
      );
      if (!user) {
        alert("用户名不存在！");
        return false;
      }
      if (this.isUserLogin && user.role !== "USER") {
        alert("该账号不是用户账号！");
        return false;
      } else if (!this.isUserLogin && user.role !== "ADMIN") {
        alert("该账号不是管理员账号！");
        return false;
      }
      this.currentUser = user;
      return true;
    },
    validatePassword() {
      if (this.currentUser && this.password === this.currentUser.password) {
        return true;
      } else {
        alert("密码错误！");
        return false;
      }
    },
    handleLogin() {
      if (!this.usernameOrId || !this.password) {
        alert("请输入完整的账号和密码！");
        return;
      }
      if (!this.agreeToTerms) {
        alert("请先同意服务协议和使用条款！");
        return;
      }

      // 验证用户名和密码
      if (this.validateUsername() && this.validatePassword()) {
        this.$api
          .post("/loginUser/login", {
            username: this.usernameOrId,
            password: this.password,
          })
          .then((response) => {
            const token = response.data.data.token;
            const refreshToken = response.data.data.refreshToken;
            console.log("登录成功，token: ", token);

            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);

            this.$router.push({ path: "/home" });
          })
          .catch((error) => {
            console.error("登录失败：", error);
            alert("登录失败，请检查用户名或密码！");
          });
      } else {
        console.log("登录失败");
      }
    },
    checkLoginStatus() {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (token) {
        this.validateToken(token, refreshToken);
      }
    },
    validateToken(token, refreshToken) {
      this.$api
        .post("/loginUser/validate-token", { token })
        .then((response) => {
          if (!response.data.valid) {
            console.log("令牌无效，尝试刷新令牌");
            this.refreshToken(refreshToken);
          }
        })
        .catch((error) => {
          console.error("令牌验证失败", error);
        });
    },
    refreshToken(refreshToken) {
      this.$api
        .post("/loginUser/refresh-token", {
          refreshToken,
        })
        .then((response) => {
          const newToken = response.data.data.token;
          localStorage.setItem("token", newToken);
          console.log("令牌刷新成功:", newToken);
        })
        .catch((error) => {
          console.error("刷新令牌失败", error);
          alert("登录状态过期，请重新登录！");
          this.$router.push({ path: "/" }); // 重定向到登录页面
        });
    },
    showTerms() {
      this.showModal = true;
    },
    closeTerms() {
      this.showModal = false;
    },
  },
};
</script>


<style scoped>
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
  background-image: url("@/assets/chi.jpg");
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  z-index: -1;
}

/* 登录表单容器样式 */
.form-container {
  width: 350px;
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

.logo {
  width: 45px;
  height: 45px;
}

.form-title {
  font-size: 22px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  margin-bottom: 16px;
}

.login-type {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  width: 100%;
}

.login-type button {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}

.login-type button.active {
  background-color: #007bff;
  color: white;
}

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
  width: 100%;
}

.forgot-password {
  font-size: 12px;
  color: #00bfff;
  text-align: right;
  margin-top: 5px;
}

.forgot-password a {
  color: #00bfff;
  text-decoration: none;
}

.terms-container {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: white;
}

.terms-container a {
  color: #00bfff;
  text-decoration: none;
}

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
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #333;
}

.login-button.disabled {
  background-color: #343434; /* 禁用时颜色 */
  cursor: not-allowed;
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

/* 服务协议模态框 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-width: 80%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  overflow-y: auto;
}

.modal-content h3 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.modal-content p {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
}

.modal-content button {
  background-color: #007bff;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: block;
  width: 100%;
  margin-top: 10px;
  text-align: center;
}

.modal-content button:hover {
  background-color: #0056b3;
}
</style>
