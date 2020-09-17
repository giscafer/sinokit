(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 192);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/horizontal-timeline/src/horizontal-timeline.vue?vue&type=template&id=b08d38de&scoped=true&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    _vm._g(
      _vm._b(
        { staticClass: "horizontal-timeline-component" },
        "div",
        _vm.$attrs,
        false
      ),
      _vm.$listeners
    ),
    [
      _c(
        "div",
        {
          ref: "container",
          staticClass: "timeline-container",
          on: {
            mousewheel: function(event) {
              return (
                !_vm.mousewheelDisable && _vm.MouseMove.handleMousewhell(event)
              )
            },
            mousedown: function(event) {
              return _vm.MouseMove.handleMousedown(event)
            },
            mousemove: function(event) {
              return _vm.MouseMove.handleMouseMove(event)
            },
            mouseleave: function(event) {
              return _vm.MouseMove.handleMouseleave(event)
            },
            mouseup: function(event) {
              return _vm.MouseMove.handleMouseup(event)
            }
          }
        },
        [
          !_vm.timelineList
            ? _c("div", { staticClass: "loading-mask" }, [
                _c("div", { staticClass: "loading-spinner" }, [
                  _c(
                    "svg",
                    {
                      staticClass: "circular",
                      attrs: { viewBox: "25 25 50 50" }
                    },
                    [
                      _c("circle", {
                        staticClass: "path",
                        attrs: { cx: "50", cy: "50", r: "20", fill: "none" }
                      })
                    ]
                  )
                ])
              ])
            : _vm._e(),
          _vm.hasData
            ? [
                _c("div", { staticClass: "arrow-left" }, [
                  _c(
                    "div",
                    {
                      staticClass: "i-container",
                      style: { marginTop: -_vm.gap / 2 + "px" }
                    },
                    [
                      _vm.leftLoading
                        ? _c(
                            "svg",
                            {
                              staticClass: "circular small",
                              attrs: { viewBox: "25 25 50 50" }
                            },
                            [
                              _c("circle", {
                                staticClass: "path",
                                attrs: {
                                  cx: "50",
                                  cy: "50",
                                  r: "20",
                                  fill: "none"
                                }
                              })
                            ]
                          )
                        : _vm._e(),
                      _vm.leftArrowShow && !_vm.leftLoading
                        ? _c(
                            "svg",
                            {
                              staticClass: "icon-arrow-left",
                              attrs: {
                                viewBox: "0 0 1024 1024",
                                width: "32",
                                height: "32"
                              },
                              on: { click: _vm.left }
                            },
                            [
                              _c("path", {
                                attrs: {
                                  d:
                                    "M586.325333 747.52a36.565333 36.565333 0 0 1 0 52.309333 38.058667 38.058667 0 0 1-53.248 0l-266.069333-261.674666a36.565333 36.565333 0 0 1 0-52.309334l266.069333-261.674666a38.058667 38.058667 0 0 1 53.248 0 36.565333 36.565333 0 0 1 0 52.352L346.837333 512l239.488 235.52z"
                                }
                              })
                            ]
                          )
                        : _vm._e()
                    ]
                  )
                ]),
                _c("div", { staticClass: "arrow-right" }, [
                  _c(
                    "div",
                    {
                      staticClass: "i-container",
                      style: { marginTop: -_vm.gap / 2 + "px" }
                    },
                    [
                      _vm.rightLoading
                        ? _c(
                            "svg",
                            {
                              staticClass: "circular small",
                              attrs: { viewBox: "25 25 50 50" }
                            },
                            [
                              _c("circle", {
                                staticClass: "path",
                                attrs: {
                                  cx: "50",
                                  cy: "50",
                                  r: "20",
                                  fill: "none"
                                }
                              })
                            ]
                          )
                        : _vm._e(),
                      _vm.rightArrowShow && !_vm.rightLoading
                        ? _c(
                            "svg",
                            {
                              staticClass: "icon-arrow-right",
                              attrs: {
                                viewBox: "0 0 1024 1024",
                                width: "32",
                                height: "32"
                              },
                              on: { click: _vm.right }
                            },
                            [
                              _c("path", {
                                attrs: {
                                  d:
                                    "M437.674667 747.52L677.162667 512l-239.488-235.52a36.565333 36.565333 0 0 1 0-52.309333 38.058667 38.058667 0 0 1 53.248 0l266.069333 261.674666a36.565333 36.565333 0 0 1 0 52.309334l-266.069333 261.674666a38.058667 38.058667 0 0 1-53.248 0 36.565333 36.565333 0 0 1 0-52.352z",
                                  "p-id": "1616"
                                }
                              })
                            ]
                          )
                        : _vm._e()
                    ]
                  )
                ]),
                _c(
                  "div",
                  {
                    ref: "timelineRef",
                    class: {
                      "scroll-container": true,
                      "scroll-show": _vm.showScroll
                    }
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "timeline-wrapper",
                        style: {
                          height: _vm.maxItemHeight * 2 + _vm.gap + "px"
                        }
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "timeline" },
                          _vm._l(_vm.timelineList, function(i, index) {
                            return _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "inserted",
                                    rawName: "v-inserted",
                                    value: _vm.afterInserted,
                                    expression: "afterInserted"
                                  }
                                ],
                                key: i[_vm.uuid],
                                staticClass: "timeline-item",
                                attrs: { "data-id": i[_vm.uuid] }
                              },
                              [
                                _c("div", { staticClass: "tail" }),
                                i.newMark
                                  ? _c("div", {
                                      staticClass: "divider",
                                      class: { right: i.newMark == "left" }
                                    })
                                  : _vm._e(),
                                _c("div", {
                                  staticClass: "node",
                                  class: { center: i.centerNode }
                                }),
                                _c(
                                  "div",
                                  {
                                    staticClass: "time",
                                    class: {
                                      time: true,
                                      top: _vm.getIsTop(index)
                                    }
                                  },
                                  [
                                    _vm._t(
                                      "time",
                                      [_vm._v(_vm._s((i && i.time) || ""))],
                                      { item: i }
                                    )
                                  ],
                                  2
                                ),
                                _c("div", { staticClass: "wrapper" }, [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "card",
                                      style: { top: _vm.getIsTop(index) }
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticStyle: { flex: "1" } },
                                        [_vm._t("default", null, { item: i })],
                                        2
                                      )
                                    ]
                                  )
                                ])
                              ]
                            )
                          }),
                          0
                        )
                      ]
                    )
                  ]
                )
              ]
            : _vm._e(),
          _vm.timelineList && !_vm.timelineList.length
            ? [
                _c("p", { staticClass: "no-data" }, [
                  _c(
                    "svg",
                    {
                      attrs: {
                        viewBox: "0 0 1024 1024",
                        width: "30",
                        height: "30"
                      }
                    },
                    [
                      _c("path", {
                        attrs: {
                          d:
                            "M512 20.48a491.52 491.52 0 1 0 491.52 491.52A491.52 491.52 0 0 0 512 20.48z m0 931.84A440.32 440.32 0 1 1 952.32 512 440.7296 440.7296 0 0 1 512 952.32z",
                          "p-id": "925"
                        }
                      }),
                      _c("path", {
                        attrs: {
                          d:
                            "M611.9424 708.608c-8.8064 6.5536-70.4512 70.656-97.0752 71.0656-7.9872 0-11.8784-6.3488-11.8784-18.8416q0-37.888 61.44-247.3984a858.9312 858.9312 0 0 0 37.888-141.9264 24.7808 24.7808 0 0 0-8.3968-20.48 49.7664 49.7664 0 0 0-29.4912-6.5536c-54.4768 0-117.76 37.888-186.9824 114.688-20.48 22.9376 14.1312 31.1296 26.0096 20.48C409.6 472.6784 471.04 409.6 491.52 409.6c9.4208 0 14.1312 4.3008 14.1312 13.1072a76.3904 76.3904 0 0 1-4.7104 22.528q-87.6544 286.72-87.6544 352.6656a59.392 59.392 0 0 0 10.0352 33.1776 34.816 34.816 0 0 0 31.3344 15.36 134.9632 134.9632 0 0 0 63.8976-21.9136 806.0928 806.0928 0 0 0 113.664-94.0032c19.2512-20.0704-7.7824-31.5392-20.2752-21.9136z",
                          "p-id": "926"
                        }
                      }),
                      _c("path", {
                        attrs: {
                          d:
                            "M595.461331 273.348307a43.4176 49.3568 15.71 1 0 26.72853-95.026104 43.4176 49.3568 15.71 1 0-26.72853 95.026104Z"
                        }
                      })
                    ]
                  ),
                  _vm._v(" 暂无数据\n      ")
                ])
              ]
            : _vm._e()
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/horizontal-timeline/src/horizontal-timeline.vue?vue&type=template&id=b08d38de&scoped=true&

