import Sticky from './src/sticky';

/* istanbul ignore next */
Sticky.install = function(Vue) {
  Vue.component(Sticky.name, Sticky);
};

export default Sticky;
