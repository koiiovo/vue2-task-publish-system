<template>
    <div class="view-task">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的任务</el-breadcrumb-item>
        <el-breadcrumb-item>已完成任务</el-breadcrumb-item>
      </el-breadcrumb>
  
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>已完成任务</span>
        </div>
  
        <div class="task-table">
          <el-table :data="pagedData" border style="width: 100%">
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
        tableData: [], // 动态数据存放
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
          const response = await this.$api.get("/ongoing");
          this.tableData = response.data;
          this.totalItems = this.tableData.length;
        } catch (error) {
          console.error("获取任务列表失败", error);
        }
      },
      formatDate(date) {
        return this.$moment(date).format("YYYY-MM-DD");
      },
      goToTaskDetail(task) {
        this.$router.push({
          name: "TaskDetail",
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
</style>
