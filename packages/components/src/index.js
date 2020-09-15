/* Automatically generated by './build/bin/build-entry.js' */

import { CustomEventPlugin } from '@sinokit/utils';
import JsonEditor from './json-editor/index.js';
import JsonSchemaEditor from './json-schema-editor/index.js';
import BrushTimeline from './brush-timeline/index.js';
import HorizontalTimeline from './horizontal-timeline/index.js';
import OverviewTimeline from './overview-timeline/index.js';
import QueryTags from './query-tags/index.js';

const components = [
  JsonEditor,
  JsonSchemaEditor,
  BrushTimeline,
  HorizontalTimeline,
  OverviewTimeline,
  QueryTags
];

const install = function(Vue) {
  Vue.use(CustomEventPlugin);

  components.forEach(component => {
    Vue.component(component.name, component);
  });


};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.2.3',
  install,
  JsonEditor,
  JsonSchemaEditor,
  BrushTimeline,
  HorizontalTimeline,
  OverviewTimeline,
  QueryTags
};
