<template>
  <div class="view-task">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务大厅</el-breadcrumb-item>
      <el-breadcrumb-item>查看任务</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 任务表格 -->
    <el-table :data="pagedData" style="width: 100%">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
        </template>
      </el-table-column>

      <el-table-column label="任务名称">
        <template slot-scope="scope">
          {{ scope.row.taskName }}
        </template>
      </el-table-column>

      <el-table-column label="截止日期" width="180">
        <template slot-scope="scope">
          {{ scope.row.dueDate }}
        </template>
      </el-table-column>

      <el-table-column label="发布人" width="120">
        <template slot-scope="scope">
          {{ scope.row.publisher }}
        </template>
      </el-table-column>

      <el-table-column label="佣金" width="120">
        <template slot-scope="scope"> {{ scope.row.commission }} 元 </template>
      </el-table-column>

      <el-table-column label="紧急程度" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.urgency === '高' ? 'danger' : 'info'">
            {{ scope.row.urgency }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="goToTaskDetail(scope.row)">
            任务详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalItems"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      totalItems: 1000, // 假设总数据项数为 1000
      pageSize: 10, // 每页显示的任务数量
      currentPage: 1, // 当前页码
      tableData: [
        {
          taskName: "任务1",
          dueDate: "2024-12-15",
          publisher: "张三",
          commission: 100,
          urgency: "高",
          isAccepted: false,
        },
        {
          taskName: "任务2",
          dueDate: "2024-12-20",
          publisher: "李四",
          commission: 150,
          urgency: "中",
          isAccepted: false,
        },
        {
          taskName: "任务3",
          dueDate: "2024-12-25",
          publisher: "王五",
          commission: 200,
          urgency: "低",
          isAccepted: false,
        },
        {
          taskName: "任务4",
          dueDate: "2024-12-30",
          publisher: "赵六",
          commission: 120,
          urgency: "高",
          isAccepted: false,
        },
        {
          taskName: "任务5",
          dueDate: "2025-01-10",
          publisher: "孙七",
          commission: 180,
          urgency: "中",
          isAccepted: false,
        },
        {
          taskName: "任务6",
          dueDate: "2025-01-15",
          publisher: "钱八",
          commission: 220,
          urgency: "低",
          isAccepted: false,
        },
        {
          taskName: "任务7",
          dueDate: "2025-02-01",
          publisher: "吴九",
          commission: 160,
          urgency: "高",
          isAccepted: false,
        },
        {
          taskName: "任务8",
          dueDate: "2025-02-10",
          publisher: "郑十",
          commission: 140,
          urgency: "中",
          isAccepted: false,
        },
        {
          taskName: "任务9",
          dueDate: "2025-03-01",
          publisher: "冯十一",
          commission: 250,
          urgency: "低",
          isAccepted: false,
        },
        {
          taskName: "任务10",
          dueDate: "2025-03-10",
          publisher: "陈十二",
          commission: 300,
          urgency: "高",
          isAccepted: false,
        },
        {
          taskName: "任务11",
          dueDate: "2025-04-01",
          publisher: "林十三",
          commission: 170,
          urgency: "中",
          isAccepted: false,
        },
        {
          taskName: "任务12",
          dueDate: "2025-04-15",
          publisher: "周十四",
          commission: 130,
          urgency: "低",
          isAccepted: false,
        },
        {
          taskName: "任务13",
          dueDate: "2025-05-01",
          publisher: "吴十五",
          commission: 190,
          urgency: "高",
          isAccepted: false,
        },
        {
          taskName: "任务14",
          dueDate: "2025-05-10",
          publisher: "郑十六",
          commission: 160,
          urgency: "中",
          isAccepted: false,
        },
        {
          taskName: "任务15",
          dueDate: "2025-06-01",
          publisher: "冯十七",
          commission: 250,
          urgency: "低",
          isAccepted: false,
        },
        {
          taskName: "任务16",
          dueDate: "2025-06-10",
          publisher: "陈十八",
          commission: 280,
          urgency: "高",
          isAccepted: false,
        },
        {
          taskName: "任务17",
          dueDate: "2025-07-01",
          publisher: "林十九",
          commission: 200,
          urgency: "中",
          isAccepted: false,
        },
        {
          taskName: "任务18",
          dueDate: "2025-07-10",
          publisher: "周二十",
          commission: 220,
          urgency: "低",
          isAccepted: false,
        },
      ],
    };
  },
  computed: {
    // 根据当前页码和每页大小计算显示的数据
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    // 跳转到任务详情页
    goToTaskDetail(task) {
      this.$router.push({ name: "TaskDetail", params: { taskId: task.id } });
    },
    // 处理分页切换
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
  
<style scoped>
.view-task {
  padding: 40px;
  background-color: #fff;
  position: relative;
}

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

.el-table {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
