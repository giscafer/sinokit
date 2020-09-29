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
/******/ 	return __webpack_require__(__webpack_require__.s = 209);
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

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_vue_vue_type_style_index_0_id_51409e77_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_vue_vue_type_style_index_0_id_51409e77_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_vue_vue_type_style_index_0_id_51409e77_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_vue_vue_type_style_index_0_id_51409e77_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".s-tag[data-v-51409e77]{position:relative;display:inline-block;background-color:#fff;height:30px;width:200px;font-size:16px;color:#3c4353;border:1px solid #3c4353;border-radius:4px;box-sizing:border-box;white-space:nowrap;margin-right:10px;margin-top:6px}.s-tag .tag-label[data-v-51409e77]{display:inline-block;height:100%;padding:0 10px;line-height:30px;width:198px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}.s-tag__close[data-v-51409e77]{position:relative;display:inline-block;border-radius:50%;text-align:center;cursor:pointer;font-size:16px;height:16px;width:16px;line-height:10px;vertical-align:middle;color:#a6aab8;top:-8px;right:20px}.s-tag.noborder[data-v-51409e77]{border:0}.s-tag--dark__close[data-v-51409e77]:hover{color:#fff;background-color:#66b1ff}.s-tag--dark--info .s-tag--dark__close[data-v-51409e77]{color:#fff}.s-tag--dark--info .s-tag--dark__close[data-v-51409e77]:hover{color:#fff;background-color:#a6a9ad}.s-tag--dark .s-tag--info[data-v-51409e77]{background-color:#909399;border-color:#909399;color:#fff}.s-tag--dark .s-tag--info.is-hit[data-v-51409e77]{border-color:#909399}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_query_tags_vue_vue_type_style_index_0_id_f553269e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_query_tags_vue_vue_type_style_index_0_id_f553269e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_query_tags_vue_vue_type_style_index_0_id_f553269e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_query_tags_vue_vue_type_style_index_0_id_f553269e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".query-tags[data-v-f553269e]{display:flex}.query-tags div.item[data-v-f553269e]{display:inline-block}.query-tags .tags[data-v-f553269e]{width:100%}.tag-operate[data-v-f553269e]{width:60px;height:30px;background:#a3b2f44d;border-radius:4px;color:#4865e9;font-size:16px;outline:none;border:0;cursor:pointer;margin-top:6px}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/query-tags/src/query-tags.vue?vue&type=template&id=f553269e&scoped=true&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "query-tags" }, [
    _c(
      "div",
      { staticClass: "item start" },
      [
        _c(
          "s-tag",
          { staticStyle: { width: "80px" }, attrs: { border: false } },
          [_vm._t("default")],
          2
        )
      ],
      1
    ),
    _c(
      "div",
      { ref: "tagHostRef", staticClass: "item tags" },
      _vm._l(_vm.tagList, function(item) {
        return _c(
          "s-tag",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !item.hide,
                expression: "!item.hide"
              }
            ],
            key: item.field,
            attrs: { closable: true, field: item.field },
            on: { close: _vm.handleRemove }
          },
          [
            _c(
              "el-tooltip",
              {
                attrs: {
                  placement: "top",
                  effect: "dark",
                  content: _vm.tooltipContent(item)
                }
              },
              [
                _c("span", [
                  _vm._v(
                    _vm._s(item.label) +
                      "：" +
                      _vm._s(_vm.formatValue(item.value))
                  )
                ])
              ]
            )
          ],
          1
        )
      }),
      1
    ),
    _c("div", { staticClass: "item end" }, [
      _vm.showToggleBtn
        ? _c("button", {
            staticClass: "tag-operate",
            domProps: { textContent: _vm._s(_vm.collapsed ? "展开" : "收起") },
            on: { click: _vm.handleToggle }
          })
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/query-tags/src/query-tags.vue?vue&type=template&id=f553269e&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/query-tags/src/tag.vue?vue&type=template&id=51409e77&scoped=true&
var tagvue_type_template_id_51409e77_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.disableTransitions
    ? _c("transition", { attrs: { name: "s-zoom-in-center" } }, [
        _c(
          "span",
          {
            class: _vm.classes,
            style: { backgroundColor: this.color },
            on: { click: _vm.handleClick }
          },
          [
            _c("span", { staticClass: "tag-label" }, [_vm._t("default")], 2),
            _vm.closable
              ? _c("i", {
                  staticClass: "s-tag__close el-icon-error",
                  on: { click: _vm.handleClose }
                })
              : _vm._e()
          ]
        )
      ])
    : _c(
        "span",
        {
          class: _vm.classes,
          style: { backgroundColor: this.color },
          on: { click: _vm.handleClick }
        },
        [
          _c("span", { staticClass: "tag-label" }, [_vm._t("default")], 2),
          _vm.closable
            ? _c("i", {
                staticClass: "s-tag__close el-icon-error",
                on: { click: _vm.handleClose }
              })
            : _vm._e()
        ]
      )
}
var tagvue_type_template_id_51409e77_scoped_true_staticRenderFns = []
tagvue_type_template_id_51409e77_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/query-tags/src/tag.vue?vue&type=template&id=51409e77&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/query-tags/src/tag.vue?vue&type=script&lang=js&
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
/* harmony default export */ var tagvue_type_script_lang_js_ = ({
  name: 'STag',
  props: {
    field: String,
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    color: String,
    size: {
      type: String,
      default: 'small'
    },
    effect: {
      type: String,
      default: 'light',

      validator(val) {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1;
      }

    }
  },

  data() {
    return {
      classes: ['s-tag', this.type ? `s-tag--${this.type}` : '', this.tagSize ? `s-tag--${this.tagSize}` : '', this.effect ? `s-tag--${this.effect}` : '', this.hit && 'is-hit', !this.border && 'noborder']
    };
  },

  computed: {
    tagSize() {
      return this.size;
    }

  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      this.$emit('close', this.field);
    },

    handleClick(event) {
      this.$emit('click', event);
    }

  }
});
// CONCATENATED MODULE: ./src/query-tags/src/tag.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tagvue_type_script_lang_js_ = (tagvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/query-tags/src/tag.vue?vue&type=style&index=0&id=51409e77&lang=scss&scoped=true&
var tagvue_type_style_index_0_id_51409e77_lang_scss_scoped_true_ = __webpack_require__(197);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/query-tags/src/tag.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_tagvue_type_script_lang_js_,
  tagvue_type_template_id_51409e77_scoped_true_render,
  tagvue_type_template_id_51409e77_scoped_true_staticRenderFns,
  false,
  null,
  "51409e77",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/query-tags/src/tag.vue"
