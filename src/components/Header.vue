<template>
    <header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <nav>
        <el-button type="text" @click="$router.push('/')">首页</el-button>
        <el-button type="text" @click="$router.push('/register')">注册</el-button>
        <el-button type="text" @click="$router.push('/login')">登录</el-button>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header'
  };
  </script>
  
  <style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #34495e;
    padding: 0px 20px; /* 减小内边距 */
    color: #fff;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo img {
    height: 30px; /* 减小logo的大小 */
  }
  
  nav el-button {
    margin-left: 10px; /* 缩小按钮间距 */
  }
  </style>
  