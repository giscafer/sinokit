import Vue from 'vue';

import 'normalize.css';
import '@/plugins/element-ui';
import '@/plugins/sinokit-components';
import JsonSchemaEditor from 'vue-json-schema-editor-visual';
import App from './App.vue';
import router from './router';

import './styles.scss';

Vue.config.productionTip = false;
Vue.use(JsonSchemaEditor);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
