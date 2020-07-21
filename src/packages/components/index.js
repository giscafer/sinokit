/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-07-21 11:39:31
 * @description: 组件注册
 */

import CustomEventPlugin from '@sinokit/utils/event';
import JsonSchemaEditor from './JsonSchemaEditor';
import JsonEditor from './JsonEditor';

const COMPONENTS = [JsonEditor, JsonSchemaEditor];

const install = Vue => {
  Vue.use(CustomEventPlugin);

  if (install.installed) return;
  COMPONENTS.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}

export default {
  install,
  CustomEventPlugin,
  JsonEditor,
  JsonSchemaEditor
};
