import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: '首页',
    hidden: true, // 不现实在菜单
    redirect: '/timeline'
  },

  {
    path: '/timeline',
    name: '时光轴',
    component: () => import('../views/timeline/index2.vue'),
    props: true
  },
  {
    path: '/json-schema-editor',
    name: 'JsonSchemaEditor',
    component: () =>
      import(
        /* webpackChunkName: "json-schema-editor" */ '../views/json-schema-editor.vue'
      ),
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
