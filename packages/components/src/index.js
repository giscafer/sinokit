/* Automatically generated by './build/bin/build-entry.js' */

import JsonEditor from '../lib/json-editor/index.js';
import JsonSchemaEditor from '../lib/json-schema-editor/index.js';
import { CustomEventPlugin } from '@sinokit/utils';

const components = [JsonEditor, JsonSchemaEditor, CustomEventPlugin];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.1.0',
  install,
  CustomEventPlugin,
  JsonEditor,
  JsonSchemaEditor
};
