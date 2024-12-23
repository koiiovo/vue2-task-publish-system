<template>
  <div class="login-page">
    <!-- 背景图层 -->
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
        <!-- 忘记密码链接 -->
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

      <!-- 登录按钮，动态变色和禁用 -->
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
        <p>这是服务协议的内容...（这里可以放具体的服务条款）</p>
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
      usernameOrId: "", // 存储输入的账号或管理员账号
      password: "", // 存储输入的密码
      isUserLogin: true, // 登录类型切换，默认为用户登录
      agreeToTerms: false, // 服务协议同意状态
      showModal: false, // 控制是否显示服务协议的模态框
      users: [], // 存储从后台获取的用户数据
      currentUser: null, // 当前登录的用户信息
    };
  },
  created() {
    // 检查用户是否已经登录，如果是，尝试刷新令牌
    this.checkLoginStatus();
    // 从后端获取所有用户信息
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
        // 登录请求
        this.$api
          .post("/loginUser/login", {
            username: this.usernameOrId,
            password: this.password,
          })
          .then((response) => {
            // 假设后端返回一个 token 和 refreshToken
            const token = response.data.data.token;
            const refreshToken = response.data.data.refreshToken;
            console.log("登录成功，token: ", token); // 输出 token

            // 存储 token 和 refreshToken
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);

            // 页面跳转
            this.$router.push({ path: "/" }); // 登录成功后跳转到主页
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
      // 检查用户是否已经登录
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (token) {
        // 如果令牌存在，验证令牌是否过期
        this.validateToken(token, refreshToken);
      }
    },
    validateToken(token, refreshToken) {
      // 使用 Axios 调用后台接口，验证 token 是否有效
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
      // 刷新令牌的逻辑
      this.$api
        .post("/loginUser/refresh-token", {
          refreshToken,
        })
        .then((response) => {
          const newToken = response.data.data.token;
          localStorage.setItem("token", newToken); // 存储新的令牌
          console.log("令牌刷新成功:", newToken);
        })
        .catch((error) => {
          console.error("刷新令牌失败", error);
          alert("登录状态过期，请重新登录！");
          this.$router.push({ path: "/login" }); // 重定向到登录页面
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
  background-color: #000000; /* 默认颜色 */
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

/* 注册提示样式 */
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
  border-radius: 10px; /* 圆角 */
  width: 300px; /* 设置较小的宽度 */
  max-width: 80%; /* 最大宽度限制 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  font-family: Arial, sans-serif;
  overflow-y: auto;
}

.modal-content h3 {
  margin-bottom: 10px;
  font-size: 18px; /* 标题字号适当减小 */
  color: #333;
  font-weight: bold;
}

.modal-content p {
  font-size: 14px; /* 内容字号适当减小 */
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
