import '../_rollupPluginBabelHelpers-e1b33a40.js';
import { V as Vue } from '../vue.runtime.esm-59f908bb.js';

/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-05-08 16:57:58
 * @description: 为了使用简便而封装一层，方便统一修改 duration 或者做拦截处理
 */
/**
 * 统一toast信息弹层
 * @param {Object} param0
 */

function showToast(_ref) {
  var _ref$message = _ref.message,
      message = _ref$message === void 0 ? '操作成功~' : _ref$message,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'success' : _ref$type,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 1500 : _ref$duration;
  Vue.prototype.$message({
    message: message,
    type: type,
    duration: duration
  });
}
/**
 * 成功信息提示
 * @param {string} message
 */

function successToast(message) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  Vue.prototype.$message({
    message: message,
    type: 'success',
    duration: duration
  });
}
/**
 * 信息提示
 * @param {string} message
 */

function infoToast(message) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  Vue.prototype.$message({
    message: message,
    type: 'info',
    duration: duration
  });
}
/**
 * 失败信息提示
 * @param {string} message
 */

function errorToast(message) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  Vue.prototype.$message({
    message: message,
    type: 'error',
    duration: duration
  });
}
/**
 * 警告信息提示
 * @param {string} message
 */

function warningToast(message) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  Vue.prototype.$message({
    message: message,
    type: 'warning',
    duration: duration
  });
}
function errorBox(content) {
  Vue.prototype.$alert(content, 'Error', {
    confirmButtonText: 'OK'
  });
}

export { errorBox, errorToast, infoToast, showToast, successToast, warningToast };
