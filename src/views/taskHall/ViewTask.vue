<template>
  <div class="view-task">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务大厅</el-breadcrumb-item>
      <el-breadcrumb-item>查看任务</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>查看任务</span>
        <!-- 筛选条件区域 -->
        <div class="filters">
          <!-- 查看任务类型 -->
          <el-select
            v-model="selectedTaskView"
            placeholder="请选择任务查看方式"
            style="width: 200px; margin-left: 20px"
          >
            <el-option
              v-for="item in taskViewOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <!-- 紧急程度筛选 -->
          <el-select
            v-model="selectedUrgency"
            multiple
            placeholder="请选择紧急程度"
            style="width: 200px; margin-left: 20px"
          >
            <el-option
              v-for="item in urgencyLevels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
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

          <el-table-column label="发布人" width="160" align="center">
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

      <!-- 分页 -->
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
      totalItems: 0, // 总任务数
      pageSize: 8, // 每页任务数
      currentPage: 1, // 当前页
      selectedTaskView: "all", // 默认查看所有任务
      selectedUrgency: [], // 紧急程度筛选
      taskViewOptions: [
        { value: "all", label: "查看所有任务" },
        { value: "pending", label: "查看待接单任务" },
      ],
      urgencyLevels: [
        { value: "高", label: "高" },
        { value: "中", label: "中" },
        { value: "低", label: "低" },
      ],
      tableData: [], // 动态数据存放
    };
  },
  computed: {
    pagedData() {
      // 筛选条件：查看待接单任务或查看所有任务
      const filtered = this.tableData.filter((task) => {
        const matchesSubmission =
          this.selectedTaskView === "all" ||
          (this.selectedTaskView === "pending" && task.status === "已发布");
        const matchesUrgency =
          this.selectedUrgency.length === 0 ||
          this.selectedUrgency.includes(task.urgency);
        return matchesSubmission && matchesUrgency;
      });

      // 分页逻辑
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return filtered.slice(start, end);
    },
  },
  watch: {
    // 监听筛选条件，更新总任务数
    selectedTaskView() {
      this.updateTotalItems();
    },
    selectedUrgency() {
      this.updateTotalItems();
    },
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await this.$api.get("/task/view");
        this.tableData = response.data; // 填充任务数据
        this.totalItems = this.tableData.length; // 设置总任务数
      } catch (error) {
        console.error("获取任务列表失败", error);
      }
    },
    updateTotalItems() {
      // 重新计算筛选后的总任务数
      const filtered = this.tableData.filter((task) => {
        const matchesSubmission =
          this.selectedTaskView === "all" ||
          (this.selectedTaskView === "pending" && task.status === "已发布");
        const matchesUrgency =
          this.selectedUrgency.length === 0 ||
          this.selectedUrgency.includes(task.urgency);
        return matchesSubmission && matchesUrgency;
      });
      this.totalItems = filtered.length;
    },
    formatDate(date) {
      return this.$moment(date).format("YYYY-MM-DD");
    },
    goToTaskDetail(task) {
      // 使用任务名称作为路由参数跳转
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
    const queryParams = this.$route.query;
    if (queryParams.taskView) {
      this.selectedTaskView = queryParams.taskView;
    }
    if (queryParams.urgency) {
      this.selectedUrgency = [queryParams.urgency];
    }
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
