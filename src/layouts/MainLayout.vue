<template>
  <div class="sidebar">
    <!-- Logo 和标题容器 -->
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h2>花开富贵派单平台</h2>
    </div>
    <!-- 导航栏容器 -->
    <div class="navigation">
      <nav>
        <ul>
          <li>首页</li>
          <li>任务大厅</li>
          <li>我的任务</li>
          <li>我的团队</li>
          <li>交流圈子</li>
          <li>系统管理</li>
        </ul>
      </nav>
    </div>

    <!-- 页面最右边的功能区 -->
    <div class="right-side">
      <div class="message-icon">
        <span class="icon">📩</span>
      </div>

      <div class="bell-icon">
        <span class="icon">🔔</span>
        <div class="notification-count">3</div>
      </div>

      <div
        class="avatar"
        @mouseover="showMenu = true"
        @mouseleave="showMenu = false"
      >
        <img src="@/assets/avatar.jpg" alt="Avatar" class="avatar-img" />
        <div v-if="showMenu" class="avatar-menu">
          <ul>
            <li>退出</li>
            <li>资料设置</li>
            <li>查看任务</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<style scoped>
/* 整体容器 */
.sidebar {
  display: flex;
  flex-direction: column;
  width: 250px; /* 整体宽度保持不变 */
  height: 100vh;
  padding: 20px 10px;
  position: relative; /* 使右侧的功能区定位相对 sidebar */
}

/* Logo 和标题容器 */
.logo-container {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 20px;
  width: 100%; /* Logo 容器宽度占满侧边栏 */
}

.logo {
  width: 30px;
  height: auto;
  margin-right: 5px;
}

.logo-container h2 {
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin: 0;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
}

/* 导航栏样式 */
.navigation {
  flex-grow: 1;
  background: linear-gradient(180deg, #2e3b4e, #2c3e50);
  border-radius: 0 100px 0 0;
  padding: 20px 15px;
  box-shadow: inset 0 1px 10px rgba(0, 0, 0, 0.1);
  width: 150px;
}

.navigation nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navigation nav ul li {
  padding: 15px 10px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.navigation nav ul li:hover {
  background-color: #1d2a3a;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

/* 页面最右边的功能区 */
.right-side {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 1000; /* 保证最上层 */
}

.message-icon {
  margin-right: 20px;
  font-size: 18px;
  cursor: pointer;
}

.bell-icon {
  position: relative;
  margin-right: 20px;
  font-size: 24px;
  cursor: pointer;
}

.notification-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
}

.avatar {
  position: relative;
  padding: 5px; /* 增加 padding 使得触发区域更大 */
}

.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.avatar-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 160px;
  overflow: hidden;
}

.avatar-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.avatar-menu ul li {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.3s;
}

.avatar-menu ul li:hover {
  background-color: #f0f0f0;
}
</style>
