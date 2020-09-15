import SQueryTags from './src/query-tags';

/* istanbul ignore next */
SQueryTags.install = function(Vue) {
  Vue.component(SQueryTags.name, SQueryTags);
};

export default SQueryTags;
