<template>
  <div class="task-detail">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的任务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/my-task/ongoing' }">
        进行中任务
      </el-breadcrumb-item>
      <el-breadcrumb-item>任务详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 任务详情卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          icon="el-icon-arrow-left"
          size="mini"
          @click="$router.go(-1)"
          class="back-btn"
        ></el-button>
        <span>任务详情</span>
      </div>

      <!-- 任务信息 -->
      <el-descriptions
        title="任务信息"
        direction="horizontal"
        :column="3"
        border
      >
        <el-descriptions-item label="任务名称">
          {{ task.taskName }}
        </el-descriptions-item>
        <el-descriptions-item label="提交方式">
          {{ task.submissionMethod }}
        </el-descriptions-item>
        <el-descriptions-item label="任务发布人">
          {{ task.publisher }}
        </el-descriptions-item>
        <el-descriptions-item label="佣金">
          {{ task.commission }} 元
        </el-descriptions-item>
        <el-descriptions-item label="截止日期">
          {{ task.dueDate }}
        </el-descriptions-item>
        <el-descriptions-item label="紧急程度">
          <el-tag
            :type="
              task.urgency === '高'
                ? 'danger'
                : task.urgency === '中'
                ? 'warning'
                : 'success'
            "
          >
            {{ task.urgency }}
          </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="任务描述" :span="2">
          <div class="task-description">
            {{ task.description }}
          </div>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 步骤条和上传区域 -->
      <div class="upload-section">
        <div class="steps-container">
          <el-steps direction="vertical" :active="activeStep">
            <el-step
              title="任务交付"
              :icon="activeStep > 0 ? 'el-icon-check' : ''"
            ></el-step>
            <el-step title="任务审核"></el-step>
            <el-step title="任务完成"></el-step>
          </el-steps>
        </div>
        <el-form :model="form" label-width="120px" class="upload-form">
          <div class="upload-container">
            <!-- 文件上传 -->
            <el-form-item label="文档上传">
              <el-upload
                class="upload-demo"
                :action="uploadAction"
                :on-change="handleFileChange"
                :file-list="fileList"
                :before-upload="beforeUpload"
              >
                <el-button size="small" type="primary">点击上传文档</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传PDF文件，且不超过5MB
                </div>
              </el-upload>
            </el-form-item>

            <!-- 图片上传 -->
            <el-form-item label="图片上传">
              <el-upload
                class="upload-demo"
                :action="uploadAction"
                :on-change="handleImageChange"
                :file-list="imageList"
                :before-upload="beforeUpload"
              >
                <el-button size="small" type="primary">点击上传图片</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过2MB
                </div>
              </el-upload>
            </el-form-item>
          </div>

          <!-- 文字描述 -->
          <el-form-item label="文字描述">
            <el-input
              type="textarea"
              v-model="form.textDescription"
              placeholder="请输入任务交付文字描述"
              rows="4"
            />
          </el-form-item>

          <div class="submit-button-container">
            <el-button type="primary" @click="handleSubmit">提交交付</el-button>
          </div>
        </el-form>
      </div>

      <!-- 已上传文件展示 -->
      <div v-if="fileList.length > 0">
        <h3>已上传文件:</h3>
        <div v-for="(file, index) in fileList" :key="index">
          <a :href="file.url" target="_blank">点击下载文件</a>
        </div>
      </div>
      <div v-if="imageList.length > 0">
        <h3>已上传图片:</h3>
        <el-image
          v-for="(file, index) in imageList"
          :key="index"
          :src="file.url"
          style="width: 200px; margin-right: 10px"
        ></el-image>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["taskName"],
  data() {
    return {
      task: {},
      form: {
        textDescription: "",
      },
      fileList: [],
      imageList: [],
      uploadAction: "http://localhost:8080/task/files/upload", // 后端上传接口地址
      activeStep: 0, // 当前步骤
    };
  },
  created() {
    this.fetchTaskDetail(this.taskName);
  },
  methods: {
    // 获取任务详情
    async fetchTaskDetail(taskName) {
      try {
        const response = await this.$api.get(`my-task/detail/${taskName}`);
        if (response && response.data) {
          this.task = response.data;
        } else {
          console.error("返回的数据为空", response);
          this.$message.error("任务详情为空");
        }
      } catch (error) {
        console.error("请求错误:", error);
        this.$message.error("获取任务详情失败");
      }
    },

    // 处理文件上传
    handleFileChange(file, fileList) {
      this.fileList = fileList.slice(-3); // 限制最多上传3个文件
    },

    // 处理图片上传
    handleImageChange(file, fileList) {
      this.imageList = fileList.slice(-3); // 限制最多上传3个图片
    },

    // 上传前检查文件类型和大小
    beforeUpload(file) {
      const isPDF = file.type === "application/pdf";
      const isImage = file.type === "image/jpeg" || file.type === "image/png";
      const isFileSizeValid = file.size / 1024 / 1024 < 5; // 限制文件大小5MB
      const isImageSizeValid = file.size / 1024 / 1024 < 2; // 限制图片大小2MB
      if (!isPDF && !isImage) {
        this.$message.error("只能上传PDF文件或图片文件");
      }
      if ((isPDF && !isFileSizeValid) || (isImage && !isImageSizeValid)) {
        this.$message.error("文件大小超出限制");
      }
      return (isPDF && isFileSizeValid) || (isImage && isImageSizeValid);
    },

    // 提交任务交付
    handleSubmit() {
      this.activeStep = 1; // 设置为审核步骤
      // 更新任务状态为审核中
      this.updateTaskStatusToReviewing();

      // 提交交付表单数据
      this.$message.success("任务附件已交付！");

      // 跳转到审核中的任务详情页面
      this.$router.push({
        path: `/my-task/reviewing/detail/${this.task.taskName}`,
      });
    },

    // 更新任务状态为审核中
    async updateTaskStatusToReviewing() {
      try {
        await this.$api.put(`/task/update-reviewing/${this.task.taskName}`);
        this.$message.success("任务状态已更新为审核中");
      } catch (error) {
        console.error("更新任务状态失败", error);
        this.$message.error("更新任务状态失败");
      }
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

.task-detail {
  padding: 40px;
  background-color: #fff;
}

.el-tag.danger {
  background-color: #f56c6c;
  color: #fff;
}

.el-tag.warning {
  background-color: #f7a800;
  color: #fff;
}

.el-tag.success {
  background-color: #67c23a;
  color: #fff;
}

.box-card {
  padding: 20px;
}

.el-descriptions {
  width: 60%;
  margin: 0 auto;
}

.task-description {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 202px;
  overflow-y: auto;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.upload-section {
  display: flex;
  margin-top: 20px;
}

.steps-container {
  width: 200px;
  margin-left: 100px;
  margin-right: 15px;
}

.upload-form {
  flex: 1;
}

.upload-container {
  display: flex;
}

.el-upload__tip {
  font-size: 12px;
  color: #999;
}

.el-button {
  margin-top: 10px;
}

.submit-button-container {
  text-align: center;
  margin-top: 20px;
}

.back-btn {
  margin-right: 10px;
  padding: 0;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fcb7c1b2;
  color: #fff;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>