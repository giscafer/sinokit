import Component from './src/overview-timeline.vue';

Component.install = Vue => {
  Vue.component(Component.name, Component);
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(Component);
}

export default Component;
