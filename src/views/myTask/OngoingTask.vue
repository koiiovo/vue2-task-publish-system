<template>
  <div class="view-task">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的任务</el-breadcrumb-item>
      <el-breadcrumb-item>进行中任务</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>进行中任务</span>
      </div>

      <div class="task-table">
        <el-table
          v-if="tableData.length > 0"
          :data="pagedData"
          border
          style="width: 100%"
        >
          <el-table-column label="序号" width="100" align="center">
            <template slot-scope="scope">
              {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            </template>
          </el-table-column>

          <el-table-column label="任务名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.taskName }}
            </template>
          </el-table-column>

          <el-table-column label="截止日期" width="140" align="center">
            <template slot-scope="scope">
              {{ formatDate(scope.row.dueDate) }}
            </template>
          </el-table-column>

          <el-table-column label="发布人" width="150" align="center">
            <template slot-scope="scope">
              {{ scope.row.publisher }}
            </template>
          </el-table-column>

          <el-table-column label="佣金" width="130" align="center">
            <template slot-scope="scope">
              {{ scope.row.commission }} ￥
            </template>
          </el-table-column>

          <el-table-column label="提交方式" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.submissionMethod }}
            </template>
          </el-table-column>

          <el-table-column label="紧急程度" width="110" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.urgency === '高'
                    ? 'danger'
                    : scope.row.urgency === '中'
                    ? 'warning'
                    : 'success'
                "
              >
                {{ scope.row.urgency }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="goToTaskDetail(scope.row)">
                任务详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 当没有任务时显示醒目的提示信息 -->
        <div v-else class="no-tasks">
          <el-alert
            title="挑战自我，超越极限，下一个任务正等着您去征服！"
            type="warning"
            center
            class="alert-message"
            :closable="false"
          />
        </div>
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
      tableData: [],
      status: "进行中", // 当前状态，您可以根据需要动态切换
    };
  },
  computed: {
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.$message.error("请先登录");
          return;
        }

        const response = await this.$api.get(`/my-task`, {
          params: { status: this.status },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data.data.tasks)) {
          this.tableData = response.data.data.tasks;
          this.totalItems = this.tableData.length;
        } else {
          this.$message.error("暂无任务");
        }
      } catch (error) {
        console.error("请求错误:", error);
        this.$message.error("获取任务数据失败");
      }
    },
    formatDate(date) {
      return this.$moment(date).format("YYYY-MM-DD");
    },
    goToTaskDetail(task) {
      this.$router.push({
        name: "OngoingDetail",
        params: { taskName: task.taskName },
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchTasks();
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

.view-task {
  padding: 40px;
  background-color: #fff;
}

.box-card {
  padding: 20px;
}

.filters {
  float: right;
  display: flex;
  align-items: center;
  margin-top: -10px;
}

.task-table {
  margin-bottom: 20px;
}

.pagination-container {
  text-align: right;
  margin-top: 20px;
}

.no-tasks {
  margin-top: 20px;
  text-align: center;
}

.alert-message {
  font-size: 18px;
  font-weight: bold;
  background-color: #fbf3fb;
  color: #e1a3ba;
  border: 1px solid #ebdddd;
  padding: 10px;
  border-radius: 5px;
}
</style>
