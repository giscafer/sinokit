/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
var getStrFullLength = function getStrFullLength() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return str.split('').reduce(function (pre, cur) {
    var charCode = cur.charCodeAt(0);

    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }

    return pre + 2;
  }, 0);
};
/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */

var cutStrByFullLength = function cutStrByFullLength() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var maxLength = arguments.length > 1 ? arguments[1] : undefined;
  var showLength = 0;
  return str.split('').reduce(function (pre, cur) {
    var charCode = cur.charCodeAt(0);

    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }

    if (showLength <= maxLength) {
      return pre + cur;
    }

    return pre;
  }, '');
};

export { cutStrByFullLength, getStrFullLength };
