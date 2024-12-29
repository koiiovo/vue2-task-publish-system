<template>
  <div class="home-page">
    <!-- 走马灯组件 -->
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(url, index) in imageUrls" :key="index">
        <img :src="url" alt="carousel image" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>

    <!-- 数据分框并排显示 -->
    <div class="data-boxes">
      <el-row gutter="20">
        <el-col :span="6">
          <el-card class="data-card">
            <div class="card-title">任务总量</div>
            <div class="card-value">{{ taskTotal }}</div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="data-card">
            <div class="card-title">待接单任务</div>
            <div class="card-value">{{ pendingTasks }}</div>
            <el-link
              class="view-link"
              @click="navigateTo('/view-task', { taskView: 'pending' })"
            >
              查看任务
            </el-link>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="data-card">
            <div class="card-title">紧急任务总量</div>
            <div class="card-value">{{ urgentTasks }}</div>
            <el-link
              class="view-link"
              @click="
                navigateTo('/view-task', { taskView: 'pending', urgency: '高' })
              "
            >
              查看任务
            </el-link>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="data-card">
            <div class="card-title">已赚取佣金</div>
            <div class="card-value">{{ commission }}</div>
            <el-link class="view-link" @click="navigateTo('my-task/completed')">
              我的任务
            </el-link>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 自定义周历组件 -->
    <el-card class="week-calendar">
      <!-- 当前月份 -->
      <div class="month-title">
        {{ currentMonth }}
      </div>

      <div class="week-header">
        <div v-for="(day, index) in weekDays" :key="index" class="week-day">
          {{ day }}
        </div>
      </div>
      <div class="week-body">
        <!-- 当前周日期 -->
        <div
          v-for="(date, index) in currentWeekDates"
          :key="'current-' + index"
          :class="[
            'week-day-item',
            { 'past-day': date < new Date(), today: isToday(date) },
          ]"
        >
          {{ date.getDate() }}
        </div>
      </div>

      <div class="week-body">
        <!-- 下一周日期 -->
        <div
          v-for="(date, index) in nextWeekDates"
          :key="'next-' + index"
          :class="[
            'week-day-item',
            { 'past-day': date < new Date(), today: isToday(date) },
          ]"
        >
          {{ date.getDate() }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrls: [
        require("@/assets/home_images/1.jpg"),
        require("@/assets/home_images/2.jpg"),
        require("@/assets/home_images/3.jpg"),
        require("@/assets/home_images/4.jpg"),
        require("@/assets/home_images/5.jpg"),
      ],
      taskTotal: 0,
      pendingTasks: 0,
      urgentTasks: 0,
      commission: 0,
      calendarValue: new Date(),
    };
  },
  computed: {
    currentMonth() {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return (
        months[this.calendarValue.getMonth()] +
        " " +
        this.calendarValue.getFullYear()
      );
    },
    currentWeekDates() {
      const currentDate = new Date(this.calendarValue);
      const startOfWeek = this.getStartOfWeek(currentDate);
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        weekDates.push(date);
      }
      return weekDates;
    },
    nextWeekDates() {
      const currentDate = new Date(this.calendarValue);
      const startOfNextWeek = this.getStartOfNextWeek(currentDate);
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfNextWeek);
        date.setDate(startOfNextWeek.getDate() + i);
        weekDates.push(date);
      }
      return weekDates;
    },
    weekDays() {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    },
  },
  mounted() {
    this.fetchTaskStats();
  },
  methods: {
    navigateTo(path, queryParams = {}) {
    if (this.$route.path !== path) {
      this.$router.push({ path, query: queryParams });
    }
  },
    fetchTaskStats() {
      this.$api
        .get("/task/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          this.taskTotal = data.taskTotal;
          this.pendingTasks = data.pendingTasks;
          this.urgentTasks = data.urgentTasks;
          this.commission = data.commission;
        })
        .catch((error) => {
          console.error("Failed to fetch task stats", error);
        });
    },
    getStartOfWeek(date) {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      return new Date(date.setDate(diff));
    },
    getStartOfNextWeek(date) {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? 1 : 8); // adjust when day is sunday
      return new Date(date.setDate(diff));
    },
    isToday(date) {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
  },
};
</script>

  
<style scoped>
.home-page {
  padding: 20px;
  background-color: #ffffff;
  margin-top: 30px;
  margin-right: 30px;
}

.carousel-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.data-boxes {
  margin-top: 10px;
}

.data-card {
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #f0f7ff, #e0e7ff); /* 渐变色背景 */
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
}

.view-link {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.view-link:hover {
  color: #2d9bfa;
}

.data-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* 给不同的数据框使用不同的背景色 */
.el-col:nth-child(1) .data-card {
  background: linear-gradient(135deg, #ffecd2, #fcb69f); /* 任务总量卡片 */
}

.el-col:nth-child(2) .data-card {
  background: linear-gradient(135deg, #ffeccd, #fcee4e); /* 待接单任务卡片 */
}
.el-col:nth-child(3) .data-card {
  background: linear-gradient(135deg, #ffefba, #ffb3c6); /* 紧急任务卡片 */
}

.el-col:nth-child(4) .data-card {
  background: linear-gradient(135deg, #f8b7b7, #f79494); /* 已赚取佣金卡片 */
}

.el-row {
  margin-top: 20px;
}

/* 周历样式 */
.week-calendar {
  margin-top: 35px;
  font-size: 14px;
  background-color: #ffffff;
  border-radius: 8px;
}

.month-title {
  font-size: 18px;
  font-weight: bold;
  color: #ff9c8d;
  margin-bottom: 20px;
  text-align: center;
}

.week-header {
  display: flex;
  justify-content: space-between;
}

.week-day {
  font-weight: bold;
  color: #ff9c8d;
  width: 30px;
  text-align: center;
}

.week-body {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.week-day-item {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #f0f5ff;
  font-weight: bold;
  cursor: pointer;
}

.week-day-item:hover {
  background-color: #ffd1d9;
}

.past-day {
  color: #b0b0b0;
}

.today {
  background-color: #ff8b79;
  color: white;
}
</style>
