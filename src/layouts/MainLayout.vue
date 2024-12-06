<template>
  <div class="main-layout">
    <!-- 左侧菜单栏 -->
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
            <!-- 首页菜单 -->
            <li role="menuitem" aria-label="首页" class="home-menu">
              <font-awesome-icon icon="fas fa-home" />
              首页
            </li>

            <!-- 任务大厅菜单 -->
            <li
              role="menuitem"
              aria-label="任务大厅"
              @click="toggleSubMenu('taskHall')"
              :class="{ active: subMenu.taskHall }"
            >
              <font-awesome-icon icon="fas fa-tasks" />
              任务大厅
              <font-awesome-icon
                icon="fas fa-angle-down"
                class="arrow-icon"
                :class="{ rotated: subMenu.taskHall }"
              />
              <ul v-show="subMenu.taskHall">
                <li
                  role="menuitem"
                  aria-label="查看任务"
                  class="submenu-item"
                  @click.stop="navigateTo('/view-task')"
                >
                  查看任务
                </li>
                <li
                  role="menuitem"
                  aria-label="发布任务"
                  class="submenu-item"
                  @click.stop="navigateTo('/publish-task')"
                >
                  发布任务
                </li>
              </ul>
            </li>

            <!-- 我的任务菜单 -->
            <li
              role="menuitem"
              aria-label="我的任务"
              @click="toggleSubMenu('myTasks')"
              :class="{ active: subMenu.myTasks }"
            >
              <font-awesome-icon icon="fas fa-user-check" />
              我的任务
              <font-awesome-icon
                icon="fas fa-angle-down"
                class="arrow-icon"
                :class="{ rotated: subMenu.myTasks }"
              />
              <ul v-show="subMenu.myTasks">
                <li
                  role="menuitem"
                  aria-label="进行中任务"
                  class="submenu-item"
                >
                  进行中任务
                </li>
                <li
                  role="menuitem"
                  aria-label="审核中任务"
                  class="submenu-item"
                >
                  审核中任务
                </li>
                <li
                  role="menuitem"
                  aria-label="已完成任务"
                  class="submenu-item"
                >
                  已完成任务
                </li>
                <li
                  role="menuitem"
                  aria-label="已完成任务"
                  class="submenu-item"
                >
                  已完成任务
                </li>          <li
                  role="menuitem"
                  aria-label="已发布任务"
                  class="submenu-item"
                >
                  已发布任务
                </li>
              </ul>
            </li>

            <!-- 我的团队菜单 -->
            <li
              role="menuitem"
              aria-label="我的团队"
              @click="toggleSubMenu('myTeam')"
              :class="{ active: subMenu.myTeam }"
            >
              <font-awesome-icon icon="fas fa-users" />
              我的团队
              <font-awesome-icon
                icon="fas fa-angle-down"
                class="arrow-icon"
                :class="{ rotated: subMenu.myTeam }"
              />
              <ul v-show="subMenu.myTeam">
                <li role="menuitem" aria-label="成员列表" class="submenu-item">
                  成员列表
                </li>
              </ul>
            </li>

            <!-- 交流圈子菜单 -->
            <li
              role="menuitem"
              aria-label="交流圈子"
              @click="toggleSubMenu('communication')"
              :class="{ active: subMenu.communication }"
            >
              <font-awesome-icon icon="fas fa-comments" />
              交流圈子
              <font-awesome-icon
                icon="fas fa-angle-down"
                class="arrow-icon"
                :class="{ rotated: subMenu.communication }"
              />
              <ul v-show="subMenu.communication">
                <li role="menuitem" aria-label="讨论区" class="submenu-item">
                  讨论区
                </li>
                <li role="menuitem" aria-label="我的消息" class="submenu-item">
                  我的消息
                </li>
                <li role="menuitem" aria-label="问题反馈" class="submenu-item">
                  问题反馈
                </li>
              </ul>
            </li>

            <!-- 系统管理菜单 -->
            <li
              role="menuitem"
              aria-label="系统管理"
              @click="toggleSubMenu('systemManagement')"
              :class="{ active: subMenu.systemManagement }"
            >
              <font-awesome-icon icon="fas fa-cog" />
              系统管理
              <font-awesome-icon
                icon="fas fa-angle-down"
                class="arrow-icon"
                :class="{ rotated: subMenu.systemManagement }"
              />
              <ul v-show="subMenu.systemManagement">
                <li role="menuitem" aria-label="用户信息" class="submenu-item">
                  用户信息
                </li>
                <li role="menuitem" aria-label="系统设置" class="submenu-item">
                  系统设置
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- 右侧内容区域 -->
    <div class="content">
      <!-- 路由渲染的区域 -->
      <router-view></router-view>
    </div>

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

        <!-- 用户菜单 -->
        <transition name="fade">
          <div
            v-show="showMenu"
            class="avatar-menu"
            :aria-expanded="showMenu.toString()"
          >
            <ul>
              <li role="menuitem" aria-label="我的资料">我的资料</li>
              <li role="menuitem" aria-label="我的任务">我的任务</li>
              <li role="menuitem" aria-label="我的佣金">我的佣金</li>
              <li role="menuitem" aria-label="退出">退出</li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false, // 控制用户菜单显示的状态
      subMenu: {
        taskHall: false,
        myTasks: false,
        myTeam: false,
        communication: false,
        systemManagement: false,
      },
    };
  },
  methods: {
    // 控制子菜单的显示与隐藏
    toggleSubMenu(menu) {
      this.$set(this.subMenu, menu, !this.subMenu[menu]);
    },
    navigateTo(path) {
      // 判断当前路由路径是否和目标路径相同，避免重复跳转
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped>
.main-layout {
  display: flex;
}

.content {
  flex-grow: 1;
  background-color: #fff;
  position: fixed; /* 固定内容区域 */
  top: 110px; /* 根据你的布局设置顶部距离 */
  left: 250px; /* 根据你的侧边栏宽度设置左侧距离 */
  bottom: 0; /* 固定到页面底部 */
  right: 0;
}


/* 整体容器 */
.sidebar {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh; /* 保证侧边栏高度充满视口 */
  padding: 10px 0;
  position: fixed; /* 固定在页面左侧 */
  top: 0;
  left: 0;
  margin: 0; /* 移除外边距 */
}

/* Logo 和标题容器 */
.logo-container {
  display: flex;
  align-items: center;
  padding: 15px 15px;
  margin-bottom: 15px;
  width: 100%;
}

.logo {
  width: 58px;
  height: auto;
  margin-right: 5px;
}

.logo-container h2 {
  font-size: 25px;
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
  padding: 25px 15px;
  box-shadow: inset 0 1px 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6), 0 15px 30px rgba(0, 0, 0, 0.6);
}

/* 首页菜单的正常状态 */
.home-menu {
  border-radius: 0 100px 0 0;
  transition: all 0.3s ease;
}

/* 首页菜单悬浮时的效果 */
.home-menu:hover {
  background-color: #1d2a3a;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  transform: translateX(5px);
  border-radius: 0 80px 0 0; /* 让悬浮效果有一个略小的半圆效果 */
}

.navigation nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 父菜单的正常状态 */
.navigation nav ul li {
  padding: 15px 10px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease,
    transform 0.2s ease;
}

.navigation nav ul li:hover:not(.active),
.navigation nav ul li.active:hover {
  transform: translateX(5px);
}

/* 向下箭头样式 */
.arrow-icon {
  margin-left: 25%;
  transition: transform 0.3s ease;
}

/* 父菜单悬浮时箭头旋转 */
.navigation nav ul li:hover:not(.active) .arrow-icon {
  transform: rotate(180deg);
}

/* 父菜单展开时箭头保持向上 */
.navigation nav ul li.active .arrow-icon {
  transform: rotate(180deg);
}

/* 子菜单的样式 */
.submenu-item {
  padding-left: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  transition: background-color 0.3s ease;
}

.submenu-item:hover {
  background-color: #1d2a3a;
}

.navigation nav ul li > ul {
  margin-top: 10px;
  padding-left: 15px;
}

/* 父菜单展开时的样式 */
.navigation nav ul li.active {
  box-shadow: none;
  transform: none;
}

.navigation nav ul li.active:hover {
  box-shadow: none;
  transform: none;
}

/* 页面最右边的功能区 */
.right-side {
  position: fixed;
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
  vertical-align: middle;
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
