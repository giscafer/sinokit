<template>
  <div id="app">
    <div class="container">
      <aside class="left-sidebar">
        <sidebar />
      </aside>
      <section class="main-content">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  name: 'app',
  components: {
    Sidebar,
  },
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  background-color: #eee;

  height: 100%;
  .container {
    display: flex;
    flex: 1;
    height: 100%;
    .left-sidebar {
      width: 240px;
      height: 100%;
      overflow: auto;
      background-color: #ffffff;
      box-shadow: 0 0 10px 0 rgba(131, 142, 162, 0.22);
      text-align: center;
    }
    .main-content {
      flex: 1;
      margin: 0 auto;
      padding: 24px 32px;
      margin: 0 16px 12px 16px;
      overflow: auto;
      background-color: #fff;
    }
  }
}
</style>
