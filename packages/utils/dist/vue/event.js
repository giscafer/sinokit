import Vue from 'vue';

/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-05-21 17:21:29
 * @description: 用一个Vue实例封装事件常用的方法并赋值给全局的变量，以便在任何一个组件都可调用这些方法来实现全局事件管理
 *
 * 使用如下：
 * mounted(){
    this.$event.on('change_value',id);
    this.$event.emit('change_value',1);
    ...
  }
 */
var eventHub = new Vue({
  methods: {
    on: function on() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.$on.apply(this, args);
    },
    emit: function emit() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$emit.apply(this, args);
    },
    off: function off() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.$off.apply(this, args);
    },
    once: function once() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.$once.apply(this, args);
    }
  }
});
/* const CustomEventPlugin = V =>
  Object.defineProperty(V.prototype, '$event', {
    value: eventHub,
    writable: true
  }); */

var CustomEventPlugin = {
  install: function install(V) {
    Object.defineProperty(V.prototype, '$event', {
      value: eventHub,
      writable: true
    });
  }
};

export default CustomEventPlugin;
