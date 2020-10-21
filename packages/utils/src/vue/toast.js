/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-05-08 16:57:58
 * @description: 为了使用简便而封装一层，方便统一修改 duration 或者做拦截处理
 */

import Vue from 'vue';

/**
 * 统一toast信息弹层
 * @param {Object} param0
 */
export function showToast({
  message = '操作成功~',
  type = 'success',
  duration = 1500
}) {
  Vue.prototype.$message({
    message,
    type,
    duration
  });
}

/**
 * 成功信息提示
 * @param {string} message
 */
export function successToast(message, duration = 1500) {
  Vue.prototype.$message({
    message,
    type: 'success',
    duration
  });
}
/**
 * 信息提示
 * @param {string} message
 */
export function infoToast(message, duration = 1500) {
  Vue.prototype.$message({
    message,
    type: 'info',
    duration
  });
}

/**
 * 失败信息提示
 * @param {string} message
 */
export function errorToast(message, duration = 1500) {
  Vue.prototype.$message({
    message,
    type: 'error',
    duration
  });
}
/**
 * 警告信息提示
 * @param {string} message
 */
export function warningToast(message, duration = 1500) {
  Vue.prototype.$message({
    message,
    type: 'warning',
    duration
  });
}

export function errorBox(content) {
  Vue.prototype.$alert(content, 'Error', { confirmButtonText: 'OK' });
}