/* harmony default export */ var tag = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/query-tags/src/query-tags.vue?vue&type=script&lang=js&
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

/* harmony default export */ var query_tagsvue_type_script_lang_js_ = ({
  name: 'SQueryTags',
  components: {
    STag: tag
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    collapse: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      tagWidth: 200,
      // 每个tag宽度（样式写死）
      countOneRow: 4,
      collapsed: true,
      tagList: []
    };
  },

  watch: {
    data() {
      this.renderTag(true, true);
    }

  },
  computed: {
    isCollapse() {
      return this.tagList.some(item => item.hide);
    },

    showToggleBtn() {
      return this.tagList.length > this.countOneRow;
    }

  },

  created() {},

  mounted() {
    this.renderTag(true, true);
    window.addEventListener('resize', this.renderTag);
  },

  methods: {
    tooltipContent(item) {
      return `${item.label}：${this.formatValue(item.value)}`;
    },

    formatDate(date, seperator = '/') {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return [year, month, day].map(n => {
        const m = n.toString();
        return m[1] ? m : '0' + m;
      }).join(seperator);
    },

    formatValue(val) {
      if (Array.isArray(val)) {
        if (val[0] instanceof Date || val[0].format) {
          return val.map(d => this.formatDate(d)).join(',');
        }

        return val.join(',');
      } else if (val === 'ASC' || val === 'DESC') {
        return val === 'ASC' ? '升序' : '降序';
      } else if (typeof val === 'boolean') {
        return val ? '是' : '否';
      }

      return val;
    },

    handleToggle() {
      this.collapsed = !this.collapsed;
      this.renderTag(this.collapsed);

      if (this.showToggleBtn) {
        this.$emit('toggleChange', this.collapsed);
      }
    },

    handleRemove(field) {
      if (field) {
        for (let i = 0; i < this.tagList.length; i++) {
          const item = this.tagList[i];

          if (item.field === field) {
            this.tagList.splice(i, 1); // this.renderTag()

            this.checkCollapse();
            this.$emit('change', {
              item,
              collapsed: this.collapsed
            });
            return;
          }
        }
      }
    },

    renderTag(hide = true, first = false) {
      const data = first ? this.data : this.tagList;
      const tagRect = this.$refs.tagHostRef.getBoundingClientRect();
      const count = Math.floor(tagRect.width / this.tagWidth);
      this.countOneRow = Math.floor((tagRect.width - count * 10) / this.tagWidth);
      const newData = data.map((item, index) => {
        item.hide = false;

        if (index >= this.countOneRow && this.collapsed) {
          item.hide = hide;
        }

        return item;
      });
      this.tagList = newData;
      this.checkCollapse();
    },

    checkCollapse() {
      this.collapsed = this.tagList.some(item => item.hide);
    }

  },

  beforeDestroy() {
    window.removeEventListener('resize', this.renderTag);
  }

});
// CONCATENATED MODULE: ./src/query-tags/src/query-tags.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_query_tagsvue_type_script_lang_js_ = (query_tagsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/query-tags/src/query-tags.vue?vue&type=style&index=0&id=f553269e&lang=scss&scoped=true&
var query_tagsvue_type_style_index_0_id_f553269e_lang_scss_scoped_true_ = __webpack_require__(199);

// CONCATENATED MODULE: ./src/query-tags/src/query-tags.vue






/* normalize component */

var query_tags_component = Object(componentNormalizer["a" /* default */])(
  src_query_tagsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "f553269e",
  null
  
)

/* hot reload */
if (false) { var query_tags_api; }
query_tags_component.options.__file = "src/query-tags/src/query-tags.vue"
/* harmony default export */ var query_tags = (query_tags_component.exports);
// CONCATENATED MODULE: ./src/query-tags/index.js

/* istanbul ignore next */

query_tags.install = function (Vue) {
  Vue.component(query_tags.name, query_tags);
};

/* harmony default export */ var src_query_tags = __webpack_exports__["default"] = (query_tags);

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
            var content = __webpack_require__(198);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(3);
            var content = __webpack_require__(200);

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