<template>
  <div class="publish-task">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务大厅</el-breadcrumb-item>
      <el-breadcrumb-item>发布任务</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 任务发布表单 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布任务</span>
      </div>

      <el-form
        ref="taskForm"
        :model="taskForm"
        :rules="taskRules"
        label-width="120px"
        class="task-form"
      >
        <el-form-item label="任务名称" prop="taskName">
          <el-input
            v-model="taskForm.taskName"
            placeholder="请输入任务名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="截止日期" prop="dueDate">
          <el-date-picker
            v-model="taskForm.dueDate"
            type="datetime"
            placeholder="选择截止日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="佣金" prop="commission">
          <el-input
            v-model="taskForm.commission"
            placeholder="请输入佣金金额"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="提交方式" prop="submissionMethod">
          <el-select
            v-model="taskForm.submissionMethod"
            placeholder="请选择提交方式"
          >
            <el-option label="线上" value="线上"></el-option>
            <el-option label="线下" value="线下"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="紧急程度" prop="urgency">
          <el-select v-model="taskForm.urgency" placeholder="请选择紧急程度">
            <el-option label="高" value="高"></el-option>
            <el-option label="中" value="中"></el-option>
            <el-option label="低" value="低"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="任务描述" prop="description">
          <el-input
            v-model="taskForm.description"
            type="textarea"
            placeholder="请输入任务描述"
            rows="4"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">发布任务</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskForm: {
        taskName: "",
        dueDate: "",
        commission: "",
        submissionMethod: "",
        urgency: "",
        description: "",
      },
      taskRules: {
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
        dueDate: [
          { required: true, message: "请选择截止日期", trigger: "change" },
        ],
        commission: [
          { required: true, message: "请输入佣金金额", trigger: "blur" },
        ],
        submissionMethod: [
          { required: true, message: "请选择提交方式", trigger: "change" },
        ],
        urgency: [
          { required: true, message: "请选择紧急程度", trigger: "change" },
        ],
        description: [
          { required: true, message: "请输入任务描述", trigger: "blur" },
        ],
      },
      // 设置 picker 的选项，限制选择的日期不能早于当前时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now(); // 禁用当前时间之前的日期
        }
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.taskForm.validate((valid) => {
        if (valid) {
          const token = localStorage.getItem("token"); // 获取 token
          const refreshToken = localStorage.getItem("refreshToken"); // 获取 refreshToken
          console.log("当前 token: ", token); // 打印 token
          console.log("任务数据: ", this.taskForm); // 打印任务数据

          // 发送请求
          this.$api
            .post("/publish", this.taskForm, {
              headers: {
                Authorization: `Bearer ${token}`, // 使用 token 进行身份验证
              },
            })
            .then((response) => {
              console.log("发布任务成功: ", response); // 调试成功信息
              this.$message.success("任务发布成功");
              this.resetForm();
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                // 处理 Token 过期，使用 refreshToken 获取新的 Token
                console.log("Token 过期，正在刷新 Token...");
                this.refreshToken(refreshToken)
                  .then((newToken) => {
                    // 刷新成功后，重新发起发布任务请求
                    this.$api
                      .post("/publish", this.taskForm, {
                        headers: {
                          Authorization: `Bearer ${newToken}`,
                        },
                      })
                      .then((response) => {
                        console.log("发布任务成功: ", response);
                        this.$message.success("任务发布成功");
                        this.resetForm();
                      })
                      .catch((error) => {
                        console.log("发布任务失败:", error);
                        this.$message.error("任务发布失败");
                      });
                  })
                  .catch((error) => {
                    console.log("刷新 Token 失败:", error);
                    this.$message.error("令牌已过期，请重新登录");
                    this.$router.push("/login"); // 跳转到登录页面
                  });
              } else {
                console.log("发布任务失败:", error);
                this.$message.error("任务发布失败");
              }
            });
        } else {
          this.$message.error("请完善表单信息");
          return false;
        }
      });
    },

    // 刷新 Token 方法
    refreshToken(refreshToken) {
      return new Promise((resolve, reject) => {
        this.$api
          .post("/loginUser/refresh-token", { refreshToken }) // 使用 refreshToken 请求新的 accessToken
          .then((response) => {
            const newToken = response.data; // 获取新的 accessToken
            localStorage.setItem("token", newToken); // 将新令牌存入 localStorage
            resolve(newToken); // 返回新的 accessToken
          })
          .catch((error) => {
            reject(error); // 如果刷新令牌失败，抛出错误
          });
      });
    },

    resetForm() {
      this.$refs.taskForm.resetFields();
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

.publish-task {
  padding: 40px;
  background-color: #fff;
}

.box-card {
  padding: 20px;
}

.task-form {
  width: 60%;
  margin: 0 auto;
}

.task-form .el-form-item {
  margin-bottom: 20px;
}
</style>
