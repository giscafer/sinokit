<template>
  <div class="ve-sidebar">
    <a class="logo" href>
      <img src="../assets/img/vue.svg" alt="logo" />
    </a>
    <div class="site-descrpition">SinoKit</div>
    <div class="sidebar-section">
      <section>
        <div class="sidebar-title">
          <span>组件示例</span>
        </div>
        <div class="sidebar-content">
          <ul>
            <li v-for="(item, index) in sidebarMenus" :key="index">
              <router-link exact :to="item.url" replace>
                <span v-text="item.name"></span>
                <div class="rectangle-right"></div>
              </router-link>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div class="sidebar-title">
          <span>Demo</span>
        </div>
        <div class="sidebar-content">
          <ul>
            <li>
              <router-link to="/test-event">测试事件</router-link>
            </li>
            <li>
              <router-link to="/test-layout">测试布局</router-link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router'
const sidebarRouter = () => {
  const menus = []
  routes.forEach((route) => {
    if (!route.hidden) {
      menus.push({
        name: route.name,
        url: route.path,
      })
    }
  })
  return menus
}

export default {
  name: 'sidebar',
  created() {
    this.sidebarMenus = sidebarRouter()
  },
}
</script>

<style lang="scss" scoped>
$main-font-color: #35495e;
$second-font-color: #7285a1;
.ve-sidebar {
  height: 100%;
}
.logo {
  display: block;
  img {
    margin-top: 16px;
    width: 130px;
    height: 78px;
    object-fit: contain;
  }
}
.site-descrpition {
  height: 18px;
  font-size: 18px;
  text-align: center;
  color: #0f49b3;
  margin-bottom: 32px;
  .text-style-1 {
    color: #fed24a;
  }
}
.sidebar-section {
  .sidebar-title {
    height: 25px;
    padding: 10px;
    font-family: PingFangSC;
    font-size: 18px;
    text-align: center;
    color: $main-font-color;
  }
  .sidebar-content {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        a {
          display: block;
          position: relative;
          font-family: PingFangSC;
          font-size: 12px;
          text-align: center;
          color: $second-font-color;
          height: 36px;
          line-height: 36px;
          text-decoration: none;
          .rectangle-right {
            display: none;
          }
        }
      }
    }
    .router-link-active {
      background-color: rgba(61, 120, 232, 0.05);
      .rectangle-right {
        display: inline-block;
        position: absolute;
        right: 0;
        width: 4px;
        height: 32px;
        margin: 2px 0;
        border-radius: 4px;
        background-color: #3d78e8;
      }
    }
  }
}
</style>
