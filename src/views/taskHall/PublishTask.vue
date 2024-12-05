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
            type="date"
            placeholder="选择截止日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="佣金" prop="commission">
          <el-input
            v-model="taskForm.commission"
            placeholder="请输入佣金金额"
            type="number"
          ></el-input>
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
        urgency: [
          { required: true, message: "请选择紧急程度", trigger: "change" },
        ],
        description: [
          { required: true, message: "请输入任务描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.taskForm.validate((valid) => {
        if (valid) {
          // 模拟提交任务数据，实际操作时需要发送到后端
          this.$message.success("任务发布成功");
          // 清空表单
          this.resetForm();
        } else {
          this.$message.error("请完善表单信息");
          return false;
        }
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

/* 增大每个面包屑项的字体 */
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