// CONCATENATED MODULE: ./src/horizontal-timeline/src/MouseMove.js
class MouseMove {
  constructor() {
    this.start = false;
    this.x = 0;
    this.offset = {
      value: 0
    };
    this.startx = 0;
  }

  handleMousedown(event) {
    if (!event.button) {
      this.start = true;
      const {
        pageX
      } = event;
      this.startx = pageX;
      this.x = pageX;
    }
  }

  handleMousewhell(event) {
    const {
      wheelDelta
    } = event;
    this.offset = {
      value: wheelDelta / 2
    };

    if (event.preventDefault) {
      event.preventDefault();
      return false;
    }
  }

  handleMouseMove(event) {
    if (!this.start) return;
    const {
      pageX
    } = event;
    this.offset = {
      value: pageX - this.x
    };
    this.x = pageX;

    if (event.preventDefault) {
      event.preventDefault();
      return false;
    }
  }

  handleMouseup() {
    this.start = false;
  }

  handleMouseleave() {
    this.start = false;
  }

}

/* harmony default export */ var src_MouseMove = (new MouseMove());
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/horizontal-timeline/src/horizontal-timeline.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var horizontal_timelinevue_type_script_lang_js_ = ({
  name: 'SHorizontalTimeline',
  directives: {
    inserted: {
      inserted: (el, binding) => {
        binding.value && binding.value(el.offsetHeight);
      },
      update: (el, binding) => {
        binding.value && binding.value(el.offsetHeight);
      }
    }
  },
  props: {
    /**
     * 初次加载时定位的索引位置,优先级低于positionId
     */
    positionIndex: {
      type: Number,
      default: null
    },

    /**
     * 初次加载时定位的id位置,优先级高于positionIndex
     */
    positionId: {
      type: Number,
      default: null
    },

    /**
     * 显示的数据
     */
    timelineList: {
      type: Array,
      default: null
    },

    /**
     * 是否显示横向滚动轴
     */
    showScroll: {
      type: Boolean,
      default: true
    },

    /**
     * 数据项唯一标识符字段
     */
    uuid: {
      type: String,
      default: 'id'
    },

    /**
     * 左侧数据加载完毕
     */
    leftComplete: {
      type: Boolean,
      default: false
    },

    /**
     * 右侧数据加载完毕
     */
    rightComplete: {
      type: Boolean,
      default: false
    },

    /**
     * 是否显示左侧箭头
     */
    leftArrowShow: {
      type: Boolean,
      default: true
    },

    /**
     * 是否显示右侧箭头
     */
    rightArrowShow: {
      type: Boolean,
      default: true
    },

    /**
     * 底部空隙,单位px
     */
    gap: {
      type: Number,
      default: 25,
      validator: function (value) {
        return value > 0;
      }
    },

    /**
     * 是否禁用滚轮
     */
    mousewheelDisable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      MouseMove: src_MouseMove,
      maxScrollLeft: 0,
      rightLoading: false,
      leftLoading: false,
      maxItemHeight: 0,
      smoothScrolling: false
    };
  },

  computed: {
    offset() {
      return src_MouseMove.offset;
    },

    hasData() {
      return this.timelineList && this.timelineList.length;
    }

  },
  watch: {
    offset(val) {
      this.hasData && this.watchOffset(val.value);
    },

    rightLoading: 'handleRightLoad',
    leftLoading: 'handleLeftLoad',
    timelineList: {
      handler(val, oldval) {
        this.setMaxScrollLeft();

        if (!oldval && val) {
          if (this.positionId != null) {
            return this.positionById(this.positionId);
          }

          if (this.positionIndex != null) {
            this.positionByIndex(this.positionIndex);
          }
        }
      },

      deep: true
    }
  },

  mounted() {
    this.setMaxScrollLeft();
  },

  methods: {
    getIsTop(index) {
      if (this.timelineList.length % 2) {
        return index % 2 ? 'calc(100% + 30px)' : 0;
      } else {
        return index % 2 ? 0 : 'calc(100% + 30px)';
      }
    },

    afterInserted(height) {
      this.maxItemHeight = Math.max(height, this.maxItemHeight);
    },

    setMaxScrollLeft() {
      this.$nextTick(() => {
        let timelineRef = this.$refs.timelineRef;
        if (!timelineRef) return;
        this.maxScrollLeft = timelineRef.scrollWidth - timelineRef.offsetWidth;
      });
    },

    smoothScroll(val, amplitude) {
      this.smoothScrolling = true;
      let timelineRef = this.$refs.timelineRef;
      let requestAnimationFrame = window.requestAnimationFrame;
      let def = timelineRef.scrollLeft;
      let scrollLeft = (val - def) / Math.abs(val - def) * amplitude;

      if (scrollLeft < 0) {
        scrollLeft = Math.floor(scrollLeft);
      } else {
        scrollLeft = Math.ceil(scrollLeft);
      }

      if (def + scrollLeft <= 0) {
        timelineRef.scrollLeft = 0;
        this.smoothScrolling = false;
        return;
      }

      if (def + scrollLeft >= this.maxScrollLeft) {
        timelineRef.scrollLeft = this.maxScrollLeft;
        return this.smoothScrolling = false;
      }

      timelineRef.scrollLeft += scrollLeft;
      return requestAnimationFrame(() => this.smoothScroll(val, amplitude));
    },

    left() {
      let timelineRef = this.$refs.timelineRef;
      if (this.smoothScrolling || this.leftLoading || this.rightLoading) return;

      if (timelineRef.scrollLeft == 0) {
        !this.leftComplete && (this.leftLoading = true);
      } else {
        this.smoothScroll(0, timelineRef.scrollLeft / 50);
      }
    },

    right() {
      if (this.smoothScrolling || this.leftLoading || this.rightLoading) return;
      let timelineRef = this.$refs.timelineRef;

      if (this.maxScrollLeft == timelineRef.scrollLeft) {
        !this.rightComplete && (this.rightLoading = true);
      } else {
        this.smoothScroll(this.maxScrollLeft, (this.maxScrollLeft - (timelineRef.scrollLeft || 0)) / 50);
      }
    },

    watchOffset(val) {
      if (this.rightLoading || this.leftLoading) return;
      let timelineRef = this.$refs.timelineRef;
      let scrollLeft = timelineRef.scrollLeft;
      scrollLeft += -val;
      if (scrollLeft < 0) scrollLeft = 0;
      if (scrollLeft > this.maxScrollLeft) scrollLeft = this.maxScrollLeft;

      if (!this.rightComplete && val < 0 && scrollLeft >= this.maxScrollLeft) {
        this.rightLoading = true;
      }

      if (!this.leftComplete && val > 0 && scrollLeft <= 0) {
        this.leftLoading = true;
      }

      timelineRef.scrollLeft = scrollLeft;
    },

    handleRightLoad(val) {
      if (val) {
        const length = this.timelineList.length;
        new Promise(resolve => {
          /**
           * @property {function} resolve - 右侧数据加载中
           */
          this.$emit('right-loading', resolve);
        }).then(() => {
          const add = this.timelineList.length - length;

          if (add > 0) {
            this.timelineList[0] && this.positioning(length, null, true);
          }

          this.rightLoading = false;
        });
        src_MouseMove.start = false;
      }
    },

    handleLeftLoad(val) {
      if (val) {
        const length = this.timelineList.length;
        new Promise(resolve => {
          /**
           * @property {function} resolve - 左侧数据加载中
           */
          this.$emit('left-loading', resolve);
        }).then(() => {
          const add = this.timelineList.length - length;

          if (add > 0) {
            this.timelineList[0] && this.positioning(add - 1, true);
          }

          this.leftLoading = false;
        });
        src_MouseMove.start = false;
      }
    },

    /**
     * 定位到指定id项
     * @public
     */
    positionById(id) {
      this.$nextTick(() => {
        if (!id) return console.warn('id不能为空');
        let doms = this.$refs.timelineRef && this.$refs.timelineRef.querySelectorAll('.timeline-item');
        doms && [].forEach.call(doms, dom => {
          if (dom.dataset.id == id) {
            dom.scrollIntoView && dom.scrollIntoView({
              inline: 'center',
              block: 'center'
            });
          }
        });
      });
    },

    /**
     * 定位到指定索引项
     * @public
     */
    positionByIndex(index) {
      this.timelineList[index] && this.positionById(this.timelineList[index][this.uuid]);
    },

    positioning(index, leftLoading, rightLoading) {
      this.$nextTick(() => {
        let doms = this.$refs.timelineRef && this.$refs.timelineRef.querySelectorAll('.timeline-item');
        const dom = doms[index];
        dom.scrollIntoView && dom.scrollIntoView({
          inline: leftLoading ? 'start' : rightLoading ? 'end' : 'center',
          block: 'center'
        });
      });
    }

  }
});
// CONCATENATED MODULE: ./src/horizontal-timeline/src/horizontal-timeline.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_horizontal_timelinevue_type_script_lang_js_ = (horizontal_timelinevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/horizontal-timeline/src/horizontal-timeline.vue?vue&type=style&index=0&id=b08d38de&lang=scss&scoped=true&
var horizontal_timelinevue_type_style_index_0_id_b08d38de_lang_scss_scoped_true_ = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/horizontal-timeline/src/horizontal-timeline.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_horizontal_timelinevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "b08d38de",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/horizontal-timeline/src/horizontal-timeline.vue"
/* harmony default export */ var horizontal_timeline = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _src_horizontal_timeline_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/*--------------------------------------------------------------
 *  Copyright (c) Nickbing Lao<giscafer@outlook.com>. All rights reserved.
 *  Licensed under the MIT License.
 *  Github: https://github.com/giscafer
 *
 *  基于社区的组件修改： https://github.com/wangguangyou/vue-horizontal-timeline-component
 *-------------------------------------------------------------*/
 // `Vue.use` automatically prevents you from using
