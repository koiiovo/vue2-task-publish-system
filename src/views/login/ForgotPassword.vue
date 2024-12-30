<template>
  <div class="reset-password-page">
    <div class="background"></div>

    <!-- 表单容器 -->
    <div class="form-container">
      <!-- 进度条 -->
      <div class="progress-bar">
        <div class="progress" :style="{ width: progressWidth + '%' }"></div>
      </div>

      <!-- 步骤内容 -->
      <div v-if="step === 1">
        <h2 class="form-title">输入真实姓名和学号</h2>
        <input type="text" v-model="name" placeholder="真实姓名" />
        <input type="text" v-model="studentId" placeholder="学号" />

        <p v-if="studentMismatch" class="error-text">
          学号和真实姓名不匹配，请重新输入。
        </p>

        <button @click="nextStep" class="next-button">下一步</button>
      </div>

      <div v-if="step === 2">
        <h2 class="form-title">设置新密码</h2>
        <input
          type="password"
          v-model="newPassword"
          placeholder="新密码"
          @input="checkPassword"
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="确认密码"
          @input="checkPassword"
        />

        <p v-if="passwordError" class="error-text">密码不一致，请重新输入</p>

        <button @click="nextStep" class="next-button" :disabled="passwordError">
          下一步
        </button>
      </div>

      <div v-if="step === 3" class="success-container">
        <h2 class="form-title">密码重置完成</h2>
        <p>恭喜，您的密码已成功重置！</p>
        <button @click="goToLogin" class="next-button">返回登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      step: 1, // 当前步骤
      name: "",
      studentId: "",
      newPassword: "",
      confirmPassword: "",
      passwordError: false,
      studentMismatch: false,
      progressWidth: 33, // 进度条宽度
      registeredAccounts: [],
    };
  },
  methods: {
    // 获取已注册账户列表
    fetchRegisteredAccounts() {
      this.$api
        .get("/loginUser/all")
        .then((response) => {
          this.registeredAccounts = response.data;
        })
        .catch((error) => {
          console.error("获取注册账户列表失败：", error);
        });
    },

    // 下一步操作，根据当前步骤改变 step 和进度条
    nextStep() {
      if (this.step === 1) {
        this.checkStudentInfo();
      } else if (this.step === 2) {
        this.checkPasswordMatch();
        this.updatePassword();
      } else if (this.step === 3) {
        this.updatePassword();
      }
    },

    checkStudentInfo() {
      const student = this.registeredAccounts.find(
        (user) =>
          user.studentId === this.studentId && user.fullName === this.name
      );

      if (student) {
        this.step = 2;
        this.progressWidth = 66;
      } else {
        this.studentMismatch = true;
      }
    },

    checkPassword() {
      this.passwordError = this.newPassword !== this.confirmPassword;
    },

    checkPasswordMatch() {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordError = true;
        return;
      }
      this.step = 3;
      this.progressWidth = 100;
    },

    updatePassword() {
      const data = {
        studentId: this.studentId,
        fullName: this.name,
        password: this.newPassword,
      };

      this.$api
        .put("/loginUser/updatePassword", data)
        .then((response) => {
          if (response.data.success) {
            console.log("密码更新成功", response.data);
            this.step = 3;
            this.progressWidth = 100;
          } else {
            console.error("密码更新失败", response.data.message);
          }
        })
        .catch((error) => {
          console.error("密码更新请求失败：", error);
        });
    },

    goToLogin() {
      this.$router.push("/");
    },
  },

  mounted() {
    this.fetchRegisteredAccounts();
  },
};
</script>


  <style scoped>
.reset-password-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

/* 表单容器 */
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

input {
  width: 92%;
  padding: 12px;
  border-radius: 25px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.error-text {
  font-size: 12px;
  color: red;
  margin-bottom: 10px;
}

.progress-bar {
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  margin-bottom: 20px;
}

.progress {
  height: 100%;
  background: #00bfff;
  border-radius: 10px;
}

.next-button {
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

.next-button:hover {
  background-color: #333;
}

.next-button:disabled {
  background-color: #777;
  cursor: not-allowed;
}

.success-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.register-prompt {
  font-size: 12px;
  color: white;
}

.register-prompt a {
  color: #00bfff;
  text-decoration: none;
}
</style>
  