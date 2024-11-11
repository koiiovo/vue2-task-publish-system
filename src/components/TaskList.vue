<template>
  <div>
    <h1>任务发布系统</h1>
    <table>
      <thead>
        <tr>
          <th>任务ID</th>
          <th>任务标题</th>
          <th>任务描述</th>
          <th>负责人</th>
          <th>状态</th>
          <th>截止时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.assignedTo }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.deadline }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: []
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      axios.get('/api/tasks')
        .then(response => {
          this.tasks = response.data.tasks;
        })
        .catch(error => {
          console.error('获取任务数据失败:', error);
        });
    }
  }
};
</script>

<style scoped>
/* 样式可以根据需求进行调整 */
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
</style>
