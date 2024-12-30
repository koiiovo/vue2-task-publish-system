<template>
  <div class="view-task">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的消息</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <div class="user-info">
        <!-- 用户头像 -->
        <div class="avatar-container">
          <!-- 使用 material-icons 显示头像 -->
          <span class="material-icons md-35 avatar-icon">account_circle</span>
        </div>

        <!-- 用户信息 -->
        <el-form :model="userInfo" label-width="120px" class="user-info-form">
          <el-form-item label="用户名">
            <el-input v-model="userInfo.username" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="电话">
            <el-input
              v-model="userInfo.phone"
              :disabled="!isEditing"
            ></el-input>
            <span v-if="!userInfo.phone && !isEditing">未填写</span>
          </el-form-item>

          <el-form-item label="邮件">
            <el-input
              v-model="userInfo.email"
              :disabled="!isEditing"
            ></el-input>
            <span v-if="!userInfo.email && !isEditing">未填写</span>
          </el-form-item>

          <el-form-item label="地区">
            <el-input
              v-model="userInfo.region"
              :disabled="!isEditing"
            ></el-input>
            <span v-if="!userInfo.region && !isEditing">未填写</span>
          </el-form-item>

          <!-- 显示编辑/提交/取消按钮 -->
          <div v-if="isEditing" class="button-container">
            <el-button type="primary" @click="updateUserInfo">提交</el-button>
            <el-button @click="cancelEdit">取消</el-button>
          </div>

          <el-button v-else type="primary" @click="startEditing"
            >修改</el-button
          >
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: "",
        phone: "",
        email: "",
        region: "",
      },
      originalUserInfo: {},
      user: {
        avatar: "",
      },
      isEditing: false,
    };
  },
  methods: {
    async getUserInfo() {
      try {
        const token = localStorage.getItem("token");
        const response = await this.$api.get("/loginUser/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 提取嵌套的 `data` 对象
        const userData = response.data.data;
        this.userInfo = {
          username: userData.username || "未填写", // 如果没有值，则显示"未填写"
          phone: userData.phone || "未填写",
          email: userData.email || "未填写",
          region: userData.region || "未填写",
        };

        // 保存原始用户信息用于取消修改
        this.originalUserInfo = { ...this.userInfo };

        this.user.avatar = userData.avatar || "";
      } catch (error) {
        console.error("获取用户信息失败", error);
      }
    },

    // 启动编辑模式
    startEditing() {
      this.isEditing = true;
    },

    // 取消编辑，恢复原始数据
    cancelEdit() {
      this.isEditing = false;
      this.userInfo = { ...this.originalUserInfo }; // 恢复到修改前的状态
    },

    // 更新用户信息
    async updateUserInfo() {
      try {
        const token = localStorage.getItem("token");
        const response = await this.$api.put(
          "/loginUser/updateinfo",
          this.userInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        this.$message.success("用户信息更新成功");
        this.originalUserInfo = { ...this.userInfo };
        this.isEditing = false; // 提交后退出编辑模式
      } catch (error) {
        console.error("更新用户信息失败", error);
        this.$message.error("更新用户信息失败");
      }
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style scoped>
.view-task {
  padding: 40px;
  background-color: #fff;
}

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

.box-card {
  padding: 20px;
}

.user-info {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.avatar-container {
  flex-shrink: 0;
  margin-right: 20px;
}

.avatar-icon {
  font-size: 120px;
  color: #19507d;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.user-info-form {
  flex-grow: 1;
  max-width: 500px;
}

.user-info-form .el-form-item {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}

.user-info-form .el-button {
  margin-left: 250px;
}

.user-info-form .button-container {
  display: flex;
  justify-content: flex-end;
}

.el-form .el-input {
  margin-bottom: 10px;
}
</style>
