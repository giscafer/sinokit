import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '首页',
    // component: Chart,
    redirect: '/chart/bar'
  },

  {
    path: '/test-page',
    name: '测试页面',
    component: () =>
      import(/* webpackChunkName: "test-page" */ '../views/TestPage.vue'),
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