// the same plugin more than once,
// so calling it multiple times on the same plugin
// will install the plugin only once

_src_horizontal_timeline_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = Vue => {
  Vue.component(_src_horizontal_timeline_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_horizontal_timeline_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
}; // To auto-install when vue is found


let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(_src_horizontal_timeline_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
} // To allow use as module (npm/webpack/etc.) export component


/* harmony default export */ __webpack_exports__["default"] = (_src_horizontal_timeline_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(12)))

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_horizontal_timeline_vue_vue_type_style_index_0_id_b08d38de_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_horizontal_timeline_vue_vue_type_style_index_0_id_b08d38de_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_horizontal_timeline_vue_vue_type_style_index_0_id_b08d38de_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_horizontal_timeline_vue_vue_type_style_index_0_id_b08d38de_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".loading-mask[data-v-b08d38de]{position:absolute;z-index:2000;background-color:rgba(255,255,255,0.9);margin:0;top:0;right:0;bottom:0;left:0;transition:opacity 0.3s}.loading-mask .loading-spinner[data-v-b08d38de]{top:50%;margin-top:-21px;width:100%;text-align:center;position:absolute}@keyframes loading-rotate-data-v-b08d38de{100%{transform:rotate(1turn)}}.circular[data-v-b08d38de]{height:42px;width:42px;animation:loading-rotate-data-v-b08d38de 2s linear infinite}.circular.small[data-v-b08d38de]{height:22px;width:22px}.circular .path[data-v-b08d38de]{animation:loading-dash 1.5s ease-in-out infinite;stroke-dasharray:90, 150;stroke-dashoffset:0;stroke-width:2;stroke:#409eff;stroke-linecap:round}.no-data[data-v-b08d38de]{font-size:26px;text-align:center;margin:0;padding:1em 0}.no-data svg[data-v-b08d38de]{vertical-align:sub}.card[data-v-b08d38de]{border:1px solid #ebeef5;background-color:#fff;color:#303133;transition:0.3s;box-shadow:0 2px 12px 0 rgba(0,0,0,0.1);display:flex;flex-direction:column;position:relative;height:100%;width:100%}.filter-bar[data-v-b08d38de]{display:flex;justify-content:space-between;align-items:center}.timeline-container[data-v-b08d38de]{display:flex;flex-direction:column;flex:1;min-height:60px;position:relative !important;padding:0 40px}.timeline-container .arrow-right[data-v-b08d38de],.timeline-container .arrow-left[data-v-b08d38de]{outline:none;padding:0;margin:0;height:100%;width:36px;transition:0.3s;color:#aeaeae;position:absolute;top:50%;z-index:10;transform:translateY(-50%)}.timeline-container .arrow-right .i-container[data-v-b08d38de],.timeline-container .arrow-left .i-container[data-v-b08d38de]{position:absolute;font-size:0;top:50%;transform:translateY(-50%)}.timeline-container .arrow-right .i-container .icon-arrow-left[data-v-b08d38de],.timeline-container .arrow-left .i-container .icon-arrow-left[data-v-b08d38de]{margin-left:-15px;cursor:pointer}.timeline-container .arrow-right .i-container .icon-arrow-left:hover path[data-v-b08d38de],.timeline-container .arrow-left .i-container .icon-arrow-left:hover path[data-v-b08d38de]{fill:#5cb6ff}.timeline-container .arrow-right .i-container .icon-arrow-right[data-v-b08d38de],.timeline-container .arrow-left .i-container .icon-arrow-right[data-v-b08d38de]{margin-right:-15px;cursor:pointer}.timeline-container .arrow-right .i-container .icon-arrow-right:hover path[data-v-b08d38de],.timeline-container .arrow-left .i-container .icon-arrow-right:hover path[data-v-b08d38de]{fill:#5cb6ff}.timeline-container .arrow-left[data-v-b08d38de]{left:4px}.timeline-container .arrow-left .i-container[data-v-b08d38de]{left:0}.timeline-container .arrow-right[data-v-b08d38de]{right:4px}.timeline-container .arrow-right .i-container[data-v-b08d38de]{right:0}.timeline-wrapper[data-v-b08d38de]{user-select:none;position:relative}.timeline[data-v-b08d38de]{display:flex;flex-wrap:nowrap;margin:0;width:100%;font-size:14px;list-style:none;padding-top:10px}.timeline .timeline-item[data-v-b08d38de]{position:relative;display:inline-flex;padding:0 8px}.timeline .timeline-item .tail[data-v-b08d38de]{position:absolute;bottom:5px;right:0;width:100%;border-top:2px solid #e4e7ed}.timeline .timeline-item .divider[data-v-b08d38de]{position:absolute;width:1px;height:200%;left:0;top:0;border-right:1px dashed #e4e7ed}.timeline .timeline-item .divider.right[data-v-b08d38de]{left:initial;right:0}.timeline .timeline-item .link[data-v-b08d38de]{position:absolute;bottom:5px;left:6px;transform-origin:0 0;transform:rotate(-45deg);width:21px;border-top:1px solid #e4e7ed}.timeline .timeline-item .time[data-v-b08d38de]{position:absolute;bottom:-30px;width:100%;left:50%;transform:translateX(-50%);color:#909399;line-height:1.3;font-size:13px;text-align:center}.timeline .timeline-item .time.top[data-v-b08d38de]{bottom:30px}.timeline .timeline-item .node[data-v-b08d38de]{position:absolute;bottom:0;transform:translateX(-50%);left:50%;background-color:#e4e7ed;border-radius:50%;display:flex;justify-content:center;align-items:center;width:12px;height:12px}.timeline .timeline-item .node.center[data-v-b08d38de]{background-color:#74f5dd}.timeline .timeline-item:first-child .tail[data-v-b08d38de]{width:50%}.timeline .timeline-item:last-child .tail[data-v-b08d38de]{left:0;width:50%}.timeline .timeline-item .wrapper[data-v-b08d38de]{margin-bottom:20px;width:100%}.scroll-container[data-v-b08d38de]{overflow-x:hidden;flex:1}.scroll-container.scroll-show[data-v-b08d38de]{overflow-x:auto}.scroll-container[data-v-b08d38de]::-webkit-scrollbar{width:8px;height:8px;background-color:#f5f5f5}.scroll-container[data-v-b08d38de]::-webkit-scrollbar-track{display:none;box-shadow:inset 0 0 2px rgba(0,0,0,0.2);border-radius:10px;background-color:transparent}.scroll-container[data-v-b08d38de]::-webkit-scrollbar-thumb{border-radius:10px;box-shadow:inset 0 0 2px rgba(0,0,0,0.2);background:rgba(0,0,0,0.16)}.scroll-container[data-v-b08d38de]::-webkit-scrollbar-track-piece{display:none}.scroll-container[data-v-b08d38de]::-webkit-scrollbar-button{display:none}.scroll-container[data-v-b08d38de]::-webkit-scrollbar-corner{display:none}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(3);
            var content = __webpack_require__(194);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ })

/******/ });
});