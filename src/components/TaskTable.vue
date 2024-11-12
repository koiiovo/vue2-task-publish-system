<template>
    <section class="tasks">
      <h3>我的任务</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>任务名称</th>
          <th>任务编号</th>
          <th>任务进度</th>
          <th>任务健康状态</th>
          <th>任务截止日期</th>
          <th>任务积分</th>
        </tr>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.name }}</td>
          <td>{{ task.code }}</td>
          <td>{{ task.progress }}%</td>
          <td :class="task.status === 'good' ? 'status-good' : 'status-bad'">●</td>
          <td>{{ task.deadline }}</td>
          <td>{{ task.points }}</td>
        </tr>
      </table>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tasks: [
          { id: 1, name: 'HDF平台自省增强功能', code: '2022-XDF-HF-852', progress: 85, status: 'good', deadline: '2022-12-08', points: 4589 },
          { id: 2, name: '营销数据分析平台', code: '2022-UDH-DC-32', progress: 35, status: 'bad', deadline: '2022-12-06', points: 25644 },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .tasks table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .tasks th, .tasks td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }
  
  .status-good {
    color: green;
  }
  
  .status-bad {
    color: red;
  }
  </style>
  