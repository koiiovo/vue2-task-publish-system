<template>
  <div class="main-layout">
    <!-- 左侧菜单栏 -->
    <div class="sidebar">
      <!-- Logo 和标题容器 -->
      <div class="logo-container">
        <img src="@/assets/fa.png" alt="Logo" class="logo" />
        <h2>花开富贵派单平台</h2>
      </div>

      <!-- 导航栏容器 -->
      <div class="navigation">
        <nav role="navigation">
          <ul>
            <!-- 首页菜单 -->
            <li
              role="menuitem"
              aria-label="首页"
              @click.stop="navigateTo('/home')"
            >
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
                  @click.stop="navigateTo('/my-task/ongoing')"
                >
                  进行中任务
                </li>
                <li
                  role="menuitem"
                  aria-label="审核中任务"
                  class="submenu-item"
                  @click.stop="navigateTo('/my-task/reviewing')"
                >
                  审核中任务
                </li>
                <li
                  role="menuitem"
                  aria-label="已完成任务"
                  class="submenu-item"
                  @click.stop="navigateTo('/my-task/completed')"
                >
                  已完成任务
                </li>
                <li
                  role="menuitem"
                  aria-label="已发布任务"
                  class="submenu-item"
                  @click.stop="navigateTo('/my-task/published')"
                >
                  已发布任务
                </li>
              </ul>
            </li>

            <!-- 我的消息菜单 -->
            <li
              role="menuitem"
              aria-label="我的消息"
              @click="toggleSubMenu('circle')"
              :class="{ active: subMenu.circle }"
            >
              <font-awesome-icon icon="fas fa-comments" />
              我的消息
              <font-awesome-icon
                icon="fas fa-angle-down"
                class="arrow-icon"
                :class="{ rotated: subMenu.circle }"
              />
              <ul v-show="subMenu.circle">
                <li
                  role="menuitem"
                  aria-label="问题反馈"
                  class="submenu-item"
                  @click.stop="navigateTo('/my-message/feedback')"
                >
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
                <li
                  role="menuitem"
                  aria-label="用户信息"
                  class="submenu-item"
                  @click.stop="navigateTo('/system-management/user-info')"
                >
                  用户信息
                </li>
              </ul>
            </li>

            <!-- GitHub菜单 -->
            <li role="menuitem" aria-label="GitHub" @click.stop="goToGitHub">
              <font-awesome-icon icon="fab fa-github" />
              GitHub
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
              <li
                role="menuitem"
                aria-label="我的资料"
                @click.stop="navigateTo('/system-management/user-info')"
              >
                我的资料
              </li>
              <li
                role="menuitem"
                aria-label="我的任务"
                @click.stop="navigateTo('/my-task/published')"
              >
                我的任务
              </li>
              <li
                role="menuitem"
                aria-label="我的佣金"
                @click.stop="navigateTo('/my-task/completed')"
              >
                我的佣金
              </li>
              <li role="menuitem" aria-label="退出" @click="navigateTo('/')">
                退出
              </li>
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
      showMenu: false,
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
    toggleSubMenu(menu) {
      this.$set(this.subMenu, menu, !this.subMenu[menu]);
    },
    navigateTo(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
    goToGitHub() {
      window.open(
        "https://github.com/koiiovo/vue2-task-publish-system",
        "_blank"
      );
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: "Ma Shan Zheng", cursive;
}

.main-layout {
  display: flex;
}

.content {
  flex-grow: 1;
  background-color: #fff;
  position: fixed;
  top: 110px;
  left: 250px;
  bottom: 0;
  right: 0;
}

/* 整体容器 */
.sidebar {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
}

.logo-container {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  margin-bottom: 10px;
  width: 100%;
}

.logo {
  width: 58px;
  height: auto;
  margin-right: 5px;
}

.logo-container h2 {
  font-size: 28px;
  color: #000000;
  font-weight: bold;
  margin: 0;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
}

/* 导航栏样式 */
.navigation {
  flex-grow: 1;
  background: linear-gradient(180deg, #ffc0d4, #ffb8b0);
  border-radius: 0 100px 0 0;
  padding: 25px 15px;
  box-shadow: inset 0 1px 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  box-shadow: 0 5px 15px rgba(255, 217, 217, 0.6),
    0 15px 30px rgba(176, 149, 149, 0.6);
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
  color: #000000;
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
  background-color: #ffcbcb;
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
  padding: 5px; /* 触发区域增大 */
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
  z-index: 10;
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
