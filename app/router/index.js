import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '首页',
    // component: Chart,
    redirect: '/json-schema-editor'
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
