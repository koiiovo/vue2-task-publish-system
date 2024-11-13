<template>
  <div class="sidebar">
    <!-- Logo 和标题容器 -->
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h2>花开富贵派单平台</h2>
    </div>

    <!-- 导航栏容器 -->
    <div class="navigation">
      <nav role="navigation">
        <ul>
          <li role="menuitem">首页</li>
          <li role="menuitem">任务大厅</li>
          <li role="menuitem">我的任务</li>
          <li role="menuitem">我的团队</li>
          <li role="menuitem">交流圈子</li>
          <li role="menuitem">系统管理</li>
        </ul>
      </nav>
    </div>

    <!-- 页面最右边的功能区 -->
    <div class="right-side">
      <div class="message-icon">
        <span class="icon" aria-label="私信">
          <font-awesome-icon icon="fas fa-comment-dots" />
        </span>
        <div class="icon-label">私信</div>
      </div>

      <div class="bell-icon">
        <span class="icon" aria-label="通知">
          <font-awesome-icon icon="fas fa-bell" />
        </span>
        <div class="notification-count">3</div>
        <div class="icon-label">通知</div>
      </div>

      <div
        class="avatar"
        @mouseover="showMenu = true"
        @mouseleave="showMenu = false"
        aria-label="用户菜单"
        role="button"
      >
        <span class="avatar-img">
          <span class="material-icons md-35"> account_circle </span>
        </span>

        <!-- 使用 v-bind:class 来控制显示 -->
        <div v-show="showMenu" class="avatar-menu" aria-hidden="!showMenu">
          <ul>
            <li role="menuitem">资料设置</li>
            <li role="menuitem">查看任务</li>
            <li role="menuitem">查看佣金</li>
            <li role="menuitem">退出</li>
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
      showMenu: false,  // 控制菜单显示的状态
    };
  },
};
</script>

<style scoped>
/* 整体容器 */
.sidebar {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100vh;
  padding: 10px 0px;
}

/* Logo 和标题容器 */
.logo-container {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 20px;
  width: 100%;
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
  width: 60%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6), 0 15px 30px rgba(0, 0, 0, 0.6);
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
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}

.navigation nav ul li:hover {
  background-color: #1d2a3a;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  transform: translateX(5px);
}

/* 页面最右边的功能区 */
.right-side {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
}

.message-icon {
  margin-right: 25px;
  font-size: 30px;
  cursor: pointer;
  position: relative;
}

.bell-icon {
  position: relative;
  margin-right: 25px;
  font-size: 30px;
  cursor: pointer;
}

/* 图标下方文字样式 */
.icon-label {
  font-size: 12px;
  color: #333;
  text-align: center;
  margin-top: 0px;
  position: absolute;
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
  cursor: pointer;
}

.material-icons.md-35 {
  font-size: 58px;
  vertical-align:middle;
  position: relative;
  top: 12px;
}

/* 下拉菜单样式 */
.avatar-menu {
  position: absolute;
  top: 75px;
  right: 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 120px;
  overflow: hidden;
  z-index: 10; /* 确保菜单显示在其他内容之上 */
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
