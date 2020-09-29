import BackToTop from './src/backto-top';

/* istanbul ignore next */
BackToTop.install = function(Vue) {
  Vue.component(BackToTop.name, BackToTop);
};

export default BackToTop;
