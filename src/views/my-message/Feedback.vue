<template>
  <div class="feedback-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的消息</el-breadcrumb-item>
      <el-breadcrumb-item>问题反馈</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>问题反馈列表</span>
      </div>

      <div class="feedback-table">
        <el-table :data="feedbacks" border style="width: 100%">
          <el-table-column label="序号" width="100" align="center">
            <template slot-scope="scope">
              {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            </template>
          </el-table-column>

          <el-table-column label="问题标题" align="center">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>

          <el-table-column label="提出人" width="150" align="center">
            <template slot-scope="scope">
              {{ scope.row.username }}
            </template>
          </el-table-column>

          <el-table-column label="提出时间" width="180" align="center">
            <template slot-scope="scope">
              {{ formatDate(scope.row.createdAt) }}
              <!-- 修改为驼峰命名 -->
            </template>
          </el-table-column>

          <el-table-column label="回复人" width="150" align="center">
            <template slot-scope="scope">
              {{ scope.row.responseUser || "暂无回复" }}
              <!-- 修改为驼峰命名 -->
            </template>
          </el-table-column>

          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="viewDetail(scope.row)">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalItems"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalItems: 0,
      pageSize: 8,
      currentPage: 1,
      feedbacks: [],
    };
  },
  computed: {
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.feedbacks.slice(start, end);
    },
  },
  methods: {
    async fetchFeedbacks() {
      try {
        const response = await this.$api.get("/feedback"); // 请求反馈列表
        if (Array.isArray(response.data)) {
          this.feedbacks = response.data;
          this.totalItems = this.feedbacks.length;
        } else {
          this.$message.error("获取反馈数据失败，返回数据格式不正确");
        }
      } catch (error) {
        console.error("请求错误:", error);
        this.$message.error("获取反馈数据失败");
      }
    },
    formatDate(date) {
      return this.$moment(date).format("YYYY-MM-DD");
    },
    viewDetail(feedback) {
      this.$router.push({
        name: "FeedbackDetail",
        params: { id: feedback.id },
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchFeedbacks();
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

.feedback-page {
  padding: 40px;
  background-color: #fff;
}

.box-card {
  padding: 20px;
}

.feedback-table {
  margin-bottom: 20px;
}

.pagination-container {
  text-align: right;
  margin-top: 20px;
}

.el-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.el-button {
  margin-left: 10px;
}
</style>
