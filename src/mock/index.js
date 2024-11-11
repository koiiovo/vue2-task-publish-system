import Mock from 'mockjs';

// 模拟任务数据
Mock.mock('/api/tasks', 'get', {
  'tasks|5-10': [
    {
      'id|+1': 1,
      'title': '@ctitle(5, 10)', // 随机生成任务标题
      'description': '@csentence(10, 20)', // 随机生成任务描述
      'assignedTo': '@name', // 随机生成用户名
      'status|1': ['Pending', 'In Progress', 'Completed'], // 随机任务状态
      'deadline': '@datetime', // 随机生成任务截止时间
    }
  ]
});
