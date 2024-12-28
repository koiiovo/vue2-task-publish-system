<template>
    <div class="view-task">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的消息</el-breadcrumb-item>
        <el-breadcrumb-item>问题反馈</el-breadcrumb-item>
      </el-breadcrumb>
  
      <el-card class="box-card"> </el-card>
    </div>
  </template>
    
    <script>
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
  </style>
    