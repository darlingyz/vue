/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
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
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(22)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _fetchJsonp2 = __webpack_require__(31);

var _fetchJsonp3 = _interopRequireDefault(_fetchJsonp2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	zeptoAjax: function zeptoAjax(obj, callback) {
		$.ajax({
			type: "get",
			url: obj.url,
			data: obj.data,
			dataType: obj.dataType,
			success: function success(data) {
				callback(data);
			}
		});
	},
	fetch: function (_fetch) {
		function fetch(_x, _x2, _x3) {
			return _fetch.apply(this, arguments);
		}

		fetch.toString = function () {
			return _fetch.toString();
		};

		return fetch;
	}(function (url, successCallback, failCallBack) {
		fetch(url).then(function (response) {
			return response.json();
		}).then(function (data) {
			//成功的回调
			successCallback(data);
		}).catch(function (e) {
			//失败
			failCallBack(e);
		});
	}),
	fetchJsonp: function fetchJsonp(url, successCallback, failCallBack) {
		(0, _fetchJsonp3.default)(url).then(function (response) {
			return response.json();
		}).then(function (data) {
			//成功的回调
			successCallback(data);
		}).catch(function (e) {
			//失败
			failCallBack(e);
		});
	},
	vueJson: function vueJson(url, successCallback, failCallBack) {
		_vue2.default.http.get(url).then(function (response) {
			successCallback(response.body);
		}, function (err) {
			failCallBack(err);
		});
	},
	vueJsonp: function vueJsonp(url, successCallback, failCallBack) {
		_vue2.default.http.jsonp(url).then(function (response) {
			successCallback(response.body);
		}, function (err) {
			failCallBack(err);
		});
	},
	vueJsonpOpt: function vueJsonpOpt(url, opt, successCallback, failCallBack) {
		_vue2.default.http.jsonp(url, opt).then(function (response) {
			successCallback(response.body);
		}, function (err) {
			failCallBack(err);
		});
	}
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(17);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Vue.js v2.4.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Vue = factory();
})(undefined, function () {
  'use strict';

  /*  */

  // these helpers produces better vm code in JS engines due to their
  // explicitness and function inlining

  function isUndef(v) {
    return v === undefined || v === null;
  }

  function isDef(v) {
    return v !== undefined && v !== null;
  }

  function isTrue(v) {
    return v === true;
  }

  function isFalse(v) {
    return v === false;
  }

  /**
   * Check if value is primitive
   */
  function isPrimitive(value) {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
  }

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  }

  var _toString = Object.prototype.toString;

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
  }

  function isRegExp(v) {
    return _toString.call(v) === '[object RegExp]';
  }

  /**
   * Check if val is a valid array index.
   */
  function isValidArrayIndex(val) {
    var n = parseFloat(val);
    return n >= 0 && Math.floor(n) === n && isFinite(val);
  }

  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString(val) {
    return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
  }

  /**
   * Convert a input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
  }

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? function (val) {
      return map[val.toLowerCase()];
    } : function (val) {
      return map[val];
    };
  }

  /**
   * Check if a tag is a built-in tag.
   */
  var isBuiltInTag = makeMap('slot,component', true);

  /**
   * Check if a attribute is a reserved attribute.
   */
  var isReservedAttribute = makeMap('key,ref,slot,is');

  /**
   * Remove an item from an array
   */
  function remove(arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1);
      }
    }
  }

  /**
   * Check whether the object has the property.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }

  /**
   * Create a cached version of a pure function.
   */
  function cached(fn) {
    var cache = Object.create(null);
    return function cachedFn(str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  }

  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) {
      return c ? c.toUpperCase() : '';
    });
  });

  /**
   * Capitalize a string.
   */
  var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /([^-])([A-Z])/g;
  var hyphenate = cached(function (str) {
    return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
  });

  /**
   * Simple bind, faster than native
   */
  function bind(fn, ctx) {
    function boundFn(a) {
      var l = arguments.length;
      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    }
    // record original fn length
    boundFn._length = fn.length;
    return boundFn;
  }

  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret;
  }

  /**
   * Mix properties into target object.
   */
  function extend(to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to;
  }

  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res;
  }

  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
   */
  function noop(a, b, c) {}

  /**
   * Always return false.
   */
  var no = function no(a, b, c) {
    return false;
  };

  /**
   * Return same value
   */
  var identity = function identity(_) {
    return _;
  };

  /**
   * Generate a static keys string from compiler modules.
   */
  function genStaticKeys(modules) {
    return modules.reduce(function (keys, m) {
      return keys.concat(m.staticKeys || []);
    }, []).join(',');
  }

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual(a, b) {
    if (a === b) {
      return true;
    }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function (e, i) {
            return looseEqual(e, b[i]);
          });
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function (key) {
            return looseEqual(a[key], b[key]);
          });
        } else {
          /* istanbul ignore next */
          return false;
        }
      } catch (e) {
        /* istanbul ignore next */
        return false;
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b);
    } else {
      return false;
    }
  }

  function looseIndexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Ensure a function is called only once.
   */
  function once(fn) {
    var called = false;
    return function () {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    };
  }

  var SSR_ATTR = 'data-server-rendered';

  var ASSET_TYPES = ['component', 'directive', 'filter'];

  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated'];

  /*  */

  var config = {
    /**
     * Option merge strategies (used in core/util/options)
     */
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: "development" !== 'production',

    /**
     * Whether to enable devtools
     */
    devtools: "development" !== 'production',

    /**
     * Whether to record perf
     */
    performance: false,

    /**
     * Error handler for watcher errors
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     */
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,

    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,

    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,

    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,

    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,

    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS
  };

  /*  */

  var emptyObject = Object.freeze({});

  /**
   * Check if a string starts with $ or _
   */
  function isReserved(str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F;
  }

  /**
   * Define a property.
   */
  function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }

  /**
   * Parse simple path.
   */
  var bailRE = /[^\w.$]/;
  function parsePath(path) {
    if (bailRE.test(path)) {
      return;
    }
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) {
          return;
        }
        obj = obj[segments[i]];
      }
      return obj;
    };
  }

  /*  */

  var warn = noop;
  var tip = noop;
  var formatComponentName = null; // work around flow check

  {
    var hasConsole = typeof console !== 'undefined';
    var classifyRE = /(?:^|[-_])(\w)/g;
    var classify = function classify(str) {
      return str.replace(classifyRE, function (c) {
        return c.toUpperCase();
      }).replace(/[-_]/g, '');
    };

    warn = function warn(msg, vm) {
      var trace = vm ? generateComponentTrace(vm) : '';

      if (config.warnHandler) {
        config.warnHandler.call(null, msg, vm, trace);
      } else if (hasConsole && !config.silent) {
        console.error("[Vue warn]: " + msg + trace);
      }
    };

    tip = function tip(msg, vm) {
      if (hasConsole && !config.silent) {
        console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
      }
    };

    formatComponentName = function formatComponentName(vm, includeFile) {
      if (vm.$root === vm) {
        return '<Root>';
      }
      var name = typeof vm === 'string' ? vm : typeof vm === 'function' && vm.options ? vm.options.name : vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;

      var file = vm._isVue && vm.$options.__file;
      if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
      }

      return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
    };

    var repeat = function repeat(str, n) {
      var res = '';
      while (n) {
        if (n % 2 === 1) {
          res += str;
        }
        if (n > 1) {
          str += str;
        }
        n >>= 1;
      }
      return res;
    };

    var generateComponentTrace = function generateComponentTrace(vm) {
      if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
          if (tree.length > 0) {
            var last = tree[tree.length - 1];
            if (last.constructor === vm.constructor) {
              currentRecursiveSequence++;
              vm = vm.$parent;
              continue;
            } else if (currentRecursiveSequence > 0) {
              tree[tree.length - 1] = [last, currentRecursiveSequence];
              currentRecursiveSequence = 0;
            }
          }
          tree.push(vm);
          vm = vm.$parent;
        }
        return '\n\nfound in\n\n' + tree.map(function (vm, i) {
          return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
        }).join('\n');
      } else {
        return "\n\n(found in " + formatComponentName(vm) + ")";
      }
    };
  }

  /*  */

  function handleError(err, vm, info) {
    if (config.errorHandler) {
      config.errorHandler.call(null, err, vm, info);
    } else {
      {
        warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
      }
      /* istanbul ignore else */
      if (inBrowser && typeof console !== 'undefined') {
        console.error(err);
      } else {
        throw err;
      }
    }
  }

  /*  */
  /* globals MutationObserver */

  // can we use __proto__?
  var hasProto = '__proto__' in {};

  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = UA && UA.indexOf('android') > 0;
  var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

  // Firefix has a "watch" function on Object.prototype...
  var nativeWatch = {}.watch;

  var supportsPassive = false;
  if (inBrowser) {
    try {
      var opts = {};
      Object.defineProperty(opts, 'passive', {
        get: function get() {
          /* istanbul ignore next */
          supportsPassive = true;
        }
      }); // https://github.com/facebook/flow/issues/285
      window.addEventListener('test-passive', null, opts);
    } catch (e) {}
  }

  // this needs to be lazy-evaled because vue may be required before
  // vue-server-renderer can set VUE_ENV
  var _isServer;
  var isServerRendering = function isServerRendering() {
    if (_isServer === undefined) {
      /* istanbul ignore if */
      if (!inBrowser && typeof global !== 'undefined') {
        // detect presence of vue-server-renderer and avoid
        // Webpack shimming the process
        _isServer = global['process'].env.VUE_ENV === 'server';
      } else {
        _isServer = false;
      }
    }
    return _isServer;
  };

  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  /* istanbul ignore next */
  function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
  }

  var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

  /**
   * Defer a task to execute it asynchronously.
   */
  var nextTick = function () {
    var callbacks = [];
    var pending = false;
    var timerFunc;

    function nextTickHandler() {
      pending = false;
      var copies = callbacks.slice(0);
      callbacks.length = 0;
      for (var i = 0; i < copies.length; i++) {
        copies[i]();
      }
    }

    // the nextTick behavior leverages the microtask queue, which can be accessed
    // via either native Promise.then or MutationObserver.
    // MutationObserver has wider support, however it is seriously bugged in
    // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
    // completely stops working after triggering a few times... so, if native
    // Promise is available, we will use it:
    /* istanbul ignore if */
    if (typeof Promise !== 'undefined' && isNative(Promise)) {
      var p = Promise.resolve();
      var logError = function logError(err) {
        console.error(err);
      };
      timerFunc = function timerFunc() {
        p.then(nextTickHandler).catch(logError);
        // in problematic UIWebViews, Promise.then doesn't completely break, but
        // it can get stuck in a weird state where callbacks are pushed into the
        // microtask queue but the queue isn't being flushed, until the browser
        // needs to do some other work, e.g. handle a timer. Therefore we can
        // "force" the microtask queue to be flushed by adding an empty timer.
        if (isIOS) {
          setTimeout(noop);
        }
      };
    } else if (typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]')) {
      // use MutationObserver where native Promise is not available,
      // e.g. PhantomJS IE11, iOS7, Android 4.4
      var counter = 1;
      var observer = new MutationObserver(nextTickHandler);
      var textNode = document.createTextNode(String(counter));
      observer.observe(textNode, {
        characterData: true
      });
      timerFunc = function timerFunc() {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
      };
    } else {
      // fallback to setTimeout
      /* istanbul ignore next */
      timerFunc = function timerFunc() {
        setTimeout(nextTickHandler, 0);
      };
    }

    return function queueNextTick(cb, ctx) {
      var _resolve;
      callbacks.push(function () {
        if (cb) {
          try {
            cb.call(ctx);
          } catch (e) {
            handleError(e, ctx, 'nextTick');
          }
        } else if (_resolve) {
          _resolve(ctx);
        }
      });
      if (!pending) {
        pending = true;
        timerFunc();
      }
      if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve, reject) {
          _resolve = resolve;
        });
      }
    };
  }();

  var _Set;
  /* istanbul ignore if */
  if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
  } else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = function () {
      function Set() {
        this.set = Object.create(null);
      }
      Set.prototype.has = function has(key) {
        return this.set[key] === true;
      };
      Set.prototype.add = function add(key) {
        this.set[key] = true;
      };
      Set.prototype.clear = function clear() {
        this.set = Object.create(null);
      };

      return Set;
    }();
  }

  /*  */

  var uid = 0;

  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   */
  var Dep = function Dep() {
    this.id = uid++;
    this.subs = [];
  };

  Dep.prototype.addSub = function addSub(sub) {
    this.subs.push(sub);
  };

  Dep.prototype.removeSub = function removeSub(sub) {
    remove(this.subs, sub);
  };

  Dep.prototype.depend = function depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  };

  Dep.prototype.notify = function notify() {
    // stabilize the subscriber list first
    var subs = this.subs.slice();
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };

  // the current target watcher being evaluated.
  // this is globally unique because there could be only one
  // watcher being evaluated at any time.
  Dep.target = null;
  var targetStack = [];

  function pushTarget(_target) {
    if (Dep.target) {
      targetStack.push(Dep.target);
    }
    Dep.target = _target;
  }

  function popTarget() {
    Dep.target = targetStack.pop();
  }

  /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */

  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
      var args = [],
          len = arguments.length;
      while (len--) {
        args[len] = arguments[len];
      }var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2);
          break;
      }
      if (inserted) {
        ob.observeArray(inserted);
      }
      // notify change
      ob.dep.notify();
      return result;
    });
  });

  /*  */

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

  /**
   * By default, when a reactive property is set, the new value is
   * also converted to become reactive. However when passing down props,
   * we don't want to force conversion because the value may be a nested value
   * under a frozen data structure. Converting it would defeat the optimization.
   */
  var observerState = {
    shouldConvert: true
  };

  /**
   * Observer class that are attached to each observed
   * object. Once attached, the observer converts target
   * object's property keys into getter/setters that
   * collect dependencies and dispatches updates.
   */
  var Observer = function Observer(value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      var augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  Observer.prototype.walk = function walk(obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i], obj[keys[i]]);
    }
  };

  /**
   * Observe a list of Array items.
   */
  Observer.prototype.observeArray = function observeArray(items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };

  // helpers

  /**
   * Augment an target Object or Array by intercepting
   * the prototype chain using __proto__
   */
  function protoAugment(target, src, keys) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
  }

  /**
   * Augment an target Object or Array by defining
   * hidden properties.
   */
  /* istanbul ignore next */
  function copyAugment(target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      def(target, key, src[key]);
    }
  }

  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe(value, asRootData) {
    if (!isObject(value)) {
      return;
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (observerState.shouldConvert && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob;
  }

  /**
   * Define a reactive property on an Object.
   */
  function defineReactive$$1(obj, key, val, customSetter, shallow) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return;
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;

    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
          }
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
        return value;
      },
      set: function reactiveSetter(newVal) {
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || newVal !== newVal && value !== value) {
          return;
        }
        /* eslint-enable no-self-compare */
        if ("development" !== 'production' && customSetter) {
          customSetter();
        }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
  }

  /**
   * Set a property on an object. Adds the new property and
   * triggers change notification if the property doesn't
   * already exist.
   */
  function set(target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    if (hasOwn(target, key)) {
      target[key] = val;
      return val;
    }
    var ob = target.__ob__;
    if (target._isVue || ob && ob.vmCount) {
      "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
      return val;
    }
    if (!ob) {
      target[key] = val;
      return val;
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val;
  }

  /**
   * Delete a property and trigger change if necessary.
   */
  function del(target, key) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key, 1);
      return;
    }
    var ob = target.__ob__;
    if (target._isVue || ob && ob.vmCount) {
      "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
      return;
    }
    if (!hasOwn(target, key)) {
      return;
    }
    delete target[key];
    if (!ob) {
      return;
    }
    ob.dep.notify();
  }

  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray(value) {
    for (var e = void 0, i = 0, l = value.length; i < l; i++) {
      e = value[i];
      e && e.__ob__ && e.__ob__.dep.depend();
      if (Array.isArray(e)) {
        dependArray(e);
      }
    }
  }

  /*  */

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;

  /**
   * Options with restrictions
   */
  {
    strats.el = strats.propsData = function (parent, child, vm, key) {
      if (!vm) {
        warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
      }
      return defaultStrat(parent, child);
    };
  }

  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData(to, from) {
    if (!from) {
      return to;
    }
    var key, toVal, fromVal;
    var keys = Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
        mergeData(toVal, fromVal);
      }
    }
    return to;
  }

  /**
   * Data
   */
  function mergeDataOrFn(parentVal, childVal, vm) {
    if (!vm) {
      // in a Vue.extend merge, both should be functions
      if (!childVal) {
        return parentVal;
      }
      if (!parentVal) {
        return childVal;
      }
      // when parentVal & childVal are both present,
      // we need to return a function that returns the
      // merged result of both functions... no need to
      // check if parentVal is a function here because
      // it has to be a function to pass previous merges.
      return function mergedDataFn() {
        return mergeData(typeof childVal === 'function' ? childVal.call(this) : childVal, typeof parentVal === 'function' ? parentVal.call(this) : parentVal);
      };
    } else if (parentVal || childVal) {
      return function mergedInstanceDataFn() {
        // instance merge
        var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
        var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
        if (instanceData) {
          return mergeData(instanceData, defaultData);
        } else {
          return defaultData;
        }
      };
    }
  }

  strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
      if (childVal && typeof childVal !== 'function') {
        "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);

        return parentVal;
      }
      return mergeDataOrFn.call(this, parentVal, childVal);
    }

    return mergeDataOrFn(parentVal, childVal, vm);
  };

  /**
   * Hooks and props are merged as arrays.
   */
  function mergeHook(parentVal, childVal) {
    return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */
  function mergeAssets(parentVal, childVal) {
    var res = Object.create(parentVal || null);
    return childVal ? extend(res, childVal) : res;
  }

  ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
  });

  /**
   * Watchers.
   *
   * Watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */
  strats.watch = function (parentVal, childVal) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) {
      parentVal = undefined;
    }
    if (childVal === nativeWatch) {
      childVal = undefined;
    }
    /* istanbul ignore if */
    if (!childVal) {
      return Object.create(parentVal || null);
    }
    if (!parentVal) {
      return childVal;
    }
    var ret = {};
    extend(ret, parentVal);
    for (var key in childVal) {
      var parent = ret[key];
      var child = childVal[key];
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      ret[key] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
    }
    return ret;
  };

  /**
   * Other object hashes.
   */
  strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal) {
    if (!parentVal) {
      return childVal;
    }
    var ret = Object.create(null);
    extend(ret, parentVal);
    if (childVal) {
      extend(ret, childVal);
    }
    return ret;
  };
  strats.provide = mergeDataOrFn;

  /**
   * Default strategy.
   */
  var defaultStrat = function defaultStrat(parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
  };

  /**
   * Validate component names
   */
  function checkComponents(options) {
    for (var key in options.components) {
      var lower = key.toLowerCase();
      if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
        warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
      }
    }
  }

  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps(options) {
    var props = options.props;
    if (!props) {
      return;
    }
    var res = {};
    var i, val, name;
    if (Array.isArray(props)) {
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          name = camelize(val);
          res[name] = { type: null };
        } else {
          warn('props must be strings when using array syntax.');
        }
      }
    } else if (isPlainObject(props)) {
      for (var key in props) {
        val = props[key];
        name = camelize(key);
        res[name] = isPlainObject(val) ? val : { type: val };
      }
    }
    options.props = res;
  }

  /**
   * Normalize all injections into Object-based format
   */
  function normalizeInject(options) {
    var inject = options.inject;
    if (Array.isArray(inject)) {
      var normalized = options.inject = {};
      for (var i = 0; i < inject.length; i++) {
        normalized[inject[i]] = inject[i];
      }
    }
  }

  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives(options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def = dirs[key];
        if (typeof def === 'function') {
          dirs[key] = { bind: def, update: def };
        }
      }
    }
  }

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  function mergeOptions(parent, child, vm) {
    {
      checkComponents(child);
    }

    if (typeof child === 'function') {
      child = child.options;
    }

    normalizeProps(child);
    normalizeInject(child);
    normalizeDirectives(child);
    var extendsFrom = child.extends;
    if (extendsFrom) {
      parent = mergeOptions(parent, extendsFrom, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField(key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options;
  }

  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset(options, type, id, warnMissing) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return;
    }
    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) {
      return assets[id];
    }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) {
      return assets[camelizedId];
    }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) {
      return assets[PascalCaseId];
    }
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if ("development" !== 'production' && warnMissing && !res) {
      warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
    }
    return res;
  }

  /*  */

  function validateProp(key, propOptions, propsData, vm) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    // handle boolean props
    if (isType(Boolean, prop.type)) {
      if (absent && !hasOwn(prop, 'default')) {
        value = false;
      } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
        value = true;
      }
    }
    // check default value
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop, key);
      // since the default value is a fresh copy,
      // make sure to observe it.
      var prevShouldConvert = observerState.shouldConvert;
      observerState.shouldConvert = true;
      observe(value);
      observerState.shouldConvert = prevShouldConvert;
    }
    {
      assertProp(prop, key, value, vm, absent);
    }
    return value;
  }

  /**
   * Get the default value of a prop.
   */
  function getPropDefaultValue(vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
      return undefined;
    }
    var def = prop.default;
    // warn against non-factory defaults for Object & Array
    if ("development" !== 'production' && isObject(def)) {
      warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
    }
    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
      return vm._props[key];
    }
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
  }

  /**
   * Assert whether a prop is valid.
   */
  function assertProp(prop, name, value, vm, absent) {
    if (prop.required && absent) {
      warn('Missing required prop: "' + name + '"', vm);
      return;
    }
    if (value == null && !prop.required) {
      return;
    }
    var type = prop.type;
    var valid = !type || type === true;
    var expectedTypes = [];
    if (type) {
      if (!Array.isArray(type)) {
        type = [type];
      }
      for (var i = 0; i < type.length && !valid; i++) {
        var assertedType = assertType(value, type[i]);
        expectedTypes.push(assertedType.expectedType || '');
        valid = assertedType.valid;
      }
    }
    if (!valid) {
      warn('Invalid prop: type check failed for prop "' + name + '".' + ' Expected ' + expectedTypes.map(capitalize).join(', ') + ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.', vm);
      return;
    }
    var validator = prop.validator;
    if (validator) {
      if (!validator(value)) {
        warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
      }
    }
  }

  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

  function assertType(value, type) {
    var valid;
    var expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
      valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === expectedType.toLowerCase();
    } else if (expectedType === 'Object') {
      valid = isPlainObject(value);
    } else if (expectedType === 'Array') {
      valid = Array.isArray(value);
    } else {
      valid = value instanceof type;
    }
    return {
      valid: valid,
      expectedType: expectedType
    };
  }

  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
   */
  function getType(fn) {
    var match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : '';
  }

  function isType(type, fn) {
    if (!Array.isArray(fn)) {
      return getType(fn) === getType(type);
    }
    for (var i = 0, len = fn.length; i < len; i++) {
      if (getType(fn[i]) === getType(type)) {
        return true;
      }
    }
    /* istanbul ignore next */
    return false;
  }

  /*  */

  var mark;
  var measure;

  {
    var perf = inBrowser && window.performance;
    /* istanbul ignore if */
    if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
      mark = function mark(tag) {
        return perf.mark(tag);
      };
      measure = function measure(name, startTag, endTag) {
        perf.measure(name, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
        perf.clearMeasures(name);
      };
    }
  }

  /* not type checking this file because flow doesn't play well with Proxy */

  var initProxy;

  {
    var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
    );

    var warnNonPresent = function warnNonPresent(target, key) {
      warn("Property or method \"" + key + "\" is not defined on the instance but " + "referenced during render. Make sure to declare reactive data " + "properties in the data option.", target);
    };

    var hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

    if (hasProxy) {
      var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
      config.keyCodes = new Proxy(config.keyCodes, {
        set: function set(target, key, value) {
          if (isBuiltInModifier(key)) {
            warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
            return false;
          } else {
            target[key] = value;
            return true;
          }
        }
      });
    }

    var hasHandler = {
      has: function has(target, key) {
        var has = key in target;
        var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
        if (!has && !isAllowed) {
          warnNonPresent(target, key);
        }
        return has || !isAllowed;
      }
    };

    var getHandler = {
      get: function get(target, key) {
        if (typeof key === 'string' && !(key in target)) {
          warnNonPresent(target, key);
        }
        return target[key];
      }
    };

    initProxy = function initProxy(vm) {
      if (hasProxy) {
        // determine which proxy handler to use
        var options = vm.$options;
        var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
        vm._renderProxy = new Proxy(vm, handlers);
      } else {
        vm._renderProxy = vm;
      }
    };
  }

  /*  */

  var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.functionalContext = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  };

  var prototypeAccessors = { child: {} };

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  prototypeAccessors.child.get = function () {
    return this.componentInstance;
  };

  Object.defineProperties(VNode.prototype, prototypeAccessors);

  var createEmptyVNode = function createEmptyVNode(text) {
    if (text === void 0) text = '';

    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node;
  };

  function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val));
  }

  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  function cloneVNode(vnode) {
    var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.isCloned = true;
    return cloned;
  }

  function cloneVNodes(vnodes) {
    var len = vnodes.length;
    var res = new Array(len);
    for (var i = 0; i < len; i++) {
      res[i] = cloneVNode(vnodes[i]);
    }
    return res;
  }

  /*  */

  var normalizeEvent = cached(function (name) {
    var passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once$$1 ? name.slice(1) : name;
    var capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
      name: name,
      once: once$$1,
      capture: capture,
      passive: passive
    };
  });

  function createFnInvoker(fns) {
    function invoker() {
      var arguments$1 = arguments;

      var fns = invoker.fns;
      if (Array.isArray(fns)) {
        var cloned = fns.slice();
        for (var i = 0; i < cloned.length; i++) {
          cloned[i].apply(null, arguments$1);
        }
      } else {
        // return handler return value for single handlers
        return fns.apply(null, arguments);
      }
    }
    invoker.fns = fns;
    return invoker;
  }

  function updateListeners(on, oldOn, add, remove$$1, vm) {
    var name, cur, old, event;
    for (name in on) {
      cur = on[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (isUndef(cur)) {
        "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
      } else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on[name] = createFnInvoker(cur);
        }
        add(event.name, cur, event.once, event.capture, event.passive);
      } else if (cur !== old) {
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name);
        remove$$1(event.name, oldOn[name], event.capture);
      }
    }
  }

  /*  */

  function mergeVNodeHook(def, hookKey, hook) {
    var invoker;
    var oldHook = def[hookKey];

    function wrappedHook() {
      hook.apply(this, arguments);
      // important: remove merged hook to ensure it's called only once
      // and prevent memory leak
      remove(invoker.fns, wrappedHook);
    }

    if (isUndef(oldHook)) {
      // no existing hook
      invoker = createFnInvoker([wrappedHook]);
    } else {
      /* istanbul ignore if */
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        // already a merged invoker
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        // existing plain hook
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }

    invoker.merged = true;
    def[hookKey] = invoker;
  }

  /*  */

  function extractPropsFromVNodeData(data, Ctor, tag) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
      return;
    }
    var res = {};
    var attrs = data.attrs;
    var props = data.props;
    if (isDef(attrs) || isDef(props)) {
      for (var key in propOptions) {
        var altKey = hyphenate(key);
        {
          var keyInLowerCase = key.toLowerCase();
          if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
            tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
          }
        }
        checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
      }
    }
    return res;
  }

  function checkProp(res, hash, key, altKey, preserve) {
    if (isDef(hash)) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key];
        if (!preserve) {
          delete hash[key];
        }
        return true;
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey];
        if (!preserve) {
          delete hash[altKey];
        }
        return true;
      }
    }
    return false;
  }

  /*  */

  // The template compiler attempts to minimize the need for normalization by
  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:

  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.
  function simpleNormalizeChildren(children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children);
      }
    }
    return children;
  }

  // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.
  function normalizeChildren(children) {
    return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
  }

  function isTextNode(node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment);
  }

  function normalizeArrayChildren(children, nestedIndex) {
    var res = [];
    var i, c, last;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === 'boolean') {
        continue;
      }
      last = res[res.length - 1];
      //  nested
      if (Array.isArray(c)) {
        res.push.apply(res, normalizeArrayChildren(c, (nestedIndex || '') + "_" + i));
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          // merge adjacent text nodes
          // this is necessary for SSR hydration because text nodes are
          // essentially merged when rendered to HTML strings
          last.text += String(c);
        } else if (c !== '') {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          // merge adjacent text nodes
          res[res.length - 1] = createTextVNode(last.text + c.text);
        } else {
          // default key for nested array children (likely generated by v-for)
          if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
            c.key = "__vlist" + nestedIndex + "_" + i + "__";
          }
          res.push(c);
        }
      }
    }
    return res;
  }

  /*  */

  function ensureCtor(comp, base) {
    if (comp.__esModule && comp.default) {
      comp = comp.default;
    }
    return isObject(comp) ? base.extend(comp) : comp;
  }

  function createAsyncPlaceholder(factory, data, context, children, tag) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data: data, context: context, children: children, tag: tag };
    return node;
  }

  function resolveAsyncComponent(factory, baseCtor, context) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
      return factory.errorComp;
    }

    if (isDef(factory.resolved)) {
      return factory.resolved;
    }

    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
      return factory.loadingComp;
    }

    if (isDef(factory.contexts)) {
      // already pending
      factory.contexts.push(context);
    } else {
      var contexts = factory.contexts = [context];
      var sync = true;

      var forceRender = function forceRender() {
        for (var i = 0, l = contexts.length; i < l; i++) {
          contexts[i].$forceUpdate();
        }
      };

      var resolve = once(function (res) {
        // cache resolved
        factory.resolved = ensureCtor(res, baseCtor);
        // invoke callbacks only if this is not a synchronous resolve
        // (async resolves are shimmed as synchronous during SSR)
        if (!sync) {
          forceRender();
        }
      });

      var reject = once(function (reason) {
        "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
        if (isDef(factory.errorComp)) {
          factory.error = true;
          forceRender();
        }
      });

      var res = factory(resolve, reject);

      if (isObject(res)) {
        if (typeof res.then === 'function') {
          // () => Promise
          if (isUndef(factory.resolved)) {
            res.then(resolve, reject);
          }
        } else if (isDef(res.component) && typeof res.component.then === 'function') {
          res.component.then(resolve, reject);

          if (isDef(res.error)) {
            factory.errorComp = ensureCtor(res.error, baseCtor);
          }

          if (isDef(res.loading)) {
            factory.loadingComp = ensureCtor(res.loading, baseCtor);
            if (res.delay === 0) {
              factory.loading = true;
            } else {
              setTimeout(function () {
                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                  factory.loading = true;
                  forceRender();
                }
              }, res.delay || 200);
            }
          }

          if (isDef(res.timeout)) {
            setTimeout(function () {
              if (isUndef(factory.resolved)) {
                reject("timeout (" + res.timeout + "ms)");
              }
            }, res.timeout);
          }
        }
      }

      sync = false;
      // return in case resolved synchronously
      return factory.loading ? factory.loadingComp : factory.resolved;
    }
  }

  /*  */

  function getFirstComponentChild(children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && isDef(c.componentOptions)) {
          return c;
        }
      }
    }
  }

  /*  */

  /*  */

  function initEvents(vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }

  var target;

  function add(event, fn, once$$1) {
    if (once$$1) {
      target.$once(event, fn);
    } else {
      target.$on(event, fn);
    }
  }

  function remove$1(event, fn) {
    target.$off(event, fn);
  }

  function updateComponentListeners(vm, listeners, oldListeners) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  }

  function eventsMixin(Vue) {
    var hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
      var this$1 = this;

      var vm = this;
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          this$1.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm;
    };

    Vue.prototype.$once = function (event, fn) {
      var vm = this;
      function on() {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm;
    };

    Vue.prototype.$off = function (event, fn) {
      var this$1 = this;

      var vm = this;
      // all
      if (!arguments.length) {
        vm._events = Object.create(null);
        return vm;
      }
      // array of events
      if (Array.isArray(event)) {
        for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
          this$1.$off(event[i$1], fn);
        }
        return vm;
      }
      // specific event
      var cbs = vm._events[event];
      if (!cbs) {
        return vm;
      }
      if (arguments.length === 1) {
        vm._events[event] = null;
        return vm;
      }
      // specific handler
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
      return vm;
    };

    Vue.prototype.$emit = function (event) {
      var vm = this;
      {
        var lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
          tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
        }
      }
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        for (var i = 0, l = cbs.length; i < l; i++) {
          try {
            cbs[i].apply(vm, args);
          } catch (e) {
            handleError(e, vm, "event handler for \"" + event + "\"");
          }
        }
      }
      return vm;
    };
  }

  /*  */

  /**
   * Runtime helper for resolving raw children VNodes into a slot object.
   */
  function resolveSlots(children, context) {
    var slots = {};
    if (!children) {
      return slots;
    }
    var defaultSlot = [];
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      // named slots should only be respected if the vnode was rendered in the
      // same context.
      if ((child.context === context || child.functionalContext === context) && child.data && child.data.slot != null) {
        var name = child.data.slot;
        var slot = slots[name] || (slots[name] = []);
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children);
        } else {
          slot.push(child);
        }
      } else {
        defaultSlot.push(child);
      }
    }
    // ignore whitespace
    if (!defaultSlot.every(isWhitespace)) {
      slots.default = defaultSlot;
    }
    return slots;
  }

  function isWhitespace(node) {
    return node.isComment || node.text === ' ';
  }

  function resolveScopedSlots(fns, // see flow/vnode
  res) {
    res = res || {};
    for (var i = 0; i < fns.length; i++) {
      if (Array.isArray(fns[i])) {
        resolveScopedSlots(fns[i], res);
      } else {
        res[fns[i].key] = fns[i].fn;
      }
    }
    return res;
  }

  /*  */

  var activeInstance = null;
  var isUpdatingChildComponent = false;

  function initLifecycle(vm) {
    var options = vm.$options;

    // locate first non-abstract parent
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      var vm = this;
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate');
      }
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var prevActiveInstance = activeInstance;
      activeInstance = vm;
      vm._vnode = vnode;
      // Vue.prototype.__patch__ is injected in entry points
      // based on the rendering backend used.
      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
        , vm.$options._parentElm, vm.$options._refElm);
        // no need for the ref nodes after initial patch
        // this prevents keeping a detached DOM tree in memory (#5851)
        vm.$options._parentElm = vm.$options._refElm = null;
      } else {
        // updates
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      activeInstance = prevActiveInstance;
      // update __vue__ reference
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      // if parent is an HOC, update its $el as well
      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el;
      }
      // updated hook is called by the scheduler to ensure that children are
      // updated in a parent's updated hook.
    };

    Vue.prototype.$forceUpdate = function () {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };

    Vue.prototype.$destroy = function () {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return;
      }
      callHook(vm, 'beforeDestroy');
      vm._isBeingDestroyed = true;
      // remove self from parent
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm);
      }
      // teardown watchers
      if (vm._watcher) {
        vm._watcher.teardown();
      }
      var i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].teardown();
      }
      // remove reference from data ob
      // frozen object may not have observer.
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }
      // call the last hook...
      vm._isDestroyed = true;
      // invoke destroy hooks on current rendered tree
      vm.__patch__(vm._vnode, null);
      // fire destroyed hook
      callHook(vm, 'destroyed');
      // turn off all instance listeners.
      vm.$off();
      // remove __vue__ reference
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }
    };
  }

  function mountComponent(vm, el, hydrating) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      {
        /* istanbul ignore if */
        if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
          warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
        } else {
          warn('Failed to mount component: template or render function not defined.', vm);
        }
      }
    }
    callHook(vm, 'beforeMount');

    var updateComponent;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      updateComponent = function updateComponent() {
        var name = vm._name;
        var id = vm._uid;
        var startTag = "vue-perf-start:" + id;
        var endTag = "vue-perf-end:" + id;

        mark(startTag);
        var vnode = vm._render();
        mark(endTag);
        measure(name + " render", startTag, endTag);

        mark(startTag);
        vm._update(vnode, hydrating);
        mark(endTag);
        measure(name + " patch", startTag, endTag);
      };
    } else {
      updateComponent = function updateComponent() {
        vm._update(vm._render(), hydrating);
      };
    }

    vm._watcher = new Watcher(vm, updateComponent, noop);
    hydrating = false;

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm;
  }

  function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
    {
      isUpdatingChildComponent = true;
    }

    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren
    var hasChildren = !!(renderChildren || // has new static slots
    vm.$options._renderChildren || // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
    );

    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render

    if (vm._vnode) {
      // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;

    // update $attrs and $listensers hash
    // these are also reactive so they may trigger child update if the child
    // used them during render
    vm.$attrs = parentVnode.data && parentVnode.data.attrs;
    vm.$listeners = listeners;

    // update props
    if (propsData && vm.$options.props) {
      observerState.shouldConvert = false;
      var props = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        props[key] = validateProp(key, vm.$options.props, propsData, vm);
      }
      observerState.shouldConvert = true;
      // keep a copy of raw propsData
      vm.$options.propsData = propsData;
    }

    // update listeners
    if (listeners) {
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      updateComponentListeners(vm, listeners, oldListeners);
    }
    // resolve slots + force update if has children
    if (hasChildren) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }

    {
      isUpdatingChildComponent = false;
    }
  }

  function isInInactiveTree(vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive) {
        return true;
      }
    }
    return false;
  }

  function activateChildComponent(vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return;
      }
    } else if (vm._directInactive) {
      return;
    }
    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'activated');
    }
  }

  function deactivateChildComponent(vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return;
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'deactivated');
    }
  }

  function callHook(vm, hook) {
    var handlers = vm.$options[hook];
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        try {
          handlers[i].call(vm);
        } catch (e) {
          handleError(e, vm, hook + " hook");
        }
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
  }

  /*  */

  var MAX_UPDATE_COUNT = 100;

  var queue = [];
  var activatedChildren = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var flushing = false;
  var index = 0;

  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState() {
    index = queue.length = activatedChildren.length = 0;
    has = {};
    {
      circular = {};
    }
    waiting = flushing = false;
  }

  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue() {
    flushing = true;
    var watcher, id;

    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(function (a, b) {
      return a.id - b.id;
    });

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      id = watcher.id;
      has[id] = null;
      watcher.run();
      // in dev build, check and stop circular updates.
      if ("development" !== 'production' && has[id] != null) {
        circular[id] = (circular[id] || 0) + 1;
        if (circular[id] > MAX_UPDATE_COUNT) {
          warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
          break;
        }
      }
    }

    // keep copies of post queues before resetting state
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();

    resetSchedulerState();

    // call component updated and activated hooks
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);

    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
  }

  function callUpdatedHooks(queue) {
    var i = queue.length;
    while (i--) {
      var watcher = queue[i];
      var vm = watcher.vm;
      if (vm._watcher === watcher && vm._isMounted) {
        callHook(vm, 'updated');
      }
    }
  }

  /**
   * Queue a kept-alive component that was activated during patch.
   * The queue will be processed after the entire tree has been patched.
   */
  function queueActivatedComponent(vm) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false;
    activatedChildren.push(vm);
  }

  function callActivatedHooks(queue) {
    for (var i = 0; i < queue.length; i++) {
      queue[i]._inactive = true;
      activateChildComponent(queue[i], true /* true */);
    }
  }

  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher(watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) {
        queue.push(watcher);
      } else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        var i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id) {
          i--;
        }
        queue.splice(i + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
        waiting = true;
        nextTick(flushSchedulerQueue);
      }
    }
  }

  /*  */

  var uid$2 = 0;

  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   */
  var Watcher = function Watcher(vm, expOrFn, cb, options) {
    this.vm = vm;
    vm._watchers.push(this);
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$2; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = expOrFn.toString();
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = function () {};
        "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
      }
    }
    this.value = this.lazy ? undefined : this.get();
  };

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  Watcher.prototype.get = function get() {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
      } else {
        throw e;
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value;
  };

  /**
   * Add a dependency to this directive.
   */
  Watcher.prototype.addDep = function addDep(dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };

  /**
   * Clean up for dependency collection.
   */
  Watcher.prototype.cleanupDeps = function cleanupDeps() {
    var this$1 = this;

    var i = this.deps.length;
    while (i--) {
      var dep = this$1.deps[i];
      if (!this$1.newDepIds.has(dep.id)) {
        dep.removeSub(this$1);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  Watcher.prototype.update = function update() {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  Watcher.prototype.run = function run() {
    if (this.active) {
      var value = this.get();
      if (value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) || this.deep) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue);
          } catch (e) {
            handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
          }
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  Watcher.prototype.evaluate = function evaluate() {
    this.value = this.get();
    this.dirty = false;
  };

  /**
   * Depend on all deps collected by this watcher.
   */
  Watcher.prototype.depend = function depend() {
    var this$1 = this;

    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].depend();
    }
  };

  /**
   * Remove self from all dependencies' subscriber list.
   */
  Watcher.prototype.teardown = function teardown() {
    var this$1 = this;

    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this);
      }
      var i = this.deps.length;
      while (i--) {
        this$1.deps[i].removeSub(this$1);
      }
      this.active = false;
    }
  };

  /**
   * Recursively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   */
  var seenObjects = new _Set();
  function traverse(val) {
    seenObjects.clear();
    _traverse(val, seenObjects);
  }

  function _traverse(val, seen) {
    var i, keys;
    var isA = Array.isArray(val);
    if (!isA && !isObject(val) || !Object.isExtensible(val)) {
      return;
    }
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return;
      }
      seen.add(depId);
    }
    if (isA) {
      i = val.length;
      while (i--) {
        _traverse(val[i], seen);
      }
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) {
        _traverse(val[keys[i]], seen);
      }
    }
  }

  /*  */

  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };

  function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
      return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function initState(vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) {
      initProps(vm, opts.props);
    }
    if (opts.methods) {
      initMethods(vm, opts.methods);
    }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    if (opts.computed) {
      initComputed(vm, opts.computed);
    }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }

  function checkOptionType(vm, name) {
    var option = vm.$options[name];
    if (!isPlainObject(option)) {
      warn("component option \"" + name + "\" should be an object.", vm);
    }
  }

  function initProps(vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = vm._props = {};
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    // root instance props should be converted
    observerState.shouldConvert = isRoot;
    var loop = function loop(key) {
      keys.push(key);
      var value = validateProp(key, propsOptions, propsData, vm);
      /* istanbul ignore else */
      {
        if (isReservedAttribute(key) || config.isReservedAttr(key)) {
          warn("\"" + key + "\" is a reserved attribute and cannot be used as component prop.", vm);
        }
        defineReactive$$1(props, key, value, function () {
          if (vm.$parent && !isUpdatingChildComponent) {
            warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
          }
        });
      }
      // static props are already proxied on the component's prototype
      // during Vue.extend(). We only need to proxy props defined at
      // instantiation here.
      if (!(key in vm)) {
        proxy(vm, "_props", key);
      }
    };

    for (var key in propsOptions) {
      loop(key);
    }observerState.shouldConvert = true;
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
    if (!isPlainObject(data)) {
      data = {};
      "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      {
        if (methods && hasOwn(methods, key)) {
          warn("method \"" + key + "\" has already been defined as a data property.", vm);
        }
      }
      if (props && hasOwn(props, key)) {
        "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    // observe data
    observe(data, true /* asRootData */);
  }

  function getData(data, vm) {
    try {
      return data.call(vm);
    } catch (e) {
      handleError(e, vm, "data()");
      return {};
    }
  }

  var computedWatcherOptions = { lazy: true };

  function initComputed(vm, computed) {
    "development" !== 'production' && checkOptionType(vm, 'computed');
    var watchers = vm._computedWatchers = Object.create(null);

    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;
      if ("development" !== 'production' && getter == null) {
        warn("Getter is missing for computed property \"" + key + "\".", vm);
      }
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);

      // component-defined computed properties are already defined on the
      // component prototype. We only need to define computed properties defined
      // at instantiation here.
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      } else {
        if (key in vm.$data) {
          warn("The computed property \"" + key + "\" is already defined in data.", vm);
        } else if (vm.$options.props && key in vm.$options.props) {
          warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
        }
      }
    }
  }

  function defineComputed(target, key, userDef) {
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = createComputedGetter(key);
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get ? userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
      sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
    }
    if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
      sharedPropertyDefinition.set = function () {
        warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
      };
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function createComputedGetter(key) {
    return function computedGetter() {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value;
      }
    };
  }

  function initMethods(vm, methods) {
    "development" !== 'production' && checkOptionType(vm, 'methods');
    var props = vm.$options.props;
    for (var key in methods) {
      vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
      {
        if (methods[key] == null) {
          warn("method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
        }
        if (props && hasOwn(props, key)) {
          warn("method \"" + key + "\" has already been defined as a prop.", vm);
        }
      }
    }
  }

  function initWatch(vm, watch) {
    "development" !== 'production' && checkOptionType(vm, 'watch');
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }

  function createWatcher(vm, keyOrFn, handler, options) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    return vm.$watch(keyOrFn, handler, options);
  }

  function stateMixin(Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    dataDef.get = function () {
      return this._data;
    };
    var propsDef = {};
    propsDef.get = function () {
      return this._props;
    };
    {
      dataDef.set = function (newData) {
        warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
      };
      propsDef.set = function () {
        warn("$props is readonly.", this);
      };
    }
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function (expOrFn, cb, options) {
      var vm = this;
      if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options);
      }
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        cb.call(vm, watcher.value);
      }
      return function unwatchFn() {
        watcher.teardown();
      };
    };
  }

  /*  */

  function initProvide(vm) {
    var provide = vm.$options.provide;
    if (provide) {
      vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
    }
  }

  function initInjections(vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      observerState.shouldConvert = false;
      Object.keys(result).forEach(function (key) {
        /* istanbul ignore else */
        {
          defineReactive$$1(vm, key, result[key], function () {
            warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
          });
        }
      });
      observerState.shouldConvert = true;
    }
  }

  function resolveInject(inject, vm) {
    if (inject) {
      // inject is :any because flow is not smart enough to figure out cached
      var result = Object.create(null);
      var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var provideKey = inject[key];
        var source = vm;
        while (source) {
          if (source._provided && provideKey in source._provided) {
            result[key] = source._provided[provideKey];
            break;
          }
          source = source.$parent;
        }
        if ("development" !== 'production' && !source) {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
      return result;
    }
  }

  /*  */

  function createFunctionalComponent(Ctor, propsData, data, context, children) {
    var props = {};
    var propOptions = Ctor.options.props;
    if (isDef(propOptions)) {
      for (var key in propOptions) {
        props[key] = validateProp(key, propOptions, propsData || {});
      }
    } else {
      if (isDef(data.attrs)) {
        mergeProps(props, data.attrs);
      }
      if (isDef(data.props)) {
        mergeProps(props, data.props);
      }
    }
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    var _context = Object.create(context);
    var h = function h(a, b, c, d) {
      return createElement(_context, a, b, c, d, true);
    };
    var vnode = Ctor.options.render.call(null, h, {
      data: data,
      props: props,
      children: children,
      parent: context,
      listeners: data.on || {},
      injections: resolveInject(Ctor.options.inject, context),
      slots: function slots() {
        return resolveSlots(children, context);
      }
    });
    if (vnode instanceof VNode) {
      vnode.functionalContext = context;
      vnode.functionalOptions = Ctor.options;
      if (data.slot) {
        (vnode.data || (vnode.data = {})).slot = data.slot;
      }
    }
    return vnode;
  }

  function mergeProps(to, from) {
    for (var key in from) {
      to[camelize(key)] = from[key];
    }
  }

  /*  */

  // hooks to be invoked on component VNodes during patch
  var componentVNodeHooks = {
    init: function init(vnode, hydrating, parentElm, refElm) {
      if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
        var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
      } else if (vnode.data.keepAlive) {
        // kept-alive components, treat as a patch
        var mountedNode = vnode; // work around flow
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      }
    },

    prepatch: function prepatch(oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(child, options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
      );
    },

    insert: function insert(vnode) {
      var context = vnode.context;
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true;
        callHook(componentInstance, 'mounted');
      }
      if (vnode.data.keepAlive) {
        if (context._isMounted) {
          // vue-router#1212
          // During updates, a kept-alive component's child components may
          // change, so directly walking the tree here may call activated hooks
          // on incorrect children. Instead we push them into a queue which will
          // be processed after the whole patch process ended.
          queueActivatedComponent(componentInstance);
        } else {
          activateChildComponent(componentInstance, true /* direct */);
        }
      }
    },

    destroy: function destroy(vnode) {
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          componentInstance.$destroy();
        } else {
          deactivateChildComponent(componentInstance, true /* direct */);
        }
      }
    }
  };

  var hooksToMerge = Object.keys(componentVNodeHooks);

  function createComponent(Ctor, data, context, children, tag) {
    if (isUndef(Ctor)) {
      return;
    }

    var baseCtor = context.$options._base;

    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }

    // if at this stage it's not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== 'function') {
      {
        warn("Invalid Component definition: " + String(Ctor), context);
      }
      return;
    }

    // async component
    var asyncFactory;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
      if (Ctor === undefined) {
        // return a placeholder node for async component, which is rendered
        // as a comment node but preserves all the raw information for the node.
        // the information will be used for async server-rendering and hydration.
        return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
      }
    }

    data = data || {};

    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);

    // transform component v-model data into props & events
    if (isDef(data.model)) {
      transformModel(Ctor.options, data);
    }

    // extract props
    var propsData = extractPropsFromVNodeData(data, Ctor, tag);

    // functional component
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(Ctor, propsData, data, context, children);
    }

    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    var listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn;

    if (isTrue(Ctor.options.abstract)) {
      // abstract components do not keep anything
      // other than props & listeners & slot

      // work around flow
      var slot = data.slot;
      data = {};
      if (slot) {
        data.slot = slot;
      }
    }

    // merge component management hooks onto the placeholder node
    mergeHooks(data);

    // return a placeholder vnode
    var name = Ctor.options.name || tag;
    var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);
    return vnode;
  }

  function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm, refElm) {
    var vnodeComponentOptions = vnode.componentOptions;
    var options = {
      _isComponent: true,
      parent: parent,
      propsData: vnodeComponentOptions.propsData,
      _componentTag: vnodeComponentOptions.tag,
      _parentVnode: vnode,
      _parentListeners: vnodeComponentOptions.listeners,
      _renderChildren: vnodeComponentOptions.children,
      _parentElm: parentElm || null,
      _refElm: refElm || null
    };
    // check inline-template render functions
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnodeComponentOptions.Ctor(options);
  }

  function mergeHooks(data) {
    if (!data.hook) {
      data.hook = {};
    }
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var fromParent = data.hook[key];
      var ours = componentVNodeHooks[key];
      data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
    }
  }

  function mergeHook$1(one, two) {
    return function (a, b, c, d) {
      one(a, b, c, d);
      two(a, b, c, d);
    };
  }

  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel(options, data) {
    var prop = options.model && options.model.prop || 'value';
    var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    if (isDef(on[event])) {
      on[event] = [data.model.callback].concat(on[event]);
    } else {
      on[event] = data.model.callback;
    }
  }

  /*  */

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;

  // wrapper function for providing a more flexible interface
  // without getting yelled at by flow
  function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType);
  }

  function _createElement(context, tag, data, children, normalizationType) {
    if (isDef(data) && isDef(data.__ob__)) {
      "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
      return createEmptyVNode();
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
      tag = data.is;
    }
    if (!tag) {
      // in case of component :is set to falsy value
      return createEmptyVNode();
    }
    // warn against non-primitive key
    if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
    // support single function children as default scoped slot
    if (Array.isArray(children) && typeof children[0] === 'function') {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === 'string') {
      var Ctor;
      ns = config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        // platform built-in elements
        vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
      } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
        // component
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        // unknown or unlisted namespaced elements
        // check at runtime because it may get assigned a namespace when its
        // parent normalizes children
        vnode = new VNode(tag, data, children, undefined, undefined, context);
      }
    } else {
      // direct component options / constructor
      vnode = createComponent(tag, data, context, children);
    }
    if (isDef(vnode)) {
      if (ns) {
        applyNS(vnode, ns);
      }
      return vnode;
    } else {
      return createEmptyVNode();
    }
  }

  function applyNS(vnode, ns) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
      // use default namespace inside foreignObject
      return;
    }
    if (isDef(vnode.children)) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (isDef(child.tag) && isUndef(child.ns)) {
          applyNS(child, ns);
        }
      }
    }
  }

  /*  */

  /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList(val, render) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
    if (isDef(ret)) {
      ret._isVList = true;
    }
    return ret;
  }

  /*  */

  /**
   * Runtime helper for rendering <slot>
   */
  function renderSlot(name, fallback, props, bindObject) {
    var scopedSlotFn = this.$scopedSlots[name];
    if (scopedSlotFn) {
      // scoped slot
      props = props || {};
      if (bindObject) {
        props = extend(extend({}, bindObject), props);
      }
      return scopedSlotFn(props) || fallback;
    } else {
      var slotNodes = this.$slots[name];
      // warn duplicate slot usage
      if (slotNodes && "development" !== 'production') {
        slotNodes._rendered && warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
        slotNodes._rendered = true;
      }
      return slotNodes || fallback;
    }
  }

  /*  */

  /**
   * Runtime helper for resolving filters
   */
  function resolveFilter(id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity;
  }

  /*  */

  /**
   * Runtime helper for checking keyCodes from config.
   */
  function checkKeyCodes(eventKeyCode, key, builtInAlias) {
    var keyCodes = config.keyCodes[key] || builtInAlias;
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1;
    } else {
      return keyCodes !== eventKeyCode;
    }
  }

  /*  */

  /**
   * Runtime helper for merging v-bind="object" into a VNode's data.
   */
  function bindObjectProps(data, tag, value, asProp, isSync) {
    if (value) {
      if (!isObject(value)) {
        "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        var hash;
        var loop = function loop(key) {
          if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
            hash = data;
          } else {
            var type = data.attrs && data.attrs.type;
            hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
          }
          if (!(key in hash)) {
            hash[key] = value[key];

            if (isSync) {
              var on = data.on || (data.on = {});
              on["update:" + key] = function ($event) {
                value[key] = $event;
              };
            }
          }
        };

        for (var key in value) {
          loop(key);
        }
      }
    }
    return data;
  }

  /*  */

  /**
   * Runtime helper for rendering static trees.
   */
  function renderStatic(index, isInFor) {
    var tree = this._staticTrees[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree by doing a shallow clone.
    if (tree && !isInFor) {
      return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree);
    }
    // otherwise, render a fresh tree.
    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
    markStatic(tree, "__static__" + index, false);
    return tree;
  }

  /**
   * Runtime helper for v-once.
   * Effectively it means marking the node as static with a unique key.
   */
  function markOnce(tree, index, key) {
    markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
    return tree;
  }

  function markStatic(tree, key, isOnce) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], key + "_" + i, isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode(node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  /*  */

  function bindObjectListeners(data, value) {
    if (value) {
      if (!isPlainObject(value)) {
        "development" !== 'production' && warn('v-on without argument expects an Object value', this);
      } else {
        var on = data.on = data.on ? extend({}, data.on) : {};
        for (var key in value) {
          var existing = on[key];
          var ours = value[key];
          on[key] = existing ? [].concat(ours, existing) : ours;
        }
      }
    }
    return data;
  }

  /*  */

  function initRender(vm) {
    vm._vnode = null; // the root of the child tree
    vm._staticTrees = null;
    var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
    vm.$scopedSlots = emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    vm._c = function (a, b, c, d) {
      return createElement(vm, a, b, c, d, false);
    };
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = function (a, b, c, d) {
      return createElement(vm, a, b, c, d, true);
    };

    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    var parentData = parentVnode && parentVnode.data;
    /* istanbul ignore else */
    {
      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, function () {
        !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
      }, true);
      defineReactive$$1(vm, '$listeners', vm.$options._parentListeners, function () {
        !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
      }, true);
    }
  }

  function renderMixin(Vue) {
    Vue.prototype.$nextTick = function (fn) {
      return nextTick(fn, this);
    };

    Vue.prototype._render = function () {
      var vm = this;
      var ref = vm.$options;
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      var _parentVnode = ref._parentVnode;

      if (vm._isMounted) {
        // clone slot nodes on re-renders
        for (var key in vm.$slots) {
          vm.$slots[key] = cloneVNodes(vm.$slots[key]);
        }
      }

      vm.$scopedSlots = _parentVnode && _parentVnode.data.scopedSlots || emptyObject;

      if (staticRenderFns && !vm._staticTrees) {
        vm._staticTrees = [];
      }
      // set parent vnode. this allows render functions to have access
      // to the data on the placeholder node.
      vm.$vnode = _parentVnode;
      // render self
      var vnode;
      try {
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, "render function");
        // return error render result,
        // or previous vnode to prevent render error causing blank component
        /* istanbul ignore else */
        {
          vnode = vm.$options.renderError ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e) : vm._vnode;
        }
      }
      // return empty vnode in case the render function errored out
      if (!(vnode instanceof VNode)) {
        if ("development" !== 'production' && Array.isArray(vnode)) {
          warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
        }
        vnode = createEmptyVNode();
      }
      // set parent
      vnode.parent = _parentVnode;
      return vnode;
    };

    // internal render helpers.
    // these are exposed on the instance prototype to reduce generated render
    // code size.
    Vue.prototype._o = markOnce;
    Vue.prototype._n = toNumber;
    Vue.prototype._s = toString;
    Vue.prototype._l = renderList;
    Vue.prototype._t = renderSlot;
    Vue.prototype._q = looseEqual;
    Vue.prototype._i = looseIndexOf;
    Vue.prototype._m = renderStatic;
    Vue.prototype._f = resolveFilter;
    Vue.prototype._k = checkKeyCodes;
    Vue.prototype._b = bindObjectProps;
    Vue.prototype._v = createTextVNode;
    Vue.prototype._e = createEmptyVNode;
    Vue.prototype._u = resolveScopedSlots;
    Vue.prototype._g = bindObjectListeners;
  }

  /*  */

  var uid$1 = 0;

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      // a uid
      vm._uid = uid$1++;

      var startTag, endTag;
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        startTag = "vue-perf-init:" + vm._uid;
        endTag = "vue-perf-end:" + vm._uid;
        mark(startTag);
      }

      // a flag to avoid this being observed
      vm._isVue = true;
      // merge options
      if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
      }
      /* istanbul ignore else */
      {
        initProxy(vm);
      }
      // expose real self
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook(vm, 'beforeCreate');
      initInjections(vm); // resolve injections before data/props
      initState(vm);
      initProvide(vm); // resolve provide after data/props
      callHook(vm, 'created');

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        vm._name = formatComponentName(vm, false);
        mark(endTag);
        measure(vm._name + " init", startTag, endTag);
      }

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  function initInternalComponent(vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    // doing this because it's faster than dynamic enumeration.
    opts.parent = options.parent;
    opts.propsData = options.propsData;
    opts._parentVnode = options._parentVnode;
    opts._parentListeners = options._parentListeners;
    opts._renderChildren = options._renderChildren;
    opts._componentTag = options._componentTag;
    opts._parentElm = options._parentElm;
    opts._refElm = options._refElm;
    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }

  function resolveConstructorOptions(Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        // super option changed,
        // need to resolve new options.
        Ctor.superOptions = superOptions;
        // check if there are any late-modified/attached options (#4976)
        var modifiedOptions = resolveModifiedOptions(Ctor);
        // update base extend options
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options;
  }

  function resolveModifiedOptions(Ctor) {
    var modified;
    var latest = Ctor.options;
    var extended = Ctor.extendOptions;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified) {
          modified = {};
        }
        modified[key] = dedupe(latest[key], extended[key], sealed[key]);
      }
    }
    return modified;
  }

  function dedupe(latest, extended, sealed) {
    // compare latest and sealed to ensure lifecycle hooks won't be duplicated
    // between merges
    if (Array.isArray(latest)) {
      var res = [];
      sealed = Array.isArray(sealed) ? sealed : [sealed];
      extended = Array.isArray(extended) ? extended : [extended];
      for (var i = 0; i < latest.length; i++) {
        // push original options and not sealed options to exclude duplicated options
        if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
          res.push(latest[i]);
        }
      }
      return res;
    } else {
      return latest;
    }
  }

  function Vue$3(options) {
    if ("development" !== 'production' && !(this instanceof Vue$3)) {
      warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }

  initMixin(Vue$3);
  stateMixin(Vue$3);
  eventsMixin(Vue$3);
  lifecycleMixin(Vue$3);
  renderMixin(Vue$3);

  /*  */

  function initUse(Vue) {
    Vue.use = function (plugin) {
      var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
      if (installedPlugins.indexOf(plugin) > -1) {
        return this;
      }

      // additional parameters
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
      }
      installedPlugins.push(plugin);
      return this;
    };
  }

  /*  */

  function initMixin$1(Vue) {
    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this;
    };
  }

  /*  */

  function initExtend(Vue) {
    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */
    Vue.cid = 0;
    var cid = 1;

    /**
     * Class inheritance
     */
    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId];
      }

      var name = extendOptions.name || Super.options.name;
      {
        if (!/^[a-zA-Z][\w-]*$/.test(name)) {
          warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
        }
      }

      var Sub = function VueComponent(options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(Super.options, extendOptions);
      Sub['super'] = Super;

      // For props and computed properties, we define the proxy getters on
      // the Vue instances at extension time, on the extended prototype. This
      // avoids Object.defineProperty calls for each instance created.
      if (Sub.options.props) {
        initProps$1(Sub);
      }
      if (Sub.options.computed) {
        initComputed$1(Sub);
      }

      // allow further extension/mixin/plugin usage
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;

      // create asset registers, so extended classes
      // can have their private assets too.
      ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type];
      });
      // enable recursive self-lookup
      if (name) {
        Sub.options.components[name] = Sub;
      }

      // keep a reference to the super options at extension time.
      // later at instantiation we can check if Super's options have
      // been updated.
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend({}, Sub.options);

      // cache constructor
      cachedCtors[SuperId] = Sub;
      return Sub;
    };
  }

  function initProps$1(Comp) {
    var props = Comp.options.props;
    for (var key in props) {
      proxy(Comp.prototype, "_props", key);
    }
  }

  function initComputed$1(Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }

  /*  */

  function initAssetRegisters(Vue) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(function (type) {
      Vue[type] = function (id, definition) {
        if (!definition) {
          return this.options[type + 's'][id];
        } else {
          /* istanbul ignore if */
          {
            if (type === 'component' && config.isReservedTag(id)) {
              warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
            }
          }
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition);
          }
          if (type === 'directive' && typeof definition === 'function') {
            definition = { bind: definition, update: definition };
          }
          this.options[type + 's'][id] = definition;
          return definition;
        }
      };
    });
  }

  /*  */

  var patternTypes = [String, RegExp, Array];

  function getComponentName(opts) {
    return opts && (opts.Ctor.options.name || opts.tag);
  }

  function matches(pattern, name) {
    if (Array.isArray(pattern)) {
      return pattern.indexOf(name) > -1;
    } else if (typeof pattern === 'string') {
      return pattern.split(',').indexOf(name) > -1;
    } else if (isRegExp(pattern)) {
      return pattern.test(name);
    }
    /* istanbul ignore next */
    return false;
  }

  function pruneCache(cache, current, filter) {
    for (var key in cache) {
      var cachedNode = cache[key];
      if (cachedNode) {
        var name = getComponentName(cachedNode.componentOptions);
        if (name && !filter(name)) {
          if (cachedNode !== current) {
            pruneCacheEntry(cachedNode);
          }
          cache[key] = null;
        }
      }
    }
  }

  function pruneCacheEntry(vnode) {
    if (vnode) {
      vnode.componentInstance.$destroy();
    }
  }

  var KeepAlive = {
    name: 'keep-alive',
    abstract: true,

    props: {
      include: patternTypes,
      exclude: patternTypes
    },

    created: function created() {
      this.cache = Object.create(null);
    },

    destroyed: function destroyed() {
      var this$1 = this;

      for (var key in this$1.cache) {
        pruneCacheEntry(this$1.cache[key]);
      }
    },

    watch: {
      include: function include(val) {
        pruneCache(this.cache, this._vnode, function (name) {
          return matches(val, name);
        });
      },
      exclude: function exclude(val) {
        pruneCache(this.cache, this._vnode, function (name) {
          return !matches(val, name);
        });
      }
    },

    render: function render() {
      var vnode = getFirstComponentChild(this.$slots.default);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        // check pattern
        var name = getComponentName(componentOptions);
        if (name && (this.include && !matches(this.include, name) || this.exclude && matches(this.exclude, name))) {
          return vnode;
        }
        var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
        if (this.cache[key]) {
          vnode.componentInstance = this.cache[key].componentInstance;
        } else {
          this.cache[key] = vnode;
        }
        vnode.data.keepAlive = true;
      }
      return vnode;
    }
  };

  var builtInComponents = {
    KeepAlive: KeepAlive
  };

  /*  */

  function initGlobalAPI(Vue) {
    // config
    var configDef = {};
    configDef.get = function () {
      return config;
    };
    {
      configDef.set = function () {
        warn('Do not replace the Vue.config object, set individual fields instead.');
      };
    }
    Object.defineProperty(Vue, 'config', configDef);

    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
      warn: warn,
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive$$1
    };

    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });

    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;

    extend(Vue.options.components, builtInComponents);

    initUse(Vue);
    initMixin$1(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
  }

  initGlobalAPI(Vue$3);

  Object.defineProperty(Vue$3.prototype, '$isServer', {
    get: isServerRendering
  });

  Object.defineProperty(Vue$3.prototype, '$ssrContext', {
    get: function get() {
      /* istanbul ignore next */
      return this.$vnode && this.$vnode.ssrContext;
    }
  });

  Vue$3.version = '2.4.2';

  /*  */

  // these are reserved for web because they are directly compiled away
  // during template compilation
  var isReservedAttr = makeMap('style,class');

  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select');
  var mustUseProp = function mustUseProp(tag, type, attr) {
    return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
  };

  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

  var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

  var xlinkNS = 'http://www.w3.org/1999/xlink';

  var isXlink = function isXlink(name) {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
  };

  var getXlinkProp = function getXlinkProp(name) {
    return isXlink(name) ? name.slice(6, name.length) : '';
  };

  var isFalsyAttrValue = function isFalsyAttrValue(val) {
    return val == null || val === false;
  };

  /*  */

  function genClassForVnode(vnode) {
    var data = vnode.data;
    var parentNode = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while (isDef(parentNode = parentNode.parent)) {
      if (parentNode.data) {
        data = mergeClassData(data, parentNode.data);
      }
    }
    return renderClass(data.staticClass, data.class);
  }

  function mergeClassData(child, parent) {
    return {
      staticClass: concat(child.staticClass, parent.staticClass),
      class: isDef(child.class) ? [child.class, parent.class] : parent.class
    };
  }

  function renderClass(staticClass, dynamicClass) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
      return concat(staticClass, stringifyClass(dynamicClass));
    }
    /* istanbul ignore next */
    return '';
  }

  function concat(a, b) {
    return a ? b ? a + ' ' + b : a : b || '';
  }

  function stringifyClass(value) {
    if (Array.isArray(value)) {
      return stringifyArray(value);
    }
    if (isObject(value)) {
      return stringifyObject(value);
    }
    if (typeof value === 'string') {
      return value;
    }
    /* istanbul ignore next */
    return '';
  }

  function stringifyArray(value) {
    var res = '';
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
        if (res) {
          res += ' ';
        }
        res += stringified;
      }
    }
    return res;
  }

  function stringifyObject(value) {
    var res = '';
    for (var key in value) {
      if (value[key]) {
        if (res) {
          res += ' ';
        }
        res += key;
      }
    }
    return res;
  }

  /*  */

  var namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
  };

  var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');

  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

  var isPreTag = function isPreTag(tag) {
    return tag === 'pre';
  };

  var isReservedTag = function isReservedTag(tag) {
    return isHTMLTag(tag) || isSVG(tag);
  };

  function getTagNamespace(tag) {
    if (isSVG(tag)) {
      return 'svg';
    }
    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
      return 'math';
    }
  }

  var unknownElementCache = Object.create(null);
  function isUnknownElement(tag) {
    /* istanbul ignore if */
    if (!inBrowser) {
      return true;
    }
    if (isReservedTag(tag)) {
      return false;
    }
    tag = tag.toLowerCase();
    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag];
    }
    var el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
    } else {
      return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
    }
  }

  /*  */

  /**
   * Query an element selector if it's not an element already.
   */
  function query(el) {
    if (typeof el === 'string') {
      var selected = document.querySelector(el);
      if (!selected) {
        "development" !== 'production' && warn('Cannot find element: ' + el);
        return document.createElement('div');
      }
      return selected;
    } else {
      return el;
    }
  }

  /*  */

  function createElement$1(tagName, vnode) {
    var elm = document.createElement(tagName);
    if (tagName !== 'select') {
      return elm;
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
      elm.setAttribute('multiple', 'multiple');
    }
    return elm;
  }

  function createElementNS(namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName);
  }

  function createTextNode(text) {
    return document.createTextNode(text);
  }

  function createComment(text) {
    return document.createComment(text);
  }

  function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
  }

  function removeChild(node, child) {
    node.removeChild(child);
  }

  function appendChild(node, child) {
    node.appendChild(child);
  }

  function parentNode(node) {
    return node.parentNode;
  }

  function nextSibling(node) {
    return node.nextSibling;
  }

  function tagName(node) {
    return node.tagName;
  }

  function setTextContent(node, text) {
    node.textContent = text;
  }

  function setAttribute(node, key, val) {
    node.setAttribute(key, val);
  }

  var nodeOps = Object.freeze({
    createElement: createElement$1,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setAttribute: setAttribute
  });

  /*  */

  var ref = {
    create: function create(_, vnode) {
      registerRef(vnode);
    },
    update: function update(oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function destroy(vnode) {
      registerRef(vnode, true);
    }
  };

  function registerRef(vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!key) {
      return;
    }

    var vm = vnode.context;
    var ref = vnode.componentInstance || vnode.elm;
    var refs = vm.$refs;
    if (isRemoval) {
      if (Array.isArray(refs[key])) {
        remove(refs[key], ref);
      } else if (refs[key] === ref) {
        refs[key] = undefined;
      }
    } else {
      if (vnode.data.refInFor) {
        if (!Array.isArray(refs[key])) {
          refs[key] = [ref];
        } else if (refs[key].indexOf(ref) < 0) {
          // $flow-disable-line
          refs[key].push(ref);
        }
      } else {
        refs[key] = ref;
      }
    }
  }

  /**
   * Virtual DOM patching algorithm based on Snabbdom by
   * Simon Friis Vindum (@paldepind)
   * Licensed under the MIT License
   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
   *
   * modified by Evan You (@yyx990803)
   *
  
  /*
   * Not type-checking this because this file is perf-critical and the cost
   * of making flow understand it is not worth it.
   */

  var emptyNode = new VNode('', {}, []);

  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

  function sameVnode(a, b) {
    return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
  }

  // Some browsers do not support dynamically changing type for <input>
  // so they need to be treated as different nodes
  function sameInputType(a, b) {
    if (a.tag !== 'input') {
      return true;
    }
    var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB;
  }

  function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key)) {
        map[key] = i;
      }
    }
    return map;
  }

  function createPatchFunction(backend) {
    var i, j;
    var cbs = {};

    var modules = backend.modules;
    var nodeOps = backend.nodeOps;

    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }
    }

    function emptyNodeAt(elm) {
      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
    }

    function createRmCb(childElm, listeners) {
      function remove$$1() {
        if (--remove$$1.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove$$1.listeners = listeners;
      return remove$$1;
    }

    function removeNode(el) {
      var parent = nodeOps.parentNode(el);
      // element may have already been removed due to v-html / v-text
      if (isDef(parent)) {
        nodeOps.removeChild(parent, el);
      }
    }

    var inPre = 0;
    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
      vnode.isRootInsert = !nested; // for transition enter check
      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return;
      }

      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {
        {
          if (data && data.pre) {
            inPre++;
          }
          if (!inPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) && config.isUnknownElement(tag)) {
            warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
          }
        }
        vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
        setScope(vnode);

        /* istanbul ignore if */
        {
          createChildren(vnode, children, insertedVnodeQueue);
          if (isDef(data)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
          }
          insert(parentElm, vnode.elm, refElm);
        }

        if ("development" !== 'production' && data && data.pre) {
          inPre--;
        }
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }

    function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
      var i = vnode.data;
      if (isDef(i)) {
        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
        if (isDef(i = i.hook) && isDef(i = i.init)) {
          i(vnode, false /* hydrating */, parentElm, refElm);
        }
        // after calling the init hook, if the vnode is a child component
        // it should've created a child instance and mounted it. the child
        // component also has set the placeholder vnode's elm.
        // in that case we can just return the element and be done.
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }
          return true;
        }
      }
    }

    function initComponent(vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
        vnode.data.pendingInsert = null;
      }
      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        // empty component root.
        // skip all element-related modules except for ref (#3455)
        registerRef(vnode);
        // make sure to invoke the insert hook
        insertedVnodeQueue.push(vnode);
      }
    }

    function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
      var i;
      // hack for #4339: a reactivated component with inner transition
      // does not trigger because the inner node's created hooks are not called
      // again. It's not ideal to involve module-specific logic in here but
      // there doesn't seem to be a better way to do it.
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
          for (i = 0; i < cbs.activate.length; ++i) {
            cbs.activate[i](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break;
        }
      }
      // unlike a newly created component,
      // a reactivated keep-alive component doesn't insert itself
      insert(parentElm, vnode.elm, refElm);
    }

    function insert(parent, elm, ref$$1) {
      if (isDef(parent)) {
        if (isDef(ref$$1)) {
          if (ref$$1.parentNode === parent) {
            nodeOps.insertBefore(parent, elm, ref$$1);
          }
        } else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }

    function createChildren(vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; ++i) {
          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
      }
    }

    function isPatchable(vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag);
    }

    function invokeCreateHooks(vnode, insertedVnodeQueue) {
      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
        cbs.create[i$1](emptyNode, vnode);
      }
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (isDef(i.create)) {
          i.create(emptyNode, vnode);
        }
        if (isDef(i.insert)) {
          insertedVnodeQueue.push(vnode);
        }
      }
    }

    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope(vnode) {
      var i;
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
      // for slot content they should also get the scopeId from the host instance.
      if (isDef(i = activeInstance) && i !== vnode.context && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
    }

    function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
      }
    }

    function invokeDestroyHook(vnode) {
      var i, j;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.destroy)) {
          i(vnode);
        }
        for (i = 0; i < cbs.destroy.length; ++i) {
          cbs.destroy[i](vnode);
        }
      }
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }

    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else {
            // Text node
            removeNode(ch.elm);
          }
        }
      }
    }

    function removeAndInvokeRemoveHook(vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var i;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          // we have a recursively passed down rm callback
          // increase the listeners count
          rm.listeners += listeners;
        } else {
          // directly removing
          rm = createRmCb(vnode.elm, listeners);
        }
        // recursively invoke hooks on child component root node
        if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
          removeAndInvokeRemoveHook(i, rm);
        }
        for (i = 0; i < cbs.remove.length; ++i) {
          cbs.remove[i](vnode, rm);
        }
        if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
          i(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }

    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx, idxInOld, elmToMove, refElm;

      // removeOnly is a special flag used only by <transition-group>
      // to ensure removed elements stay in correct relative positions
      // during leaving transitions
      var canMove = !removeOnly;

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
          // Vnode moved right
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
          canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
          // Vnode moved left
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
          canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx)) {
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
          }
          idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
          if (isUndef(idxInOld)) {
            // New element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            elmToMove = oldCh[idxInOld];
            /* istanbul ignore if */
            if ("development" !== 'production' && !elmToMove) {
              warn('It seems there are duplicate keys that is causing an update error. ' + 'Make sure each v-for item has a unique key.');
            }
            if (sameVnode(elmToMove, newStartVnode)) {
              patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
              oldCh[idxInOld] = undefined;
              canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
              newStartVnode = newCh[++newStartIdx];
            } else {
              // same key but different element. treat as new element
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
              newStartVnode = newCh[++newStartIdx];
            }
          }
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }

    function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
      if (oldVnode === vnode) {
        return;
      }

      var elm = vnode.elm = oldVnode.elm;

      if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
          vnode.isAsyncPlaceholder = true;
        }
        return;
      }

      // reuse element for static trees.
      // note we only do this if the vnode is cloned -
      // if the new node is not cloned it means the render functions have been
      // reset by the hot-reload-api and we need to do a proper re-render.
      if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
        vnode.componentInstance = oldVnode.componentInstance;
        return;
      }

      var i;
      var data = vnode.data;
      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
        i(oldVnode, vnode);
      }

      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i = 0; i < cbs.update.length; ++i) {
          cbs.update[i](oldVnode, vnode);
        }
        if (isDef(i = data.hook) && isDef(i = i.update)) {
          i(oldVnode, vnode);
        }
      }
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch) {
            updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
          }
        } else if (isDef(ch)) {
          if (isDef(oldVnode.text)) {
            nodeOps.setTextContent(elm, '');
          }
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps.setTextContent(elm, vnode.text);
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
          i(oldVnode, vnode);
        }
      }
    }

    function invokeInsertHook(vnode, queue, initial) {
      // delay insert hooks for component root nodes, invoke them after the
      // element is really inserted
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue;
      } else {
        for (var i = 0; i < queue.length; ++i) {
          queue[i].data.hook.insert(queue[i]);
        }
      }
    }

    var bailed = false;
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate(elm, vnode, insertedVnodeQueue) {
      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
        vnode.elm = elm;
        vnode.isAsyncPlaceholder = true;
        return true;
      }
      {
        if (!assertNodeMatch(elm, vnode)) {
          return false;
        }
      }
      vnode.elm = elm;
      var tag = vnode.tag;
      var data = vnode.data;
      var children = vnode.children;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.init)) {
          i(vnode, true /* hydrating */);
        }
        if (isDef(i = vnode.componentInstance)) {
          // child component. it should have hydrated its own tree.
          initComponent(vnode, insertedVnodeQueue);
          return true;
        }
      }
      if (isDef(tag)) {
        if (isDef(children)) {
          // empty element, allow client to pick up and populate children
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              if ("development" !== 'production' && typeof console !== 'undefined' && !bailed) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false;
            }
          }
        }
        if (isDef(data)) {
          for (var key in data) {
            if (!isRenderedModule(key)) {
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break;
            }
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }
      return true;
    }

    function assertNodeMatch(node, vnode) {
      if (isDef(vnode.tag)) {
        return vnode.tag.indexOf('vue-component') === 0 || vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
      } else {
        return node.nodeType === (vnode.isComment ? 8 : 3);
      }
    }

    return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) {
          invokeDestroyHook(oldVnode);
        }
        return;
      }

      var isInitialPatch = false;
      var insertedVnodeQueue = [];

      if (isUndef(oldVnode)) {
        // empty mount (likely as component), create new root element
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue, parentElm, refElm);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          // patch existing root node
          patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
        } else {
          if (isRealElement) {
            // mounting to a real element
            // check if this is server-rendered content and if we can perform
            // a successful hydration.
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              oldVnode.removeAttribute(SSR_ATTR);
              hydrating = true;
            }
            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode;
              } else {
                warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
              }
            }
            // either not server-rendered, or hydration failed.
            // create an empty node and replace it
            oldVnode = emptyNodeAt(oldVnode);
          }
          // replacing existing element
          var oldElm = oldVnode.elm;
          var parentElm$1 = nodeOps.parentNode(oldElm);
          createElm(vnode, insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

          if (isDef(vnode.parent)) {
            // component root element replaced.
            // update parent placeholder node element, recursively
            var ancestor = vnode.parent;
            while (ancestor) {
              ancestor.elm = vnode.elm;
              ancestor = ancestor.parent;
            }
            if (isPatchable(vnode)) {
              for (var i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, vnode.parent);
              }
            }
          }

          if (isDef(parentElm$1)) {
            removeVnodes(parentElm$1, [oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }

      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm;
    };
  }

  /*  */

  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives(vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };

  function updateDirectives(oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update(oldVnode, vnode);
    }
  }

  function _update(oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

    var dirsWithInsert = [];
    var dirsWithPostpatch = [];

    var key, oldDir, dir;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        // new directive, bind
        callHook$1(dir, 'bind', vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        // existing directive, update
        dir.oldValue = oldDir.value;
        callHook$1(dir, 'update', vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }

    if (dirsWithInsert.length) {
      var callInsert = function callInsert() {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
      } else {
        callInsert();
      }
    }

    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
        }
      });
    }

    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          // no longer present, unbind
          callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }

  var emptyModifiers = Object.create(null);

  function normalizeDirectives$1(dirs, vm) {
    var res = Object.create(null);
    if (!dirs) {
      return res;
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        dir.modifiers = emptyModifiers;
      }
      res[getRawDirName(dir)] = dir;
      dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
    }
    return res;
  }

  function getRawDirName(dir) {
    return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
  }

  function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      try {
        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
      } catch (e) {
        handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
      }
    }
  }

  var baseModules = [ref, directives];

  /*  */

  function updateAttrs(oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
      return;
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
      return;
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(attrs.__ob__)) {
      attrs = vnode.data.attrs = extend({}, attrs);
    }

    for (key in attrs) {
      cur = attrs[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur);
      }
    }
    // #4391: in IE9, setting type can reset value for input[type=radio]
    /* istanbul ignore if */
    if (isIE9 && attrs.value !== oldAttrs.value) {
      setAttr(elm, 'value', attrs.value);
    }
    for (key in oldAttrs) {
      if (isUndef(attrs[key])) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }

  function setAttr(el, key, value) {
    if (isBooleanAttr(key)) {
      // set attribute for blank value
      // e.g. <option disabled>Select one</option>
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, key);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };

  /*  */

  function updateClass(oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
      return;
    }

    var cls = genClassForVnode(vnode);

    // handle transition classes
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
      cls = concat(cls, stringifyClass(transitionClass));
    }

    // set the class
    if (cls !== el._prevClass) {
      el.setAttribute('class', cls);
      el._prevClass = cls;
    }
  }

  var klass = {
    create: updateClass,
    update: updateClass
  };

  /*  */

  var validDivisionCharRE = /[\w).+\-_$\]]/;

  function parseFilters(exp) {
    var inSingle = false;
    var inDouble = false;
    var inTemplateString = false;
    var inRegex = false;
    var curly = 0;
    var square = 0;
    var paren = 0;
    var lastFilterIndex = 0;
    var c, prev, i, expression, filters;

    for (i = 0; i < exp.length; i++) {
      prev = c;
      c = exp.charCodeAt(i);
      if (inSingle) {
        if (c === 0x27 && prev !== 0x5C) {
          inSingle = false;
        }
      } else if (inDouble) {
        if (c === 0x22 && prev !== 0x5C) {
          inDouble = false;
        }
      } else if (inTemplateString) {
        if (c === 0x60 && prev !== 0x5C) {
          inTemplateString = false;
        }
      } else if (inRegex) {
        if (c === 0x2f && prev !== 0x5C) {
          inRegex = false;
        }
      } else if (c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C && exp.charCodeAt(i - 1) !== 0x7C && !curly && !square && !paren) {
        if (expression === undefined) {
          // first filter, end of expression
          lastFilterIndex = i + 1;
          expression = exp.slice(0, i).trim();
        } else {
          pushFilter();
        }
      } else {
        switch (c) {
          case 0x22:
            inDouble = true;break; // "
          case 0x27:
            inSingle = true;break; // '
          case 0x60:
            inTemplateString = true;break; // `
          case 0x28:
            paren++;break; // (
          case 0x29:
            paren--;break; // )
          case 0x5B:
            square++;break; // [
          case 0x5D:
            square--;break; // ]
          case 0x7B:
            curly++;break; // {
          case 0x7D:
            curly--;break; // }
        }
        if (c === 0x2f) {
          // /
          var j = i - 1;
          var p = void 0;
          // find first non-whitespace prev char
          for (; j >= 0; j--) {
            p = exp.charAt(j);
            if (p !== ' ') {
              break;
            }
          }
          if (!p || !validDivisionCharRE.test(p)) {
            inRegex = true;
          }
        }
      }
    }

    if (expression === undefined) {
      expression = exp.slice(0, i).trim();
    } else if (lastFilterIndex !== 0) {
      pushFilter();
    }

    function pushFilter() {
      (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
      lastFilterIndex = i + 1;
    }

    if (filters) {
      for (i = 0; i < filters.length; i++) {
        expression = wrapFilter(expression, filters[i]);
      }
    }

    return expression;
  }

  function wrapFilter(exp, filter) {
    var i = filter.indexOf('(');
    if (i < 0) {
      // _f: resolveFilter
      return "_f(\"" + filter + "\")(" + exp + ")";
    } else {
      var name = filter.slice(0, i);
      var args = filter.slice(i + 1);
      return "_f(\"" + name + "\")(" + exp + "," + args;
    }
  }

  /*  */

  function baseWarn(msg) {
    console.error("[Vue compiler]: " + msg);
  }

  function pluckModuleFunction(modules, key) {
    return modules ? modules.map(function (m) {
      return m[key];
    }).filter(function (_) {
      return _;
    }) : [];
  }

  function addProp(el, name, value) {
    (el.props || (el.props = [])).push({ name: name, value: value });
  }

  function addAttr(el, name, value) {
    (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  }

  function addDirective(el, name, rawName, value, arg, modifiers) {
    (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  }

  function addHandler(el, name, value, modifiers, important, warn) {
    // warn prevent and passive modifier
    /* istanbul ignore if */
    if ("development" !== 'production' && warn && modifiers && modifiers.prevent && modifiers.passive) {
      warn('passive and prevent can\'t be used together. ' + 'Passive handler can\'t prevent default event.');
    }
    // check capture modifier
    if (modifiers && modifiers.capture) {
      delete modifiers.capture;
      name = '!' + name; // mark the event as captured
    }
    if (modifiers && modifiers.once) {
      delete modifiers.once;
      name = '~' + name; // mark the event as once
    }
    /* istanbul ignore if */
    if (modifiers && modifiers.passive) {
      delete modifiers.passive;
      name = '&' + name; // mark the event as passive
    }
    var events;
    if (modifiers && modifiers.native) {
      delete modifiers.native;
      events = el.nativeEvents || (el.nativeEvents = {});
    } else {
      events = el.events || (el.events = {});
    }
    var newHandler = { value: value, modifiers: modifiers };
    var handlers = events[name];
    /* istanbul ignore if */
    if (Array.isArray(handlers)) {
      important ? handlers.unshift(newHandler) : handlers.push(newHandler);
    } else if (handlers) {
      events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
    } else {
      events[name] = newHandler;
    }
  }

  function getBindingAttr(el, name, getStatic) {
    var dynamicValue = getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);
    if (dynamicValue != null) {
      return parseFilters(dynamicValue);
    } else if (getStatic !== false) {
      var staticValue = getAndRemoveAttr(el, name);
      if (staticValue != null) {
        return JSON.stringify(staticValue);
      }
    }
  }

  function getAndRemoveAttr(el, name) {
    var val;
    if ((val = el.attrsMap[name]) != null) {
      var list = el.attrsList;
      for (var i = 0, l = list.length; i < l; i++) {
        if (list[i].name === name) {
          list.splice(i, 1);
          break;
        }
      }
    }
    return val;
  }

  /*  */

  /**
   * Cross-platform code generation for component v-model
   */
  function genComponentModel(el, value, modifiers) {
    var ref = modifiers || {};
    var number = ref.number;
    var trim = ref.trim;

    var baseValueExpression = '$$v';
    var valueExpression = baseValueExpression;
    if (trim) {
      valueExpression = "(typeof " + baseValueExpression + " === 'string'" + "? " + baseValueExpression + ".trim()" + ": " + baseValueExpression + ")";
    }
    if (number) {
      valueExpression = "_n(" + valueExpression + ")";
    }
    var assignment = genAssignmentCode(value, valueExpression);

    el.model = {
      value: "(" + value + ")",
      expression: "\"" + value + "\"",
      callback: "function (" + baseValueExpression + ") {" + assignment + "}"
    };
  }

  /**
   * Cross-platform codegen helper for generating v-model value assignment code.
   */
  function genAssignmentCode(value, assignment) {
    var modelRs = parseModel(value);
    if (modelRs.idx === null) {
      return value + "=" + assignment;
    } else {
      return "$set(" + modelRs.exp + ", " + modelRs.idx + ", " + assignment + ")";
    }
  }

  /**
   * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
   *
   * for loop possible cases:
   *
   * - test
   * - test[idx]
   * - test[test1[idx]]
   * - test["a"][idx]
   * - xxx.test[a[a].test1[idx]]
   * - test.xxx.a["asa"][test1[idx]]
   *
   */

  var len;
  var str;
  var chr;
  var index$1;
  var expressionPos;
  var expressionEndPos;

  function parseModel(val) {
    str = val;
    len = str.length;
    index$1 = expressionPos = expressionEndPos = 0;

    if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
      return {
        exp: val,
        idx: null
      };
    }

    while (!eof()) {
      chr = next();
      /* istanbul ignore if */
      if (isStringStart(chr)) {
        parseString(chr);
      } else if (chr === 0x5B) {
        parseBracket(chr);
      }
    }

    return {
      exp: val.substring(0, expressionPos),
      idx: val.substring(expressionPos + 1, expressionEndPos)
    };
  }

  function next() {
    return str.charCodeAt(++index$1);
  }

  function eof() {
    return index$1 >= len;
  }

  function isStringStart(chr) {
    return chr === 0x22 || chr === 0x27;
  }

  function parseBracket(chr) {
    var inBracket = 1;
    expressionPos = index$1;
    while (!eof()) {
      chr = next();
      if (isStringStart(chr)) {
        parseString(chr);
        continue;
      }
      if (chr === 0x5B) {
        inBracket++;
      }
      if (chr === 0x5D) {
        inBracket--;
      }
      if (inBracket === 0) {
        expressionEndPos = index$1;
        break;
      }
    }
  }

  function parseString(chr) {
    var stringQuote = chr;
    while (!eof()) {
      chr = next();
      if (chr === stringQuote) {
        break;
      }
    }
  }

  /*  */

  var warn$1;

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';
  var CHECKBOX_RADIO_TOKEN = '__c';

  function model(el, dir, _warn) {
    warn$1 = _warn;
    var value = dir.value;
    var modifiers = dir.modifiers;
    var tag = el.tag;
    var type = el.attrsMap.type;

    {
      var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
      if (tag === 'input' && dynamicType) {
        warn$1("<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" + "v-model does not support dynamic input types. Use v-if branches instead.");
      }
      // inputs with type="file" are read only and setting the input's
      // value will throw an error.
      if (tag === 'input' && type === 'file') {
        warn$1("<" + el.tag + " v-model=\"" + value + "\" type=\"file\">:\n" + "File inputs are read only. Use a v-on:change listener instead.");
      }
    }

    if (el.component) {
      genComponentModel(el, value, modifiers);
      // component v-model doesn't need extra runtime
      return false;
    } else if (tag === 'select') {
      genSelect(el, value, modifiers);
    } else if (tag === 'input' && type === 'checkbox') {
      genCheckboxModel(el, value, modifiers);
    } else if (tag === 'input' && type === 'radio') {
      genRadioModel(el, value, modifiers);
    } else if (tag === 'input' || tag === 'textarea') {
      genDefaultModel(el, value, modifiers);
    } else if (!config.isReservedTag(tag)) {
      genComponentModel(el, value, modifiers);
      // component v-model doesn't need extra runtime
      return false;
    } else {
      warn$1("<" + el.tag + " v-model=\"" + value + "\">: " + "v-model is not supported on this element type. " + 'If you are working with contenteditable, it\'s recommended to ' + 'wrap a library dedicated for that purpose inside a custom component.');
    }

    // ensure runtime directive metadata
    return true;
  }

  function genCheckboxModel(el, value, modifiers) {
    var number = modifiers && modifiers.number;
    var valueBinding = getBindingAttr(el, 'value') || 'null';
    var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
    var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
    addProp(el, 'checked', "Array.isArray(" + value + ")" + "?_i(" + value + "," + valueBinding + ")>-1" + (trueValueBinding === 'true' ? ":(" + value + ")" : ":_q(" + value + "," + trueValueBinding + ")"));
    addHandler(el, CHECKBOX_RADIO_TOKEN, "var $$a=" + value + "," + '$$el=$event.target,' + "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" + 'if(Array.isArray($$a)){' + "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," + '$$i=_i($$a,$$v);' + "if($$el.checked){$$i<0&&(" + value + "=$$a.concat($$v))}" + "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" + "}else{" + genAssignmentCode(value, '$$c') + "}", null, true);
  }

  function genRadioModel(el, value, modifiers) {
    var number = modifiers && modifiers.number;
    var valueBinding = getBindingAttr(el, 'value') || 'null';
    valueBinding = number ? "_n(" + valueBinding + ")" : valueBinding;
    addProp(el, 'checked', "_q(" + value + "," + valueBinding + ")");
    addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
  }

  function genSelect(el, value, modifiers) {
    var number = modifiers && modifiers.number;
    var selectedVal = "Array.prototype.filter" + ".call($event.target.options,function(o){return o.selected})" + ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" + "return " + (number ? '_n(val)' : 'val') + "})";

    var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
    var code = "var $$selectedVal = " + selectedVal + ";";
    code = code + " " + genAssignmentCode(value, assignment);
    addHandler(el, 'change', code, null, true);
  }

  function genDefaultModel(el, value, modifiers) {
    var type = el.attrsMap.type;
    var ref = modifiers || {};
    var lazy = ref.lazy;
    var number = ref.number;
    var trim = ref.trim;
    var needCompositionGuard = !lazy && type !== 'range';
    var event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';

    var valueExpression = '$event.target.value';
    if (trim) {
      valueExpression = "$event.target.value.trim()";
    }
    if (number) {
      valueExpression = "_n(" + valueExpression + ")";
    }

    var code = genAssignmentCode(value, valueExpression);
    if (needCompositionGuard) {
      code = "if($event.target.composing)return;" + code;
    }

    addProp(el, 'value', "(" + value + ")");
    addHandler(el, event, code, null, true);
    if (trim || number) {
      addHandler(el, 'blur', '$forceUpdate()');
    }
  }

  /*  */

  // normalize v-model event tokens that can only be determined at runtime.
  // it's important to place the event as the first in the array because
  // the whole point is ensuring the v-model callback gets called before
  // user-attached handlers.
  function normalizeEvents(on) {
    var event;
    /* istanbul ignore if */
    if (isDef(on[RANGE_TOKEN])) {
      // IE input[type=range] only supports `change` event
      event = isIE ? 'change' : 'input';
      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
      delete on[RANGE_TOKEN];
    }
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
      // Chrome fires microtasks in between click/change, leads to #4521
      event = isChrome ? 'click' : 'change';
      on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
      delete on[CHECKBOX_RADIO_TOKEN];
    }
  }

  var target$1;

  function add$1(event, _handler, once$$1, capture, passive) {
    if (once$$1) {
      var oldHandler = _handler;
      var _target = target$1; // save current target element in closure
      _handler = function handler(ev) {
        var res = arguments.length === 1 ? oldHandler(ev) : oldHandler.apply(null, arguments);
        if (res !== null) {
          remove$2(event, _handler, capture, _target);
        }
      };
    }
    target$1.addEventListener(event, _handler, supportsPassive ? { capture: capture, passive: passive } : capture);
  }

  function remove$2(event, handler, capture, _target) {
    (_target || target$1).removeEventListener(event, handler, capture);
  }

  function updateDOMListeners(oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
      return;
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target$1 = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  }

  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners
  };

  /*  */

  function updateDOMProps(oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
      return;
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(props.__ob__)) {
      props = vnode.data.domProps = extend({}, props);
    }

    for (key in oldProps) {
      if (isUndef(props[key])) {
        elm[key] = '';
      }
    }
    for (key in props) {
      cur = props[key];
      // ignore children if the node has textContent or innerHTML,
      // as these will throw away existing DOM nodes and cause removal errors
      // on subsequent patches (#3360)
      if (key === 'textContent' || key === 'innerHTML') {
        if (vnode.children) {
          vnode.children.length = 0;
        }
        if (cur === oldProps[key]) {
          continue;
        }
      }

      if (key === 'value') {
        // store value as _value as well since
        // non-string values will be stringified
        elm._value = cur;
        // avoid resetting cursor position when value is the same
        var strCur = isUndef(cur) ? '' : String(cur);
        if (shouldUpdateValue(elm, vnode, strCur)) {
          elm.value = strCur;
        }
      } else {
        elm[key] = cur;
      }
    }
  }

  // check platforms/web/util/attrs.js acceptValue


  function shouldUpdateValue(elm, vnode, checkVal) {
    return !elm.composing && (vnode.tag === 'option' || isDirty(elm, checkVal) || isInputChanged(elm, checkVal));
  }

  function isDirty(elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is
    // not equal to the updated value
    var notInFocus = true;
    // #6157
    // work around IE bug when accessing document.activeElement in an iframe
    try {
      notInFocus = document.activeElement !== elm;
    } catch (e) {}
    return notInFocus && elm.value !== checkVal;
  }

  function isInputChanged(elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if (isDef(modifiers) && modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (isDef(modifiers) && modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
    return value !== newVal;
  }

  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };

  /*  */

  var parseStyleText = cached(function (cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res;
  });

  // merge static and dynamic style data on the same vnode
  function normalizeStyleData(data) {
    var style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle ? extend(data.staticStyle, style) : style;
  }

  // normalize possible array / string values into Object
  function normalizeStyleBinding(bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle);
    }
    if (typeof bindingStyle === 'string') {
      return parseStyleText(bindingStyle);
    }
    return bindingStyle;
  }

  /**
   * parent component style should be after child's
   * so that parent component's style could override it
   */
  function getStyle(vnode, checkChild) {
    var res = {};
    var styleData;

    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
          extend(res, styleData);
        }
      }
    }

    if (styleData = normalizeStyleData(vnode.data)) {
      extend(res, styleData);
    }

    var parentNode = vnode;
    while (parentNode = parentNode.parent) {
      if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
        extend(res, styleData);
      }
    }
    return res;
  }

  /*  */

  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function setProp(el, name, val) {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(name, val.replace(importantRE, ''), 'important');
    } else {
      var normalizedName = normalize(name);
      if (Array.isArray(val)) {
        // Support values array created by autoprefixer, e.g.
        // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
        // Set them one by one, and the browser will only set those it can recognize
        for (var i = 0, len = val.length; i < len; i++) {
          el.style[normalizedName] = val[i];
        }
      } else {
        el.style[normalizedName] = val;
      }
    }
  };

  var vendorNames = ['Webkit', 'Moz', 'ms'];

  var emptyStyle;
  var normalize = cached(function (prop) {
    emptyStyle = emptyStyle || document.createElement('div').style;
    prop = camelize(prop);
    if (prop !== 'filter' && prop in emptyStyle) {
      return prop;
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
      var name = vendorNames[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  });

  function updateStyle(oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;

    if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
      return;
    }

    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
    var oldStyle = oldStaticStyle || oldStyleBinding;

    var style = normalizeStyleBinding(vnode.data.style) || {};

    // store normalized style under a different key for next diff
    // make sure to clone it if it's reactive, since the user likley wants
    // to mutate it.
    vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

    var newStyle = getStyle(vnode, true);

    for (name in oldStyle) {
      if (isUndef(newStyle[name])) {
        setProp(el, name, '');
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        // ie9 setting to null has no effect, must use empty string
        setProp(el, name, cur == null ? '' : cur);
      }
    }
  }

  var style = {
    create: updateStyle,
    update: updateStyle
  };

  /*  */

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function addClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return;
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(/\s+/).forEach(function (c) {
          return el.classList.add(c);
        });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      if (cur.indexOf(' ' + cls + ' ') < 0) {
        el.setAttribute('class', (cur + cls).trim());
      }
    }
  }

  /**
   * Remove class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function removeClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return;
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(/\s+/).forEach(function (c) {
          return el.classList.remove(c);
        });
      } else {
        el.classList.remove(cls);
      }
      if (!el.classList.length) {
        el.removeAttribute('class');
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      var tar = ' ' + cls + ' ';
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, ' ');
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute('class', cur);
      } else {
        el.removeAttribute('class');
      }
    }
  }

  /*  */

  function resolveTransition(def$$1) {
    if (!def$$1) {
      return;
    }
    /* istanbul ignore else */
    if ((typeof def$$1 === 'undefined' ? 'undefined' : _typeof(def$$1)) === 'object') {
      var res = {};
      if (def$$1.css !== false) {
        extend(res, autoCssTransition(def$$1.name || 'v'));
      }
      extend(res, def$$1);
      return res;
    } else if (typeof def$$1 === 'string') {
      return autoCssTransition(def$$1);
    }
  }

  var autoCssTransition = cached(function (name) {
    return {
      enterClass: name + "-enter",
      enterToClass: name + "-enter-to",
      enterActiveClass: name + "-enter-active",
      leaveClass: name + "-leave",
      leaveToClass: name + "-leave-to",
      leaveActiveClass: name + "-leave-active"
    };
  });

  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';

  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';
  if (hasTransition) {
    /* istanbul ignore if */
    if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
      transitionProp = 'WebkitTransition';
      transitionEndEvent = 'webkitTransitionEnd';
    }
    if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
      animationProp = 'WebkitAnimation';
      animationEndEvent = 'webkitAnimationEnd';
    }
  }

  // binding to window is necessary to make hot reload work in IE in strict mode
  var raf = inBrowser && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout;

  function nextFrame(fn) {
    raf(function () {
      raf(fn);
    });
  }

  function addTransitionClass(el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
      transitionClasses.push(cls);
      addClass(el, cls);
    }
  }

  function removeTransitionClass(el, cls) {
    if (el._transitionClasses) {
      remove(el._transitionClasses, cls);
    }
    removeClass(el, cls);
  }

  function whenTransitionEnds(el, expectedType, cb) {
    var ref = getTransitionInfo(el, expectedType);
    var type = ref.type;
    var timeout = ref.timeout;
    var propCount = ref.propCount;
    if (!type) {
      return cb();
    }
    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function end() {
      el.removeEventListener(event, onEnd);
      cb();
    };
    var onEnd = function onEnd(e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    setTimeout(function () {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }

  var transformRE = /\b(transform|all)(,|$)/;

  function getTransitionInfo(el, expectedType) {
    var styles = window.getComputedStyle(el);
    var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
    var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = styles[animationProp + 'Delay'].split(', ');
    var animationDurations = styles[animationProp + 'Duration'].split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);

    var type;
    var timeout = 0;
    var propCount = 0;
    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
    return {
      type: type,
      timeout: timeout,
      propCount: propCount,
      hasTransform: hasTransform
    };
  }

  function getTimeout(delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }

    return Math.max.apply(null, durations.map(function (d, i) {
      return toMs(d) + toMs(delays[i]);
    }));
  }

  function toMs(s) {
    return Number(s.slice(0, -1)) * 1000;
  }

  /*  */

  function enter(vnode, toggleDisplay) {
    var el = vnode.elm;

    // call leave callback now
    if (isDef(el._leaveCb)) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return;
    }

    /* istanbul ignore if */
    if (isDef(el._enterCb) || el.nodeType !== 1) {
      return;
    }

    var css = data.css;
    var type = data.type;
    var enterClass = data.enterClass;
    var enterToClass = data.enterToClass;
    var enterActiveClass = data.enterActiveClass;
    var appearClass = data.appearClass;
    var appearToClass = data.appearToClass;
    var appearActiveClass = data.appearActiveClass;
    var beforeEnter = data.beforeEnter;
    var enter = data.enter;
    var afterEnter = data.afterEnter;
    var enterCancelled = data.enterCancelled;
    var beforeAppear = data.beforeAppear;
    var appear = data.appear;
    var afterAppear = data.afterAppear;
    var appearCancelled = data.appearCancelled;
    var duration = data.duration;

    // activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      transitionNode = transitionNode.parent;
      context = transitionNode.context;
    }

    var isAppear = !context._isMounted || !vnode.isRootInsert;

    if (isAppear && !appear && appear !== '') {
      return;
    }

    var startClass = isAppear && appearClass ? appearClass : enterClass;
    var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
    var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

    var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
    var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
    var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
    var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

    var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

    if ("development" !== 'production' && explicitEnterDuration != null) {
      checkDuration(explicitEnterDuration, 'enter', vnode);
    }

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);

    var cb = el._enterCb = once(function () {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }
        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });

    if (!vnode.data.show) {
      // remove pending leave element on enter by injecting an insert hook
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
          pendingNode.elm._leaveCb();
        }
        enterHook && enterHook(el, cb);
      });
    }

    // start enter transition
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame(function () {
        addTransitionClass(el, toClass);
        removeTransitionClass(el, startClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }

    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }

  function leave(vnode, rm) {
    var el = vnode.elm;

    // call enter callback now
    if (isDef(el._enterCb)) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return rm();
    }

    /* istanbul ignore if */
    if (isDef(el._leaveCb) || el.nodeType !== 1) {
      return;
    }

    var css = data.css;
    var type = data.type;
    var leaveClass = data.leaveClass;
    var leaveToClass = data.leaveToClass;
    var leaveActiveClass = data.leaveActiveClass;
    var beforeLeave = data.beforeLeave;
    var leave = data.leave;
    var afterLeave = data.afterLeave;
    var leaveCancelled = data.leaveCancelled;
    var delayLeave = data.delayLeave;
    var duration = data.duration;

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave);

    var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

    if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
      checkDuration(explicitLeaveDuration, 'leave', vnode);
    }

    var cb = el._leaveCb = once(function () {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }
      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }
        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });

    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }

    function performLeave() {
      // the delayed leave may have already been cancelled
      if (cb.cancelled) {
        return;
      }
      // record leaving element
      if (!vnode.data.show) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
      }
      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame(function () {
          addTransitionClass(el, leaveToClass);
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled && !userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        });
      }
      leave && leave(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }

  // only used in dev mode
  function checkDuration(val, name, vnode) {
    if (typeof val !== 'number') {
      warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
    } else if (isNaN(val)) {
      warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
    }
  }

  function isValidDuration(val) {
    return typeof val === 'number' && !isNaN(val);
  }

  /**
   * Normalize a transition hook's argument length. The hook may be:
   * - a merged hook (invoker) with the original in .fns
   * - a wrapped component method (check ._length)
   * - a plain function (.length)
   */
  function getHookArgumentsLength(fn) {
    if (isUndef(fn)) {
      return false;
    }
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
      // invoker
      return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
    } else {
      return (fn._length || fn.length) > 1;
    }
  }

  function _enter(_, vnode) {
    if (vnode.data.show !== true) {
      enter(vnode);
    }
  }

  var transition = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function remove$$1(vnode, rm) {
      /* istanbul ignore else */
      if (vnode.data.show !== true) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};

  var platformModules = [attrs, klass, events, domProps, style, transition];

  /*  */

  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules = platformModules.concat(baseModules);

  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

  /**
   * Not type checking this file because flow doesn't like attaching
   * properties to Elements.
   */

  var isTextInputType = makeMap('text,number,password,search,email,tel,url');

  /* istanbul ignore if */
  if (isIE9) {
    // http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange', function () {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, 'input');
      }
    });
  }

  var model$1 = {
    inserted: function inserted(el, binding, vnode) {
      if (vnode.tag === 'select') {
        var cb = function cb() {
          setSelected(el, binding, vnode.context);
        };
        cb();
        /* istanbul ignore if */
        if (isIE || isEdge) {
          setTimeout(cb, 0);
        }
        el._vOptions = [].map.call(el.options, getValue);
      } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          // Safari < 10.2 & UIWebView doesn't fire compositionend when
          // switching focus before confirming composition choice
          // this also fixes the issue where some browsers e.g. iOS Chrome
          // fires "change" instead of "input" on autocomplete.
          el.addEventListener('change', onCompositionEnd);
          if (!isAndroid) {
            el.addEventListener('compositionstart', onCompositionStart);
            el.addEventListener('compositionend', onCompositionEnd);
          }
          /* istanbul ignore if */
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },
    componentUpdated: function componentUpdated(el, binding, vnode) {
      if (vnode.tag === 'select') {
        setSelected(el, binding, vnode.context);
        // in case the options rendered by v-for have changed,
        // it's possible that the value is out-of-sync with the rendered options.
        // detect such cases and filter out values that no longer has a matching
        // option in the DOM.
        var prevOptions = el._vOptions;
        var curOptions = el._vOptions = [].map.call(el.options, getValue);
        if (curOptions.some(function (o, i) {
          return !looseEqual(o, prevOptions[i]);
        })) {
          trigger(el, 'change');
        }
      }
    }
  };

  function setSelected(el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
      return;
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }
          return;
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }

  function getValue(option) {
    return '_value' in option ? option._value : option.value;
  }

  function onCompositionStart(e) {
    e.target.composing = true;
  }

  function onCompositionEnd(e) {
    // prevent triggering an input event for no reason
    if (!e.target.composing) {
      return;
    }
    e.target.composing = false;
    trigger(e.target, 'input');
  }

  function trigger(el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }

  /*  */

  // recursively search for possible transition defined inside the component root
  function locateNode(vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
  }

  var show = {
    bind: function bind(el, ref, vnode) {
      var value = ref.value;

      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
      if (value && transition$$1) {
        vnode.data.show = true;
        enter(vnode, function () {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : 'none';
      }
    },

    update: function update(el, ref, vnode) {
      var value = ref.value;
      var oldValue = ref.oldValue;

      /* istanbul ignore if */
      if (value === oldValue) {
        return;
      }
      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      if (transition$$1) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function () {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function () {
            el.style.display = 'none';
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : 'none';
      }
    },

    unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };

  var platformDirectives = {
    model: model$1,
    show: show
  };

  /*  */

  // Provides transition support for a single element/component.
  // supports transition mode (out-in / in-out)

  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };

  // in case the child is also an abstract component, e.g. <keep-alive>
  // we want to recursively retrieve the real component to be rendered
  function getRealChild(vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children));
    } else {
      return vnode;
    }
  }

  function extractTransitionData(comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    var listeners = options._parentListeners;
    for (var key$1 in listeners) {
      data[camelize(key$1)] = listeners[key$1];
    }
    return data;
  }

  function placeholder(h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
      return h('keep-alive', {
        props: rawChild.componentOptions.propsData
      });
    }
  }

  function hasParentTransition(vnode) {
    while (vnode = vnode.parent) {
      if (vnode.data.transition) {
        return true;
      }
    }
  }

  function isSameChild(child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag;
  }

  function isAsyncPlaceholder(node) {
    return node.isComment && node.asyncFactory;
  }

  var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,

    render: function render(h) {
      var this$1 = this;

      var children = this.$options._renderChildren;
      if (!children) {
        return;
      }

      // filter out text nodes (possible whitespaces)
      children = children.filter(function (c) {
        return c.tag || isAsyncPlaceholder(c);
      });
      /* istanbul ignore if */
      if (!children.length) {
        return;
      }

      // warn multiple elements
      if ("development" !== 'production' && children.length > 1) {
        warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
      }

      var mode = this.mode;

      // warn invalid mode
      if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
        warn('invalid <transition> mode: ' + mode, this.$parent);
      }

      var rawChild = children[0];

      // if this is a component root node and the component's
      // parent container node also has transition, skip.
      if (hasParentTransition(this.$vnode)) {
        return rawChild;
      }

      // apply transition data to child
      // use getRealChild() to ignore abstract components e.g. keep-alive
      var child = getRealChild(rawChild);
      /* istanbul ignore if */
      if (!child) {
        return rawChild;
      }

      if (this._leaving) {
        return placeholder(h, rawChild);
      }

      // ensure a key that is unique to the vnode type and to this transition
      // component instance. This key will be used to remove pending leaving nodes
      // during entering.
      var id = "__transition-" + this._uid + "-";
      child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);

      // mark v-show
      // so that the transition module can hand over the control to the directive
      if (child.data.directives && child.data.directives.some(function (d) {
        return d.name === 'show';
      })) {
        child.data.show = true;
      }

      if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild)) {
        // replace old child transition data with fresh one
        // important for dynamic transitions!
        var oldData = oldChild && (oldChild.data.transition = extend({}, data));
        // handle transition mode
        if (mode === 'out-in') {
          // return placeholder node and queue update when leave finishes
          this._leaving = true;
          mergeVNodeHook(oldData, 'afterLeave', function () {
            this$1._leaving = false;
            this$1.$forceUpdate();
          });
          return placeholder(h, rawChild);
        } else if (mode === 'in-out') {
          if (isAsyncPlaceholder(child)) {
            return oldRawChild;
          }
          var delayedLeave;
          var performLeave = function performLeave() {
            delayedLeave();
          };
          mergeVNodeHook(data, 'afterEnter', performLeave);
          mergeVNodeHook(data, 'enterCancelled', performLeave);
          mergeVNodeHook(oldData, 'delayLeave', function (leave) {
            delayedLeave = leave;
          });
        }
      }

      return rawChild;
    }
  };

  /*  */

  // Provides transition support for list items.
  // supports move transitions using the FLIP technique.

  // Because the vdom's children update algorithm is "unstable" - i.e.
  // it doesn't guarantee the relative positioning of removed elements,
  // we force transition-group to update its children into two passes:
  // in the first pass, we remove all nodes that need to be removed,
  // triggering their leaving transition; in the second pass, we insert/move
  // into the final desired state. This way in the second pass removed
  // nodes will remain where they should be.

  var props = extend({
    tag: String,
    moveClass: String
  }, transitionProps);

  delete props.mode;

  var TransitionGroup = {
    props: props,

    render: function render(h) {
      var tag = this.tag || this.$vnode.data.tag || 'span';
      var map = Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);

      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
            children.push(c);
            map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
          } else {
            var opts = c.componentOptions;
            var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
            warn("<transition-group> children must be keyed: <" + name + ">");
          }
        }
      }

      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
          var c$1 = prevChildren[i$1];
          c$1.data.transition = transitionData;
          c$1.data.pos = c$1.elm.getBoundingClientRect();
          if (map[c$1.key]) {
            kept.push(c$1);
          } else {
            removed.push(c$1);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }

      return h(tag, null, children);
    },

    beforeUpdate: function beforeUpdate() {
      // force removing pass
      this.__patch__(this._vnode, this.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );
      this._vnode = this.kept;
    },

    updated: function updated() {
      var children = this.prevChildren;
      var moveClass = this.moveClass || (this.name || 'v') + '-move';
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return;
      }

      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);

      // force reflow to put everything in position
      var body = document.body;
      var f = body.offsetHeight; // eslint-disable-line

      children.forEach(function (c) {
        if (c.data.moved) {
          var el = c.elm;
          var s = el.style;
          addTransitionClass(el, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = '';
          el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          });
        }
      });
    },

    methods: {
      hasMove: function hasMove(el, moveClass) {
        /* istanbul ignore if */
        if (!hasTransition) {
          return false;
        }
        /* istanbul ignore if */
        if (this._hasMove) {
          return this._hasMove;
        }
        // Detect whether an element with the move class applied has
        // CSS transitions. Since the element may be inside an entering
        // transition at this very moment, we make a clone of it and remove
        // all other transition classes applied to ensure only the move class
        // is applied.
        var clone = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function (cls) {
            removeClass(clone, cls);
          });
        }
        addClass(clone, moveClass);
        clone.style.display = 'none';
        this.$el.appendChild(clone);
        var info = getTransitionInfo(clone);
        this.$el.removeChild(clone);
        return this._hasMove = info.hasTransform;
      }
    }
  };

  function callPendingCbs(c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }
    /* istanbul ignore if */
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }

  function recordPosition(c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }

  function applyTranslation(c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
      s.transitionDuration = '0s';
    }
  }

  var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
  };

  /*  */

  // install platform specific utils
  Vue$3.config.mustUseProp = mustUseProp;
  Vue$3.config.isReservedTag = isReservedTag;
  Vue$3.config.isReservedAttr = isReservedAttr;
  Vue$3.config.getTagNamespace = getTagNamespace;
  Vue$3.config.isUnknownElement = isUnknownElement;

  // install platform runtime directives & components
  extend(Vue$3.options.directives, platformDirectives);
  extend(Vue$3.options.components, platformComponents);

  // install platform patch function
  Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

  // public mount method
  Vue$3.prototype.$mount = function (el, hydrating) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating);
  };

  // devtools global hook
  /* istanbul ignore next */
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue$3);
      } else if ("development" !== 'production' && isChrome) {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }
    if ("development" !== 'production' && config.productionTip !== false && inBrowser && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);

  /*  */

  // check whether current browser encodes a char inside attribute values
  function shouldDecode(content, encoded) {
    var div = document.createElement('div');
    div.innerHTML = "<div a=\"" + content + "\"/>";
    return div.innerHTML.indexOf(encoded) > 0;
  }

  // #3663
  // IE encodes newlines inside attribute values while other browsers don't
  var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

  /*  */

  var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

  var buildRegex = cached(function (delimiters) {
    var open = delimiters[0].replace(regexEscapeRE, '\\$&');
    var close = delimiters[1].replace(regexEscapeRE, '\\$&');
    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
  });

  function parseText(text, delimiters) {
    var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
    if (!tagRE.test(text)) {
      return;
    }
    var tokens = [];
    var lastIndex = tagRE.lastIndex = 0;
    var match, index;
    while (match = tagRE.exec(text)) {
      index = match.index;
      // push text token
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      // tag token
      var exp = parseFilters(match[1].trim());
      tokens.push("_s(" + exp + ")");
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return tokens.join('+');
  }

  /*  */

  function transformNode(el, options) {
    var warn = options.warn || baseWarn;
    var staticClass = getAndRemoveAttr(el, 'class');
    if ("development" !== 'production' && staticClass) {
      var expression = parseText(staticClass, options.delimiters);
      if (expression) {
        warn("class=\"" + staticClass + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div class="{{ val }}">, use <div :class="val">.');
      }
    }
    if (staticClass) {
      el.staticClass = JSON.stringify(staticClass);
    }
    var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
    if (classBinding) {
      el.classBinding = classBinding;
    }
  }

  function genData(el) {
    var data = '';
    if (el.staticClass) {
      data += "staticClass:" + el.staticClass + ",";
    }
    if (el.classBinding) {
      data += "class:" + el.classBinding + ",";
    }
    return data;
  }

  var klass$1 = {
    staticKeys: ['staticClass'],
    transformNode: transformNode,
    genData: genData
  };

  /*  */

  function transformNode$1(el, options) {
    var warn = options.warn || baseWarn;
    var staticStyle = getAndRemoveAttr(el, 'style');
    if (staticStyle) {
      /* istanbul ignore if */
      {
        var expression = parseText(staticStyle, options.delimiters);
        if (expression) {
          warn("style=\"" + staticStyle + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div style="{{ val }}">, use <div :style="val">.');
        }
      }
      el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
    }

    var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
    if (styleBinding) {
      el.styleBinding = styleBinding;
    }
  }

  function genData$1(el) {
    var data = '';
    if (el.staticStyle) {
      data += "staticStyle:" + el.staticStyle + ",";
    }
    if (el.styleBinding) {
      data += "style:(" + el.styleBinding + "),";
    }
    return data;
  }

  var style$1 = {
    staticKeys: ['staticStyle'],
    transformNode: transformNode$1,
    genData: genData$1
  };

  var modules$1 = [klass$1, style$1];

  /*  */

  function text(el, dir) {
    if (dir.value) {
      addProp(el, 'textContent', "_s(" + dir.value + ")");
    }
  }

  /*  */

  function html(el, dir) {
    if (dir.value) {
      addProp(el, 'innerHTML', "_s(" + dir.value + ")");
    }
  }

  var directives$1 = {
    model: model,
    text: text,
    html: html
  };

  /*  */

  var isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr');

  // Elements that you can, intentionally, leave open
  // (and which close themselves)
  var canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');

  // HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
  // Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
  var isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track');

  /*  */

  var baseOptions = {
    expectHTML: true,
    modules: modules$1,
    directives: directives$1,
    isPreTag: isPreTag,
    isUnaryTag: isUnaryTag,
    mustUseProp: mustUseProp,
    canBeLeftOpenTag: canBeLeftOpenTag,
    isReservedTag: isReservedTag,
    getTagNamespace: getTagNamespace,
    staticKeys: genStaticKeys(modules$1)
  };

  /*  */

  var decoder;

  var he = {
    decode: function decode(html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent;
    }
  };

  /**
   * Not type-checking this file because it's mostly vendor code.
   */

  /*!
   * HTML Parser By John Resig (ejohn.org)
   * Modified by Juriy "kangax" Zaytsev
   * Original code by Erik Arvidsson, Mozilla Public License
   * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
   */

  // Regular Expressions for parsing tags and attributes
  var singleAttrIdentifier = /([^\s"'<>/=]+)/;
  var singleAttrAssign = /(?:=)/;
  var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source];
  var attribute = new RegExp('^\\s*' + singleAttrIdentifier.source + '(?:\\s*(' + singleAttrAssign.source + ')' + '\\s*(?:' + singleAttrValues.join('|') + '))?');

  // could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
  // but for Vue templates we can enforce a simple charset
  var ncname = '[a-zA-Z_][\\w\\-\\.]*';
  var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
  var startTagOpen = new RegExp('^<' + qnameCapture);
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
  var doctype = /^<!DOCTYPE [^>]+>/i;
  var comment = /^<!--/;
  var conditionalComment = /^<!\[/;

  var IS_REGEX_CAPTURING_BROKEN = false;
  'x'.replace(/x(.)?/g, function (m, g) {
    IS_REGEX_CAPTURING_BROKEN = g === '';
  });

  // Special Elements (can contain anything)
  var isPlainTextElement = makeMap('script,style,textarea', true);
  var reCache = {};

  var decodingMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#10;': '\n'
  };
  var encodedAttr = /&(?:lt|gt|quot|amp);/g;
  var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

  // #5992
  var isIgnoreNewlineTag = makeMap('pre,textarea', true);
  var shouldIgnoreFirstNewline = function shouldIgnoreFirstNewline(tag, html) {
    return tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
  };

  function decodeAttr(value, shouldDecodeNewlines) {
    var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
    return value.replace(re, function (match) {
      return decodingMap[match];
    });
  }

  function parseHTML(html, options) {
    var stack = [];
    var expectHTML = options.expectHTML;
    var isUnaryTag$$1 = options.isUnaryTag || no;
    var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
    var index = 0;
    var last, lastTag;
    while (html) {
      last = html;
      // Make sure we're not in a plaintext content element like script/style
      if (!lastTag || !isPlainTextElement(lastTag)) {
        var textEnd = html.indexOf('<');
        if (textEnd === 0) {
          // Comment:
          if (comment.test(html)) {
            var commentEnd = html.indexOf('-->');

            if (commentEnd >= 0) {
              if (options.shouldKeepComment) {
                options.comment(html.substring(4, commentEnd));
              }
              advance(commentEnd + 3);
              continue;
            }
          }

          // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
          if (conditionalComment.test(html)) {
            var conditionalEnd = html.indexOf(']>');

            if (conditionalEnd >= 0) {
              advance(conditionalEnd + 2);
              continue;
            }
          }

          // Doctype:
          var doctypeMatch = html.match(doctype);
          if (doctypeMatch) {
            advance(doctypeMatch[0].length);
            continue;
          }

          // End tag:
          var endTagMatch = html.match(endTag);
          if (endTagMatch) {
            var curIndex = index;
            advance(endTagMatch[0].length);
            parseEndTag(endTagMatch[1], curIndex, index);
            continue;
          }

          // Start tag:
          var startTagMatch = parseStartTag();
          if (startTagMatch) {
            handleStartTag(startTagMatch);
            if (shouldIgnoreFirstNewline(lastTag, html)) {
              advance(1);
            }
            continue;
          }
        }

        var text = void 0,
            rest = void 0,
            next = void 0;
        if (textEnd >= 0) {
          rest = html.slice(textEnd);
          while (!endTag.test(rest) && !startTagOpen.test(rest) && !comment.test(rest) && !conditionalComment.test(rest)) {
            // < in plain text, be forgiving and treat it as text
            next = rest.indexOf('<', 1);
            if (next < 0) {
              break;
            }
            textEnd += next;
            rest = html.slice(textEnd);
          }
          text = html.substring(0, textEnd);
          advance(textEnd);
        }

        if (textEnd < 0) {
          text = html;
          html = '';
        }

        if (options.chars && text) {
          options.chars(text);
        }
      } else {
        var endTagLength = 0;
        var stackedTag = lastTag.toLowerCase();
        var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
        var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
          endTagLength = endTag.length;
          if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
            text = text.replace(/<!--([\s\S]*?)-->/g, '$1').replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
          }
          if (shouldIgnoreFirstNewline(stackedTag, text)) {
            text = text.slice(1);
          }
          if (options.chars) {
            options.chars(text);
          }
          return '';
        });
        index += html.length - rest$1.length;
        html = rest$1;
        parseEndTag(stackedTag, index - endTagLength, index);
      }

      if (html === last) {
        options.chars && options.chars(html);
        if ("development" !== 'production' && !stack.length && options.warn) {
          options.warn("Mal-formatted tag at end of template: \"" + html + "\"");
        }
        break;
      }
    }

    // Clean up any remaining tags
    parseEndTag();

    function advance(n) {
      index += n;
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);
      if (start) {
        var match = {
          tagName: start[1],
          attrs: [],
          start: index
        };
        advance(start[0].length);
        var end, attr;
        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          match.attrs.push(attr);
        }
        if (end) {
          match.unarySlash = end[1];
          advance(end[0].length);
          match.end = index;
          return match;
        }
      }
    }

    function handleStartTag(match) {
      var tagName = match.tagName;
      var unarySlash = match.unarySlash;

      if (expectHTML) {
        if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
          parseEndTag(lastTag);
        }
        if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
          parseEndTag(tagName);
        }
      }

      var unary = isUnaryTag$$1(tagName) || !!unarySlash;

      var l = match.attrs.length;
      var attrs = new Array(l);
      for (var i = 0; i < l; i++) {
        var args = match.attrs[i];
        // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
        if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
          if (args[3] === '') {
            delete args[3];
          }
          if (args[4] === '') {
            delete args[4];
          }
          if (args[5] === '') {
            delete args[5];
          }
        }
        var value = args[3] || args[4] || args[5] || '';
        attrs[i] = {
          name: args[1],
          value: decodeAttr(value, options.shouldDecodeNewlines)
        };
      }

      if (!unary) {
        stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
        lastTag = tagName;
      }

      if (options.start) {
        options.start(tagName, attrs, unary, match.start, match.end);
      }
    }

    function parseEndTag(tagName, start, end) {
      var pos, lowerCasedTagName;
      if (start == null) {
        start = index;
      }
      if (end == null) {
        end = index;
      }

      if (tagName) {
        lowerCasedTagName = tagName.toLowerCase();
      }

      // Find the closest opened tag of the same type
      if (tagName) {
        for (pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos].lowerCasedTag === lowerCasedTagName) {
            break;
          }
        }
      } else {
        // If no tag name is provided, clean shop
        pos = 0;
      }

      if (pos >= 0) {
        // Close all the open elements, up the stack
        for (var i = stack.length - 1; i >= pos; i--) {
          if ("development" !== 'production' && (i > pos || !tagName) && options.warn) {
            options.warn("tag <" + stack[i].tag + "> has no matching end tag.");
          }
          if (options.end) {
            options.end(stack[i].tag, start, end);
          }
        }

        // Remove the open elements from the stack
        stack.length = pos;
        lastTag = pos && stack[pos - 1].tag;
      } else if (lowerCasedTagName === 'br') {
        if (options.start) {
          options.start(tagName, [], true, start, end);
        }
      } else if (lowerCasedTagName === 'p') {
        if (options.start) {
          options.start(tagName, [], false, start, end);
        }
        if (options.end) {
          options.end(tagName, start, end);
        }
      }
    }
  }

  /*  */

  var onRE = /^@|^v-on:/;
  var dirRE = /^v-|^@|^:/;
  var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
  var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

  var argRE = /:(.*)$/;
  var bindRE = /^:|^v-bind:/;
  var modifierRE = /\.[^.]+/g;

  var decodeHTMLCached = cached(he.decode);

  // configurable state
  var warn$2;
  var delimiters;
  var transforms;
  var preTransforms;
  var postTransforms;
  var platformIsPreTag;
  var platformMustUseProp;
  var platformGetTagNamespace;

  /**
   * Convert HTML string to AST.
   */
  function parse(template, options) {
    warn$2 = options.warn || baseWarn;

    platformIsPreTag = options.isPreTag || no;
    platformMustUseProp = options.mustUseProp || no;
    platformGetTagNamespace = options.getTagNamespace || no;

    transforms = pluckModuleFunction(options.modules, 'transformNode');
    preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
    postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

    delimiters = options.delimiters;

    var stack = [];
    var preserveWhitespace = options.preserveWhitespace !== false;
    var root;
    var currentParent;
    var inVPre = false;
    var inPre = false;
    var warned = false;

    function warnOnce(msg) {
      if (!warned) {
        warned = true;
        warn$2(msg);
      }
    }

    function endPre(element) {
      // check pre state
      if (element.pre) {
        inVPre = false;
      }
      if (platformIsPreTag(element.tag)) {
        inPre = false;
      }
    }

    parseHTML(template, {
      warn: warn$2,
      expectHTML: options.expectHTML,
      isUnaryTag: options.isUnaryTag,
      canBeLeftOpenTag: options.canBeLeftOpenTag,
      shouldDecodeNewlines: options.shouldDecodeNewlines,
      shouldKeepComment: options.comments,
      start: function start(tag, attrs, unary) {
        // check namespace.
        // inherit parent ns if there is one
        var ns = currentParent && currentParent.ns || platformGetTagNamespace(tag);

        // handle IE svg bug
        /* istanbul ignore if */
        if (isIE && ns === 'svg') {
          attrs = guardIESVGBug(attrs);
        }

        var element = {
          type: 1,
          tag: tag,
          attrsList: attrs,
          attrsMap: makeAttrsMap(attrs),
          parent: currentParent,
          children: []
        };
        if (ns) {
          element.ns = ns;
        }

        if (isForbiddenTag(element) && !isServerRendering()) {
          element.forbidden = true;
          "development" !== 'production' && warn$2('Templates should only be responsible for mapping the state to the ' + 'UI. Avoid placing tags with side-effects in your templates, such as ' + "<" + tag + ">" + ', as they will not be parsed.');
        }

        // apply pre-transforms
        for (var i = 0; i < preTransforms.length; i++) {
          preTransforms[i](element, options);
        }

        if (!inVPre) {
          processPre(element);
          if (element.pre) {
            inVPre = true;
          }
        }
        if (platformIsPreTag(element.tag)) {
          inPre = true;
        }
        if (inVPre) {
          processRawAttrs(element);
        } else {
          processFor(element);
          processIf(element);
          processOnce(element);
          processKey(element);

          // determine whether this is a plain element after
          // removing structural attributes
          element.plain = !element.key && !attrs.length;

          processRef(element);
          processSlot(element);
          processComponent(element);
          for (var i$1 = 0; i$1 < transforms.length; i$1++) {
            transforms[i$1](element, options);
          }
          processAttrs(element);
        }

        function checkRootConstraints(el) {
          {
            if (el.tag === 'slot' || el.tag === 'template') {
              warnOnce("Cannot use <" + el.tag + "> as component root element because it may " + 'contain multiple nodes.');
            }
            if (el.attrsMap.hasOwnProperty('v-for')) {
              warnOnce('Cannot use v-for on stateful component root element because ' + 'it renders multiple elements.');
            }
          }
        }

        // tree management
        if (!root) {
          root = element;
          checkRootConstraints(root);
        } else if (!stack.length) {
          // allow root elements with v-if, v-else-if and v-else
          if (root.if && (element.elseif || element.else)) {
            checkRootConstraints(element);
            addIfCondition(root, {
              exp: element.elseif,
              block: element
            });
          } else {
            warnOnce("Component template should contain exactly one root element. " + "If you are using v-if on multiple elements, " + "use v-else-if to chain them instead.");
          }
        }
        if (currentParent && !element.forbidden) {
          if (element.elseif || element.else) {
            processIfConditions(element, currentParent);
          } else if (element.slotScope) {
            // scoped slot
            currentParent.plain = false;
            var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
          } else {
            currentParent.children.push(element);
            element.parent = currentParent;
          }
        }
        if (!unary) {
          currentParent = element;
          stack.push(element);
        } else {
          endPre(element);
        }
        // apply post-transforms
        for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
          postTransforms[i$2](element, options);
        }
      },

      end: function end() {
        // remove trailing whitespace
        var element = stack[stack.length - 1];
        var lastNode = element.children[element.children.length - 1];
        if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
          element.children.pop();
        }
        // pop stack
        stack.length -= 1;
        currentParent = stack[stack.length - 1];
        endPre(element);
      },

      chars: function chars(text) {
        if (!currentParent) {
          {
            if (text === template) {
              warnOnce('Component template requires a root element, rather than just text.');
            } else if (text = text.trim()) {
              warnOnce("text \"" + text + "\" outside root element will be ignored.");
            }
          }
          return;
        }
        // IE textarea placeholder bug
        /* istanbul ignore if */
        if (isIE && currentParent.tag === 'textarea' && currentParent.attrsMap.placeholder === text) {
          return;
        }
        var children = currentParent.children;
        text = inPre || text.trim() ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
        if (text) {
          var expression;
          if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
            children.push({
              type: 2,
              expression: expression,
              text: text
            });
          } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
            children.push({
              type: 3,
              text: text
            });
          }
        }
      },
      comment: function comment(text) {
        currentParent.children.push({
          type: 3,
          text: text,
          isComment: true
        });
      }
    });
    return root;
  }

  function processPre(el) {
    if (getAndRemoveAttr(el, 'v-pre') != null) {
      el.pre = true;
    }
  }

  function processRawAttrs(el) {
    var l = el.attrsList.length;
    if (l) {
      var attrs = el.attrs = new Array(l);
      for (var i = 0; i < l; i++) {
        attrs[i] = {
          name: el.attrsList[i].name,
          value: JSON.stringify(el.attrsList[i].value)
        };
      }
    } else if (!el.pre) {
      // non root node in pre blocks with no attributes
      el.plain = true;
    }
  }

  function processKey(el) {
    var exp = getBindingAttr(el, 'key');
    if (exp) {
      if ("development" !== 'production' && el.tag === 'template') {
        warn$2("<template> cannot be keyed. Place the key on real elements instead.");
      }
      el.key = exp;
    }
  }

  function processRef(el) {
    var ref = getBindingAttr(el, 'ref');
    if (ref) {
      el.ref = ref;
      el.refInFor = checkInFor(el);
    }
  }

  function processFor(el) {
    var exp;
    if (exp = getAndRemoveAttr(el, 'v-for')) {
      var inMatch = exp.match(forAliasRE);
      if (!inMatch) {
        "development" !== 'production' && warn$2("Invalid v-for expression: " + exp);
        return;
      }
      el.for = inMatch[2].trim();
      var alias = inMatch[1].trim();
      var iteratorMatch = alias.match(forIteratorRE);
      if (iteratorMatch) {
        el.alias = iteratorMatch[1].trim();
        el.iterator1 = iteratorMatch[2].trim();
        if (iteratorMatch[3]) {
          el.iterator2 = iteratorMatch[3].trim();
        }
      } else {
        el.alias = alias;
      }
    }
  }

  function processIf(el) {
    var exp = getAndRemoveAttr(el, 'v-if');
    if (exp) {
      el.if = exp;
      addIfCondition(el, {
        exp: exp,
        block: el
      });
    } else {
      if (getAndRemoveAttr(el, 'v-else') != null) {
        el.else = true;
      }
      var elseif = getAndRemoveAttr(el, 'v-else-if');
      if (elseif) {
        el.elseif = elseif;
      }
    }
  }

  function processIfConditions(el, parent) {
    var prev = findPrevElement(parent.children);
    if (prev && prev.if) {
      addIfCondition(prev, {
        exp: el.elseif,
        block: el
      });
    } else {
      warn$2("v-" + (el.elseif ? 'else-if="' + el.elseif + '"' : 'else') + " " + "used on element <" + el.tag + "> without corresponding v-if.");
    }
  }

  function findPrevElement(children) {
    var i = children.length;
    while (i--) {
      if (children[i].type === 1) {
        return children[i];
      } else {
        if ("development" !== 'production' && children[i].text !== ' ') {
          warn$2("text \"" + children[i].text.trim() + "\" between v-if and v-else(-if) " + "will be ignored.");
        }
        children.pop();
      }
    }
  }

  function addIfCondition(el, condition) {
    if (!el.ifConditions) {
      el.ifConditions = [];
    }
    el.ifConditions.push(condition);
  }

  function processOnce(el) {
    var once$$1 = getAndRemoveAttr(el, 'v-once');
    if (once$$1 != null) {
      el.once = true;
    }
  }

  function processSlot(el) {
    if (el.tag === 'slot') {
      el.slotName = getBindingAttr(el, 'name');
      if ("development" !== 'production' && el.key) {
        warn$2("`key` does not work on <slot> because slots are abstract outlets " + "and can possibly expand into multiple elements. " + "Use the key on a wrapping element instead.");
      }
    } else {
      var slotTarget = getBindingAttr(el, 'slot');
      if (slotTarget) {
        el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      }
      if (el.tag === 'template') {
        el.slotScope = getAndRemoveAttr(el, 'scope');
      }
    }
  }

  function processComponent(el) {
    var binding;
    if (binding = getBindingAttr(el, 'is')) {
      el.component = binding;
    }
    if (getAndRemoveAttr(el, 'inline-template') != null) {
      el.inlineTemplate = true;
    }
  }

  function processAttrs(el) {
    var list = el.attrsList;
    var i, l, name, rawName, value, modifiers, isProp;
    for (i = 0, l = list.length; i < l; i++) {
      name = rawName = list[i].name;
      value = list[i].value;
      if (dirRE.test(name)) {
        // mark element as dynamic
        el.hasBindings = true;
        // modifiers
        modifiers = parseModifiers(name);
        if (modifiers) {
          name = name.replace(modifierRE, '');
        }
        if (bindRE.test(name)) {
          // v-bind
          name = name.replace(bindRE, '');
          value = parseFilters(value);
          isProp = false;
          if (modifiers) {
            if (modifiers.prop) {
              isProp = true;
              name = camelize(name);
              if (name === 'innerHtml') {
                name = 'innerHTML';
              }
            }
            if (modifiers.camel) {
              name = camelize(name);
            }
            if (modifiers.sync) {
              addHandler(el, "update:" + camelize(name), genAssignmentCode(value, "$event"));
            }
          }
          if (isProp || !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
            addProp(el, name, value);
          } else {
            addAttr(el, name, value);
          }
        } else if (onRE.test(name)) {
          // v-on
          name = name.replace(onRE, '');
          addHandler(el, name, value, modifiers, false, warn$2);
        } else {
          // normal directives
          name = name.replace(dirRE, '');
          // parse arg
          var argMatch = name.match(argRE);
          var arg = argMatch && argMatch[1];
          if (arg) {
            name = name.slice(0, -(arg.length + 1));
          }
          addDirective(el, name, rawName, value, arg, modifiers);
          if ("development" !== 'production' && name === 'model') {
            checkForAliasModel(el, value);
          }
        }
      } else {
        // literal attribute
        {
          var expression = parseText(value, delimiters);
          if (expression) {
            warn$2(name + "=\"" + value + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div id="{{ val }}">, use <div :id="val">.');
          }
        }
        addAttr(el, name, JSON.stringify(value));
      }
    }
  }

  function checkInFor(el) {
    var parent = el;
    while (parent) {
      if (parent.for !== undefined) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }

  function parseModifiers(name) {
    var match = name.match(modifierRE);
    if (match) {
      var ret = {};
      match.forEach(function (m) {
        ret[m.slice(1)] = true;
      });
      return ret;
    }
  }

  function makeAttrsMap(attrs) {
    var map = {};
    for (var i = 0, l = attrs.length; i < l; i++) {
      if ("development" !== 'production' && map[attrs[i].name] && !isIE && !isEdge) {
        warn$2('duplicate attribute: ' + attrs[i].name);
      }
      map[attrs[i].name] = attrs[i].value;
    }
    return map;
  }

  // for script (e.g. type="x/template") or style, do not decode content
  function isTextTag(el) {
    return el.tag === 'script' || el.tag === 'style';
  }

  function isForbiddenTag(el) {
    return el.tag === 'style' || el.tag === 'script' && (!el.attrsMap.type || el.attrsMap.type === 'text/javascript');
  }

  var ieNSBug = /^xmlns:NS\d+/;
  var ieNSPrefix = /^NS\d+:/;

  /* istanbul ignore next */
  function guardIESVGBug(attrs) {
    var res = [];
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      if (!ieNSBug.test(attr.name)) {
        attr.name = attr.name.replace(ieNSPrefix, '');
        res.push(attr);
      }
    }
    return res;
  }

  function checkForAliasModel(el, value) {
    var _el = el;
    while (_el) {
      if (_el.for && _el.alias === value) {
        warn$2("<" + el.tag + " v-model=\"" + value + "\">: " + "You are binding v-model directly to a v-for iteration alias. " + "This will not be able to modify the v-for source array because " + "writing to the alias is like modifying a function local variable. " + "Consider using an array of objects and use v-model on an object property instead.");
      }
      _el = _el.parent;
    }
  }

  /*  */

  var isStaticKey;
  var isPlatformReservedTag;

  var genStaticKeysCached = cached(genStaticKeys$1);

  /**
   * Goal of the optimizer: walk the generated template AST tree
   * and detect sub-trees that are purely static, i.e. parts of
   * the DOM that never needs to change.
   *
   * Once we detect these sub-trees, we can:
   *
   * 1. Hoist them into constants, so that we no longer need to
   *    create fresh nodes for them on each re-render;
   * 2. Completely skip them in the patching process.
   */
  function optimize(root, options) {
    if (!root) {
      return;
    }
    isStaticKey = genStaticKeysCached(options.staticKeys || '');
    isPlatformReservedTag = options.isReservedTag || no;
    // first pass: mark all non-static nodes.
    markStatic$1(root);
    // second pass: mark static roots.
    markStaticRoots(root, false);
  }

  function genStaticKeys$1(keys) {
    return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs' + (keys ? ',' + keys : ''));
  }

  function markStatic$1(node) {
    node.static = isStatic(node);
    if (node.type === 1) {
      // do not make component slot content static. this avoids
      // 1. components not able to mutate slot nodes
      // 2. static slot content fails for hot-reloading
      if (!isPlatformReservedTag(node.tag) && node.tag !== 'slot' && node.attrsMap['inline-template'] == null) {
        return;
      }
      for (var i = 0, l = node.children.length; i < l; i++) {
        var child = node.children[i];
        markStatic$1(child);
        if (!child.static) {
          node.static = false;
        }
      }
      if (node.ifConditions) {
        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
          var block = node.ifConditions[i$1].block;
          markStatic$1(block);
          if (!block.static) {
            node.static = false;
          }
        }
      }
    }
  }

  function markStaticRoots(node, isInFor) {
    if (node.type === 1) {
      if (node.static || node.once) {
        node.staticInFor = isInFor;
      }
      // For a node to qualify as a static root, it should have children that
      // are not just static text. Otherwise the cost of hoisting out will
      // outweigh the benefits and it's better off to just always render it fresh.
      if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
        node.staticRoot = true;
        return;
      } else {
        node.staticRoot = false;
      }
      if (node.children) {
        for (var i = 0, l = node.children.length; i < l; i++) {
          markStaticRoots(node.children[i], isInFor || !!node.for);
        }
      }
      if (node.ifConditions) {
        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
          markStaticRoots(node.ifConditions[i$1].block, isInFor);
        }
      }
    }
  }

  function isStatic(node) {
    if (node.type === 2) {
      // expression
      return false;
    }
    if (node.type === 3) {
      // text
      return true;
    }
    return !!(node.pre || !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) && Object.keys(node).every(isStaticKey));
  }

  function isDirectChildOfTemplateFor(node) {
    while (node.parent) {
      node = node.parent;
      if (node.tag !== 'template') {
        return false;
      }
      if (node.for) {
        return true;
      }
    }
    return false;
  }

  /*  */

  var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
  var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

  // keyCode aliases
  var keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    'delete': [8, 46]
  };

  // #4868: modifiers that prevent the execution of the listener
  // need to explicitly return null so that we can determine whether to remove
  // the listener for .once
  var genGuard = function genGuard(condition) {
    return "if(" + condition + ")return null;";
  };

  var modifierCode = {
    stop: '$event.stopPropagation();',
    prevent: '$event.preventDefault();',
    self: genGuard("$event.target !== $event.currentTarget"),
    ctrl: genGuard("!$event.ctrlKey"),
    shift: genGuard("!$event.shiftKey"),
    alt: genGuard("!$event.altKey"),
    meta: genGuard("!$event.metaKey"),
    left: genGuard("'button' in $event && $event.button !== 0"),
    middle: genGuard("'button' in $event && $event.button !== 1"),
    right: genGuard("'button' in $event && $event.button !== 2")
  };

  function genHandlers(events, isNative, warn) {
    var res = isNative ? 'nativeOn:{' : 'on:{';
    for (var name in events) {
      var handler = events[name];
      // #5330: warn click.right, since right clicks do not actually fire click events.
      if ("development" !== 'production' && name === 'click' && handler && handler.modifiers && handler.modifiers.right) {
        warn("Use \"contextmenu\" instead of \"click.right\" since right clicks " + "do not actually fire \"click\" events.");
      }
      res += "\"" + name + "\":" + genHandler(name, handler) + ",";
    }
    return res.slice(0, -1) + '}';
  }

  function genHandler(name, handler) {
    if (!handler) {
      return 'function(){}';
    }

    if (Array.isArray(handler)) {
      return "[" + handler.map(function (handler) {
        return genHandler(name, handler);
      }).join(',') + "]";
    }

    var isMethodPath = simplePathRE.test(handler.value);
    var isFunctionExpression = fnExpRE.test(handler.value);

    if (!handler.modifiers) {
      return isMethodPath || isFunctionExpression ? handler.value : "function($event){" + handler.value + "}"; // inline statement
    } else {
      var code = '';
      var genModifierCode = '';
      var keys = [];
      for (var key in handler.modifiers) {
        if (modifierCode[key]) {
          genModifierCode += modifierCode[key];
          // left/right
          if (keyCodes[key]) {
            keys.push(key);
          }
        } else {
          keys.push(key);
        }
      }
      if (keys.length) {
        code += genKeyFilter(keys);
      }
      // Make sure modifiers like prevent and stop get executed after key filtering
      if (genModifierCode) {
        code += genModifierCode;
      }
      var handlerCode = isMethodPath ? handler.value + '($event)' : isFunctionExpression ? "(" + handler.value + ")($event)" : handler.value;
      return "function($event){" + code + handlerCode + "}";
    }
  }

  function genKeyFilter(keys) {
    return "if(!('button' in $event)&&" + keys.map(genFilterCode).join('&&') + ")return null;";
  }

  function genFilterCode(key) {
    var keyVal = parseInt(key, 10);
    if (keyVal) {
      return "$event.keyCode!==" + keyVal;
    }
    var alias = keyCodes[key];
    return "_k($event.keyCode," + JSON.stringify(key) + (alias ? ',' + JSON.stringify(alias) : '') + ")";
  }

  /*  */

  function on(el, dir) {
    if ("development" !== 'production' && dir.modifiers) {
      warn("v-on without argument does not support modifiers.");
    }
    el.wrapListeners = function (code) {
      return "_g(" + code + "," + dir.value + ")";
    };
  }

  /*  */

  function bind$1(el, dir) {
    el.wrapData = function (code) {
      return "_b(" + code + ",'" + el.tag + "'," + dir.value + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")";
    };
  }

  /*  */

  var baseDirectives = {
    on: on,
    bind: bind$1,
    cloak: noop
  };

  /*  */

  var CodegenState = function CodegenState(options) {
    this.options = options;
    this.warn = options.warn || baseWarn;
    this.transforms = pluckModuleFunction(options.modules, 'transformCode');
    this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
    this.directives = extend(extend({}, baseDirectives), options.directives);
    var isReservedTag = options.isReservedTag || no;
    this.maybeComponent = function (el) {
      return !isReservedTag(el.tag);
    };
    this.onceId = 0;
    this.staticRenderFns = [];
  };

  function generate(ast, options) {
    var state = new CodegenState(options);
    var code = ast ? genElement(ast, state) : '_c("div")';
    return {
      render: "with(this){return " + code + "}",
      staticRenderFns: state.staticRenderFns
    };
  }

  function genElement(el, state) {
    if (el.staticRoot && !el.staticProcessed) {
      return genStatic(el, state);
    } else if (el.once && !el.onceProcessed) {
      return genOnce(el, state);
    } else if (el.for && !el.forProcessed) {
      return genFor(el, state);
    } else if (el.if && !el.ifProcessed) {
      return genIf(el, state);
    } else if (el.tag === 'template' && !el.slotTarget) {
      return genChildren(el, state) || 'void 0';
    } else if (el.tag === 'slot') {
      return genSlot(el, state);
    } else {
      // component or element
      var code;
      if (el.component) {
        code = genComponent(el.component, el, state);
      } else {
        var data = el.plain ? undefined : genData$2(el, state);

        var children = el.inlineTemplate ? null : genChildren(el, state, true);
        code = "_c('" + el.tag + "'" + (data ? "," + data : '') + (children ? "," + children : '') + ")";
      }
      // module transforms
      for (var i = 0; i < state.transforms.length; i++) {
        code = state.transforms[i](el, code);
      }
      return code;
    }
  }

  // hoist static sub-trees out
  function genStatic(el, state) {
    el.staticProcessed = true;
    state.staticRenderFns.push("with(this){return " + genElement(el, state) + "}");
    return "_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")";
  }

  // v-once
  function genOnce(el, state) {
    el.onceProcessed = true;
    if (el.if && !el.ifProcessed) {
      return genIf(el, state);
    } else if (el.staticInFor) {
      var key = '';
      var parent = el.parent;
      while (parent) {
        if (parent.for) {
          key = parent.key;
          break;
        }
        parent = parent.parent;
      }
      if (!key) {
        "development" !== 'production' && state.warn("v-once can only be used inside v-for that is keyed. ");
        return genElement(el, state);
      }
      return "_o(" + genElement(el, state) + "," + state.onceId++ + (key ? "," + key : "") + ")";
    } else {
      return genStatic(el, state);
    }
  }

  function genIf(el, state, altGen, altEmpty) {
    el.ifProcessed = true; // avoid recursion
    return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
  }

  function genIfConditions(conditions, state, altGen, altEmpty) {
    if (!conditions.length) {
      return altEmpty || '_e()';
    }

    var condition = conditions.shift();
    if (condition.exp) {
      return "(" + condition.exp + ")?" + genTernaryExp(condition.block) + ":" + genIfConditions(conditions, state, altGen, altEmpty);
    } else {
      return "" + genTernaryExp(condition.block);
    }

    // v-if with v-once should generate code like (a)?_m(0):_m(1)
    function genTernaryExp(el) {
      return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
    }
  }

  function genFor(el, state, altGen, altHelper) {
    var exp = el.for;
    var alias = el.alias;
    var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
    var iterator2 = el.iterator2 ? "," + el.iterator2 : '';

    if ("development" !== 'production' && state.maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key) {
      state.warn("<" + el.tag + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " + "v-for should have explicit keys. " + "See https://vuejs.org/guide/list.html#key for more info.", true /* tip */
      );
    }

    el.forProcessed = true; // avoid recursion
    return (altHelper || '_l') + "((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + (altGen || genElement)(el, state) + '})';
  }

  function genData$2(el, state) {
    var data = '{';

    // directives first.
    // directives may mutate the el's other properties before they are generated.
    var dirs = genDirectives(el, state);
    if (dirs) {
      data += dirs + ',';
    }

    // key
    if (el.key) {
      data += "key:" + el.key + ",";
    }
    // ref
    if (el.ref) {
      data += "ref:" + el.ref + ",";
    }
    if (el.refInFor) {
      data += "refInFor:true,";
    }
    // pre
    if (el.pre) {
      data += "pre:true,";
    }
    // record original tag name for components using "is" attribute
    if (el.component) {
      data += "tag:\"" + el.tag + "\",";
    }
    // module data generation functions
    for (var i = 0; i < state.dataGenFns.length; i++) {
      data += state.dataGenFns[i](el);
    }
    // attributes
    if (el.attrs) {
      data += "attrs:{" + genProps(el.attrs) + "},";
    }
    // DOM props
    if (el.props) {
      data += "domProps:{" + genProps(el.props) + "},";
    }
    // event handlers
    if (el.events) {
      data += genHandlers(el.events, false, state.warn) + ",";
    }
    if (el.nativeEvents) {
      data += genHandlers(el.nativeEvents, true, state.warn) + ",";
    }
    // slot target
    if (el.slotTarget) {
      data += "slot:" + el.slotTarget + ",";
    }
    // scoped slots
    if (el.scopedSlots) {
      data += genScopedSlots(el.scopedSlots, state) + ",";
    }
    // component v-model
    if (el.model) {
      data += "model:{value:" + el.model.value + ",callback:" + el.model.callback + ",expression:" + el.model.expression + "},";
    }
    // inline-template
    if (el.inlineTemplate) {
      var inlineTemplate = genInlineTemplate(el, state);
      if (inlineTemplate) {
        data += inlineTemplate + ",";
      }
    }
    data = data.replace(/,$/, '') + '}';
    // v-bind data wrap
    if (el.wrapData) {
      data = el.wrapData(data);
    }
    // v-on data wrap
    if (el.wrapListeners) {
      data = el.wrapListeners(data);
    }
    return data;
  }

  function genDirectives(el, state) {
    var dirs = el.directives;
    if (!dirs) {
      return;
    }
    var res = 'directives:[';
    var hasRuntime = false;
    var i, l, dir, needRuntime;
    for (i = 0, l = dirs.length; i < l; i++) {
      dir = dirs[i];
      needRuntime = true;
      var gen = state.directives[dir.name];
      if (gen) {
        // compile-time directive that manipulates AST.
        // returns true if it also needs a runtime counterpart.
        needRuntime = !!gen(el, dir, state.warn);
      }
      if (needRuntime) {
        hasRuntime = true;
        res += "{name:\"" + dir.name + "\",rawName:\"" + dir.rawName + "\"" + (dir.value ? ",value:(" + dir.value + "),expression:" + JSON.stringify(dir.value) : '') + (dir.arg ? ",arg:\"" + dir.arg + "\"" : '') + (dir.modifiers ? ",modifiers:" + JSON.stringify(dir.modifiers) : '') + "},";
      }
    }
    if (hasRuntime) {
      return res.slice(0, -1) + ']';
    }
  }

  function genInlineTemplate(el, state) {
    var ast = el.children[0];
    if ("development" !== 'production' && (el.children.length > 1 || ast.type !== 1)) {
      state.warn('Inline-template components must have exactly one child element.');
    }
    if (ast.type === 1) {
      var inlineRenderFns = generate(ast, state.options);
      return "inlineTemplate:{render:function(){" + inlineRenderFns.render + "},staticRenderFns:[" + inlineRenderFns.staticRenderFns.map(function (code) {
        return "function(){" + code + "}";
      }).join(',') + "]}";
    }
  }

  function genScopedSlots(slots, state) {
    return "scopedSlots:_u([" + Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state);
    }).join(',') + "])";
  }

  function genScopedSlot(key, el, state) {
    if (el.for && !el.forProcessed) {
      return genForScopedSlot(key, el, state);
    }
    return "{key:" + key + ",fn:function(" + String(el.attrsMap.scope) + "){" + "return " + (el.tag === 'template' ? genChildren(el, state) || 'void 0' : genElement(el, state)) + "}}";
  }

  function genForScopedSlot(key, el, state) {
    var exp = el.for;
    var alias = el.alias;
    var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
    var iterator2 = el.iterator2 ? "," + el.iterator2 : '';
    el.forProcessed = true; // avoid recursion
    return "_l((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + genScopedSlot(key, el, state) + '})';
  }

  function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
    var children = el.children;
    if (children.length) {
      var el$1 = children[0];
      // optimize single v-for
      if (children.length === 1 && el$1.for && el$1.tag !== 'template' && el$1.tag !== 'slot') {
        return (altGenElement || genElement)(el$1, state);
      }
      var normalizationType = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0;
      var gen = altGenNode || genNode;
      return "[" + children.map(function (c) {
        return gen(c, state);
      }).join(',') + "]" + (normalizationType ? "," + normalizationType : '');
    }
  }

  // determine the normalization needed for the children array.
  // 0: no normalization needed
  // 1: simple normalization needed (possible 1-level deep nested array)
  // 2: full normalization needed
  function getNormalizationType(children, maybeComponent) {
    var res = 0;
    for (var i = 0; i < children.length; i++) {
      var el = children[i];
      if (el.type !== 1) {
        continue;
      }
      if (needsNormalization(el) || el.ifConditions && el.ifConditions.some(function (c) {
        return needsNormalization(c.block);
      })) {
        res = 2;
        break;
      }
      if (maybeComponent(el) || el.ifConditions && el.ifConditions.some(function (c) {
        return maybeComponent(c.block);
      })) {
        res = 1;
      }
    }
    return res;
  }

  function needsNormalization(el) {
    return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
  }

  function genNode(node, state) {
    if (node.type === 1) {
      return genElement(node, state);
    }if (node.type === 3 && node.isComment) {
      return genComment(node);
    } else {
      return genText(node);
    }
  }

  function genText(text) {
    return "_v(" + (text.type === 2 ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")";
  }

  function genComment(comment) {
    return "_e(" + JSON.stringify(comment.text) + ")";
  }

  function genSlot(el, state) {
    var slotName = el.slotName || '"default"';
    var children = genChildren(el, state);
    var res = "_t(" + slotName + (children ? "," + children : '');
    var attrs = el.attrs && "{" + el.attrs.map(function (a) {
      return camelize(a.name) + ":" + a.value;
    }).join(',') + "}";
    var bind$$1 = el.attrsMap['v-bind'];
    if ((attrs || bind$$1) && !children) {
      res += ",null";
    }
    if (attrs) {
      res += "," + attrs;
    }
    if (bind$$1) {
      res += (attrs ? '' : ',null') + "," + bind$$1;
    }
    return res + ')';
  }

  // componentName is el.component, take it as argument to shun flow's pessimistic refinement
  function genComponent(componentName, el, state) {
    var children = el.inlineTemplate ? null : genChildren(el, state, true);
    return "_c(" + componentName + "," + genData$2(el, state) + (children ? "," + children : '') + ")";
  }

  function genProps(props) {
    var res = '';
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      res += "\"" + prop.name + "\":" + transformSpecialNewlines(prop.value) + ",";
    }
    return res.slice(0, -1);
  }

  // #3895, #4268
  function transformSpecialNewlines(text) {
    return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  }

  /*  */

  // these keywords should not appear inside expressions, but operators like
  // typeof, instanceof and in are allowed
  var prohibitedKeywordRE = new RegExp('\\b' + ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' + 'super,throw,while,yield,delete,export,import,return,switch,default,' + 'extends,finally,continue,debugger,function,arguments').split(',').join('\\b|\\b') + '\\b');

  // these unary operators should not be used as property/method names
  var unaryOperatorsRE = new RegExp('\\b' + 'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

  // check valid identifier for v-for
  var identRE = /[A-Za-z_$][\w$]*/;

  // strip strings in expressions
  var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

  // detect problematic expressions in a template
  function detectErrors(ast) {
    var errors = [];
    if (ast) {
      checkNode(ast, errors);
    }
    return errors;
  }

  function checkNode(node, errors) {
    if (node.type === 1) {
      for (var name in node.attrsMap) {
        if (dirRE.test(name)) {
          var value = node.attrsMap[name];
          if (value) {
            if (name === 'v-for') {
              checkFor(node, "v-for=\"" + value + "\"", errors);
            } else if (onRE.test(name)) {
              checkEvent(value, name + "=\"" + value + "\"", errors);
            } else {
              checkExpression(value, name + "=\"" + value + "\"", errors);
            }
          }
        }
      }
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          checkNode(node.children[i], errors);
        }
      }
    } else if (node.type === 2) {
      checkExpression(node.expression, node.text, errors);
    }
  }

  function checkEvent(exp, text, errors) {
    var stipped = exp.replace(stripStringRE, '');
    var keywordMatch = stipped.match(unaryOperatorsRE);
    if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
      errors.push("avoid using JavaScript unary operator as property name: " + "\"" + keywordMatch[0] + "\" in expression " + text.trim());
    }
    checkExpression(exp, text, errors);
  }

  function checkFor(node, text, errors) {
    checkExpression(node.for || '', text, errors);
    checkIdentifier(node.alias, 'v-for alias', text, errors);
    checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
    checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
  }

  function checkIdentifier(ident, type, text, errors) {
    if (typeof ident === 'string' && !identRE.test(ident)) {
      errors.push("invalid " + type + " \"" + ident + "\" in expression: " + text.trim());
    }
  }

  function checkExpression(exp, text, errors) {
    try {
      new Function("return " + exp);
    } catch (e) {
      var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
      if (keywordMatch) {
        errors.push("avoid using JavaScript keyword as property name: " + "\"" + keywordMatch[0] + "\" in expression " + text.trim());
      } else {
        errors.push("invalid expression: " + text.trim());
      }
    }
  }

  /*  */

  function createFunction(code, errors) {
    try {
      return new Function(code);
    } catch (err) {
      errors.push({ err: err, code: code });
      return noop;
    }
  }

  function createCompileToFunctionFn(compile) {
    var cache = Object.create(null);

    return function compileToFunctions(template, options, vm) {
      options = options || {};

      /* istanbul ignore if */
      {
        // detect possible CSP restriction
        try {
          new Function('return 1');
        } catch (e) {
          if (e.toString().match(/unsafe-eval|CSP/)) {
            warn('It seems you are using the standalone build of Vue.js in an ' + 'environment with Content Security Policy that prohibits unsafe-eval. ' + 'The template compiler cannot work in this environment. Consider ' + 'relaxing the policy to allow unsafe-eval or pre-compiling your ' + 'templates into render functions.');
          }
        }
      }

      // check cache
      var key = options.delimiters ? String(options.delimiters) + template : template;
      if (cache[key]) {
        return cache[key];
      }

      // compile
      var compiled = compile(template, options);

      // check compilation errors/tips
      {
        if (compiled.errors && compiled.errors.length) {
          warn("Error compiling template:\n\n" + template + "\n\n" + compiled.errors.map(function (e) {
            return "- " + e;
          }).join('\n') + '\n', vm);
        }
        if (compiled.tips && compiled.tips.length) {
          compiled.tips.forEach(function (msg) {
            return tip(msg, vm);
          });
        }
      }

      // turn code into functions
      var res = {};
      var fnGenErrors = [];
      res.render = createFunction(compiled.render, fnGenErrors);
      res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
        return createFunction(code, fnGenErrors);
      });

      // check function generation errors.
      // this should only happen if there is a bug in the compiler itself.
      // mostly for codegen development use
      /* istanbul ignore if */
      {
        if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
          warn("Failed to generate render function:\n\n" + fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return err.toString() + " in\n\n" + code + "\n";
          }).join('\n'), vm);
        }
      }

      return cache[key] = res;
    };
  }

  /*  */

  function createCompilerCreator(baseCompile) {
    return function createCompiler(baseOptions) {
      function compile(template, options) {
        var finalOptions = Object.create(baseOptions);
        var errors = [];
        var tips = [];
        finalOptions.warn = function (msg, tip) {
          (tip ? tips : errors).push(msg);
        };

        if (options) {
          // merge custom modules
          if (options.modules) {
            finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
          }
          // merge custom directives
          if (options.directives) {
            finalOptions.directives = extend(Object.create(baseOptions.directives), options.directives);
          }
          // copy other options
          for (var key in options) {
            if (key !== 'modules' && key !== 'directives') {
              finalOptions[key] = options[key];
            }
          }
        }

        var compiled = baseCompile(template, finalOptions);
        {
          errors.push.apply(errors, detectErrors(compiled.ast));
        }
        compiled.errors = errors;
        compiled.tips = tips;
        return compiled;
      }

      return {
        compile: compile,
        compileToFunctions: createCompileToFunctionFn(compile)
      };
    };
  }

  /*  */

  // `createCompilerCreator` allows creating compilers that use alternative
  // parser/optimizer/codegen, e.g the SSR optimizing compiler.
  // Here we just export a default compiler using the default parts.
  var createCompiler = createCompilerCreator(function baseCompile(template, options) {
    var ast = parse(template.trim(), options);
    optimize(ast, options);
    var code = generate(ast, options);
    return {
      ast: ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns
    };
  });

  /*  */

  var ref$1 = createCompiler(baseOptions);
  var compileToFunctions = ref$1.compileToFunctions;

  /*  */

  var idToTemplate = cached(function (id) {
    var el = query(id);
    return el && el.innerHTML;
  });

  var mount = Vue$3.prototype.$mount;
  Vue$3.prototype.$mount = function (el, hydrating) {
    el = el && query(el);

    /* istanbul ignore if */
    if (el === document.body || el === document.documentElement) {
      "development" !== 'production' && warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
      return this;
    }

    var options = this.$options;
    // resolve template/el and convert to render function
    if (!options.render) {
      var template = options.template;
      if (template) {
        if (typeof template === 'string') {
          if (template.charAt(0) === '#') {
            template = idToTemplate(template);
            /* istanbul ignore if */
            if ("development" !== 'production' && !template) {
              warn("Template element not found or is empty: " + options.template, this);
            }
          }
        } else if (template.nodeType) {
          template = template.innerHTML;
        } else {
          {
            warn('invalid template option:' + template, this);
          }
          return this;
        }
      } else if (el) {
        template = getOuterHTML(el);
      }
      if (template) {
        /* istanbul ignore if */
        if ("development" !== 'production' && config.performance && mark) {
          mark('compile');
        }

        var ref = compileToFunctions(template, {
          shouldDecodeNewlines: shouldDecodeNewlines,
          delimiters: options.delimiters,
          comments: options.comments
        }, this);
        var render = ref.render;
        var staticRenderFns = ref.staticRenderFns;
        options.render = render;
        options.staticRenderFns = staticRenderFns;

        /* istanbul ignore if */
        if ("development" !== 'production' && config.performance && mark) {
          mark('compile end');
          measure(this._name + " compile", 'compile', 'compile end');
        }
      }
    }
    return mount.call(this, el, hydrating);
  };

  /**
   * Get outerHTML of elements, taking care
   * of SVG elements in IE as well.
   */
  function getOuterHTML(el) {
    if (el.outerHTML) {
      return el.outerHTML;
    } else {
      var container = document.createElement('div');
      container.appendChild(el.cloneNode(true));
      return container.innerHTML;
    }
  }

  Vue$3.compile = compileToFunctions;

  return Vue$3;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_MainFooter_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_371b6058_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_MainFooter_vue__ = __webpack_require__(24);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(20)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-371b6058"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_MainFooter_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_371b6058_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_MainFooter_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\MainFooter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MainFooter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-371b6058", Component.options)
  } else {
    hotAPI.reload("data-v-371b6058", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	makeText: function makeText(str, time) {
		$("#toast").show();
		$("#toast").html(str);

		setTimeout(function () {
			$("#toast").hide();
		}, time);
	}
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9050e766b5df1f4d2d8cf41e2b96b9ec.png";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(11);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueResource = __webpack_require__(13);

var _vueResource2 = _interopRequireDefault(_vueResource);

__webpack_require__(15);

var _App = __webpack_require__(18);

var _App2 = _interopRequireDefault(_App);

var _routes = __webpack_require__(26);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueResource2.default);

//定义的路由规则


// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。

var router = new _vueRouter2.default({
	//	routes:routes
	routes: _routes2.default
});

//4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new _vue2.default({
	el: "#app",
	router: router,
	data: {},
	methods: {},
	components: {
		"v-app": _App2.default
	},
	computed: {},
	watch: {},
	mounted: function mounted() {}
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
  * vue-router v2.7.0
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}

function warn(condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn("[vue-router] " + message);
  }
}

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    }

    // also regiseter instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config === 'undefined' ? 'undefined' : _typeof(config)) {
    case 'undefined':
      return;
    case 'object':
      return config;
    case 'function':
      return config(route);
    case 'boolean':
      return config ? route.params : undefined;
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "props in \"" + route.path + "\" is a " + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + ", " + "expecting an object, function or boolean.");
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var val = extraQuery[key];
    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
  }
  return parsedQuery;
}

function parseQuery(query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route);
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;if (query === void 0) query = {};
  var hash = ref.hash;if (hash === void 0) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if ((typeof aVal === 'undefined' ? 'undefined' : _typeof(aVal)) === 'object' && (typeof bVal === 'undefined' ? 'undefined' : _typeof(bVal)) === 'object') {
      return isObjectEqual(aVal, bVal);
    }
    return String(aVal) === String(bVal);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }
  return true;
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = location.path ? createRoute(null, location, null, router) : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function handler(e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) {
    return;
  }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) {
    return;
  }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) {
      return;
    }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
}

function findAnchor(children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child;
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;

  _Vue = Vue;

  var isDef = function isDef(v) {
    return v !== undefined;
  };

  var registerInstance = function registerInstance(vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this._routerRoot._router;
    }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this._routerRoot._route;
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath(path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (_typeof(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (index$1(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }

  if (index$1(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }

  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true });
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, "missing param for " + routeMsg + ": " + e.message);
    }
    return '';
  }
}

/*  */

function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(typeof route.component !== 'string', "route config \"component\" for path: " + String(path || name) + " cannot be a " + "string id. Use an actual component instead.");
  }

  var normalizedPath = normalizePath(path, parent);
  var pathToRegexpOptions = route.pathToRegexpOptions || {};

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) {
        return (/^\/?$/.test(child.path)
        );
      })) {
        warn(false, "Named Route '" + route.name + "' has a default child route. " + "When navigating to this named route (:to=\"{name: '" + route.name + "'\"), " + "the default child route will not be rendered. Remove the name from " + "this route and use the name of the default child route for named " + "links instead.");
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(false, "Duplicate named routes definition: " + "{ name: \"" + name + "\", path: \"" + record.path + "\" }");
    }
  }
}

function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = index(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = {};
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], "Duplicate param keys in route with path: \"" + path + "\"");
      keys[key.name] = true;
    });
  }
  return regex;
}

function normalizePath(path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') {
    return path;
  }
  if (parent == null) {
    return path;
  }
  return cleanPath(parent.path + "/" + path);
}

/*  */

function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next;
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next;
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;

  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}

function assign(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
}

/*  */

function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, "Route with name '" + name + "' does not exist");
      }
      if (!record) {
        return _createRoute(null, location);
      }
      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (_typeof(location.params) !== 'object') {
        location.params = {};
      }

      if (currentRoute && _typeof(currentRoute.params) === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
        return _createRoute(record, location, redirectedFrom);
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    }
    // no match
    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || (typeof redirect === 'undefined' ? 'undefined' : _typeof(redirect)) !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, "redirect failed: named route \"" + name + "\" not found.");
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\"");
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }
    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }
    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}

/*  */

var positionStore = Object.create(null);

function setupScroll() {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return;
    }
    var isObject = (typeof shouldScroll === 'undefined' ? 'undefined' : _typeof(shouldScroll)) === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        var offset = shouldScroll.offset && _typeof(shouldScroll.offset) === 'object' ? shouldScroll.offset : {};
        offset = normalizeOffset(offset);
        position = getElementPosition(el, offset);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();
  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

/*  */

var supportsPushState = inBrowser && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}

/*  */

function runQueue(queue, fn, cb) {
  var step = function step(index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (resolvedDef.__esModule && resolvedDef.default) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once(fn) {
  var called = false;
  return function () {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }if (called) {
      return;
    }
    called = true;
    return fn.apply(this, args);
  };
}

/*  */

var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;

  var current = this.current;
  var abort = function abort(err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (isSameRoute(route, current) &&
  // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort();
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;

  var queue = [].concat(
  // in-component leave guards
  extractLeaveGuards(deactivated),
  // global before hooks
  this.router.beforeHooks,
  // in-component update hooks
  extractUpdateHooks(updated),
  // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }),
  // async components
  resolveAsyncComponents(activated));

  this.pending = route;
  var iterator = function iterator(hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if ((typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function isValid() {
      return this$1.current === route;
    };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      var current = this$1.current;
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if (History$$1) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash;
}

/*  */

var HashHistory = function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return;
    }
    ensureSlash();
  }

  if (History$$1) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return;
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true;
  }
  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

function pushHash(path) {
  window.location.hash = path;
}

function replaceHash(path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  window.location.replace(base + "#" + path);
}

/*  */

var AbstractHistory = function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {
    // noop
  };

  return AbstractHistory;
}(History);

/*  */

var VueRouter = function VueRouter(options) {
  if (options === void 0) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, "invalid mode: " + mode);
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter.prototype.init = function init(app /* Vue component instance */) {
  var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(VueRouter)` " + "before creating root instance.");

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return;
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function setupHashListener() {
      history.setupListeners();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back() {
  this.go(-1);
};

VueRouter.prototype.forward = function forward() {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;
  if (!route) {
    return [];
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter.prototype.resolve = function resolve(to, current, append) {
  var location = normalizeLocation(to, current || this.history.current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter.prototype, prototypeAccessors);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter.install = install;
VueRouter.version = '2.7.0';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

exports.default = VueRouter;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * vue-resource v1.3.4
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 */

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

function Promise$1(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$1.reject = function (r) {
    return new Promise$1(function (resolve, reject) {
        reject(r);
    });
};

Promise$1.resolve = function (x) {
    return new Promise$1(function (resolve, reject) {
        resolve(x);
    });
};

Promise$1.all = function all(iterable) {
    return new Promise$1(function (resolve, reject) {
        var count = 0,
            result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$1.race = function race(iterable) {
    return new Promise$1(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$1.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;
                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$1(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/**
 * Promise adapter.
 */

if (typeof Promise === 'undefined') {
    window.Promise = Promise$1;
}

function PromiseObj(executor, context) {

    if (executor instanceof Promise) {
        this.promise = executor;
    } else {
        this.promise = new Promise(executor.bind(context));
    }

    this.context = context;
}

PromiseObj.all = function (iterable, context) {
    return new PromiseObj(Promise.all(iterable), context);
};

PromiseObj.resolve = function (value, context) {
    return new PromiseObj(Promise.resolve(value), context);
};

PromiseObj.reject = function (reason, context) {
    return new PromiseObj(Promise.reject(reason), context);
};

PromiseObj.race = function (iterable, context) {
    return new PromiseObj(Promise.race(iterable), context);
};

var p = PromiseObj.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.catch(rejected), this.context);
};

p.finally = function (callback) {

    return this.then(function (value) {
        callback.call(this);
        return value;
    }, function (reason) {
        callback.call(this);
        return Promise.reject(reason);
    });
};

/**
 * Utility functions.
 */

var ref = {};
var hasOwnProperty = ref.hasOwnProperty;

var ref$1 = [];
var slice = ref$1.slice;
var debug = false;
var ntick;

var inBrowser = typeof window !== 'undefined';

var Util = function Util(ref) {
    var config = ref.config;
    var nextTick = ref.nextTick;

    ntick = nextTick;
    debug = config.debug || !config.silent;
};

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return ntick(cb, ctx);
}

function trim(str) {
    return str ? str.replace(/^\s*|\s*$/g, '') : '';
}

function trimEnd(str, chars) {

    if (str && chars === undefined) {
        return str.replace(/\s+$/, '');
    }

    if (!str || !chars) {
        return str;
    }

    return str.replace(new RegExp("[" + chars + "]+$"), '');
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

var isArray = Array.isArray;

function isString(val) {
    return typeof val === 'string';
}

function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}

function when(value, fulfilled, rejected) {

    var promise = PromiseObj.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
}

function each(obj, iterator) {

    var i, key;

    if (isArray(obj)) {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || _assign;

function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source, true);
    });

    return target;
}

function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }
    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

/**
 * Root Prefix Transform.
 */

var root = function root(options$$1, next) {

    var url = next(options$$1);

    if (isString(options$$1.root) && !/^(https?:)?\//.test(url)) {
        url = trimEnd(options$$1.root, '/') + '/' + url;
    }

    return url;
};

/**
 * Query Parameter Transform.
 */

var query = function query(options$$1, next) {

    var urlParams = Object.keys(Url.options.params),
        query = {},
        url = next(options$$1);

    each(options$$1.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
};

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url),
        expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'],
        variables = [];

    return {
        vars: variables,
        expand: function expand(context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null,
                        values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }
                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key],
        result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

/**
 * URL Template (RFC 6570) Transform.
 */

var template = function template(options) {

    var variables = [],
        url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
};

/**
 * Service for URL templating.
 */

function Url(url, params) {

    var self = this || {},
        options$$1 = url,
        transform;

    if (isString(url)) {
        options$$1 = { url: url, params: params };
    }

    options$$1 = merge({}, Url.options, self.$options, options$$1);

    Url.transforms.forEach(function (handler) {

        if (isString(handler)) {
            handler = Url.transform[handler];
        }

        if (isFunction(handler)) {
            transform = factory(handler, transform, self.$vm);
        }
    });

    return transform(options$$1);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transform = { template: template, query: query, root: root };
Url.transforms = ['template', 'query', 'root'];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [],
        escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    var el = document.createElement('a');

    if (document.documentMode) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options$$1) {
        return handler.call(vm, options$$1, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj),
        plain = isPlainObject(obj),
        hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * XDomain client (Internet Explorer).
 */

var xdrClient = function xdrClient(request) {
    return new PromiseObj(function (resolve) {

        var xdr = new XDomainRequest(),
            handler = function handler(ref) {
            var type = ref.type;

            var status = 0;

            if (type === 'load') {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(xdr.responseText, { status: status }));
        };

        request.abort = function () {
            return xdr.abort();
        };

        xdr.open(request.method, request.getUrl());

        if (request.timeout) {
            xdr.timeout = request.timeout;
        }

        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = handler;
        xdr.onprogress = function () {};
        xdr.send(request.getBody());
    });
};

/**
 * CORS Interceptor.
 */

var SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();

var cors = function cors(request, next) {

    if (inBrowser) {

        var orgUrl = Url.parse(location.href);
        var reqUrl = Url.parse(request.getUrl());

        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {

            request.crossOrigin = true;
            request.emulateHTTP = false;

            if (!SUPPORTS_CORS) {
                request.client = xdrClient;
            }
        }
    }

    next();
};

/**
 * Form data Interceptor.
 */

var form = function form(request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');
    } else if (isObject(request.body) && request.emulateJSON) {

        request.body = Url.params(request.body);
        request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    next();
};

/**
 * JSON Interceptor.
 */

var json = function json(request, next) {

    var type = request.headers.get('Content-Type') || '';

    if (isObject(request.body) && type.indexOf('application/json') === 0) {
        request.body = JSON.stringify(request.body);
    }

    next(function (response) {

        return response.bodyText ? when(response.text(), function (text) {

            type = response.headers.get('Content-Type') || '';

            if (type.indexOf('application/json') === 0 || isJson(text)) {

                try {
                    response.body = JSON.parse(text);
                } catch (e) {
                    response.body = null;
                }
            } else {
                response.body = text;
            }

            return response;
        }) : response;
    });
};

function isJson(str) {

    var start = str.match(/^\[|^\{(?!\{)/),
        end = { '[': /]$/, '{': /}$/ };

    return start && end[start[0]].test(str);
}

/**
 * JSONP client (Browser).
 */

var jsonpClient = function jsonpClient(request) {
    return new PromiseObj(function (resolve) {

        var name = request.jsonp || 'callback',
            callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2),
            body = null,
            handler,
            script;

        handler = function handler(ref) {
            var type = ref.type;

            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            if (status && window[callback]) {
                delete window[callback];
                document.body.removeChild(script);
            }

            resolve(request.respondWith(body, { status: status }));
        };

        window[callback] = function (result) {
            body = JSON.stringify(result);
        };

        request.abort = function () {
            handler({ type: 'abort' });
        };

        request.params[name] = callback;

        if (request.timeout) {
            setTimeout(request.abort, request.timeout);
        }

        script = document.createElement('script');
        script.src = request.getUrl();
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
};

/**
 * JSONP Interceptor.
 */

var jsonp = function jsonp(request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next();
};

/**
 * Before Interceptor.
 */

var before = function before(request, next) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

    next();
};

/**
 * HTTP method override Interceptor.
 */

var method = function method(request, next) {

    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
        request.headers.set('X-HTTP-Method-Override', request.method);
        request.method = 'POST';
    }

    next();
};

/**
 * Header Interceptor.
 */

var header = function header(request, next) {

    var headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[toLower(request.method)]);

    each(headers, function (value, name) {
        if (!request.headers.has(name)) {
            request.headers.set(name, value);
        }
    });

    next();
};

/**
 * XMLHttp client (Browser).
 */

var xhrClient = function xhrClient(request) {
    return new PromiseObj(function (resolve) {

        var xhr = new XMLHttpRequest(),
            handler = function handler(event) {

            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
            });

            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
            });

            resolve(response);
        };

        request.abort = function () {
            return xhr.abort();
        };

        if (request.progress) {
            if (request.method === 'GET') {
                xhr.addEventListener('progress', request.progress);
            } else if (/^(POST|PUT)$/i.test(request.method)) {
                xhr.upload.addEventListener('progress', request.progress);
            }
        }

        xhr.open(request.method, request.getUrl(), true);

        if (request.timeout) {
            xhr.timeout = request.timeout;
        }

        if (request.responseType && 'responseType' in xhr) {
            xhr.responseType = request.responseType;
        }

        if (request.withCredentials || request.credentials) {
            xhr.withCredentials = true;
        }

        if (!request.crossOrigin) {
            request.headers.set('X-Requested-With', 'XMLHttpRequest');
        }

        request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
        });

        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;
        xhr.ontimeout = handler;
        xhr.send(request.getBody());
    });
};

/**
 * Http client (Node).
 */

var nodeClient = function nodeClient(request) {

    var client = __webpack_require__(14);

    return new PromiseObj(function (resolve) {

        var url = request.getUrl();
        var body = request.getBody();
        var method = request.method;
        var headers = {},
            handler;

        request.headers.forEach(function (value, name) {
            headers[name] = value;
        });

        client(url, { body: body, method: method, headers: headers }).then(handler = function handler(resp) {

            var response = request.respondWith(resp.body, {
                status: resp.statusCode,
                statusText: trim(resp.statusMessage)
            });

            each(resp.headers, function (value, name) {
                response.headers.set(name, value);
            });

            resolve(response);
        }, function (error$$1) {
            return handler(error$$1.response);
        });
    });
};

/**
 * Base client.
 */

var Client = function Client(context) {

    var reqHandlers = [sendRequest],
        resHandlers = [],
        handler;

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        return new PromiseObj(function (resolve, reject) {

            function exec() {

                handler = reqHandlers.pop();

                if (isFunction(handler)) {
                    handler.call(context, request, next);
                } else {
                    warn("Invalid interceptor of type " + (typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) + ", must be a function");
                    next();
                }
            }

            function next(response) {

                if (isFunction(response)) {

                    resHandlers.unshift(response);
                } else if (isObject(response)) {

                    resHandlers.forEach(function (handler) {
                        response = when(response, function (response) {
                            return handler.call(context, response) || response;
                        }, reject);
                    });

                    when(response, resolve, reject);

                    return;
                }

                exec();
            }

            exec();
        }, context);
    }

    Client.use = function (handler) {
        reqHandlers.push(handler);
    };

    return Client;
};

function sendRequest(request, resolve) {

    var client = request.client || (inBrowser ? xhrClient : nodeClient);

    resolve(client(request));
}

/**
 * HTTP Headers.
 */

var Headers = function Headers(headers) {
    var this$1 = this;

    this.map = {};

    each(headers, function (value, name) {
        return this$1.append(name, value);
    });
};

Headers.prototype.has = function has(name) {
    return getName(this.map, name) !== null;
};

Headers.prototype.get = function get(name) {

    var list = this.map[getName(this.map, name)];

    return list ? list.join() : null;
};

Headers.prototype.getAll = function getAll(name) {
    return this.map[getName(this.map, name)] || [];
};

Headers.prototype.set = function set(name, value) {
    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
};

Headers.prototype.append = function append(name, value) {

    var list = this.map[getName(this.map, name)];

    if (list) {
        list.push(trim(value));
    } else {
        this.set(name, value);
    }
};

Headers.prototype.delete = function delete$1(name) {
    delete this.map[getName(this.map, name)];
};

Headers.prototype.deleteAll = function deleteAll() {
    this.map = {};
};

Headers.prototype.forEach = function forEach(callback, thisArg) {
    var this$1 = this;

    each(this.map, function (list, name) {
        each(list, function (value) {
            return callback.call(thisArg, value, name, this$1);
        });
    });
};

function getName(map, name) {
    return Object.keys(map).reduce(function (prev, curr) {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
}

function normalizeName(name) {

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}

/**
 * HTTP Response.
 */

var Response = function Response(body, ref) {
    var url = ref.url;
    var headers = ref.headers;
    var status = ref.status;
    var statusText = ref.statusText;

    this.url = url;
    this.ok = status >= 200 && status < 300;
    this.status = status || 0;
    this.statusText = statusText || '';
    this.headers = new Headers(headers);
    this.body = body;

    if (isString(body)) {

        this.bodyText = body;
    } else if (isBlob(body)) {

        this.bodyBlob = body;

        if (isBlobText(body)) {
            this.bodyText = blobText(body);
        }
    }
};

Response.prototype.blob = function blob() {
    return when(this.bodyBlob);
};

Response.prototype.text = function text() {
    return when(this.bodyText);
};

Response.prototype.json = function json() {
    return when(this.text(), function (text) {
        return JSON.parse(text);
    });
};

Object.defineProperty(Response.prototype, 'data', {

    get: function get() {
        return this.body;
    },

    set: function set(body) {
        this.body = body;
    }

});

function blobText(body) {
    return new PromiseObj(function (resolve) {

        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = function () {
            resolve(reader.result);
        };
    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}

/**
 * HTTP Request.
 */

var Request = function Request(options$$1) {

    this.body = null;
    this.params = {};

    assign(this, options$$1, {
        method: toUpper(options$$1.method || 'GET')
    });

    if (!(this.headers instanceof Headers)) {
        this.headers = new Headers(this.headers);
    }
};

Request.prototype.getUrl = function getUrl() {
    return Url(this);
};

Request.prototype.getBody = function getBody() {
    return this.body;
};

Request.prototype.respondWith = function respondWith(body, options$$1) {
    return new Response(body, assign(options$$1 || {}, { url: this.getUrl() }));
};

/**
 * Service for sending network requests.
 */

var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

function Http(options$$1) {

    var self = this || {},
        client = Client(self.$vm);

    defaults(options$$1 || {}, self.$options, Http.options);

    Http.interceptors.forEach(function (handler) {

        if (isString(handler)) {
            handler = Http.interceptor[handler];
        }

        if (isFunction(handler)) {
            client.use(handler);
        }
    });

    return client(new Request(options$$1)).then(function (response) {

        return response.ok ? response : PromiseObj.reject(response);
    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return PromiseObj.reject(response);
    });
}

Http.options = {};

Http.headers = {
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    common: COMMON_HEADERS,
    custom: {}
};

Http.interceptor = { before: before, method: method, jsonp: jsonp, json: json, form: form, header: header, cors: cors };
Http.interceptors = ['before', 'method', 'jsonp', 'json', 'form', 'header', 'cors'];

['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {

    Http[method$$1] = function (url, options$$1) {
        return this(assign(options$$1 || {}, { url: url, method: method$$1 }));
    };
});

['post', 'put', 'patch'].forEach(function (method$$1) {

    Http[method$$1] = function (url, body, options$$1) {
        return this(assign(options$$1 || {}, { url: url, method: method$$1, body: body }));
    };
});

/**
 * Service for interacting with RESTful services.
 */

function Resource(url, params, actions, options$$1) {

    var self = this || {},
        resource = {};

    actions = assign({}, Resource.actions, actions);

    each(actions, function (action, name) {

        action = merge({ url: url, params: assign({}, params) }, options$$1, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options$$1 = assign({}, action),
        params = {},
        body;

    switch (args.length) {

        case 2:

            params = args[0];
            body = args[1];

            break;

        case 1:

            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {
                body = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
    }

    options$$1.body = body;
    options$$1.params = assign({}, options$$1.params, params);

    return options$$1;
}

Resource.actions = {

    get: { method: 'GET' },
    save: { method: 'POST' },
    query: { method: 'GET' },
    update: { method: 'PUT' },
    remove: { method: 'DELETE' },
    delete: { method: 'DELETE' }

};

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = PromiseObj;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function get() {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function get() {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function get() {
                var this$1 = this;

                return function (executor) {
                    return new Vue.Promise(executor, this$1);
                };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

exports.default = plugin;
exports.Url = Url;
exports.Http = Http;
exports.Resource = Resource;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%; }\n\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul,\nol, li {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset,\nimg {\n  border: 0; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n@font-face {\n  font-family: 'iconfont';\n  /* project id 391242 */\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot\");\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.svg#iconfont\") format(\"svg\"); }\n\n.iconfont {\n  font-family: iconfont; }\n\nhtml, body, #app {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.container {\n  width: 100%;\n  max-width: 640px;\n  margin: 0 auto;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  flex-direction: column; }\n  .container .header {\n    height: 44px;\n    width: 100%;\n    background-color: #000;\n    line-height: 44px;\n    font-size: 18px;\n    color: #fff; }\n    .container .header .commonHeader {\n      width: 100%;\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      flex-direction: row; }\n      .container .header .commonHeader .left {\n        font-size: 16px;\n        flex: .7;\n        text-align: left;\n        padding-left: 30px; }\n        .container .header .commonHeader .left a {\n          color: #fff; }\n      .container .header .commonHeader .center {\n        flex: 1;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .center img {\n          padding-top: 10px;\n          width: 80px;\n          height: 30px; }\n        .container .header .commonHeader .center span {\n          font-size: 12px;\n          padding-top: 5px; }\n      .container .header .commonHeader .right {\n        flex: .6;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .right .iconfont {\n          flex: 1;\n          font-style: normal;\n          display: -webkit-box;\n          display: flex;\n          -webkit-box-orient: vertical;\n          flex-direction: column;\n          -webkit-box-pack: center;\n          justify-content: center;\n          -webkit-box-align: center;\n          align-items: center; }\n      .container .header .commonHeader .back {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .title {\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .moreInfo {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n  .container #content {\n    width: 100%;\n    -webkit-box-flex: 1;\n    flex: 1;\n    overflow-y: auto; }\n    .container #content::-webkit-scrollbar {\n      display: none; }\n  .container .footer {\n    height: 50px;\n    width: 100%;\n    background-color: #eee; }\n    .container .footer ul {\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex; }\n      .container .footer ul li {\n        -webkit-box-flex: 1;\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n        .container .footer ul li.active {\n          color: #f66; }\n\na {\n  text-decoration: none; }\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_3aae9eb1_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(25);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_3aae9eb1_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3aae9eb1", Component.options)
  } else {
    hotAPI.reload("data-v-3aae9eb1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MainFooter_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
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




/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			productID: "",
			num: '1',
			isshow: true
		};
	},
	mounted() {
		this.changepath(this.$route.path);
	},
	methods: {
		getChildData: function (msg) {
			//data就是子组件广播过来的数据
			//alert(msg);
			this.num = msg;
		},
		changepath(path) {
			console.log(path);
			if (path.indexOf("kind") != -1) {
				this.isshow = false;
			}
			if (path.indexOf("detail") != -1) {
				this.isshow = true;
			}
			if (path.indexOf("list") != -1) {
				this.isshow = false;
			}
			if (path.indexOf("home") != -1) {
				this.isshow = true;
			}
			if (path.indexOf("discover") != -1) {
				this.isshow = true;
			}
			if (path.indexOf("invite") != -1) {
				this.isshow = true;
			}
			if (path.indexOf("my") != -1) {
				this.isshow = true;
			}
			if (path.indexOf("login") != -1) {
				this.isshow = false;
			}
			if (path.indexOf("cart") != -1) {
				this.isshow = false;
			}
		}
	},
	watch: {
		$route(to) {
			console.log(to);
			this.changepath(to.path);
		}

	},
	components: {
		"v-footer": __WEBPACK_IMPORTED_MODULE_0__MainFooter_vue__["default"]
	}

});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("32e1bd4a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-371b6058\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./MainFooter.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-371b6058\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./MainFooter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.router-link-exact-active.router-link-active[data-v-371b6058]{\n\tcolor:#f66;\n}\n.iconfont[data-v-371b6058]{\n\tfont-style: normal;\n\tfont-size: 26px;\n}\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/MainFooter.vue?3b65f143"],"names":[],"mappings":";AAuBA;CACA,WAAA;CACA;AACA;CACA,mBAAA;CACA,gBAAA;CACA","file":"MainFooter.vue","sourcesContent":["<template>\r\n\t<ul>\r\n\t\t<li ><router-link to=\"/home\"><i class=\"iconfont\">&#xe60c;</i></router-link></li>\r\n\t\t<li ><router-link to=\"/discover\"><i class=\"iconfont\">&#xe607;</i></router-link></li>\r\n\t\t<li ><router-link to=\"/invite\"><i class=\"iconfont\">&#xe668;</i></router-link></li>\r\n\t\t<li ><router-link to=\"/my\"><i class=\"iconfont\">&#xe69a;</i></router-link></li>\r\n\t</ul>\r\n</template>\r\n\r\n<script>\r\n\texport default {\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\t\r\n\t\t\t}\r\n\t\t},\r\n\t\tmethods:{\r\n\t\t\t\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n<style scoped>\r\n\t.router-link-exact-active.router-link-active{\r\n\t\tcolor:#f66;\r\n\t}\r\n\t.iconfont{\r\n\t\tfont-style: normal;\r\n\t\tfont-size: 26px;\r\n\t}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {};
	},
	methods: {}
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', [_c('li', [_c('router-link', {
    attrs: {
      "to": "/home"
    }
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")])])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/discover"
    }
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")])])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/invite"
    }
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")])])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/my"
    }
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")])])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-371b6058", esExports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('header', {
    staticClass: "header"
  }, [_c('router-view', {
    attrs: {
      "name": "header"
    }
  })], 1), _vm._v(" "), _c('div', {
    attrs: {
      "id": "content"
    }
  }, [_c('router-view', {
    on: {
      "to-parent": _vm.getChildData
    }
  })], 1), _vm._v(" "), _c('footer', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isshow),
      expression: "isshow"
    }],
    staticClass: "footer"
  }, [_c('router-view', {
    attrs: {
      "name": "footer",
      "msg": _vm.num
    }
  })], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3aae9eb1", esExports)
  }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Home = __webpack_require__(27);

var _Home2 = _interopRequireDefault(_Home);

var _Discover = __webpack_require__(33);

var _Discover2 = _interopRequireDefault(_Discover);

var _Invite = __webpack_require__(40);

var _Invite2 = _interopRequireDefault(_Invite);

var _My = __webpack_require__(45);

var _My2 = _interopRequireDefault(_My);

var _Kind = __webpack_require__(52);

var _Kind2 = _interopRequireDefault(_Kind);

var _Cart = __webpack_require__(57);

var _Cart2 = _interopRequireDefault(_Cart);

var _CartFooter = __webpack_require__(64);

var _CartFooter2 = _interopRequireDefault(_CartFooter);

var _Login = __webpack_require__(69);

var _Login2 = _interopRequireDefault(_Login);

var _HomeHeader = __webpack_require__(77);

var _HomeHeader2 = _interopRequireDefault(_HomeHeader);

var _DiscoverHeader = __webpack_require__(82);

var _DiscoverHeader2 = _interopRequireDefault(_DiscoverHeader);

var _InviteHeader = __webpack_require__(87);

var _InviteHeader2 = _interopRequireDefault(_InviteHeader);

var _MyHeader = __webpack_require__(92);

var _MyHeader2 = _interopRequireDefault(_MyHeader);

var _MainFooter = __webpack_require__(6);

var _MainFooter2 = _interopRequireDefault(_MainFooter);

var _DetailFooter = __webpack_require__(97);

var _DetailFooter2 = _interopRequireDefault(_DetailFooter);

var _KindHeader = __webpack_require__(104);

var _KindHeader2 = _interopRequireDefault(_KindHeader);

var _List = __webpack_require__(109);

var _List2 = _interopRequireDefault(_List);

var _Detail = __webpack_require__(114);

var _Detail2 = _interopRequireDefault(_Detail);

var _SearchList = __webpack_require__(121);

var _SearchList2 = _interopRequireDefault(_SearchList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。

//import Order from "./../com/order.vue";
//import OrderFooter from "./../com/Orderfooter.vue";

//1。引入组件，用于路由对应的页面
var routes = [{ path: "/", redirect: "/home" }, { path: "/home", components: {
		default: _Home2.default,
		header: _HomeHeader2.default,
		footer: _MainFooter2.default
	} },
/*{path:"/kind",redirect:"/kind/1"},
{path:"/kind",components:{
	default:Kind,
	header:KindHeader,
	footer:MainFooter
}},
{path:"/kind/:classID",name:"kind",component:Kind},
{path:"/cart",components:{
	default:Cart,
	header:CartHeader,
	footer:MainFooter
}},*/
{ path: "/discover", components: {
		default: _Discover2.default,
		header: _KindHeader2.default,
		footer: _MainFooter2.default
	} }, { path: "/invite", components: {
		default: _Invite2.default,
		header: _KindHeader2.default,
		footer: _MainFooter2.default
	} }, { path: "/my", components: {
		default: _My2.default,
		header: _MyHeader2.default,
		footer: _MainFooter2.default
	} }, { path: "/kind", components: {
		default: _Kind2.default,
		header: _KindHeader2.default,
		footer: _DetailFooter2.default
	} }, { path: "/kind/:classID/:cityID", name: "kind", components: {
		default: _List2.default,
		header: _KindHeader2.default

	} }, { path: "/detail/:productID", name: "detail", components: {
		default: _Detail2.default,
		header: _KindHeader2.default,
		footer: _DetailFooter2.default
	} }, { path: "/cart", components: {
		default: _Cart2.default,
		header: _KindHeader2.default,
		footer: _CartFooter2.default
	} }, { path: "/list/:query_k", name: "list", components: {
		default: _SearchList2.default,
		header: _KindHeader2.default,
		footer: _MainFooter2.default
	} }, { path: "/login", components: {
		default: _Login2.default,
		header: _KindHeader2.default
		//		footer:CartFooter
	} }];

exports.default = routes;

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Home_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_89a1f702_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__(32);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(28)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-89a1f702"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Home_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_89a1f702_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Home_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\Home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-89a1f702", Component.options)
  } else {
    hotAPI.reload("data-v-89a1f702", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("898ee166", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-89a1f702\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Home.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-89a1f702\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.homecontent[data-v-89a1f702]{\n\twidth:90%;\n\theight: 100%;\n\tmargin: 0 auto;\n}\n.index-list[data-v-89a1f702]{padding-top: 30px;\n}\n.index-list h3[data-v-89a1f702]{font-size: 26px;\n}\n.index-list .date[data-v-89a1f702]{font-size: 12px;color: #ff3939;\n}\n.sku-item[data-v-89a1f702]{padding:20px 0;border-bottom: 1px solid #e0e0e0;\n}\n.sku-item img[data-v-89a1f702]{width:100%;height: 220px;border: none;\n}\n.sku-item .title[data-v-89a1f702]{font-size:17px;margin-top: 8px;color: #2c3038;\n}\n.sku-item .desc[data-v-89a1f702]{font-size:12px;color: #92969c;margin-top: 4px;\n}\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/Home.vue?df1147c8"],"names":[],"mappings":";AAwDA;CACA,UAAA;CACA,aAAA;CACA,eAAA;CACA;AACA,6BAAA,kBAAA;CAAA;AACA,gCAAA,gBAAA;CAAA;AACA,mCAAA,gBAAA,eAAA;CAAA;AACA,2BAAA,eAAA,iCAAA;CAAA;AACA,+BAAA,WAAA,cAAA,aAAA;CAAA;AACA,kCAAA,eAAA,gBAAA,eAAA;CAAA;AACA,iCAAA,eAAA,eAAA,gBAAA;CAAA","file":"Home.vue","sourcesContent":["<template>\r\n\t<div class=\"homecontent\">\r\n\t\t<div class=\"index-list\" v-for=\"item in list\">\r\n\t\t\t<h3>{{item.group_section.title}}</h3>\r\n\t\t\t<div class=\"date\">{{item.group_section.desc}}</div>\r\n\t\t\t<ul class=\"sku-list\">\r\n\t\t\t\t<li class=\"sku-item\" v-for=\"i in item.tabs\">\r\n\t\t\t\t\t<router-link :to=\"{name:'detail',params:{productID:i.enjoy_url.split('?')[1]}}\">\t\t\t\t\r\n\t\t\t\t\t\t<img :src=i.url>\r\n\t\t\t\t\t\t<div class=\"title\">{{i.title}}</div>\r\n\t\t\t\t\t\t<div class=\"desc\">{{i.desc}}</div>\r\n\t\t\t\t\t</router-link>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t\t\r\n\t\t\r\n\t\t\r\n\t\t<!--<div class=\"index-list\">\r\n\t\t\t<h3>每周精选餐饮</h3>\r\n\t\t\t<div class=\"date\">8月21日更新</div>\r\n\t\t\t<ul class=\"sku-list\">\r\n\t\t\t\t<li class=\"sku-item\">\r\n\t\t\t\t\t<a href=\"#\">\r\n\t\t\t\t\t\t<img src=\"https://image.ricebook.com/business/19082054523907?imageView2/1/w/670/h/446|watermark/1/image/aHR0cHM6Ly9kbi1pbWctc2VyaW91c2FwcHMucWJveC5tZS93bS5wbmc=/dissolve/100/gravity/SouthEast/ws/.1\"/>\r\n\t\t\t\t\t\t<div class=\"title\">和心庭双人雪蟹火锅</div>\r\n\t\t\t\t\t\t<div class=\"desc\">肥美雪蟹正当时的养生选择</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class=\"sku-item\"></li>\r\n\t\t\t\t<li class=\"sku-item\"></li>\r\n\t\t\t</ul>\r\n\t\t</div>-->\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\timport MyAjax from \"./../md/MyAjax.js\"\r\n\texport default {\r\n\t\tdata(){\r\n\t\t\treturn{\r\n\t\t\t\tlist:[],\r\n\t\t\t}\r\n\t\t},\r\n\t\tmounted(){\r\n\t\t\tvar that = this;\r\n\t\t\tvar url = \"https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=104&page=0\"\r\n\t\t\tMyAjax.vueJson(url,function(data){\r\n\t\t\t\tconsole.log(data);\r\n\t\t\t\tthat.list = data;\r\n\t\t\t})\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n<style scoped=\"scoped\">\r\n\t.homecontent{\r\n\t\twidth:90%;\r\n\t\theight: 100%;\r\n\t\tmargin: 0 auto;\r\n\t}\r\n\t.index-list{padding-top: 30px;}\r\n\t.index-list h3{font-size: 26px;}\r\n\t.index-list .date{font-size: 12px;color: #ff3939;}\r\n\t.sku-item{padding:20px 0;border-bottom: 1px solid #e0e0e0;}\r\n\t.sku-item img{width:100%;height: 220px;border: none;}\r\n\t.sku-item .title{font-size:17px;margin-top: 8px;color: #2c3038;}\r\n\t.sku-item .desc{font-size:12px;color: #92969c;margin-top: 4px;}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__);
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


/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			list: []
		};
	},
	mounted() {
		var that = this;
		var url = "https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=104&page=0";
		__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default.a.vueJson(url, function (data) {
			console.log(data);
			that.list = data;
		});
	}
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.fetchJsonp = mod.exports;
  }
})(undefined, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
      }, timeout);

      // Caught if got 404/500
      jsonpScript.onerror = function () {
        reject(new Error('JSONP request to ' + _url + ' failed'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "homecontent"
  }, _vm._l((_vm.list), function(item) {
    return _c('div', {
      staticClass: "index-list"
    }, [_c('h3', [_vm._v(_vm._s(item.group_section.title))]), _vm._v(" "), _c('div', {
      staticClass: "date"
    }, [_vm._v(_vm._s(item.group_section.desc))]), _vm._v(" "), _c('ul', {
      staticClass: "sku-list"
    }, _vm._l((item.tabs), function(i) {
      return _c('li', {
        staticClass: "sku-item"
      }, [_c('router-link', {
        attrs: {
          "to": {
            name: 'detail',
            params: {
              productID: i.enjoy_url.split('?')[1]
            }
          }
        }
      }, [_c('img', {
        attrs: {
          "src": i.url
        }
      }), _vm._v(" "), _c('div', {
        staticClass: "title"
      }, [_vm._v(_vm._s(i.title))]), _vm._v(" "), _c('div', {
        staticClass: "desc"
      }, [_vm._v(_vm._s(i.desc))])])], 1)
    }))])
  }))
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-89a1f702", esExports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Discover_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_05c46e89_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Discover_vue__ = __webpack_require__(39);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(34)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-05c46e89"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Discover_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_05c46e89_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Discover_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\Discover.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Discover.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05c46e89", Component.options)
  } else {
    hotAPI.reload("data-v-05c46e89", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("c7ccccbe", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-05c46e89\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Discover.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-05c46e89\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Discover.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.swiper-container-horizontal>.swiper-pagination-bullets[data-v-05c46e89],\n\t.swiper-pagination-custom[data-v-05c46e89],\n\t.swiper-pagination-fraction[data-v-05c46e89] {\n  \t\tposition: absolute;\n \t\ttop: -3rem;\n\t\tright: 3rem;\n\t\tz-index: 100;\n}\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/Discover.vue?15566f6e"],"names":[],"mappings":";AAmIA;;;IAGA,mBAAA;GACA,WAAA;EACA,YAAA;EACA,aAAA;CACA","file":"Discover.vue","sourcesContent":["<template>\r\n\t<div id=\"dis_Cont\">\r\n\t\t<div class=\"titles\">\r\n\t\t\t<h2>今日推荐</h2>\r\n\t\t\t<p>每天告诉你大家爱吃的和最近值得吃的</p>\r\n\t\t</div>\r\n\t\t<div class=\"swiper-container\">\r\n\t\t\t<div class=\"swiper-wrapper\">\r\n\t\t\t\t<div class=\"swiper-slide\" v-for=\"item in picList.tabs\">\r\n\t\t\t\t\t<img v-bind:src=item.url>\r\n\t\t\t\t\t<span>{{item.tag}}</span>\r\n\t\t\t\t\t<h3>{{item.title}}</h3>\r\n\t\t\t\t\t<p>{{item.desc}}</p>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"paginations\"></div>\r\n\t\t</div>\r\n\r\n\t\t<div id=\"other_list\">\r\n\t\t\t<div class=\"swiper-containers\">\r\n\t\t\t\t<div class=\"swiper-wrapper\">\r\n\t\t\t\t\t<div class=\"swiper-slide\" v-for=\"item in picList1.tabs\">\r\n\t\t\t\t\t\t<img lazy=\"loaded\" src=\"https://image.ricebook.com/business/20373785523424?imageView2/2/w/325\">\r\n\t\t\t\t\t\t<h4>{{item.title}}</h4>\r\n\t\t\t\t\t\t<p>{{item.desc}}</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"choicelist\">\r\n\t\t\t<div class=\"choic\">\r\n\t\t\t\t<h5>{{picDetial.title}}</h5>\r\n\t\t\t\t<span>{{picDetial.enjoy_url_text}}</span>\r\n \t\t\t</div>\r\n\t\t\t<p>{{picDetial.desc}}</p>\r\n\t\t\t<ul>\r\n\t\t\t\t<li v-for=\"item in picList2.tabs\">\r\n\t\t\t\t\t<img v-bind:src=item.url>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div class=\"choicelist\">\r\n\t\t\t<div class=\"choic\">\r\n\t\t\t\t<h5>{{picDetial3.title}}</h5>\r\n\t\t\t\t<span>{{picDetial3.enjoy_url_text}}</span>\r\n \t\t\t</div>\r\n\t\t\t<p>{{picDetial3.desc}}</p>\r\n\t\t\t<ul>\r\n\t\t\t\t<li v-for=\"item in picList3.tabs\">\r\n\t\t\t\t\t<img v-bind:src=item.url>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div class=\"choicelist\">\r\n\t\t\t<div class=\"choic\">\r\n\t\t\t\t<h5>{{picDetial4.title}}</h5>\r\n\t\t\t\t<span>{{picDetial4.enjoy_url_text}}</span>\r\n \t\t\t</div>\r\n\t\t\t<p>{{picDetial4.desc}}</p>\r\n\t\t\t<ul>\r\n\t\t\t\t<li v-for=\"item in picList4.tabs\">\r\n\t\t\t\t\t<img v-bind:src=item.url>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n \r\n\t \r\n\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\timport MyAjax from \"./../md/MyAjax.js\";\r\n\timport \"./../scss/kind.scss\" \r\n \texport default {\r\n\t\tdata() {\r\n\t\t\treturn {\r\n\t\t\t\tpicList: [],\r\n\t\t\t\tpicList1: [],\r\n\t\t\t\tpicList2: [],\r\n\t\t\t\tpicDetial: [],\r\n\t\t\t\tpicList3: [],\r\n\t\t\t\tpicDetial3: [],\r\n\t\t\t\tpicList4: [],\r\n\t\t\t\tpicDetial4: []\r\n\t\t\t}\r\n\t\t},\r\n\r\n\t\tmounted() {\r\n\t\t\tvar that = this;\r\n\t\t\tvar url = \"https://api.ricebook.com/hub/home/v1/web/explore.json?city_id=140\";\r\n\t\t\tMyAjax.vueJson(url, function(data) {\r\n\t\t\t\tconsole.log(data[1].data)\r\n\t\t\t\tthat.picList = data[0].data;\r\n\t\t\t\tthat.picList1 = data[1].data;\r\n\t\t\t\tthat.picList2 = data[2].data;\r\n\t\t\t\tthat.picDetial = data[2].data.group_section;\r\n\r\n\t\t\t\tthat.picList3 = data[3].data;\r\n\t\t\t\tthat.picDetial3 = data[3].data.group_section;\r\n\r\n\t\t\t\tthat.picList4 = data[4].data;\r\n\t\t\t\tthat.picDetial4 = data[4].data.group_section;\r\n\t\t\t\t\r\n\t\t\t}, function(err) {\r\n\t\t\t\tconsole.log(err)\r\n\t\t\t});\r\n\t\t\t\r\n \t\t},\r\n \t\tupdated(){\r\n \t\t\tvar swiper = new Swiper('.swiper-container', {\r\n\t\t\t\tobserver: true,\r\n\t\t\t\tpagination: '.paginations',\r\n\t\t\t\tpaginationType: 'fraction',\r\n\r\n\t\t\t});\r\n\r\n\t\t\tvar swipers = new Swiper('.swiper-containers', {\r\n\t\t\t\tslidesPerView: 2,\r\n\t\t\t\tpaginationClickable: true,\r\n\t\t\t\tspaceBetween: 10,\r\n\t\t\t\tfreeMode: true\r\n\t\t\t});\r\n \t\t}\r\n\t}\r\n</script>\r\n\r\n<style scoped>\r\n\t.swiper-container-horizontal>.swiper-pagination-bullets,\r\n\t.swiper-pagination-custom,\r\n\t.swiper-pagination-fraction {\r\n  \t\tposition: absolute;\r\n \t\ttop: -3rem;\r\n\t\tright: 3rem;\r\n\t\tz-index: 100;\r\n\t}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scss_kind_scss__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scss_kind_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__scss_kind_scss__);
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



/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			picList: [],
			picList1: [],
			picList2: [],
			picDetial: [],
			picList3: [],
			picDetial3: [],
			picList4: [],
			picDetial4: []
		};
	},

	mounted() {
		var that = this;
		var url = "https://api.ricebook.com/hub/home/v1/web/explore.json?city_id=140";
		__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default.a.vueJson(url, function (data) {
			console.log(data[1].data);
			that.picList = data[0].data;
			that.picList1 = data[1].data;
			that.picList2 = data[2].data;
			that.picDetial = data[2].data.group_section;

			that.picList3 = data[3].data;
			that.picDetial3 = data[3].data.group_section;

			that.picList4 = data[4].data;
			that.picDetial4 = data[4].data.group_section;
		}, function (err) {
			console.log(err);
		});
	},
	updated() {
		var swiper = new Swiper('.swiper-container', {
			observer: true,
			pagination: '.paginations',
			paginationType: 'fraction'

		});

		var swipers = new Swiper('.swiper-containers', {
			slidesPerView: 2,
			paginationClickable: true,
			spaceBetween: 10,
			freeMode: true
		});
	}
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./kind.scss", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./kind.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%; }\n\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul,\nol, li {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset,\nimg {\n  border: 0; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n@font-face {\n  font-family: 'iconfont';\n  /* project id 391242 */\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot\");\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.svg#iconfont\") format(\"svg\"); }\n\n.iconfont {\n  font-family: iconfont; }\n\nhtml, body, #app {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.container {\n  width: 100%;\n  max-width: 640px;\n  margin: 0 auto;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  flex-direction: column; }\n  .container .header {\n    height: 44px;\n    width: 100%;\n    background-color: #000;\n    line-height: 44px;\n    font-size: 18px;\n    color: #fff; }\n    .container .header .commonHeader {\n      width: 100%;\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      flex-direction: row; }\n      .container .header .commonHeader .left {\n        font-size: 16px;\n        flex: .7;\n        text-align: left;\n        padding-left: 30px; }\n        .container .header .commonHeader .left a {\n          color: #fff; }\n      .container .header .commonHeader .center {\n        flex: 1;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .center img {\n          padding-top: 10px;\n          width: 80px;\n          height: 30px; }\n        .container .header .commonHeader .center span {\n          font-size: 12px;\n          padding-top: 5px; }\n      .container .header .commonHeader .right {\n        flex: .6;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .right .iconfont {\n          flex: 1;\n          font-style: normal;\n          display: -webkit-box;\n          display: flex;\n          -webkit-box-orient: vertical;\n          flex-direction: column;\n          -webkit-box-pack: center;\n          justify-content: center;\n          -webkit-box-align: center;\n          align-items: center; }\n      .container .header .commonHeader .back {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .title {\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .moreInfo {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n  .container #content {\n    width: 100%;\n    -webkit-box-flex: 1;\n    flex: 1;\n    overflow-y: auto; }\n    .container #content::-webkit-scrollbar {\n      display: none; }\n  .container .footer {\n    height: 50px;\n    width: 100%;\n    background-color: #eee; }\n    .container .footer ul {\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex; }\n      .container .footer ul li {\n        -webkit-box-flex: 1;\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n        .container .footer ul li.active {\n          color: #f66; }\n\na {\n  text-decoration: none; }\n\n#content {\n  width: 100%;\n  position: relative; }\n\n#dis_Cont {\n  width: 100%;\n  overflow: hidden; }\n  #dis_Cont .titles {\n    width: 90%;\n    margin: 20px auto; }\n    #dis_Cont .titles h2 {\n      font-size: 19px; }\n    #dis_Cont .titles p {\n      font-size: 6px;\n      color: #92969C; }\n\n.swiper-container {\n  width: 100%;\n  position: relative; }\n  .swiper-container .swiper-slide {\n    float: left;\n    width: 100%;\n    height: 230px; }\n    .swiper-container .swiper-slide img {\n      width: 90%;\n      margin-left: 5%;\n      height: 140px; }\n    .swiper-container .swiper-slide span {\n      display: inline-block;\n      font-size: 10px;\n      line-height: 25px;\n      color: #FF3939;\n      margin-left: 5%; }\n    .swiper-container .swiper-slide h3 {\n      font-size: 16px;\n      line-height: 20px;\n      text-indent: 5%; }\n    .swiper-container .swiper-slide p {\n      font-size: 12px;\n      color: #666;\n      margin-left: 5%; }\n\n#other_list {\n  width: 90%;\n  height: 80px;\n  margin: 0 auto;\n  overflow: hidden;\n  padding: 2%;\n  border-top: 1px solid #ccc;\n  border-bottom: 1px solid #ccc; }\n  #other_list .swiper-slide {\n    width: 20%;\n    height: 70px;\n    display: -webkit-box;\n    display: flex;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    flex-direction: column;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    align-items: center;\n    border: 1px solid #ccc;\n    float: left;\n    background-color: rgba(0, 0, 0, 0.3);\n    color: #fff; }\n    #other_list .swiper-slide img {\n      height: 100%;\n      width: 100%; }\n    #other_list .swiper-slide h4 {\n      font-size: 12px;\n      position: absolute; }\n    #other_list .swiper-slide p {\n      font-size: 8px;\n      position: absolute;\n      margin-top: 15px; }\n\n.choicelist {\n  width: 90%;\n  min-height: 50px;\n  margin: 20px auto;\n  border-bottom: 1px solid #CCCCCC;\n  color: #F0F0F0; }\n  .choicelist .choic {\n    display: -webkit-box;\n    display: flex; }\n    .choicelist .choic h5 {\n      flex: 1;\n      font-size: 19px;\n      color: #333333; }\n    .choicelist .choic span {\n      flex: 1;\n      text-align: right;\n      font-size: 11px;\n      color: #FF5050; }\n  .choicelist p {\n    width: 100%;\n    color: #92969C; }\n  .choicelist ul {\n    width: 100%;\n    height: 90px;\n    margin: 10px;\n    display: -webkit-box;\n    display: flex; }\n    .choicelist ul li {\n      flex: 1; }\n      .choicelist ul li img {\n        width: 100%;\n        height: 100%; }\n", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "dis_Cont"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "swiper-container"
  }, [_c('div', {
    staticClass: "swiper-wrapper"
  }, _vm._l((_vm.picList.tabs), function(item) {
    return _c('div', {
      staticClass: "swiper-slide"
    }, [_c('img', {
      attrs: {
        "src": item.url
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.tag))]), _vm._v(" "), _c('h3', [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.desc))])])
  })), _vm._v(" "), _c('div', {
    staticClass: "paginations"
  })]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "other_list"
    }
  }, [_c('div', {
    staticClass: "swiper-containers"
  }, [_c('div', {
    staticClass: "swiper-wrapper"
  }, _vm._l((_vm.picList1.tabs), function(item) {
    return _c('div', {
      staticClass: "swiper-slide"
    }, [_c('img', {
      attrs: {
        "lazy": "loaded",
        "src": "https://image.ricebook.com/business/20373785523424?imageView2/2/w/325"
      }
    }), _vm._v(" "), _c('h4', [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.desc))])])
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "choicelist"
  }, [_c('div', {
    staticClass: "choic"
  }, [_c('h5', [_vm._v(_vm._s(_vm.picDetial.title))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.picDetial.enjoy_url_text))])]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.picDetial.desc))]), _vm._v(" "), _c('ul', _vm._l((_vm.picList2.tabs), function(item) {
    return _c('li', [_c('img', {
      attrs: {
        "src": item.url
      }
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "choicelist"
  }, [_c('div', {
    staticClass: "choic"
  }, [_c('h5', [_vm._v(_vm._s(_vm.picDetial3.title))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.picDetial3.enjoy_url_text))])]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.picDetial3.desc))]), _vm._v(" "), _c('ul', _vm._l((_vm.picList3.tabs), function(item) {
    return _c('li', [_c('img', {
      attrs: {
        "src": item.url
      }
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "choicelist"
  }, [_c('div', {
    staticClass: "choic"
  }, [_c('h5', [_vm._v(_vm._s(_vm.picDetial4.title))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.picDetial4.enjoy_url_text))])]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.picDetial4.desc))]), _vm._v(" "), _c('ul', _vm._l((_vm.picList4.tabs), function(item) {
    return _c('li', [_c('img', {
      attrs: {
        "src": item.url
      }
    })])
  }))])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "titles"
  }, [_c('h2', [_vm._v("今日推荐")]), _vm._v(" "), _c('p', [_vm._v("每天告诉你大家爱吃的和最近值得吃的")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-05c46e89", esExports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Invite_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_0727d0ae_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Invite_vue__ = __webpack_require__(44);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(41)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0727d0ae"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Invite_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_0727d0ae_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Invite_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\Invite.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Invite.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0727d0ae", Component.options)
  } else {
    hotAPI.reload("data-v-0727d0ae", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("54014c6b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0727d0ae\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Invite.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0727d0ae\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Invite.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.couponbanner[data-v-0727d0ae]{\n\twidth: 100%;\n\theight: 12rem;\n}\n.couponbanner img[data-v-0727d0ae]{\n\twidth: 100%;\n\theight: 100%;\n}\np[data-v-0727d0ae]{\n\twidth: 90%;\n\tmargin: 2rem auto;\n}\n.invite[data-v-0727d0ae]{\n\twidth: 30%;\n\theight: 30px;\n\tline-height: 30px;\n\tborder-radius:0.5rem ;\n\ttext-align: center;\n\tbackground: #FF3939;\n\tmargin: 2rem auto;\n\tcolor: #FFFFFF;\n}\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/Invite.vue?04a95520"],"names":[],"mappings":";AAqCA;CACA,YAAA;CACA,cAAA;CACA;AACA;CACA,YAAA;CACA,aAAA;CACA;AACA;CACA,WAAA;CACA,kBAAA;CACA;AACA;CACA,WAAA;CACA,aAAA;CACA,kBAAA;CACA,sBAAA;CACA,mBAAA;CACA,oBAAA;CACA,kBAAA;CACA,eAAA;CACA","file":"Invite.vue","sourcesContent":["<template>\r\n\t<div class=\"couponwrap\">\r\n\t\t <div class=\"couponbanner\">\r\n\t\t \t<img src=\"https://image.ricebook.com/business/21405298623398\"/>\r\n\t\t </div>\r\n\t\t<p>邀请好友加入ENJOY，给TA发放价值50元礼券。好友完成首单消费后，你亦可获得价值50元礼券。</p>\r\n\t\t<div class=\"invite\">\r\n\t\t\t即刻邀请\r\n\t\t</div>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\t import MyAjax from \"./../md/MyAjax.js\";\r\n\r\n\texport default {\r\n\t\t\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\t img:\"\"\r\n\t\t\t}\r\n\t\t},\r\n\t\tupdated(){\r\n\t\t\tvar that = this;\r\n\t\t\t\r\n\t\t\tif(localStorage.getItem(\"isLogin\") == \"1\"){\r\n\t\t\t\t $('.couponwrap').css('display','block');\r\n\t\t\t\t\r\n \t\t\t}else{\r\n \t\t\t\t$('.couponwrap').css('display','none');\r\n\t\t\t \t that.$router.push({path: '/login'});\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n<style scoped>\r\n\t.couponbanner{\r\n\t\twidth: 100%;\r\n\t\theight: 12rem;\r\n\t}\r\n\t.couponbanner img{\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t}\r\n\tp{\r\n\t\twidth: 90%;\r\n\t\tmargin: 2rem auto;\r\n\t}\r\n\t.invite{\r\n\t\twidth: 30%;\r\n\t\theight: 30px;\r\n\t\tline-height: 30px;\r\n\t\tborder-radius:0.5rem ;\r\n\t\ttext-align: center;\r\n\t\tbackground: #FF3939;\r\n\t\tmargin: 2rem auto;\r\n\t\tcolor: #FFFFFF;\r\n\t}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__);
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



/* harmony default export */ __webpack_exports__["a"] = ({

	data() {
		return {
			img: ""
		};
	},
	updated() {
		var that = this;

		if (localStorage.getItem("isLogin") == "1") {
			$('.couponwrap').css('display', 'block');
		} else {
			$('.couponwrap').css('display', 'none');
			that.$router.push({ path: '/login' });
		}
	}
});

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "couponwrap"
  }, [_c('div', {
    staticClass: "couponbanner"
  }, [_c('img', {
    attrs: {
      "src": "https://image.ricebook.com/business/21405298623398"
    }
  })]), _vm._v(" "), _c('p', [_vm._v("邀请好友加入ENJOY，给TA发放价值50元礼券。好友完成首单消费后，你亦可获得价值50元礼券。")]), _vm._v(" "), _c('div', {
    staticClass: "invite"
  }, [_vm._v("\n\t\t即刻邀请\n\t")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0727d0ae", esExports)
  }
}

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_My_vue__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_040b1e68_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_My_vue__ = __webpack_require__(51);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(46)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_My_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_040b1e68_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_My_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\My.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] My.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-040b1e68", Component.options)
  } else {
    hotAPI.reload("data-v-040b1e68", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("683d5fb1", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-040b1e68\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./My.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-040b1e68\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./My.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"My.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_my_scss__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_my_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_my_scss__);
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


//	import $ from "jquery";
/* harmony default export */ __webpack_exports__["a"] = ({

	data() {
		return {
			userID: "",
			isLogin: ""
		};
	},
	methods: {
		quit() {
			localStorage.setItem("isLogin", 0);
			this.$router.push({ path: '/login' });
		}
	},
	mounted() {
		var that = this;
		that.userID = localStorage.getItem("userID");
	},
	updated() {
		var that = this;
		if (localStorage.getItem("isLogin") == "1") {
			$('.userwrap').css('display', 'block');
		} else {
			$('.userwrap').css('display', 'none');
			that.$router.push({ path: '/login' });
		}
	}
});

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(50);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./my.scss", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./my.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%; }\n\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul,\nol, li {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset,\nimg {\n  border: 0; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n@font-face {\n  font-family: 'iconfont';\n  /* project id 391242 */\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot\");\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.svg#iconfont\") format(\"svg\"); }\n\n.iconfont {\n  font-family: iconfont; }\n\nhtml, body, #app {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.container {\n  width: 100%;\n  max-width: 640px;\n  margin: 0 auto;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  flex-direction: column; }\n  .container .header {\n    height: 44px;\n    width: 100%;\n    background-color: #000;\n    line-height: 44px;\n    font-size: 18px;\n    color: #fff; }\n    .container .header .commonHeader {\n      width: 100%;\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      flex-direction: row; }\n      .container .header .commonHeader .left {\n        font-size: 16px;\n        flex: .7;\n        text-align: left;\n        padding-left: 30px; }\n        .container .header .commonHeader .left a {\n          color: #fff; }\n      .container .header .commonHeader .center {\n        flex: 1;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .center img {\n          padding-top: 10px;\n          width: 80px;\n          height: 30px; }\n        .container .header .commonHeader .center span {\n          font-size: 12px;\n          padding-top: 5px; }\n      .container .header .commonHeader .right {\n        flex: .6;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .right .iconfont {\n          flex: 1;\n          font-style: normal;\n          display: -webkit-box;\n          display: flex;\n          -webkit-box-orient: vertical;\n          flex-direction: column;\n          -webkit-box-pack: center;\n          justify-content: center;\n          -webkit-box-align: center;\n          align-items: center; }\n      .container .header .commonHeader .back {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .title {\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .moreInfo {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n  .container #content {\n    width: 100%;\n    -webkit-box-flex: 1;\n    flex: 1;\n    overflow-y: auto; }\n    .container #content::-webkit-scrollbar {\n      display: none; }\n  .container .footer {\n    height: 50px;\n    width: 100%;\n    background-color: #eee; }\n    .container .footer ul {\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex; }\n      .container .footer ul li {\n        -webkit-box-flex: 1;\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n        .container .footer ul li.active {\n          color: #f66; }\n\na {\n  text-decoration: none; }\n\n.userwrap {\n  width: 100%;\n  height: 100%;\n  background: #F6F6F6; }\n  .userwrap .logowrap {\n    background: #000000;\n    height: 130px;\n    width: 100%;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    flex-direction: column;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    flex-direction: column;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    align-items: center; }\n    .userwrap .logowrap span {\n      width: 50px;\n      height: 50px;\n      border-radius: 50%;\n      background: #F3F3F4;\n      font-size: 40px;\n      display: -webkit-box;\n      display: flex;\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-orient: vertical;\n      flex-direction: column;\n      -webkit-box-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      align-items: center;\n      color: #CBCCCF; }\n    .userwrap .logowrap p {\n      color: #FFFFFF;\n      font-size: 20px;\n      font-weight: bold; }\n  .userwrap li {\n    width: 100%;\n    height: 40px;\n    background: #FFFFFF;\n    line-height: 40px;\n    font-size: 16px;\n    text-indent: 20px;\n    border-top: 1px solid #F0F0F0;\n    border-bottom: 1px solid #F0F0F0;\n    margin: 10px 0; }\n  .userwrap .quit {\n    width: 100%;\n    height: 40px;\n    background: #000000;\n    color: #FFFFFF;\n    text-align: center;\n    line-height: 40px;\n    margin-top: 60px; }\n", ""]);

// exports


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "userwrap"
  }, [_c('div', {
    staticClass: "usertop"
  }, [_c('div', {
    staticClass: "logowrap"
  }, [_c('span', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.userID))])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "quit",
    on: {
      "click": function($event) {
        _vm.quit()
      }
    }
  }, [_vm._v("退出登录")])])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', [_c('li', [_vm._v("Code消费码")]), _vm._v(" "), _c('li', [_vm._v("我的礼券")]), _vm._v(" "), _c('li', [_vm._v("地址管理")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-040b1e68", esExports)
  }
}

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Kind_vue__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_91d82e98_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Kind_vue__ = __webpack_require__(56);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(53)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-91d82e98"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Kind_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_91d82e98_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Kind_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\Kind.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Kind.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-91d82e98", Component.options)
  } else {
    hotAPI.reload("data-v-91d82e98", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("46cd8dbe", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-91d82e98\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Kind.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-91d82e98\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Kind.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.cate-list[data-v-91d82e98]{width: 100%;\n}\n.cate-list p[data-v-91d82e98]{padding: 10px 30px;background: #f6f6f6;\n}\n.cate-section ul[data-v-91d82e98]{width:100%;overflow: hidden;\n}\n.cate-section ul li[data-v-91d82e98]{width:33.3%;float: left;text-align: center;padding: 10px;border-bottom: 1px solid #e4e5e7;border-right: 1px solid #e4e5e7;box-sizing: border-box;font-size: 14px;\n}\n.cate-section ul li a[data-v-91d82e98]{display:inline-block;width: 100%;height:100%;font-size: 14px;color: #2c3038;\n}\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/Kind.vue?5d632506"],"names":[],"mappings":";AAuCA,4BAAA,YAAA;CAAA;AACA,8BAAA,mBAAA,oBAAA;CAAA;AACA,kCAAA,WAAA,iBAAA;CAAA;AACA,qCAAA,YAAA,YAAA,mBAAA,cAAA,iCAAA,gCAAA,uBAAA,gBAAA;CAAA;AACA,uCAAA,qBAAA,YAAA,YAAA,gBAAA,eAAA;CAAA","file":"Kind.vue","sourcesContent":["<template>\r\n\t<div class=\"cate-list\">\r\n\t\t<div class=\"cate-section\" v-for=\"list in kindList\">\r\n\t\t\t<p>{{list.name}}</p>\r\n\t\t\t<ul>\r\n\t\t\t\t<li  v-for=\"item in list.sub_category_list\">\r\n\t\t\t\t\t<router-link :to=\"{name:'kind',params:{classID:item.id,cityID:item.city_id}}\">\r\n\t\t\t\t\t\t{{item.name}}\r\n\t\t\t\t\t</router-link>\r\n\t\t\t\t</li>\t\t\t\t\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\timport MyAjax from \"./../md/MyAjax.js\"\r\n\texport default {\r\n\t\tdata(){\r\n\t\t\treturn{\r\n\t\t\t\tkindList : []\r\n\t\t\t}\r\n\t\t},\r\n\t\tmethods : {\r\n\r\n\t\t},\r\n\t\tmounted(){\r\n\t\t\tvar that = this;\r\n\t\t\tvar url = \"https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MTA0JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9NTcwOWI3NzAxNGRhM2UwOTNiZWRhY2FkNTA5MzgwZDgmMjAxNzA4MjEyMDAw.json\";\r\n\t\t\tMyAjax.vueJson(url,function(data){\r\n\t\t\t\tconsole.log(data);\r\n\t\t\t\tthat.kindList = data;\r\n\t\t\t})\r\n\t\t}\r\n\t}\r\n\t\r\n</script>\r\n\r\n<style scoped=\"scoped\">\r\n\t.cate-list{width: 100%;}\r\n\t.cate-list p{padding: 10px 30px;background: #f6f6f6;}\r\n\t.cate-section ul{width:100%;overflow: hidden;}\r\n\t.cate-section ul li{width:33.3%;float: left;text-align: center;padding: 10px;border-bottom: 1px solid #e4e5e7;border-right: 1px solid #e4e5e7;box-sizing: border-box;font-size: 14px;}\r\n\t.cate-section ul li a{display:inline-block;width: 100%;height:100%;font-size: 14px;color: #2c3038;}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__);
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


/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			kindList: []
		};
	},
	methods: {},
	mounted() {
		var that = this;
		var url = "https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MTA0JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9NTcwOWI3NzAxNGRhM2UwOTNiZWRhY2FkNTA5MzgwZDgmMjAxNzA4MjEyMDAw.json";
		__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default.a.vueJson(url, function (data) {
			console.log(data);
			that.kindList = data;
		});
	}
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "cate-list"
  }, _vm._l((_vm.kindList), function(list) {
    return _c('div', {
      staticClass: "cate-section"
    }, [_c('p', [_vm._v(_vm._s(list.name))]), _vm._v(" "), _c('ul', _vm._l((list.sub_category_list), function(item) {
      return _c('li', [_c('router-link', {
        attrs: {
          "to": {
            name: 'kind',
            params: {
              classID: item.id,
              cityID: item.city_id
            }
          }
        }
      }, [_vm._v("\n\t\t\t\t\t" + _vm._s(item.name) + "\n\t\t\t\t")])], 1)
    }))])
  }))
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-91d82e98", esExports)
  }
}

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Cart_vue__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_4ee4fb80_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Cart_vue__ = __webpack_require__(63);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(58)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4ee4fb80"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Cart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_4ee4fb80_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Cart_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\Cart.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Cart.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ee4fb80", Component.options)
  } else {
    hotAPI.reload("data-v-4ee4fb80", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(59);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2a86f89c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4ee4fb80\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Cart.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4ee4fb80\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Cart.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.cartFooter[data-v-4ee4fb80]{\n\tposition: fixed;\n\twidth: 100%;\n\theight: 50px;\n\tdisplay: flex;\n\tbottom: 0;\n\tcolor: #ff3939;\n}\n.allChecked[data-v-4ee4fb80]{\n\tflex:1;\n\ttext-align: center;\n\tline-height: 50px;\nspan{\n\t\tfont-size: 14px;\n}\n}\n.total[data-v-4ee4fb80]{\n\tflex : 1;\n\ttext-align: center;\n\tline-height: 50px;\n}\n.total span[data-v-4ee4fb80]:first-child{font-size: 14px;\n}\n.pay[data-v-4ee4fb80]{\n\twidth:150px;\n\theight: 100%;\n\ttext-align: center;\n\tline-height: 50px;\n\tbackground: #ff3939;\n\tcolor: #FFFFFF;\n\tfont-size: 20px;\n}\nspan[data-v-4ee4fb80]{\n\tdisplay: inline-block;\n}\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/Cart.vue?43822dfd"],"names":[],"mappings":";AA0NA;CACA,gBAAA;CACA,YAAA;CACA,aAAA;CACA,cAAA;CACA,UAAA;CACA,eAAA;CACA;AACA;CACA,OAAA;CACA,mBAAA;CACA,kBAAA;AACA;EACA,gBAAA;CACA;CACA;AACA;CACA,SAAA;CACA,mBAAA;CACA,kBAAA;CACA;AACA,yCAAA,gBAAA;CAAA;AACA;CACA,YAAA;CACA,aAAA;CACA,mBAAA;CACA,kBAAA;CACA,oBAAA;CACA,eAAA;CACA,gBAAA;CACA;AACA;CACA,sBAAA;CACA","file":"Cart.vue","sourcesContent":["<template>\r\n\t<div>\r\n\t<ul class=\"cart_content\" v-if=\"show\">\r\n\t\t<li v-for=\"(list,index) in cartData\">\r\n\t\t\t<span class=\"iconfont check\">\r\n\t\t\t\t<input type=\"checkbox\" @click=\"check(index)\" :checked=\"money[index].s\"/>\r\n\t\t\t</span>\r\n\t\t\t<img :src=\"list.img_url\"/>\r\n\t\t\t<div class=\"desc\">\r\n\t\t\t\t<div class=\"title\">{{list.name}}</div>\r\n\t\t\t\t<div class=\"price\">单价：{{list.price}}元</div>\r\n\t\t\t\t<div class=\"opotion\">\r\n\t\t\t\t\t<span class=\"minus\" @click=\"minus(list,index)\">-</span>\r\n\t\t\t\t\t<span class=\"count\">{{list.num}}</span>\r\n\t\t\t\t\t<span class=\"plus\" @click=\"plus(list,index)\">+</span>\r\n\t\t\t\t\t<span class=\"delete iconfont\" @click=\"del(index)\">&#xe76b;</span>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</li>\r\n\t</ul>\r\n\t<div id=\"cart_empty\" v-else=\"!show\">\r\n\t\t<div id=\"kong\">\r\n\t\t\t<div class=\"iconfont\">\t\r\n\t\t\t</div>\r\n\t\t\t<span>\r\n\t\t\t\t购物车为空\r\n\t\t\t</span>\t\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"cartFooter\">\r\n\t\t<div class=\"allChecked\">\r\n\t\t\t<span>\r\n\t\t\t\t<input type=\"checkbox\" @click=\"checkedAll()\" v-model=\"checkAll\"/>\r\n\t\t\t</span>\r\n\t\t\t<span>全选</span>\r\n\t\t</div>\r\n\t\t<div class=\"total\">\r\n\t\t\t<span>合计:</span>\r\n\t\t\t<span>{{totalMoney}}元</span>\r\n\t\t</div>\r\n\t\t<span class=\"pay\">去结算</span>\r\n\t</div>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\timport MyAjax from \"./../md/MyAjax\";\r\n\timport \"./../scss/cart.scss\";\r\n\texport default {\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\tcartData : [],\r\n\t\t\t\tshow : true,\r\n\t\t\t\tmoney : [],\r\n\t\t\t\ttotalMoney : 0,\r\n\t\t\t\tflag : '',\r\n\t\t\t\tcheckAll : false\r\n\t\t\t}\r\n\t\t},\r\n\t\t\r\n\t\tmethods : {\r\n\t\t\tcountMoney(){\r\n\t\t\t\tthis.totalMoney = 0;\r\n\t\t\t\tfor(let i=0; i < this.money.length; i++){\r\n\t\t\t\t\tif(this.money[i].s){\r\n\t\t\t\t\t\tthis.totalMoney += this.money[i].m;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t},\r\n\t\t\tcheckedAll(){\r\n\t\t\t\tif(this.checkAll){\r\n\t\t\t\t\tthis.checkAll = false;\r\n\t\t\t\t}else{\r\n\t\t\t\t\tthis.checkAll = true;\r\n\t\t\t\t}\r\n\t\t\t\tfor(let i = 0; i < this.money.length; i++){\r\n\t\t\t\t\tthis.money[i].s = this.checkAll;\r\n\t\t\t\t}\r\n\t\t\t\tthis.countMoney();\r\n\t\t\t},\r\n\t\t\tcheck(index){\r\n\t\t\t\tvar num = 0;\r\n\t\t\t\tif(this.money[index].s == false){\r\n\t\t\t\t\tthis.money[index].s = true;\r\n\t\t\t\t}else{\r\n\t\t\t\t\tthis.money[index].s = false\r\n\t\t\t\t}\r\n\t\t\t\tfor(let i = 0; i < this.money.length; i++){\r\n\t\t\t\t\tif(this.money[i].s){\r\n\t\t\t\t\t\tnum++\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\tconsole.log(num,this.money.length)\r\n\t\t\t\tif(num==this.money.length){\r\n\t\t\t\t\tconsole.log(\"true\")\r\n\t\t\t\t\tthis.checkAll = true;\r\n\t\t\t\t}else{\r\n\t\t\t\t\tthis.checkAll = false;\r\n\t\t\t\t}\r\n\t\t\t\tthis.countMoney();\r\n\t\t\t},\r\n\t\t\tminus(item,index){\r\n\t\t\t\t//改变view;\r\n\t\t\t\tvar cartData = this.cartData;\r\n\t\t\t\tvar num = cartData[index].num;\r\n\t\t\t\tif(num>1){\r\n\t\t\t\t\tnum--;\r\n\t\t\t\t\tcartData[index].num = num;\r\n\t\t\t\t\t//改变localstorage;\r\n\t\t\t\t\tvar cart_data = JSON.parse(localStorage.getItem(\"cart\"));\r\n\t\t\t\t\tcart_data[index].num = num;\r\n\t\t\t\t\tlocalStorage.setItem(\"cart\",JSON.stringify(cart_data));\r\n\t\t\t\t}\r\n\t\t\t\tthis.cartData = cartData;\r\n\t\t\t\tconsole.log(item)\r\n\t\t\t\tthis.money[index].m = item.num*item.price;\r\n\t\t\t\tthis.countMoney();\r\n\t\t//\t\tconsole.log(this.money)\r\n\t\t\t},\r\n\t\t\tplus(item,index){\r\n\t\t\t\tvar cartData = this.cartData;\r\n\t\t\t\tvar num = cartData[index].num;\r\n\t\t\t\tnum++;\r\n\t\t\t\tcartData[index].num = num;\r\n\t\t\t\t//改变localstorage;\r\n\t\t\t\tvar cart_data = JSON.parse(localStorage.getItem(\"cart\"));\r\n\t\t\t\tcart_data[index].num = num;\r\n\t\t\t\tlocalStorage.setItem(\"cart\",JSON.stringify(cart_data));\r\n\t\t\t\tthis.cartData = cartData;\r\n\t\t\t\tthis.money[index].m = item.num*item.price;\r\n\t\t\t\tthis.countMoney();\r\n\t\t\t},\r\n\t\t\tdel(index){\r\n\t\t\t\t\r\n\t\t\t\tconsole.log(index);\r\n\t\t\t\t//改变view;\r\n\t\t\t\tvar cartData = this.cartData;\r\n\t\t\t\tcartData.splice(index,1);\r\n\t\t\t\tthis.cartData = cartData;\r\n\t\t\t\t//改变localStorage;\r\n\t\t\t\tvar cart_data = JSON.parse(localStorage.getItem(\"cart\"));\r\n\t\t\t\tif(cart_data.length==1){\r\n\t\t\t\t\tlocalStorage.removeItem(\"cart\")\r\n\t\t\t\t//\tlocalStorage.clear(\"cart\");\r\n\t\t\t\t}else{\r\n\t\t\t\t\tcart_data.splice(index,1);\r\n\t\t\t\t\tlocalStorage.setItem(\"cart\",JSON.stringify(cart_data));\r\n\t\t\t\t}\r\n\t\t//\t\tthis.countMoney();\r\n\t\t\t\t\r\n\t\t\t}\r\n\t\t},\r\n\t\tmounted(){\r\n\t\t\tvar arr=JSON.parse(localStorage.getItem(\"cart\"));\r\n\t\t\tconsole.log(arr)\r\n\t\t\tif(!arr){\r\n\t\t\t\tthis.show=false;\r\n\t\t\t}else if(arr.length==0){\r\n\t\t\t\tthis.show = false;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\t\r\n\t\t\tvar cart_data = JSON.parse(localStorage.getItem(\"cart\"));\r\n\t\t//\tthis.cartData = cart_data;\r\n\t\t//\tconsole.log(cart_data)\r\n\t\t\tvar arr = [];\r\n\t\t\tfor (let i in cart_data){\r\n\t\t\t\tvar productID = cart_data[i].id;\r\n\t\t\t\tconsole.log(productID)\r\n\t\t\t\tlet num = cart_data[i].num;\r\n\t\t\t\tconsole.log(num)\r\n\t\t\t\tif(productID.length==7){\r\n\t\t\t\t\tvar url = \"https://api.ricebook.com/product/info/product_detail.json?product_id=\"+productID;\r\n\t\t\t\t}else{\r\n\t\t\t\t\tvar url = \"https://api.ricebook.com/product/info/product_detail.json?product_\"+productID;\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\tvar that = this;\r\n\t\t\t\tMyAjax.vueJson(url,function(data){\r\n\t\t\t\t\tconsole.log(data)\r\n\t\t\t\t//\tvar cityID = \r\n\t\t\t\t\tvar name = data.basic.name;\r\n\t\t\t\t\tvar price = data.basic.price/100;\r\n\t\t\t\t\tvar img_url = data.basic.product_images[0].img_url;\r\n\t\t\t\t\tvar obj = {\r\n\t\t\t\t\t\tproductID : productID,\r\n\t\t\t\t\t\tnum : num,\r\n\t\t\t\t\t\tname : name,\r\n\t\t\t\t\t\tprice : price,\r\n\t\t\t\t\t\timg_url : img_url\r\n\t\t\t\t\t}\r\n\t\t\t\t\tarr.push(obj); \r\n\t\t\t\t\tthat.money[i] = {\r\n\t\t\t\t\t\ts:false,\r\n\t\t\t\t\t\tm:num*price\r\n\t\t\t\t\t}\r\n\t\t\t\t},function(err){\r\n\t\t\t\t\tconsole.log(err)\r\n\t\t\t\t})\r\n\t\t\t\tthis.cartData = arr;\r\n\t\t\t\t//给input框遍历加上状态\r\n//\t\t\t\tfor(let i=0;i<this.cartData.length;i++){\r\n//\t                this.Money[i]={\r\n//\t                    s:false,\r\n//\t\t\t\t\t\tm:this.cartData[i].num*(this.cartData[i].price)\r\n//\t\t\t\t\t\t//.substring(1)\r\n//\t\t\t\t\t}\r\n//\t\t\t\t}\r\n\t\t\t\tconsole.log(this.cartData);\r\n\t\t\t\tconsole.log(this.money)\r\n\t\t\t}\t\r\n\t\t},\r\n\r\n\t\t\r\n\t}\r\n</script>\r\n\r\n<style scoped=\"scoped\">\r\n\t.cartFooter{\r\n\t\tposition: fixed;\r\n\t\twidth: 100%;\r\n\t\theight: 50px;\r\n\t\tdisplay: flex;\r\n\t\tbottom: 0;\r\n\t\tcolor: #ff3939;\r\n\t}\r\n\t.allChecked{\r\n\t\tflex:1;\r\n\t\ttext-align: center;\r\n\t\tline-height: 50px;\r\n\t\tspan{\r\n\t\t\tfont-size: 14px;\r\n\t\t}\r\n\t}\r\n\t.total{\r\n\t\tflex : 1;\r\n\t\ttext-align: center;\r\n\t\tline-height: 50px;\r\n\t}\r\n\t.total span:first-child{font-size: 14px;}\r\n\t.pay{\r\n\t\twidth:150px;\r\n\t\theight: 100%;\r\n\t\ttext-align: center;\r\n\t\tline-height: 50px;\r\n\t\tbackground: #ff3939;\r\n\t\tcolor: #FFFFFF;\r\n\t\tfont-size: 20px;\r\n\t}\r\n\tspan{\r\n\t\tdisplay: inline-block;\r\n\t}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__md_MyAjax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scss_cart_scss__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scss_cart_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__scss_cart_scss__);
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



/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			cartData: [],
			show: true,
			money: [],
			totalMoney: 0,
			flag: '',
			checkAll: false
		};
	},

	methods: {
		countMoney() {
			this.totalMoney = 0;
			for (let i = 0; i < this.money.length; i++) {
				if (this.money[i].s) {
					this.totalMoney += this.money[i].m;
				}
			}
		},
		checkedAll() {
			if (this.checkAll) {
				this.checkAll = false;
			} else {
				this.checkAll = true;
			}
			for (let i = 0; i < this.money.length; i++) {
				this.money[i].s = this.checkAll;
			}
			this.countMoney();
		},
		check(index) {
			var num = 0;
			if (this.money[index].s == false) {
				this.money[index].s = true;
			} else {
				this.money[index].s = false;
			}
			for (let i = 0; i < this.money.length; i++) {
				if (this.money[i].s) {
					num++;
				}
			}
			console.log(num, this.money.length);
			if (num == this.money.length) {
				console.log("true");
				this.checkAll = true;
			} else {
				this.checkAll = false;
			}
			this.countMoney();
		},
		minus(item, index) {
			//改变view;
			var cartData = this.cartData;
			var num = cartData[index].num;
			if (num > 1) {
				num--;
				cartData[index].num = num;
				//改变localstorage;
				var cart_data = JSON.parse(localStorage.getItem("cart"));
				cart_data[index].num = num;
				localStorage.setItem("cart", JSON.stringify(cart_data));
			}
			this.cartData = cartData;
			console.log(item);
			this.money[index].m = item.num * item.price;
			this.countMoney();
			//		console.log(this.money)
		},
		plus(item, index) {
			var cartData = this.cartData;
			var num = cartData[index].num;
			num++;
			cartData[index].num = num;
			//改变localstorage;
			var cart_data = JSON.parse(localStorage.getItem("cart"));
			cart_data[index].num = num;
			localStorage.setItem("cart", JSON.stringify(cart_data));
			this.cartData = cartData;
			this.money[index].m = item.num * item.price;
			this.countMoney();
		},
		del(index) {

			console.log(index);
			//改变view;
			var cartData = this.cartData;
			cartData.splice(index, 1);
			this.cartData = cartData;
			//改变localStorage;
			var cart_data = JSON.parse(localStorage.getItem("cart"));
			if (cart_data.length == 1) {
				localStorage.removeItem("cart");
				//	localStorage.clear("cart");
			} else {
				cart_data.splice(index, 1);
				localStorage.setItem("cart", JSON.stringify(cart_data));
			}
			//		this.countMoney();
		}
	},
	mounted() {
		var arr = JSON.parse(localStorage.getItem("cart"));
		console.log(arr);
		if (!arr) {
			this.show = false;
		} else if (arr.length == 0) {
			this.show = false;
		}

		var cart_data = JSON.parse(localStorage.getItem("cart"));
		//	this.cartData = cart_data;
		//	console.log(cart_data)
		var arr = [];
		for (let i in cart_data) {
			var productID = cart_data[i].id;
			console.log(productID);
			let num = cart_data[i].num;
			console.log(num);
			if (productID.length == 7) {
				var url = "https://api.ricebook.com/product/info/product_detail.json?product_id=" + productID;
			} else {
				var url = "https://api.ricebook.com/product/info/product_detail.json?product_" + productID;
			}

			var that = this;
			__WEBPACK_IMPORTED_MODULE_0__md_MyAjax___default.a.vueJson(url, function (data) {
				console.log(data);
				//	var cityID = 
				var name = data.basic.name;
				var price = data.basic.price / 100;
				var img_url = data.basic.product_images[0].img_url;
				var obj = {
					productID: productID,
					num: num,
					name: name,
					price: price,
					img_url: img_url
				};
				arr.push(obj);
				that.money[i] = {
					s: false,
					m: num * price
				};
			}, function (err) {
				console.log(err);
			});
			this.cartData = arr;
			//给input框遍历加上状态
			//				for(let i=0;i<this.cartData.length;i++){
			//	                this.Money[i]={
			//	                    s:false,
			//						m:this.cartData[i].num*(this.cartData[i].price)
			//						//.substring(1)
			//					}
			//				}
			console.log(this.cartData);
			console.log(this.money);
		}
	}

});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./cart.scss", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./cart.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%; }\n\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul,\nol, li {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset,\nimg {\n  border: 0; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n@font-face {\n  font-family: 'iconfont';\n  /* project id 391242 */\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot\");\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.svg#iconfont\") format(\"svg\"); }\n\n.iconfont {\n  font-family: iconfont; }\n\nhtml, body, #app {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.container {\n  width: 100%;\n  max-width: 640px;\n  margin: 0 auto;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  flex-direction: column; }\n  .container .header {\n    height: 44px;\n    width: 100%;\n    background-color: #000;\n    line-height: 44px;\n    font-size: 18px;\n    color: #fff; }\n    .container .header .commonHeader {\n      width: 100%;\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      flex-direction: row; }\n      .container .header .commonHeader .left {\n        font-size: 16px;\n        flex: .7;\n        text-align: left;\n        padding-left: 30px; }\n        .container .header .commonHeader .left a {\n          color: #fff; }\n      .container .header .commonHeader .center {\n        flex: 1;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .center img {\n          padding-top: 10px;\n          width: 80px;\n          height: 30px; }\n        .container .header .commonHeader .center span {\n          font-size: 12px;\n          padding-top: 5px; }\n      .container .header .commonHeader .right {\n        flex: .6;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .right .iconfont {\n          flex: 1;\n          font-style: normal;\n          display: -webkit-box;\n          display: flex;\n          -webkit-box-orient: vertical;\n          flex-direction: column;\n          -webkit-box-pack: center;\n          justify-content: center;\n          -webkit-box-align: center;\n          align-items: center; }\n      .container .header .commonHeader .back {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .title {\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .moreInfo {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n  .container #content {\n    width: 100%;\n    -webkit-box-flex: 1;\n    flex: 1;\n    overflow-y: auto; }\n    .container #content::-webkit-scrollbar {\n      display: none; }\n  .container .footer {\n    height: 50px;\n    width: 100%;\n    background-color: #eee; }\n    .container .footer ul {\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex; }\n      .container .footer ul li {\n        -webkit-box-flex: 1;\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n        .container .footer ul li.active {\n          color: #f66; }\n\na {\n  text-decoration: none; }\n\n.cart_content {\n  width: 100%; }\n  .cart_content li {\n    font-size: 14px;\n    margin: 20px 0;\n    width: 100%;\n    overflow: hidden;\n    display: -webkit-box;\n    display: flex; }\n    .cart_content li .check {\n      float: left;\n      flex: 1;\n      position: relative; }\n      .cart_content li .check input {\n        position: absolute;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        margin: 0auto;\n        margin: auto; }\n    .cart_content li img {\n      height: 100px;\n      float: left;\n      flex: 2; }\n    .cart_content li .desc {\n      margin-left: 20px;\n      margin-right: 15px;\n      float: left;\n      flex: 4; }\n      .cart_content li .desc .title {\n        margin-top: 10px;\n        line-height: 1.5; }\n      .cart_content li .desc .price {\n        line-height: 1.5;\n        color: #ff3939;\n        font-size: 12px;\n        margin-bottom: 20px; }\n      .cart_content li .desc .opotion span {\n        font-size: 13px;\n        color: #FF0000;\n        text-align: center;\n        line-height: 20px;\n        display: inline-block;\n        width: 20px;\n        height: 20px;\n        border: 1px solid #cecece;\n        vertical-align: middle;\n        background: #e9eaed; }\n      .cart_content li .desc .opotion .count {\n        margin: 0 10px;\n        border: none;\n        background: #fff; }\n      .cart_content li .desc .opotion .delete {\n        border: none;\n        background: #FFFFFF;\n        float: right;\n        font-size: 20px; }\n\n#cart_empty {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  margin: 0 auto;\n  text-align: center; }\n", ""]);

// exports


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('ul', {
    staticClass: "cart_content"
  }, _vm._l((_vm.cartData), function(list, index) {
    return _c('li', [_c('span', {
      staticClass: "iconfont check"
    }, [_c('input', {
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": _vm.money[index].s
      },
      on: {
        "click": function($event) {
          _vm.check(index)
        }
      }
    })]), _vm._v(" "), _c('img', {
      attrs: {
        "src": list.img_url
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "desc"
    }, [_c('div', {
      staticClass: "title"
    }, [_vm._v(_vm._s(list.name))]), _vm._v(" "), _c('div', {
      staticClass: "price"
    }, [_vm._v("单价：" + _vm._s(list.price) + "元")]), _vm._v(" "), _c('div', {
      staticClass: "opotion"
    }, [_c('span', {
      staticClass: "minus",
      on: {
        "click": function($event) {
          _vm.minus(list, index)
        }
      }
    }, [_vm._v("-")]), _vm._v(" "), _c('span', {
      staticClass: "count"
    }, [_vm._v(_vm._s(list.num))]), _vm._v(" "), _c('span', {
      staticClass: "plus",
      on: {
        "click": function($event) {
          _vm.plus(list, index)
        }
      }
    }, [_vm._v("+")]), _vm._v(" "), _c('span', {
      staticClass: "delete iconfont",
      on: {
        "click": function($event) {
          _vm.del(index)
        }
      }
    }, [_vm._v("")])])])])
  })) : _c('div', {
    attrs: {
      "id": "cart_empty"
    }
  }, [_vm._m(0)]), _vm._v(" "), _c('div', {
    staticClass: "cartFooter"
  }, [_c('div', {
    staticClass: "allChecked"
  }, [_c('span', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.checkAll),
      expression: "checkAll"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.checkAll) ? _vm._i(_vm.checkAll, null) > -1 : (_vm.checkAll)
    },
    on: {
      "click": function($event) {
        _vm.checkedAll()
      },
      "__c": function($event) {
        var $$a = _vm.checkAll,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.checkAll = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.checkAll = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.checkAll = $$c
        }
      }
    }
  })]), _vm._v(" "), _c('span', [_vm._v("全选")])]), _vm._v(" "), _c('div', {
    staticClass: "total"
  }, [_c('span', [_vm._v("合计:")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.totalMoney) + "元")])]), _vm._v(" "), _c('span', {
    staticClass: "pay"
  }, [_vm._v("去结算")])])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "kong"
    }
  }, [_c('div', {
    staticClass: "iconfont"
  }), _vm._v(" "), _c('span', [_vm._v("\n\t\t\t购物车为空\n\t\t")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4ee4fb80", esExports)
  }
}

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_CartFooter_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_57391f0a_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_CartFooter_vue__ = __webpack_require__(68);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(65)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-57391f0a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_CartFooter_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_57391f0a_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_CartFooter_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\CartFooter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CartFooter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57391f0a", Component.options)
  } else {
    hotAPI.reload("data-v-57391f0a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("50c5d572", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-57391f0a\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./CartFooter.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-57391f0a\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./CartFooter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.cartFooter[data-v-57391f0a]{\n\tdisplay: flex;\n\theight: 100%;\n\tcolor: #ff3939;\n}\n.allChecked[data-v-57391f0a]{\n\tflex:1;\n\ttext-align: center;\n\tline-height: 50px;\nspan{\n\t\tfont-size: 14px;\n}\n}\n.total[data-v-57391f0a]{\n\tflex : 1;\n\ttext-align: center;\n\tline-height: 50px;\n}\n.total span[data-v-57391f0a]:first-child{font-size: 14px;\n}\n.pay[data-v-57391f0a]{\n\twidth:150px;\n\theight: 100%;\n\ttext-align: center;\n\tline-height: 50px;\n\tbackground: #ff3939;\n\tcolor: #FFFFFF;\n\tfont-size: 20px;\n}\nspan[data-v-57391f0a]{\n\tdisplay: inline-block;\n}\n\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/CartFooter.vue?412a33fa"],"names":[],"mappings":";AA2BA;CACA,cAAA;CACA,aAAA;CACA,eAAA;CACA;AACA;CACA,OAAA;CACA,mBAAA;CACA,kBAAA;AACA;EACA,gBAAA;CACA;CACA;AACA;CACA,SAAA;CACA,mBAAA;CACA,kBAAA;CACA;AACA,yCAAA,gBAAA;CAAA;AACA;CACA,YAAA;CACA,aAAA;CACA,mBAAA;CACA,kBAAA;CACA,oBAAA;CACA,eAAA;CACA,gBAAA;CACA;AACA;CACA,sBAAA;CACA","file":"CartFooter.vue","sourcesContent":["<template>\r\n\t<div class=\"cartFooter\">\r\n\t\t<div class=\"allChecked\">\r\n\t\t\t<span>\r\n\t\t\t\t<input type=\"checkbox\"/>\r\n\t\t\t</span>\r\n\t\t\t<span>全选</span>\r\n\t\t</div>\r\n\t\t<div class=\"total\">\r\n\t\t\t<span>合计:</span>\r\n\t\t\t<span>0元</span>\r\n\t\t</div>\r\n\t\t<span class=\"pay\">去结算</span>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\texport default  {\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\t\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n<style scoped=\"scoped\">\r\n\t.cartFooter{\r\n\t\tdisplay: flex;\r\n\t\theight: 100%;\r\n\t\tcolor: #ff3939;\r\n\t}\r\n\t.allChecked{\r\n\t\tflex:1;\r\n\t\ttext-align: center;\r\n\t\tline-height: 50px;\r\n\t\tspan{\r\n\t\t\tfont-size: 14px;\r\n\t\t}\r\n\t}\r\n\t.total{\r\n\t\tflex : 1;\r\n\t\ttext-align: center;\r\n\t\tline-height: 50px;\r\n\t}\r\n\t.total span:first-child{font-size: 14px;}\r\n\t.pay{\r\n\t\twidth:150px;\r\n\t\theight: 100%;\r\n\t\ttext-align: center;\r\n\t\tline-height: 50px;\r\n\t\tbackground: #ff3939;\r\n\t\tcolor: #FFFFFF;\r\n\t\tfont-size: 20px;\r\n\t}\r\n\tspan{\r\n\t\tdisplay: inline-block;\r\n\t}\r\n\t\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {};
	}
});

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "cartFooter"
  }, [_c('div', {
    staticClass: "allChecked"
  }, [_c('span', [_c('input', {
    attrs: {
      "type": "checkbox"
    }
  })]), _vm._v(" "), _c('span', [_vm._v("全选")])]), _vm._v(" "), _c('div', {
    staticClass: "total"
  }, [_c('span', [_vm._v("合计:")]), _vm._v(" "), _c('span', [_vm._v("0元")])]), _vm._v(" "), _c('span', {
    staticClass: "pay"
  }, [_vm._v("去结算")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-57391f0a", esExports)
  }
}

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Login_vue__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_6ed31c0e_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Login_vue__ = __webpack_require__(75);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(70)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6ed31c0e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_6ed31c0e_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Login_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\Login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ed31c0e", Component.options)
  } else {
    hotAPI.reload("data-v-6ed31c0e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("65545540", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6ed31c0e\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Login.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6ed31c0e\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Login.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_login_scss__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_login_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_login_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__md_MyAjax_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__md_MyAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__md_MyAjax_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__md_Toast_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__md_Toast_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__md_Toast_js__);
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





/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {};
	},
	methods: {
		denglu() {
			var userID = $("#userName").val();
			var password = $("#password").val();

			if (userID == "" || password == "") {
				__WEBPACK_IMPORTED_MODULE_2__md_Toast_js___default.a.makeText("用户信息不完整", 2000);
			} else {
				$("#button").attr("disabled", "disabled"); //保证用户不可以连续点击
				$("#button").html("正在登录...");
				var that = this;
				var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID=" + userID + "&password=" + password;
				__WEBPACK_IMPORTED_MODULE_1__md_MyAjax_js___default.a.vueJson(url, function (data) {
					$("#button").removeAttr("disabled"); //保证用户不可以连续点击
					$("#button").html("登录");
					console.log(data);

					if (data == "0") {
						//用户名不存在
						__WEBPACK_IMPORTED_MODULE_2__md_Toast_js___default.a.makeText("用户不存在，请先注册", 1000);
					} else if (data == "2") {
						//密码错误
						__WEBPACK_IMPORTED_MODULE_2__md_Toast_js___default.a.makeText("密码错误", 1000);
					} else {
						//登录成功		

						localStorage.setItem("isLogin", "1");
						localStorage.setItem("userID", userID);
						that.$router.push({ path: '/home' });
					}
				}, function (err) {
					$("#button").removeAttr("disabled"); //保证用户不可以连续点击
					$("#button").val("登录");
					console.log(err);
				});
			}
		}
	}
});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./login.scss", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./login.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%; }\n\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul,\nol, li {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset,\nimg {\n  border: 0; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n@font-face {\n  font-family: 'iconfont';\n  /* project id 391242 */\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot\");\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.svg#iconfont\") format(\"svg\"); }\n\n.iconfont {\n  font-family: iconfont; }\n\nhtml, body, #app {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.container {\n  width: 100%;\n  max-width: 640px;\n  margin: 0 auto;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  flex-direction: column; }\n  .container .header {\n    height: 44px;\n    width: 100%;\n    background-color: #000;\n    line-height: 44px;\n    font-size: 18px;\n    color: #fff; }\n    .container .header .commonHeader {\n      width: 100%;\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      flex-direction: row; }\n      .container .header .commonHeader .left {\n        font-size: 16px;\n        flex: .7;\n        text-align: left;\n        padding-left: 30px; }\n        .container .header .commonHeader .left a {\n          color: #fff; }\n      .container .header .commonHeader .center {\n        flex: 1;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .center img {\n          padding-top: 10px;\n          width: 80px;\n          height: 30px; }\n        .container .header .commonHeader .center span {\n          font-size: 12px;\n          padding-top: 5px; }\n      .container .header .commonHeader .right {\n        flex: .6;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .right .iconfont {\n          flex: 1;\n          font-style: normal;\n          display: -webkit-box;\n          display: flex;\n          -webkit-box-orient: vertical;\n          flex-direction: column;\n          -webkit-box-pack: center;\n          justify-content: center;\n          -webkit-box-align: center;\n          align-items: center; }\n      .container .header .commonHeader .back {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .title {\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .moreInfo {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n  .container #content {\n    width: 100%;\n    -webkit-box-flex: 1;\n    flex: 1;\n    overflow-y: auto; }\n    .container #content::-webkit-scrollbar {\n      display: none; }\n  .container .footer {\n    height: 50px;\n    width: 100%;\n    background-color: #eee; }\n    .container .footer ul {\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex; }\n      .container .footer ul li {\n        -webkit-box-flex: 1;\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n        .container .footer ul li.active {\n          color: #f66; }\n\na {\n  text-decoration: none; }\n\n.loginbao {\n  width: 86%;\n  margin: 0 auto;\n  position: relative; }\n  .loginbao .loginlogo {\n    width: 100%;\n    height: 80px;\n    padding-top: 30px;\n    text-align: center; }\n    .loginbao .loginlogo img {\n      width: 120px;\n      height: 40px; }\n  .loginbao input {\n    width: 100%;\n    height: 40px;\n    border: 1px solid #BDC0C5;\n    outline: none;\n    margin: 10px auto;\n    text-indent: 10px;\n    color: #757575;\n    font-size: 13px;\n    border-radius: 5px; }\n  .loginbao #button {\n    width: 100%;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    color: #FFFFFF;\n    background: #1A1A1A;\n    margin: 20px 0 60px 0; }\n  .loginbao #tozhuce {\n    display: inline-block;\n    width: 20%;\n    height: 30px;\n    line-height: 30px;\n    text-align: center;\n    background: #1A1A1A;\n    margin: 20px 0; }\n    .loginbao #tozhuce a {\n      color: #FFFFFF; }\n  .loginbao p {\n    width: 100%;\n    text-align: center;\n    height: 20px;\n    line-height: 20px;\n    color: #92969C;\n    font-size: 12px; }\n    .loginbao p span {\n      color: #2C3038;\n      text-decoration: underline; }\n  .loginbao #toast {\n    position: absolute;\n    height: 30px;\n    width: 100px;\n    line-height: 30px;\n    text-align: center;\n    color: #FFFFFF;\n    border-radius: 10px;\n    background-color: rgba(0, 0, 0, 0.7);\n    display: none;\n    left: 35%;\n    bottom: -40px; }\n", ""]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "loginbao"
  }, [_vm._m(0), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "name": "",
      "id": "userName",
      "value": "",
      "placeholder": "用户名"
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "password",
      "name": "",
      "id": "password",
      "value": "",
      "placeholder": "密码"
    }
  }), _vm._v(" "), _c('div', {
    attrs: {
      "id": "button"
    },
    on: {
      "click": function($event) {
        _vm.denglu()
      }
    }
  }, [_vm._v("登录")]), _vm._v(" "), _c('p', [_vm._v("未注册的用户登录后自动创建")]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    attrs: {
      "id": "toast"
    }
  })])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "loginlogo"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(76)
    }
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("登录即表示您同意"), _c('span', [_vm._v("用户协议")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6ed31c0e", esExports)
  }
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "af09dff1bf0800d2a06fd3c91ed751a4.png";

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_HomeHeader_vue__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_eb932928_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_HomeHeader_vue__ = __webpack_require__(81);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(78)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-eb932928"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_HomeHeader_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_eb932928_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_HomeHeader_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\HomeHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] HomeHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-eb932928", Component.options)
  } else {
    hotAPI.reload("data-v-eb932928", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(79);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("57a95340", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-eb932928\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./HomeHeader.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-eb932928\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./HomeHeader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.search[data-v-eb932928]{\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 44px;\n\twidth: 100%;\n\theight: 50px;\n\tbackground: #FFFFFF;\n\tz-index: 10;\n\tcolor: #000000;\n\tpadding: 0 20px;\n}\n.right a[data-v-eb932928]{\n\tdisplay: inline-block;\n\twidth: 20px;\n}\n.right a .iconfont[data-v-eb932928]{\n\t\tcolor: #fff;\n}\n.search a span[data-v-eb932928]{\n\t    width: 20%;\n\t\tdisplay: inline-block;\n\t\tmargin-left: 10px;\n\t\tfont-size: 16px;\n\t\tcolor:#000;\n}\n.search input[data-v-eb932928]{\n\t\tpadding: 5px;\n\t    background: #f2f3f4;\n\t    border: none;\n\t    text-align: center;\n\t    width: 70%;\n\t    border-radius: 5%;\n\t    outline: none;\n\t    font-size: 16px;\n}\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/HomeHeader.vue?7d70e575"],"names":[],"mappings":";AAsDA;CACA,cAAA;CACA,mBAAA;CACA,UAAA;CACA,YAAA;CACA,aAAA;CACA,oBAAA;CACA,YAAA;CACA,eAAA;CACA,gBAAA;CAGA;AACA;CACA,sBAAA;CACA,YAAA;CAEA;AACA;EACA,YAAA;CACA;AACA;KACA,WAAA;EACA,sBAAA;EACA,kBAAA;EACA,gBAAA;EACA,WAAA;CACA;AACA;EACA,aAAA;KACA,oBAAA;KACA,aAAA;KACA,mBAAA;KACA,WAAA;KACA,kBAAA;KACA,cAAA;KACA,gBAAA;CACA","file":"HomeHeader.vue","sourcesContent":["<template>\r\n\t<div class=\"commonHeader\">\r\n\t\t<div class=\"left\">\r\n\t\t\t<router-link to=\"/kind\">分类</router-link>\r\n\t\t</div>\r\n\t\t<div class=\"center\">\r\n\t\t\t<img src=\"../img/logo.png\">\r\n\t\t\t<span>上海</span>\r\n\t\t</div>\r\n\t\t<div class=\"right\">\r\n\t\t\t<router-link to=\"/my\" v-if=\"isLogin\">\r\n\t\t\t\t<i class=\"iconfont\">&#xe69a;</i>\r\n\t\t\t</router-link>\r\n\t\t\t<router-link to=\"/my\" v-else=\"!isLogin\">\r\n\t\t\t\t<i class=\"iconfont\">&#xe69a;</i>\r\n\t\t\t</router-link>\r\n\t\t\t<i class=\"iconfont\" @click=\"showSearch()\">&#xe613;</i>\r\n\t\t</div>\r\n\t\t<div class=\"search\">\r\n\t\t\t<input type=\"text\" placeholder=\"搜索本地精选/快递到家\" v-model=\"searchWord\">\r\n\t\t\t<router-link :to=\"{name:'list',params:{query_k:searchWord}}\">\r\n\t\t\t\t<span class=\"toList\">搜索</span>\r\n\t\t\t</router-link>\r\n\t\t</div>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\texport default {\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\tsearchWord : '',\r\n\t\t\t\tisLogin : true\r\n\t\t\t}\r\n\t\t},\r\n\t\tmethods : {\r\n\t\t\tshowSearch(){\r\n\t\t\t\t$(\".search\").toggle();\r\n\t\t\t//\tconsole.log(1111);\r\n\t\t\t}\r\n\t\t},\r\n\t\t/*mounted(){\r\n\t\t\tvar login=localStorage.getItem(\"isLogin\");\r\n\t\t\tconsole.log(login)\r\n\t\t\tif(!login){\r\n\t\t\t\tthis.isLogin=false;\r\n\t\t\t}else {\r\n\t\t\t\tthis.isLogin = false;\r\n\t\t\t}\r\n\t\t}*/\r\n\t}\r\n</script>\r\n\r\n<style scoped=\"scoped\">\r\n\t.search{\r\n\t\tdisplay: none;\r\n\t\tposition: absolute;\r\n\t\ttop: 44px;\r\n\t\twidth: 100%;\r\n\t\theight: 50px;\r\n\t\tbackground: #FFFFFF;\r\n\t\tz-index: 10;\r\n\t\tcolor: #000000;\r\n\t\tpadding: 0 20px;\r\n\t\t\r\n\t\t\r\n\t}\r\n\t.right a{\r\n\t\tdisplay: inline-block;\r\n\t\twidth: 20px;\r\n\t\t\r\n\t}\r\n\t.right a .iconfont{\r\n\t\t\tcolor: #fff;\r\n\t\t}\r\n\t.search a span{\r\n\t\t    width: 20%;\r\n\t\t\tdisplay: inline-block;\r\n\t\t\tmargin-left: 10px;\r\n\t\t\tfont-size: 16px;\r\n\t\t\tcolor:#000;\r\n\t\t}\r\n\t.search input{\r\n\t\t\tpadding: 5px;\r\n\t\t    background: #f2f3f4;\r\n\t\t    border: none;\r\n\t\t    text-align: center;\r\n\t\t    width: 70%;\r\n\t\t    border-radius: 5%;\r\n\t\t    outline: none;\r\n\t\t    font-size: 16px;\r\n\t\t}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			searchWord: '',
			isLogin: true
		};
	},
	methods: {
		showSearch() {
			$(".search").toggle();
			//	console.log(1111);
		}
	}
	/*mounted(){
 	var login=localStorage.getItem("isLogin");
 	console.log(login)
 	if(!login){
 		this.isLogin=false;
 	}else {
 		this.isLogin = false;
 	}
 }*/
});

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "commonHeader"
  }, [_c('div', {
    staticClass: "left"
  }, [_c('router-link', {
    attrs: {
      "to": "/kind"
    }
  }, [_vm._v("分类")])], 1), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [(_vm.isLogin) ? _c('router-link', {
    attrs: {
      "to": "/my"
    }
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")])]) : _c('router-link', {
    attrs: {
      "to": "/my"
    }
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")])]), _vm._v(" "), _c('i', {
    staticClass: "iconfont",
    on: {
      "click": function($event) {
        _vm.showSearch()
      }
    }
  }, [_vm._v("")])], 1), _vm._v(" "), _c('div', {
    staticClass: "search"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.searchWord),
      expression: "searchWord"
    }],
    attrs: {
      "type": "text",
      "placeholder": "搜索本地精选/快递到家"
    },
    domProps: {
      "value": (_vm.searchWord)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.searchWord = $event.target.value
      }
    }
  }), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": {
        name: 'list',
        params: {
          query_k: _vm.searchWord
        }
      }
    }
  }, [_c('span', {
    staticClass: "toList"
  }, [_vm._v("搜索")])])], 1)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "center"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(8)
    }
  }), _vm._v(" "), _c('span', [_vm._v("上海")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-eb932928", esExports)
  }
}

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_DiscoverHeader_vue__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_3692a5f6_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_DiscoverHeader_vue__ = __webpack_require__(86);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(83)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_DiscoverHeader_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_3692a5f6_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_DiscoverHeader_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\DiscoverHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DiscoverHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3692a5f6", Component.options)
  } else {
    hotAPI.reload("data-v-3692a5f6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("47e2c63b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3692a5f6\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./DiscoverHeader.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3692a5f6\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./DiscoverHeader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"DiscoverHeader.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {};
	}
});

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("发现头部")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3692a5f6", esExports)
  }
}

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_InviteHeader_vue__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_244211d4_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_InviteHeader_vue__ = __webpack_require__(91);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(88)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_InviteHeader_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_244211d4_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_InviteHeader_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\InviteHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] InviteHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-244211d4", Component.options)
  } else {
    hotAPI.reload("data-v-244211d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(89);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f27b6d6a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-244211d4\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./InviteHeader.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-244211d4\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./InviteHeader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"InviteHeader.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {};
	}
});

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("邀请头部")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-244211d4", esExports)
  }
}

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_MyHeader_vue__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_5300a9f9_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_MyHeader_vue__ = __webpack_require__(96);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(93)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5300a9f9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_MyHeader_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_5300a9f9_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_MyHeader_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\MyHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MyHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5300a9f9", Component.options)
  } else {
    hotAPI.reload("data-v-5300a9f9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(94);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7473b54e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5300a9f9\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./MyHeader.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5300a9f9\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./MyHeader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"MyHeader.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {};
	}
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5300a9f9", esExports)
  }
}

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_DetailFooter_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_7c30fb28_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_DetailFooter_vue__ = __webpack_require__(103);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(98)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_DetailFooter_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_7c30fb28_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_DetailFooter_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\DetailFooter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DetailFooter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7c30fb28", Component.options)
  } else {
    hotAPI.reload("data-v-7c30fb28", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(99);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7ba81070", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7c30fb28\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./DetailFooter.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7c30fb28\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./DetailFooter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.detailfooter_1{\n\tposition: relative;\n\tbackground: #f00;\n\tcolor: #FFFFFF;\n\ttext-align: center;\n\tline-height: 50px;\n\tposition: absolute;\n\tdisplay: none;\n}\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/DetailFooter.vue?4df6dda9"],"names":[],"mappings":";AA0GA;CACA,mBAAA;CACA,iBAAA;CACA,eAAA;CACA,mBAAA;CACA,kBAAA;CACA,mBAAA;CACA,cAAA;CAEA","file":"DetailFooter.vue","sourcesContent":["<template>\r\n\t<div class=\"detail_footer\">\r\n\t\t<div class=\"detailfooter\">\r\n\t\t\t<router-link to = \"/cart\">\r\n\t\t\t\t<div class=\"cart iconfont\" @click=\"toCart()\">&#xe602;</div>\r\n\t\t\t\t<span class=\"addSuccess\">+{{msg}}</span>\r\n\t\t\t</router-link>\r\n\t\t\t<div class=\"addCart\" @click=\"addCart()\">加入购物车</div>\r\n\t\t\t<div class=\"buyNow\" @click=\"buyNow()\">即刻购买</div>\r\n\t\t\t\r\n\t\t</div>\r\n\t\t<div class=\"detailfooter_1\" @click=\"showChoice()\">\r\n\t\t\t确定\r\n\t\t</div>\r\n\t\t<div id=\"toast\"></div>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\timport \"./../scss/detailfooter.scss\";\r\n\timport Toast from \"./../md/Toast.js\";\r\n\tvar flag = 0;\r\n\texport default {\r\n\t\tprops : ['msg'],\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\tnum:'1'\r\n\t\t\t}\r\n\t\t},\r\n\t\tmethods : {\r\n\t\t\tshowChoice(){\r\n\t\t\t\t\r\n\t\t\t\tflag = !flag;\r\n\t\t\t\t$(\".choiceNum\").toggle();\r\n\t\t\t\t$(\".shopList\").toggle();\r\n\t\t\t\t$(\".detailfooter\").toggle();\r\n\t\t\t\t$(\".detailfooter_1\").toggle();\r\n\t\t\t\tif(flag){\r\n\t\t\t\t\t$(\".close\").html(\"关闭<i class='iconfont'>&#xe603;</i>\");\r\n\t\t\t\t}else{\r\n\t\t\t\t\t$(\".close\").html(\"切换商品<i class='iconfont'>&#xe604;</i>\");\r\n\t\t\t\t}\r\n\t\t\t\t$(\"#on\").html(\"&#xe606;\")\r\n\t\t\t\t$(\"#on\").css(\"border\",\"none\")\r\n\t\t\t},\r\n\t\t\taddCart(){\r\n\t\t\t\tvar productID = location.href.split(\"detail/\")[1];\r\n\t\t\t\tvar num = this.msg;\r\n\t\t\t\tif(localStorage.getItem(\"cart\")){\r\n\t\t\t\t\tvar str_obj = localStorage.getItem(\"cart\");\r\n\t\t\t\t\tvar arr_obj = JSON.parse(str_obj);\r\n\t\t\t\t\tvar a = 0;\r\n\t\t\t\t\t//遍历商品，如果存在加1，如果不存在直接push进去；\r\n\t\t\t\t\tfor(let i in arr_obj){\r\n\t\t\t\t\t\tconsole.log(arr_obj[i])\r\n\t\t\t\t\t\tif(arr_obj[i].id == productID){\r\n\t\t\t\t\t\t\tarr_obj[i].num = Number(arr_obj[i].num) + Number(num);\r\n\t\t\t\t\t\t\tlocalStorage.setItem(\"cart\",JSON.stringify(arr_obj));\r\n\t\t\t\t\t\t\tToast.makeText(\"加入购物车成功\",1500);\r\n\t\t\t\t\t\t\tbreak;\r\n\t\t\t\t\t\t}else{\r\n\t\t\t\t\t\t\ta++\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t}\r\n\t\t\t\t\tif(a==arr_obj.length){\r\n\t\t\t\t\t\tvar obj = {\r\n\t\t\t\t\t\t\tid : productID,\r\n\t\t\t\t\t\t\tnum : num \r\n\t\t\t\t\t\t};\r\n\t\t\t\t\t\tarr_obj.push(obj);\r\n\t\t\t\t\t\tlocalStorage.setItem(\"cart\",JSON.stringify(arr_obj));\r\n\t\t\t\t\t//\t$(\".addSuccess\").css(\"display\",\"block\")\r\n\t\t\t\t\t\tToast.makeText(\"加入购物车成功\",1500);\r\n\t\t\t\t\t}\r\n\t\t\t\t\t\r\n\t\t\t\t}else{\r\n\t\t\t\t\tvar arr_obj = [];\r\n\t\t\t\t\tvar obj = {\r\n\t\t\t\t\t\tid : productID,\r\n\t\t\t\t\t\tnum : num \r\n\t\t\t\t\t};\r\n\t\t\t\t\tarr_obj.push(obj);\r\n\t\t\t\t\tlocalStorage.setItem(\"cart\",JSON.stringify(arr_obj));\r\n\t\t\t\t//\t$(\".addSuccess\").css(\"display\",\"block\")\r\n\t\t\t\t\tToast.makeText(\"加入购物车成功\",1500);\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t},\r\n\t\t\tbuyNow(){\r\n\t\t\t\t\r\n\t\t\t},\r\n\t\t\ttoCart(){\r\n\t\t\t\t\r\n\t\t\t}\r\n\t\t},\r\n\t\tmounted(){\r\n\t\t\tthis.num = this.msg\r\n\r\n\t\t}\r\n\t}\r\n\t\r\n</script>\r\n\r\n<style>\r\n\t.detailfooter_1{\r\n\t\tposition: relative;\r\n\t\tbackground: #f00;\r\n\t\tcolor: #FFFFFF;\r\n\t\ttext-align: center;\r\n\t\tline-height: 50px;\r\n\t\tposition: absolute;\r\n\t\tdisplay: none;\r\n\t\t\r\n\t}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_detailfooter_scss__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_detailfooter_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_detailfooter_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__md_Toast_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__md_Toast_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__md_Toast_js__);
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



var flag = 0;
/* harmony default export */ __webpack_exports__["a"] = ({
	props: ['msg'],
	data() {
		return {
			num: '1'
		};
	},
	methods: {
		showChoice() {

			flag = !flag;
			$(".choiceNum").toggle();
			$(".shopList").toggle();
			$(".detailfooter").toggle();
			$(".detailfooter_1").toggle();
			if (flag) {
				$(".close").html("关闭<i class='iconfont'>&#xe603;</i>");
			} else {
				$(".close").html("切换商品<i class='iconfont'>&#xe604;</i>");
			}
			$("#on").html("&#xe606;");
			$("#on").css("border", "none");
		},
		addCart() {
			var productID = location.href.split("detail/")[1];
			var num = this.msg;
			if (localStorage.getItem("cart")) {
				var str_obj = localStorage.getItem("cart");
				var arr_obj = JSON.parse(str_obj);
				var a = 0;
				//遍历商品，如果存在加1，如果不存在直接push进去；
				for (let i in arr_obj) {
					console.log(arr_obj[i]);
					if (arr_obj[i].id == productID) {
						arr_obj[i].num = Number(arr_obj[i].num) + Number(num);
						localStorage.setItem("cart", JSON.stringify(arr_obj));
						__WEBPACK_IMPORTED_MODULE_1__md_Toast_js___default.a.makeText("加入购物车成功", 1500);
						break;
					} else {
						a++;
					}
				}
				if (a == arr_obj.length) {
					var obj = {
						id: productID,
						num: num
					};
					arr_obj.push(obj);
					localStorage.setItem("cart", JSON.stringify(arr_obj));
					//	$(".addSuccess").css("display","block")
					__WEBPACK_IMPORTED_MODULE_1__md_Toast_js___default.a.makeText("加入购物车成功", 1500);
				}
			} else {
				var arr_obj = [];
				var obj = {
					id: productID,
					num: num
				};
				arr_obj.push(obj);
				localStorage.setItem("cart", JSON.stringify(arr_obj));
				//	$(".addSuccess").css("display","block")
				__WEBPACK_IMPORTED_MODULE_1__md_Toast_js___default.a.makeText("加入购物车成功", 1500);
			}
		},
		buyNow() {},
		toCart() {}
	},
	mounted() {
		this.num = this.msg;
	}
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(102);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./detailfooter.scss", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./detailfooter.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%; }\n\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul,\nol, li {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset,\nimg {\n  border: 0; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n@font-face {\n  font-family: 'iconfont';\n  /* project id 391242 */\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot\");\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.svg#iconfont\") format(\"svg\"); }\n\n.iconfont {\n  font-family: iconfont; }\n\nhtml, body, #app {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.container {\n  width: 100%;\n  max-width: 640px;\n  margin: 0 auto;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  flex-direction: column; }\n  .container .header {\n    height: 44px;\n    width: 100%;\n    background-color: #000;\n    line-height: 44px;\n    font-size: 18px;\n    color: #fff; }\n    .container .header .commonHeader {\n      width: 100%;\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      flex-direction: row; }\n      .container .header .commonHeader .left {\n        font-size: 16px;\n        flex: .7;\n        text-align: left;\n        padding-left: 30px; }\n        .container .header .commonHeader .left a {\n          color: #fff; }\n      .container .header .commonHeader .center {\n        flex: 1;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .center img {\n          padding-top: 10px;\n          width: 80px;\n          height: 30px; }\n        .container .header .commonHeader .center span {\n          font-size: 12px;\n          padding-top: 5px; }\n      .container .header .commonHeader .right {\n        flex: .6;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .right .iconfont {\n          flex: 1;\n          font-style: normal;\n          display: -webkit-box;\n          display: flex;\n          -webkit-box-orient: vertical;\n          flex-direction: column;\n          -webkit-box-pack: center;\n          justify-content: center;\n          -webkit-box-align: center;\n          align-items: center; }\n      .container .header .commonHeader .back {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .title {\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .moreInfo {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n  .container #content {\n    width: 100%;\n    -webkit-box-flex: 1;\n    flex: 1;\n    overflow-y: auto; }\n    .container #content::-webkit-scrollbar {\n      display: none; }\n  .container .footer {\n    height: 50px;\n    width: 100%;\n    background-color: #eee; }\n    .container .footer ul {\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex; }\n      .container .footer ul li {\n        -webkit-box-flex: 1;\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n        .container .footer ul li.active {\n          color: #f66; }\n\na {\n  text-decoration: none; }\n\n.detail_footer, .detailfooter_1 {\n  width: 100%;\n  height: 100%;\n  position: relative; }\n\n.detailfooter {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  flex-direction: row; }\n  .detailfooter a {\n    position: relative;\n    flex: 1; }\n    .detailfooter a span {\n      display: none;\n      color: #F00;\n      font-size: 12px;\n      position: absolute;\n      top: 18%;\n      left: 40%;\n      z-index: 10; }\n  .detailfooter .cart {\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    flex-direction: column;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    align-items: center; }\n  .detailfooter .addCart {\n    flex: 2;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    flex-direction: column;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    align-items: center;\n    color: #FFFFFF;\n    background: #ffb22a; }\n  .detailfooter .buyNow {\n    flex: 2;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    flex-direction: column;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    align-items: center;\n    color: #FFFFFF;\n    background: #ff3939; }\n\n#toast {\n  display: none;\n  position: absolute;\n  top: -200px;\n  z-index: 1000;\n  left: 35%;\n  border: 1px solid #000000;\n  border-radius: 10px;\n  background: #000000;\n  opacity: .8;\n  text-align: center;\n  color: #fff;\n  padding: 5px; }\n", ""]);

// exports


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "detail_footer"
  }, [_c('div', {
    staticClass: "detailfooter"
  }, [_c('router-link', {
    attrs: {
      "to": "/cart"
    }
  }, [_c('div', {
    staticClass: "cart iconfont",
    on: {
      "click": function($event) {
        _vm.toCart()
      }
    }
  }, [_vm._v("")]), _vm._v(" "), _c('span', {
    staticClass: "addSuccess"
  }, [_vm._v("+" + _vm._s(_vm.msg))])]), _vm._v(" "), _c('div', {
    staticClass: "addCart",
    on: {
      "click": function($event) {
        _vm.addCart()
      }
    }
  }, [_vm._v("加入购物车")]), _vm._v(" "), _c('div', {
    staticClass: "buyNow",
    on: {
      "click": function($event) {
        _vm.buyNow()
      }
    }
  }, [_vm._v("即刻购买")])], 1), _vm._v(" "), _c('div', {
    staticClass: "detailfooter_1",
    on: {
      "click": function($event) {
        _vm.showChoice()
      }
    }
  }, [_vm._v("\n\t\t确定\n\t")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "toast"
    }
  })])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7c30fb28", esExports)
  }
}

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_KindHeader_vue__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_0b8a93e1_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_KindHeader_vue__ = __webpack_require__(108);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(105)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0b8a93e1"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_KindHeader_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_0b8a93e1_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_KindHeader_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\KindHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] KindHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b8a93e1", Component.options)
  } else {
    hotAPI.reload("data-v-0b8a93e1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(106);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ca95fb24", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0b8a93e1\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./KindHeader.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0b8a93e1\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./KindHeader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.search[data-v-0b8a93e1]{\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 44px;\n\twidth: 100%;\n\theight: 50px;\n\tbackground: #FFFFFF;\n\tz-index: 10;\n\tcolor: #000000;\n\tpadding: 0 20px;\n}\n.right a[data-v-0b8a93e1]{\n\tdisplay: inline-block;\n\twidth: 20px;\n}\n.right a .iconfont[data-v-0b8a93e1]{\n\t\tcolor: #fff;\n}\n.search span[data-v-0b8a93e1]{\n    width: 20%;\n\tdisplay: inline-block;\n\tmargin-left: 10px;\n\tfont-size: 16px;\n}\n.search input[data-v-0b8a93e1]{\n\tpadding: 5px;\n    background: #f2f3f4;\n    border: none;\n    text-align: center;\n    width: 70%;\n    border-radius: 5%;\n    outline: none;\n}\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/KindHeader.vue?a2533f92"],"names":[],"mappings":";AA+CA;CACA,cAAA;CACA,mBAAA;CACA,UAAA;CACA,YAAA;CACA,aAAA;CACA,oBAAA;CACA,YAAA;CACA,eAAA;CACA,gBAAA;CAGA;AACA;CACA,sBAAA;CACA,YAAA;CAEA;AACA;EACA,YAAA;CACA;AACA;IACA,WAAA;CACA,sBAAA;CACA,kBAAA;CACA,gBAAA;CACA;AACA;CACA,aAAA;IACA,oBAAA;IACA,aAAA;IACA,mBAAA;IACA,WAAA;IACA,kBAAA;IACA,cAAA;CACA","file":"KindHeader.vue","sourcesContent":["<template>\r\n\t<div class=\"commonHeader\">\r\n\t\t<div class=\"left\">\r\n\t\t\t<router-link to=\"/\"><a>首页</a></router-link>\r\n\t\t</div>\r\n\t\t<div class=\"center\">\r\n\t\t\t<img src=\"../img/logo.png\">\r\n\t\t\t<span>上海</span>\r\n\t\t</div>\r\n\t\t<div class=\"right\">\r\n\t\t\t<router-link to=\"/my\" v-if=\"isLogin\">\r\n\t\t\t\t<i class=\"iconfont\">&#xe69a;</i>\r\n\t\t\t</router-link>\r\n\t\t\t<router-link to=\"/my\" v-else=\"!isLogin\">\r\n\t\t\t\t<i class=\"iconfont\">&#xe69a;</i>\r\n\t\t\t</router-link>\r\n\t\t\t<i class=\"iconfont\" @click=\"showSearch()\">&#xe613;</i>\r\n\t\t</div>\r\n\t\t<div class=\"search\">\r\n\t\t\t<input type=\"text\" placeholder=\"搜索本地精选/快递到家\" v-model=\"searchWord\">\r\n\t\t\t<router-link :to=\"{name:'list',params:{query_k:searchWord}}\">\r\n\t\t\t\t<span class=\"toList\" @click=\"reload()\">搜索</span>\r\n\t\t\t</router-link>\r\n\t\t</div>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\texport default {\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\tsearchWord : '',\r\n\t\t\t\tisLogin : true\r\n\t\t\t}\r\n\t\t},\r\n\t\tmethods : {\r\n\t\t\tshowSearch(){\r\n\t\t\t\t$(\".search\").toggle();\r\n\t\t\t},\r\n\t\t\treload(){\r\n\t\t\t\tlocation.reload()\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n<style scoped=\"scoped\">\r\n\t.search{\r\n\t\tdisplay: none;\r\n\t\tposition: absolute;\r\n\t\ttop: 44px;\r\n\t\twidth: 100%;\r\n\t\theight: 50px;\r\n\t\tbackground: #FFFFFF;\r\n\t\tz-index: 10;\r\n\t\tcolor: #000000;\r\n\t\tpadding: 0 20px;\r\n\t\t\r\n\t\t\r\n\t}\r\n\t.right a{\r\n\t\tdisplay: inline-block;\r\n\t\twidth: 20px;\r\n\t\t\r\n\t}\r\n\t.right a .iconfont{\r\n\t\t\tcolor: #fff;\r\n\t\t}\r\n\t.search span{\r\n\t    width: 20%;\r\n\t\tdisplay: inline-block;\r\n\t\tmargin-left: 10px;\r\n\t\tfont-size: 16px;\r\n\t}\r\n\t.search input{\r\n\t\tpadding: 5px;\r\n\t    background: #f2f3f4;\r\n\t    border: none;\r\n\t    text-align: center;\r\n\t    width: 70%;\r\n\t    border-radius: 5%;\r\n\t    outline: none;\r\n\t}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			searchWord: '',
			isLogin: true
		};
	},
	methods: {
		showSearch() {
			$(".search").toggle();
		},
		reload() {
			location.reload();
		}
	}
});

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "commonHeader"
  }, [_c('div', {
    staticClass: "left"
  }, [_c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_c('a', [_vm._v("首页")])])], 1), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [(_vm.isLogin) ? _c('router-link', {
    attrs: {
      "to": "/my"
    }
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")])]) : _c('router-link', {
    attrs: {
      "to": "/my"
    }
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")])]), _vm._v(" "), _c('i', {
    staticClass: "iconfont",
    on: {
      "click": function($event) {
        _vm.showSearch()
      }
    }
  }, [_vm._v("")])], 1), _vm._v(" "), _c('div', {
    staticClass: "search"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.searchWord),
      expression: "searchWord"
    }],
    attrs: {
      "type": "text",
      "placeholder": "搜索本地精选/快递到家"
    },
    domProps: {
      "value": (_vm.searchWord)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.searchWord = $event.target.value
      }
    }
  }), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": {
        name: 'list',
        params: {
          query_k: _vm.searchWord
        }
      }
    }
  }, [_c('span', {
    staticClass: "toList",
    on: {
      "click": function($event) {
        _vm.reload()
      }
    }
  }, [_vm._v("搜索")])])], 1)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "center"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(8)
    }
  }), _vm._v(" "), _c('span', [_vm._v("上海")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0b8a93e1", esExports)
  }
}

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_List_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_285ec8be_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_List_vue__ = __webpack_require__(113);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(110)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-285ec8be"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_List_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_285ec8be_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_List_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\List.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] List.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-285ec8be", Component.options)
  } else {
    hotAPI.reload("data-v-285ec8be", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(111);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2f6d1d38", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-285ec8be\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./List.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-285ec8be\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./List.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.category-wrap[data-v-285ec8be]{overflow: hidden;\n}\n.category-header[data-v-285ec8be]{width:100%;height: 40px;font-size: 15px;position: fixed;background: #FFFFFF;\n}\n.content[data-v-285ec8be]{width:100%;height: 100%;display: flex;border-bottom: 1px solid #f6f6f6;\n}\n.content li[data-v-285ec8be]{flex:1;text-align: center;line-height: 40px;\n}\n.content li[data-v-285ec8be]:first-child{border-right: 1px solid #f6f6f6;\n}\n.sort li[data-v-285ec8be]{height: 40px;text-align: center;line-height: 40px;border-bottom:1px solid #f6f6f6;\n}\n.sort[data-v-285ec8be]{display: none;background: #fff;position: absolute;width:100%;\n}\n.sort .on[data-v-285ec8be]{color: #ff3939;background-color: #fafafa;\n}\n.kindLists[data-v-285ec8be]{margin-top: 40px;\n}\n.kindLists li[data-v-285ec8be] {padding: 10px;height: 120px;border-bottom: 1px solid #e6e6e6;\n}\n.kindLists li .imgwrap[data-v-285ec8be]{width: 50%;overflow: hidden;float: left;\n}\n.kindLists li .imgwrap img[data-v-285ec8be]{width:100%;height: 100%;border:none;\n}\n.kindLists li .desc[data-v-285ec8be]{width: 45%;float: left;padding-left: 5%;height: 100%;\n}\n.title[data-v-285ec8be]{font-family: PingFangSC-Medium;\n\t    height: 55%;\n\t    font-size: 16px;\n\t    color: #2c3038;\n\t    margin-bottom: 10px;\n\t    overflow: hidden;\n\t    text-overflow: ellipsis;\n\t    display: -webkit-box;\n\t    -webkit-line-clamp: 3;\n\t    -webkit-box-orient: vertical;\n}\n.price[data-v-285ec8be]{color: #ff3939;font-size: 14px;\n}\n.oldprice[data-v-285ec8be]{text-decoration: line-through;color: #92969c;margin-left: 5px;\n}\n.location[data-v-285ec8be]{color: #92969c;font-size: 12px;margin-top: 5px;\n}\n.content li[data-v-285ec8be]:nth-child(2){position: relative;\n}\n.triangle-up[data-v-285ec8be]{\n\t    width: 0;\n\t    height: 0;\n\t    border-left: 3px solid transparent;\n\t    border-right: 3px solid transparent;\n\t    border-bottom: 6px solid #000;\n        position: absolute;\n\t    top: 18px;\n\t    left: 70%;\n\t    display: none;\n}\n.triangle-down[data-v-285ec8be]{\n\t    width: 0;\n\t    height: 0;\n\t    border-left: 3px solid transparent;\n\t    border-right: 3px solid transparent;\n\t    border-top: 6px solid #000;\n        position: absolute;\n\t    top: 18px;\n\t    left: 70%;\n}\n\t \n\t \n\t \n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/List.vue?3a4f9c69"],"names":[],"mappings":";AA+FA,gCAAA,iBAAA;CAAA;AACA,kCAAA,WAAA,aAAA,gBAAA,gBAAA,oBAAA;CAAA;AACA,0BAAA,WAAA,aAAA,cAAA,iCAAA;CAAA;AACA,6BAAA,OAAA,mBAAA,kBAAA;CAAA;AACA,yCAAA,gCAAA;CAAA;AACA,0BAAA,aAAA,mBAAA,kBAAA,gCAAA;CAAA;AACA,uBAAA,cAAA,iBAAA,mBAAA,WAAA;CAAA;AAEA,2BAAA,eAAA,0BAAA;CAAA;AACA,4BAAA,iBAAA;CAAA;AACA,gCAAA,cAAA,cAAA,iCAAA;CAAA;AACA,wCAAA,WAAA,iBAAA,YAAA;CAAA;AACA,4CAAA,WAAA,aAAA,YAAA;CAAA;AACA,qCAAA,WAAA,YAAA,iBAAA,aAAA;CAAA;AACA,wBAAA,+BAAA;KACA,YAAA;KACA,gBAAA;KACA,eAAA;KACA,oBAAA;KACA,iBAAA;KACA,wBAAA;KACA,qBAAA;KACA,sBAAA;KACA,6BAAA;CAAA;AACA,wBAAA,eAAA,gBAAA;CAAA;AACA,2BAAA,8BAAA,eAAA,iBAAA;CAAA;AACA,2BAAA,eAAA,gBAAA,gBAAA;CAAA;AACA,0CAAA,mBAAA;CAAA;AACA;KACA,SAAA;KACA,UAAA;KACA,mCAAA;KACA,oCAAA;KACA,8BAAA;QACA,mBAAA;KACA,UAAA;KACA,UAAA;KACA,cAAA;CACA;AACA;KACA,SAAA;KACA,UAAA;KACA,mCAAA;KACA,oCAAA;KACA,2BAAA;QACA,mBAAA;KACA,UAAA;KACA,UAAA;CACA","file":"List.vue","sourcesContent":["<template>\r\n\t<div class=\"category-wrap\">\r\n\t\t<div class=\"category-header\">\r\n\t\t\t<div class=\"content\">\r\n\t\t\t\t<li>全部</li>\r\n\t\t\t\t<li v-on:click=\"sort()\">{{sortchecked}}<span class=\"triangle-up\"></span><span class=\"triangle-down\"></span></li>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"sort\">\r\n\t\t\t\t<li  v-for=\"item in sorts\" :sort_id = \"item.sort_id\" @click=\"sortby(item.sort_id,$event)\">{{item.sort_name}}</li>\r\n\t\t\t\t<!--<li>离我最近</li>\r\n\t\t\t\t<li>价格最低</li>\r\n\t\t\t\t<li>价格最高</li>-->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<ul class=\"kindLists\">\r\n\t\t\t<li v-for=\"list in lists\">\r\n\t\t\t\t<router-link :to=\"{name:'detail',params:{productID:list.product_id}}\">\r\n\t\t\t\t\t<div class=\"imgwrap\">\r\n\t\t\t\t\t\t<img :src=\"list.product_image\">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"desc\">\r\n\t\t\t\t\t\t<div class=\"title\">{{list.name}}</div>\r\n\t\t\t\t\t\t<div class=\"price\">\r\n\t\t\t\t\t\t\t<span>{{list.price/100+\"元/\"+list.show_entity_name}}</span>\r\n\t\t\t\t\t\t\t<span class=\"oldprice\" v-if=\"list.original_price\">{{\"￥\"+list.original_price/100}}</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"location\">\r\n\t\t\t\t\t\t\t<span class=\"iconfont\"></span>\r\n\t\t\t\t\t\t\t<span>{{list.area}}</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</router-link>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\t\r\n\timport MyAjax from \"./../md/MyAjax.js\";\r\n\t\r\n\texport default {\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\tlists : [],\r\n\t\t\t\tsorts : [],\r\n\t\t\t\tsortchecked : ''\r\n\t\t\t}\r\n\t\t},\r\n\t\tmethods:{\r\n\t\t\tsort(){\r\n\t\t\t\t$(\".sort\").toggle();\r\n\t\t\t\t$(\".triangle-up\").toggle()\r\n\t\t\t\t$(\".triangle-down\").toggle()\r\n\t\t\t},\r\n\t\t\tsortby(index,ev){\r\n\t\t\t\tconsole.log(index);\r\n\t\t\t\tvar that = this;\r\n\t\t\t\t$(ev.target).addClass(\"on\").siblings().removeClass(\"on\")\r\n\t\t\t\t$(\".sort\").toggle();\r\n\t\t\t\tvar category_id=location.href.split(\"kind\")[1].split(\"/\")[1];\r\n\t\t\t\tvar city_id=location.href.split(\"kind\")[1].split(\"/\")[2]\r\n\t\t\t\tvar url = \"https://api.ricebook.com/4/tab/category_product_list.json?category_id=\"+category_id+\"&sort=\"+index+\"&from_id=0&city_id=\"+city_id+\"&page=0\";\r\n\t\t\t\tMyAjax.vueJson(url,function(data){\r\n\t\t\t\t\tconsole.log(data)\r\n\t\t\t\t\tthat.lists = data;\r\n\t\t\t\t\t\r\n\t\t\t\t})\r\n\t\t\t\tthis.sortchecked = ev.target.innerText;\r\n\t\t\t\t$(\".triangle-up\").toggle()\r\n\t\t\t\t$(\".triangle-down\").toggle()\r\n\t\t\t}\r\n\t\t},\r\n\t\tmounted(){\r\n\t\t\t\r\n\t\t\tvar that = this;\r\n\t\t\tvar category_id=location.href.split(\"kind\")[1].split(\"/\")[1];\r\n\t\t\tvar city_id=location.href.split(\"kind\")[1].split(\"/\")[2]\r\n\t\t\tvar hash  = location.href;\r\n\t\t\tvar url1 = \"https://api.ricebook.com/4/tab/sub_category.json?category_id=\"+category_id+\"&city_id=\"+city_id+\"&from_id=0\";\r\n\t\t\tvar url = \"https://api.ricebook.com/4/tab/category_product_list.json?category_id=\"+category_id+\"&sort=1&from_id=0&city_id=\"+city_id+\"&page=0\"   ;\r\n\t\t\tMyAjax.vueJson(url,function(data){\r\n\t\t\t\tconsole.log(data)\r\n\t\t\t\tthat.lists = data;\r\n\t\t\t})\r\n\t\t\tMyAjax.vueJson(url1,function(data){\r\n\t\t\t\tconsole.log(data)\r\n\t\t\t\tthat.sorts = data.sort;\r\n\t\t\t\tthat.sortchecked = data.sort[0].sort_name;\r\n\t\t\t})\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n<style scoped=\"scoped\">\r\n\t.category-wrap{overflow: hidden;}\r\n\t.category-header{width:100%;height: 40px;font-size: 15px;position: fixed;background: #FFFFFF;}\r\n\t.content{width:100%;height: 100%;display: flex;border-bottom: 1px solid #f6f6f6;}\r\n\t.content li{flex:1;text-align: center;line-height: 40px;}\r\n\t.content li:first-child{border-right: 1px solid #f6f6f6;}\r\n\t.sort li{height: 40px;text-align: center;line-height: 40px;border-bottom:1px solid #f6f6f6;}\r\n\t.sort{display: none;background: #fff;position: absolute;width:100%;}\r\n\t\r\n\t.sort .on{color: #ff3939;background-color: #fafafa;}\r\n\t.kindLists{margin-top: 40px;}\r\n\t.kindLists li {padding: 10px;height: 120px;border-bottom: 1px solid #e6e6e6;}\r\n\t.kindLists li .imgwrap{width: 50%;overflow: hidden;float: left;}\r\n\t\t.kindLists li .imgwrap img{width:100%;height: 100%;border:none;}\r\n\t.kindLists li .desc{width: 45%;float: left;padding-left: 5%;height: 100%;}\r\n\t.title{font-family: PingFangSC-Medium;\r\n\t    height: 55%;\r\n\t    font-size: 16px;\r\n\t    color: #2c3038;\r\n\t    margin-bottom: 10px;\r\n\t    overflow: hidden;\r\n\t    text-overflow: ellipsis;\r\n\t    display: -webkit-box;\r\n\t    -webkit-line-clamp: 3;\r\n\t    -webkit-box-orient: vertical;}\r\n\t .price{color: #ff3939;font-size: 14px;}\r\n\t .oldprice{text-decoration: line-through;color: #92969c;margin-left: 5px;}\r\n\t .location{color: #92969c;font-size: 12px;margin-top: 5px;}\r\n\t .content li:nth-child(2){position: relative;}\r\n\t .triangle-up{\r\n\t    width: 0;\r\n\t    height: 0;\r\n\t    border-left: 3px solid transparent;\r\n\t    border-right: 3px solid transparent;\r\n\t    border-bottom: 6px solid #000;\r\n        position: absolute;\r\n\t    top: 18px;\r\n\t    left: 70%;\r\n\t    display: none;\r\n\t }\r\n\t .triangle-down{\r\n\t    width: 0;\r\n\t    height: 0;\r\n\t    border-left: 3px solid transparent;\r\n\t    border-right: 3px solid transparent;\r\n\t    border-top: 6px solid #000;\r\n        position: absolute;\r\n\t    top: 18px;\r\n\t    left: 70%;\r\n\t }\r\n\t \r\n\t \r\n\t \r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__);
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




/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			lists: [],
			sorts: [],
			sortchecked: ''
		};
	},
	methods: {
		sort() {
			$(".sort").toggle();
			$(".triangle-up").toggle();
			$(".triangle-down").toggle();
		},
		sortby(index, ev) {
			console.log(index);
			var that = this;
			$(ev.target).addClass("on").siblings().removeClass("on");
			$(".sort").toggle();
			var category_id = location.href.split("kind")[1].split("/")[1];
			var city_id = location.href.split("kind")[1].split("/")[2];
			var url = "https://api.ricebook.com/4/tab/category_product_list.json?category_id=" + category_id + "&sort=" + index + "&from_id=0&city_id=" + city_id + "&page=0";
			__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default.a.vueJson(url, function (data) {
				console.log(data);
				that.lists = data;
			});
			this.sortchecked = ev.target.innerText;
			$(".triangle-up").toggle();
			$(".triangle-down").toggle();
		}
	},
	mounted() {

		var that = this;
		var category_id = location.href.split("kind")[1].split("/")[1];
		var city_id = location.href.split("kind")[1].split("/")[2];
		var hash = location.href;
		var url1 = "https://api.ricebook.com/4/tab/sub_category.json?category_id=" + category_id + "&city_id=" + city_id + "&from_id=0";
		var url = "https://api.ricebook.com/4/tab/category_product_list.json?category_id=" + category_id + "&sort=1&from_id=0&city_id=" + city_id + "&page=0";
		__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default.a.vueJson(url, function (data) {
			console.log(data);
			that.lists = data;
		});
		__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default.a.vueJson(url1, function (data) {
			console.log(data);
			that.sorts = data.sort;
			that.sortchecked = data.sort[0].sort_name;
		});
	}
});

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "category-wrap"
  }, [_c('div', {
    staticClass: "category-header"
  }, [_c('div', {
    staticClass: "content"
  }, [_c('li', [_vm._v("全部")]), _vm._v(" "), _c('li', {
    on: {
      "click": function($event) {
        _vm.sort()
      }
    }
  }, [_vm._v(_vm._s(_vm.sortchecked)), _c('span', {
    staticClass: "triangle-up"
  }), _c('span', {
    staticClass: "triangle-down"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "sort"
  }, _vm._l((_vm.sorts), function(item) {
    return _c('li', {
      attrs: {
        "sort_id": item.sort_id
      },
      on: {
        "click": function($event) {
          _vm.sortby(item.sort_id, $event)
        }
      }
    }, [_vm._v(_vm._s(item.sort_name))])
  }))]), _vm._v(" "), _c('ul', {
    staticClass: "kindLists"
  }, _vm._l((_vm.lists), function(list) {
    return _c('li', [_c('router-link', {
      attrs: {
        "to": {
          name: 'detail',
          params: {
            productID: list.product_id
          }
        }
      }
    }, [_c('div', {
      staticClass: "imgwrap"
    }, [_c('img', {
      attrs: {
        "src": list.product_image
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "desc"
    }, [_c('div', {
      staticClass: "title"
    }, [_vm._v(_vm._s(list.name))]), _vm._v(" "), _c('div', {
      staticClass: "price"
    }, [_c('span', [_vm._v(_vm._s(list.price / 100 + "元/" + list.show_entity_name))]), _vm._v(" "), (list.original_price) ? _c('span', {
      staticClass: "oldprice"
    }, [_vm._v(_vm._s("￥" + list.original_price / 100))]) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "location"
    }, [_c('span', {
      staticClass: "iconfont"
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(list.area))])])])])], 1)
  }))])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-285ec8be", esExports)
  }
}

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Detail_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_773e1cf1_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Detail_vue__ = __webpack_require__(120);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(115)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Detail_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_773e1cf1_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Detail_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\Detail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Detail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-773e1cf1", Component.options)
  } else {
    hotAPI.reload("data-v-773e1cf1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(116);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("c70e8822", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-773e1cf1\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Detail.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-773e1cf1\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./Detail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Detail.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_detail_scss__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_detail_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_detail_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__md_MyAjax_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__md_MyAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__md_MyAjax_js__);
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



//	import Vue from "vue";
//	var Event = new Vue();//载体  广播和接收
var flag = 0;
/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			productInfo: [],
			images: [],
			shopInfo: [],
			foodInfo: [],
			detailInfo: [],
			tipInfo: [],
			mayloveInfo: [],
			checkedTitle: [],
			num: 1,
			lists: []
		};
	},
	methods: {
		reload() {
			location.reload();
		},
		showChoice() {
			this.$emit('to-parent', this.num);
			flag = !flag;
			$(".choiceNum").toggle();
			$(".shopList").toggle();
			$(".detailfooter").toggle();
			$(".detailfooter_1").toggle();
			if (flag) {
				$(".close").html("关闭<i class='iconfont'>&#xe603;</i>");
			} else {
				$(".close").html("切换商品<i class='iconfont'>&#xe604;</i>");
			}
			$("#on").html("&#xe606;");
			$("#on").css("border", "none");
			//				$(".detailfooter").css("display","none")
			//				$(".detailfooter_1").css("display","block")
			//				console.log($(".detailfooter"))
		},
		subtract() {
			if (this.num > 1) {
				var num = this.num - 1;
				this.num = num;
			}
		},
		plus() {
			var num = this.num + 1;
			this.num = num;
		}
	},
	mounted() {

		var that = this;
		var productID = location.href.split("detail/")[1];
		console.log(productID.length);
		if (productID.length > 7) {
			//	var id = productID.split("")
			var url = "https://api.ricebook.com/product/info/product_detail.json?product_" + productID;
		} else {
			var url = "https://api.ricebook.com/product/info/product_detail.json?product_id=" + productID;
		}

		__WEBPACK_IMPORTED_MODULE_1__md_MyAjax_js___default.a.vueJson(url, function (data) {
			console.log(data);
			that.productInfo = data.basic;
			that.images = data.basic.product_images;
			that.lists = data.basic.sub_product_array;
			that.checkedTitle = data.basic.sub_product_array[0].spec;
			for (var i in data.modules) {
				switch (i) {
					case "0":
						that.shopInfo = data.modules[i].data.restaurants;
						break;
					case "1":
						that.foodInfo = data.modules[i].data.contents;
						break;
					case "2":
						that.detailInfo = data.modules[i].data.lights;
						break;
					case "3":
						that.tipInfo = data.modules[i].data.contents;
						break;
					case "4":
						that.mayloveInfo = data.modules[i].data.recommend;
						break;
				}
			}
			//				$(".checked").eq(0).find("span").addClass("on");

			console.log(that.mayloveInfo);
		}, function (err) {
			console.log(err);
		});
	},
	updated() {
		var mySwiper = new Swiper('.swiper-container', {
			direction: 'horizontal',
			loop: true,
			// 如果需要分页器
			pagination: '.swiper-pagination',
			autoplay: 3000
		});
	}
});

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./detail.scss", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js!../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./detail.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%; }\n\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul,\nol, li {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset,\nimg {\n  border: 0; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n@font-face {\n  font-family: 'iconfont';\n  /* project id 391242 */\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot\");\n  src: url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_391242_nxd9ojnr6586ko6r.svg#iconfont\") format(\"svg\"); }\n\n.iconfont {\n  font-family: iconfont; }\n\nhtml, body, #app {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.container {\n  width: 100%;\n  max-width: 640px;\n  margin: 0 auto;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  flex-direction: column; }\n  .container .header {\n    height: 44px;\n    width: 100%;\n    background-color: #000;\n    line-height: 44px;\n    font-size: 18px;\n    color: #fff; }\n    .container .header .commonHeader {\n      width: 100%;\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      flex-direction: row; }\n      .container .header .commonHeader .left {\n        font-size: 16px;\n        flex: .7;\n        text-align: left;\n        padding-left: 30px; }\n        .container .header .commonHeader .left a {\n          color: #fff; }\n      .container .header .commonHeader .center {\n        flex: 1;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .center img {\n          padding-top: 10px;\n          width: 80px;\n          height: 30px; }\n        .container .header .commonHeader .center span {\n          font-size: 12px;\n          padding-top: 5px; }\n      .container .header .commonHeader .right {\n        flex: .6;\n        display: -webkit-box;\n        display: flex; }\n        .container .header .commonHeader .right .iconfont {\n          flex: 1;\n          font-style: normal;\n          display: -webkit-box;\n          display: flex;\n          -webkit-box-orient: vertical;\n          flex-direction: column;\n          -webkit-box-pack: center;\n          justify-content: center;\n          -webkit-box-align: center;\n          align-items: center; }\n      .container .header .commonHeader .back {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .title {\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n      .container .header .commonHeader .moreInfo {\n        width: 50px;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n  .container #content {\n    width: 100%;\n    -webkit-box-flex: 1;\n    flex: 1;\n    overflow-y: auto; }\n    .container #content::-webkit-scrollbar {\n      display: none; }\n  .container .footer {\n    height: 50px;\n    width: 100%;\n    background-color: #eee; }\n    .container .footer ul {\n      width: 100%;\n      height: 100%;\n      display: -webkit-box;\n      display: flex; }\n      .container .footer ul li {\n        -webkit-box-flex: 1;\n        flex: 1;\n        display: -webkit-box;\n        display: flex;\n        -webkit-box-orient: vertical;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        align-items: center; }\n        .container .footer ul li.active {\n          color: #f66; }\n\na {\n  text-decoration: none; }\n\n.detailCon {\n  width: 100%; }\n  .detailCon .swiper-container {\n    width: 100%;\n    height: 250px; }\n    .detailCon .swiper-container .swiper-wrapper {\n      width: 100%;\n      height: 100%; }\n      .detailCon .swiper-container .swiper-wrapper .swiper-slide {\n        width: 100%;\n        height: 100%;\n        left: -5%; }\n        .detailCon .swiper-container .swiper-wrapper .swiper-slide img {\n          width: 100%;\n          height: 100%; }\n  .detailCon .info {\n    padding: 20px; }\n    .detailCon .info .info-title {\n      width: 100%;\n      padding-bottom: 20px;\n      border-bottom: 1px solid #e6e6e6; }\n      .detailCon .info .info-title .title {\n        font-size: 20px;\n        color: #2c3038;\n        font-weight: 900;\n        margin-bottom: 10px; }\n        .detailCon .info .info-title .title .love {\n          float: right; }\n      .detailCon .info .info-title .desc {\n        color: #92969c;\n        font-size: 18px;\n        margin-bottom: 10px; }\n      .detailCon .info .info-title .price {\n        font-size: 18px;\n        color: #fc3838; }\n        .detailCon .info .info-title .price .newPrice {\n          font-size: 22px; }\n        .detailCon .info .info-title .price .oldprice {\n          text-decoration: line-through;\n          color: #92969c;\n          padding: 0 5px; }\n        .detailCon .info .info-title .price .status {\n          color: #92969c;\n          border-left: 1px solid #92969c;\n          padding-left: 5px; }\n    .detailCon .info .tags {\n      padding-top: 15px; }\n      .detailCon .info .tags span {\n        color: #325782;\n        border: 1px solid #325782;\n        background-color: #f6faff;\n        font-size: 12px;\n        border-radius: 5px;\n        margin-right: 5px;\n        padding: 0 4px; }\n  .detailCon .store_wrap {\n    padding: 20px;\n    font-size: 20px; }\n    .detailCon .store_wrap .title {\n      border-bottom: 1px solid #e6e6e6;\n      padding: 25px 0 10px; }\n    .detailCon .store_wrap .adress, .detailCon .store_wrap .tel {\n      font-size: 16px;\n      color: #63666b;\n      padding: 15px 0;\n      border-bottom: 1px solid #e6e6e6; }\n      .detailCon .store_wrap .adress span:nth-child(2), .detailCon .store_wrap .tel span:nth-child(2) {\n        width: 80%;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis; }\n  .detailCon .menu-wrap {\n    padding: 20px;\n    font-size: 20px; }\n    .detailCon .menu-wrap .menu .menu-list .menu-item {\n      color: #76797e; }\n      .detailCon .menu-wrap .menu .menu-list .menu-item .sub-title {\n        margin-top: 30px;\n        color: #21242a; }\n      .detailCon .menu-wrap .menu .menu-list .menu-item p {\n        text-align: center;\n        line-height: 1.5; }\n  .detailCon .detail-wrap {\n    padding: 20px; }\n    .detailCon .detail-wrap .detail {\n      font-size: 20px; }\n      .detailCon .detail-wrap .detail .detail-item img {\n        height: 220px;\n        border: none;\n        margin-top: 20px; }\n      .detailCon .detail-wrap .detail .detail-item .sub-title {\n        margin-top: 20px;\n        color: #21242a;\n        font-family: PingFangSC; }\n      .detailCon .detail-wrap .detail .detail-item .content {\n        margin-top: 15px;\n        color: #63666b;\n        text-align: justify; }\n  .detailCon .tip-wrap {\n    padding: 20px; }\n    .detailCon .tip-wrap .tip {\n      position: relative; }\n      .detailCon .tip-wrap .tip ul {\n        color: #63666b; }\n        .detailCon .tip-wrap .tip ul li {\n          list-style: disc;\n          list-style-position: inside;\n          line-height: 1.5;\n          font-size: 18px; }\n      .detailCon .tip-wrap .tip .chat {\n        width: 80px;\n        height: 30px;\n        text-align: center;\n        line-height: 30px;\n        border: 1px solid #2c3038;\n        font-size: 16px;\n        margin-left: 40%;\n        margin-top: 40px; }\n  .detailCon .love-wrap {\n    padding: 20px; }\n    .detailCon .love-wrap ul {\n      margin-top: 20px; }\n      .detailCon .love-wrap ul li {\n        margin-bottom: 20px;\n        height: 100px; }\n        .detailCon .love-wrap ul li img {\n          float: left;\n          margin-right: 5%;\n          width: 40%;\n          height: 90px;\n          float: left; }\n        .detailCon .love-wrap ul li .desc {\n          overflow: hidden; }\n          .detailCon .love-wrap ul li .desc .sub-title {\n            height: 45px;\n            overflow: hidden;\n            line-height: 1.5;\n            margin-top: 10px;\n            color: #2c3038;\n            margin-bottom: 6px;\n            text-overflow: ellipsis;\n            display: -webkit-box;\n            -webkit-line-clamp: 2;\n            -webkit-box-orient: vertical;\n            font-size: 15px; }\n          .detailCon .love-wrap ul li .desc .price {\n            overflow: hidden;\n            font-size: 14px;\n            color: #ff3939; }\n  .detailCon .choice {\n    border-top: 1px solid #e6e6e6;\n    width: 100%;\n    position: fixed;\n    bottom: 50px;\n    background: #FFFFFF;\n    z-index: 10; }\n    .detailCon .choice .choiced {\n      padding: 15px 20px;\n      font-size: 14px;\n      color: #1a1a1a;\n      border-bottom: 1px solid #e6e6e6; }\n      .detailCon .choice .choiced .close {\n        float: right; }\n        .detailCon .choice .choiced .close i {\n          font-style: normal; }\n    .detailCon .choice ul {\n      display: none; }\n      .detailCon .choice ul li {\n        display: -webkit-box;\n        display: flex;\n        padding: 15px 20px;\n        border-bottom: 1px solid #e6e6e6; }\n        .detailCon .choice ul li .checked {\n          display: -webkit-box;\n          display: flex;\n          -webkit-box-orient: vertical;\n          flex-direction: column;\n          -webkit-box-pack: center;\n          justify-content: center;\n          -webkit-box-align: center;\n          align-items: center;\n          align-items: left;\n          width: 40px; }\n          .detailCon .choice ul li .checked .iconfont {\n            width: 16px;\n            height: 16px;\n            display: inline-block;\n            border-radius: 50%;\n            border: 1px solid #92969c; }\n          .detailCon .choice ul li .checked #on {\n            color: #f00;\n            font-size: 18px;\n            width: 18px;\n            height: 18px; }\n        .detailCon .choice ul li .desc {\n          flex: 1; }\n          .detailCon .choice ul li .desc p {\n            line-height: 1.5; }\n          .detailCon .choice ul li .desc .price {\n            font-size: 13px;\n            color: #fc3838; }\n            .detailCon .choice ul li .desc .price span {\n              margin-left: 10px;\n              color: #92969c;\n              text-decoration: line-through; }\n    .detailCon .choice .choiceNum {\n      display: none;\n      padding: 15px 20px; }\n      .detailCon .choice .choiceNum .operate {\n        display: inline-block;\n        float: right; }\n        .detailCon .choice .choiceNum .operate span {\n          display: inline-block;\n          width: 20px;\n          height: 20px;\n          border: 2px solid #e0e0e0;\n          text-align: center;\n          line-height: 20px;\n          vertical-align: middle; }\n        .detailCon .choice .choiceNum .operate .num {\n          border: none; }\n\n.dir {\n  width: 0;\n  height: 0;\n  font-size: 0;\n  display: inline-block;\n  margin: 0;\n  vertical-align: 12px;\n  border-top: 3px solid transparent;\n  border-bottom: 3px solid transparent;\n  border-left: 5px solid #000;\n  border-right: none;\n  margin-top: 5px;\n  float: right; }\n\n.panel-gap {\n  width: 100%;\n  height: 10px;\n  background-color: #fafafa;\n  border-top: 1px solid #e6e6e6;\n  border-bottom: 1px solid #e6e6e6; }\n\n.cart-title {\n  text-align: center;\n  font-weight: 900;\n  color: #2c3038;\n  margin-bottom: 10px;\n  font-size: 20px; }\n", ""]);

// exports


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "detailCon"
  }, [_c('div', {
    staticClass: "swiper-container"
  }, [_c('div', {
    staticClass: "swiper-wrapper"
  }, _vm._l((_vm.images), function(img) {
    return _c('div', {
      staticClass: "swiper-slide"
    }, [_c('img', {
      attrs: {
        "src": img.img_url
      }
    })])
  })), _vm._v(" "), _c('div', {
    staticClass: "swiper-pagination"
  })]), _vm._v(" "), _c('div', {
    staticClass: "info"
  }, [_c('div', {
    staticClass: "info-title"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.productInfo.name)), _c('span', {
    staticClass: "iconfont love"
  }, [_vm._v("")])]), _vm._v(" "), _c('p', {
    staticClass: "desc"
  }, [_vm._v(_vm._s(_vm.productInfo.description))]), _vm._v(" "), _c('p', {
    staticClass: "price"
  }, [_c('span', {
    staticClass: "newPrice"
  }, [_vm._v(_vm._s(_vm.productInfo.price / 100 + " 元"))]), _c('span', [_vm._v(_vm._s("/" + _vm.productInfo.show_entity_name))]), _vm._v(" "), (_vm.productInfo.origin_price) ? _c('span', {
    staticClass: "oldprice"
  }, [_vm._v("￥" + _vm._s(_vm.productInfo.origin_price / 100))]) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "status"
  }, [_vm._v("随时退")])])]), _vm._v(" "), _c('div', {
    staticClass: "tags"
  }, _vm._l((_vm.productInfo.display_property_group), function(item) {
    return _c('span', [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "panel-gap"
  }), _vm._v(" "), _c('div', {
    staticClass: "store_wrap"
  }, _vm._l((_vm.shopInfo), function(i) {
    return _c('div', {
      staticClass: "store"
    }, [_c('h3', {
      staticClass: "cart-title"
    }, [_vm._v("\n\t\t\t\t商户信息\n\t\t\t")]), _vm._v(" "), _c('div', {
      staticClass: "title"
    }, [_vm._v(_vm._s(i.restaurant_name))]), _vm._v(" "), _c('div', {
      staticClass: "adress"
    }, [_c('span', {
      staticClass: "iconfont"
    }, [_vm._v("")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(i.restaurant_address))]), _vm._v(" "), _c('span', {
      staticClass: "dir"
    })]), _vm._v(" "), _c('div', {
      staticClass: "tel"
    }, [_c('span', {
      staticClass: "iconfont"
    }, [_vm._v("")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(i.restaurant_phone_numbers[0]))]), _vm._v(" "), _c('span', {
      staticClass: "dir"
    })])])
  })), _vm._v(" "), _c('div', {
    staticClass: "panel-gap"
  }), _vm._v(" "), _c('div', {
    staticClass: "menu-wrap"
  }, [_c('div', {
    staticClass: "menu"
  }, [_c('h3', {
    staticClass: "cart-title"
  }, [_vm._v("\n\t\t\t\tMENU\n\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "menu-list"
  }, _vm._l((_vm.foodInfo), function(j) {
    return _c('div', {
      staticClass: "menu-item"
    }, [_c('p', {
      staticClass: "sub-title"
    }, [_vm._v(_vm._s("-" + j.sub_title + "-"))]), _vm._v(" "), _vm._l((j.text), function(k) {
      return _c('p', [_vm._v(_vm._s(k))])
    })], 2)
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "panel-gap"
  }), _vm._v(" "), _c('div', {
    staticClass: "detail-wrap"
  }, [_c('div', {
    staticClass: "detail"
  }, [_c('h3', {
    staticClass: "cart-title"
  }, [_vm._v("\n\t\t\t\t亮点\n\t\t\t")]), _vm._v(" "), _vm._l((_vm.detailInfo), function(detail) {
    return _c('div', {
      staticClass: "detail-item"
    }, [_c('img', {
      attrs: {
        "src": detail.img_url
      }
    }), _vm._v(" "), _c('p', {
      staticClass: "sub-title"
    }, [_vm._v(_vm._s(detail.title))]), _vm._v(" "), _c('p', {
      staticClass: "content"
    }, [_vm._v(_vm._s(detail.content))])])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "panel-gap"
  }), _vm._v(" "), _c('div', {
    staticClass: "tip-wrap"
  }, [_c('div', {
    staticClass: "tip"
  }, [_c('h3', {
    staticClass: "cart-title"
  }, [_vm._v("\n\t\t\t\t使用提示\n\t\t\t")]), _vm._v(" "), _c('ul', _vm._l((_vm.tipInfo), function(tip) {
    return _c('li', [_vm._v(_vm._s(tip.text))])
  })), _vm._v(" "), _c('div', {
    staticClass: "chat"
  }, [_vm._v("\n\t\t\t\t联系客服\n\t\t\t")])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-gap"
  }), _vm._v(" "), _c('div', {
    staticClass: "love-wrap"
  }, [_c('div', {
    staticClass: "love"
  }, [_c('h3', {
    staticClass: "cart-title"
  }, [_vm._v("\n\t\t\t\t猜你喜欢\n\t\t\t")]), _vm._v(" "), _c('ul', _vm._l((_vm.mayloveInfo), function(love) {
    return _c('li', {
      on: {
        "click": function($event) {
          _vm.reload()
        }
      }
    }, [_c('router-link', {
      attrs: {
        "to": {
          name: 'detail',
          params: {
            productID: love.product_id
          }
        }
      }
    }, [_c('img', {
      attrs: {
        "src": love.product_image_url
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "desc"
    }, [_c('div', {
      staticClass: "sub-title"
    }, [_vm._v(_vm._s(love.product_name))]), _vm._v(" "), _c('div', {
      staticClass: "price"
    }, [_vm._v(_vm._s(love.price / 100 + "元/" + love.show_entity_name))])])])], 1)
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "choice"
  }, [_c('div', {
    staticClass: "choiced"
  }, [_vm._v("\n\t\t\t已选择："), _c('span', [_vm._v(_vm._s(_vm.checkedTitle))]), _c('span', [_vm._v("(" + _vm._s(_vm.num) + "份)")]), _vm._v(" "), _c('span', {
    staticClass: "close",
    on: {
      "click": function($event) {
        _vm.showChoice()
      }
    }
  }, [_vm._v("切换商品"), _c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")])])]), _vm._v(" "), _c('ul', {
    staticClass: "shopList"
  }, _vm._l((_vm.lists), function(list) {
    return _c('li', {
      attrs: {
        "id": list.sub_product_id
      }
    }, [_c('div', {
      staticClass: "checked"
    }, [_c('span', {
      staticClass: "iconfont",
      attrs: {
        "id": _vm.lists[0] == list ? 'on' : ''
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "desc"
    }, [_c('p', {
      staticClass: "sub-title"
    }, [_vm._v(_vm._s(list.spec))]), _vm._v(" "), _c('p', {
      staticClass: "price"
    }, [_vm._v(_vm._s(list.price / 100 + "元/" + list.show_entity_name)), _c('span', [_vm._v(_vm._s("￥" + list.origin_price / 100))])])])])
  })), _vm._v(" "), _c('div', {
    staticClass: "choiceNum"
  }, [_c('span', [_vm._v("选择数量")]), _vm._v(" "), _c('div', {
    staticClass: "operate"
  }, [_c('span', {
    staticClass: "subtract",
    on: {
      "click": function($event) {
        _vm.subtract()
      }
    }
  }, [_vm._v("-")]), _vm._v(" "), _c('span', {
    staticClass: "num"
  }, [_vm._v(_vm._s(_vm.num))]), _vm._v(" "), _c('span', {
    staticClass: "plus",
    on: {
      "click": function($event) {
        _vm.plus()
      }
    }
  }, [_vm._v("+")])])])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-773e1cf1", esExports)
  }
}

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_SearchList_vue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_3c7be486_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_SearchList_vue__ = __webpack_require__(125);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(122)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3c7be486"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_SearchList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_3c7be486_hasScoped_true_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_SearchList_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "com\\SearchList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SearchList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c7be486", Component.options)
  } else {
    hotAPI.reload("data-v-3c7be486", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(123);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e993dc3c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c7be486\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./SearchList.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.5@css-loader/index.js?sourceMap!../node_modules/_vue-loader@13.0.4@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c7be486\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.0.4@vue-loader/lib/selector.js?type=styles&index=0!./SearchList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.category-wrap[data-v-3c7be486]{overflow: hidden;\n}\n.category-header[data-v-3c7be486]{width:100%;height: 40px;font-size: 15px;position: fixed;background: #FFFFFF;\n}\n.content[data-v-3c7be486]{width:100%;height: 100%;display: flex;border-bottom: 1px solid #f6f6f6;\n}\n.content li[data-v-3c7be486]{flex:1;text-align: center;line-height: 40px;box-sizing: border-box;color: #969696;\n}\n.content li[data-v-3c7be486]:first-child{border-right: 1px solid #f6f6f6;\n}\n\t/*.sort li{height: 40px;text-align: center;line-height: 40px;border-bottom:1px solid #f6f6f6;}\n\t.sort{display: none;background: #fff;position: absolute;width:100%;}\n\t.sort .on{color: #ff3939;background-color: #fafafa;}*/\n.kindLists[data-v-3c7be486]{margin-top: 40px;\n}\n.kindLists li[data-v-3c7be486] {padding: 10px;height: 120px;border-bottom: 1px solid #e6e6e6;\n}\n.kindLists li .imgwrap[data-v-3c7be486]{width: 50%;overflow: hidden;float: left;\n}\n.kindLists li .imgwrap img[data-v-3c7be486]{width:100%;height: 100%;border:none;\n}\n.kindLists li .desc[data-v-3c7be486]{width: 45%;float: left;padding-left: 5%;height: 100%;\n}\n.title[data-v-3c7be486]{font-family: PingFangSC-Medium;\n\t    height: 55%;\n\t    font-size: 16px;\n\t    color: #2c3038;\n\t    margin-bottom: 10px;\n\t    overflow: hidden;\n\t    text-overflow: ellipsis;\n\t    display: -webkit-box;\n\t    -webkit-line-clamp: 3;\n\t    -webkit-box-orient: vertical;\n}\n.price[data-v-3c7be486]{color: #ff3939;font-size: 14px;\n}\n.oldprice[data-v-3c7be486]{text-decoration: line-through;color: #92969c;margin-left: 5px;\n}\n.location[data-v-3c7be486]{color: #92969c;font-size: 12px;margin-top: 5px;\n}\n.content .active[data-v-3c7be486]{\n\t \tborder-bottom: 2px solid #000;\n \t    color: #2e2e2e;\n}\n", "", {"version":3,"sources":["D:/jieduan03/1703/week05_reactapp/Enjoy/com/com/SearchList.vue?58e1ecdc"],"names":[],"mappings":";AAmFA,gCAAA,iBAAA;CAAA;AACA,kCAAA,WAAA,aAAA,gBAAA,gBAAA,oBAAA;CAAA;AACA,0BAAA,WAAA,aAAA,cAAA,iCAAA;CAAA;AACA,6BAAA,OAAA,mBAAA,kBAAA,uBAAA,eAAA;CAAA;AACA,yCAAA,gCAAA;CAAA;CACA;;uDAEA;AACA,4BAAA,iBAAA;CAAA;AACA,gCAAA,cAAA,cAAA,iCAAA;CAAA;AACA,wCAAA,WAAA,iBAAA,YAAA;CAAA;AACA,4CAAA,WAAA,aAAA,YAAA;CAAA;AACA,qCAAA,WAAA,YAAA,iBAAA,aAAA;CAAA;AACA,wBAAA,+BAAA;KACA,YAAA;KACA,gBAAA;KACA,eAAA;KACA,oBAAA;KACA,iBAAA;KACA,wBAAA;KACA,qBAAA;KACA,sBAAA;KACA,6BAAA;CAAA;AACA,wBAAA,eAAA,gBAAA;CAAA;AACA,2BAAA,8BAAA,eAAA,iBAAA;CAAA;AACA,2BAAA,eAAA,gBAAA,gBAAA;CAAA;AACA;GACA,8BAAA;MACA,eAAA;CACA","file":"SearchList.vue","sourcesContent":["<template>\r\n\t<div class=\"category-wrap\">\r\n\t\t<div class=\"category-header\">\r\n\t\t\t<div class=\"content\">\r\n\t\t\t\t<li @click=\"tab1($event)\" class=\"active\">本地服务</li>\r\n\t\t\t\t<li @click=\"tab2($event)\">全国送</li>\r\n\t\t\t</div>\r\n\t\t\t<!--<div class=\"sort\">\r\n\t\t\t\t<li class=\"on\">智能排序</li>\r\n\t\t\t\t<li>离我最近</li>\r\n\t\t\t\t<li>价格最低</li>\r\n\t\t\t\t<li>价格最高</li>\r\n\t\t\t</div>-->\r\n\t\t</div>\r\n\t\t<ul class=\"kindLists\">\r\n\t\t\t<li v-for=\"list in lists\">\r\n\t\t\t\t<router-link :to=\"{name:'detail',params:{productID:list.product_id}}\">\r\n\t\t\t\t\t<div class=\"imgwrap\">\r\n\t\t\t\t\t\t<img :src=\"list.product_image\">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"desc\">\r\n\t\t\t\t\t\t<div class=\"title\">{{list.name}}</div>\r\n\t\t\t\t\t\t<div class=\"price\">\r\n\t\t\t\t\t\t\t<span>{{list.price/100+\"元/\"+list.show_entity_name}}</span>\r\n\t\t\t\t\t\t\t<span class=\"oldprice\">{{\"￥\"+list.original_price/100}}</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"location\">\r\n\t\t\t\t\t\t\t<span class=\"iconfont\"></span>\r\n\t\t\t\t\t\t\t<span>{{list.area}}</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</router-link>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\n\timport MyAjax from \"./../md/MyAjax.js\";\r\n\texport default {\r\n\t\tdata(){\r\n\t\t\treturn {\r\n\t\t\t\tlists : []\r\n\t\t\t}\r\n\t\t},\r\n\t\tmethods:{\r\n\t\t\ttab1(event){\r\n\t\t\t\tvar that = this;\r\n\t\t\t\t$(event.target).addClass(\"active\").siblings().removeClass(\"active\");\r\n\t\t\t\tvar query_k=location.href.split(\"list/\")[1];\r\n\t\t\t\tvar url = \"https://api.ricebook.com/3/enjoy_product/search.json?city_id=104&keyword=\"+query_k+\"&page=0\";\t\t\t\r\n\t\t\t\tMyAjax.vueJson(url,function(data){\r\n\t\t\t\t\tconsole.log(data)\r\n\t\t\t\t\tthat.lists = data.products;\r\n\t\t\t\t})\r\n\t\t\t},\r\n\t\t\ttab2(event){\r\n\t\t\t\tvar that = this;\r\n\t\t\t\t$(event.target).addClass(\"active\").siblings().removeClass(\"active\");\r\n\t\t\t\tvar query_k=location.href.split(\"list/\")[1];\r\n\t\t\t\tvar url = \"https://api.ricebook.com/3/enjoy_product/search.json?city_id=1&keyword=\"+query_k+\"&page=0\"\r\n\t\t\t\tMyAjax.vueJson(url,function(data){\r\n\t\t\t\t\tconsole.log(data)\r\n\t\t\t\t\tthat.lists = data.products;\r\n\t\t\t\t})\r\n\t\t\t}\r\n\r\n\t\t},\r\n\t\tmounted(){\r\n\t\t\tvar that = this;\r\n\t\t\tvar query_k=location.href.split(\"list/\")[1];\r\n\t\t\t\r\n\t\t//\tvar hash  = location.href;\r\n\t\t\tvar url = \"https://api.ricebook.com/3/enjoy_product/search.json?city_id=104&keyword=\"+query_k+\"&page=0\";\r\n\t\t\tMyAjax.vueJson(url,function(data){\r\n\t\t\t\tconsole.log(data)\r\n\t\t\t\tthat.lists = data.products;\r\n\t\t\t})\r\n\t\t}\r\n\t}\r\n</script>\r\n\r\n<style scoped=\"scoped\">\r\n\t.category-wrap{overflow: hidden;}\r\n\t.category-header{width:100%;height: 40px;font-size: 15px;position: fixed;background: #FFFFFF;}\r\n\t.content{width:100%;height: 100%;display: flex;border-bottom: 1px solid #f6f6f6;}\r\n\t.content li{flex:1;text-align: center;line-height: 40px;box-sizing: border-box;color: #969696;}\r\n\t.content li:first-child{border-right: 1px solid #f6f6f6;}\r\n\t/*.sort li{height: 40px;text-align: center;line-height: 40px;border-bottom:1px solid #f6f6f6;}\r\n\t.sort{display: none;background: #fff;position: absolute;width:100%;}\r\n\t.sort .on{color: #ff3939;background-color: #fafafa;}*/\r\n\t.kindLists{margin-top: 40px;}\r\n\t.kindLists li {padding: 10px;height: 120px;border-bottom: 1px solid #e6e6e6;}\r\n\t.kindLists li .imgwrap{width: 50%;overflow: hidden;float: left;}\r\n\t\t.kindLists li .imgwrap img{width:100%;height: 100%;border:none;}\r\n\t.kindLists li .desc{width: 45%;float: left;padding-left: 5%;height: 100%;}\r\n\t.title{font-family: PingFangSC-Medium;\r\n\t    height: 55%;\r\n\t    font-size: 16px;\r\n\t    color: #2c3038;\r\n\t    margin-bottom: 10px;\r\n\t    overflow: hidden;\r\n\t    text-overflow: ellipsis;\r\n\t    display: -webkit-box;\r\n\t    -webkit-line-clamp: 3;\r\n\t    -webkit-box-orient: vertical;}\r\n\t .price{color: #ff3939;font-size: 14px;}\r\n\t .oldprice{text-decoration: line-through;color: #92969c;margin-left: 5px;}\r\n\t .location{color: #92969c;font-size: 12px;margin-top: 5px;}\r\n\t .content .active{\r\n\t \tborder-bottom: 2px solid #000;\r\n \t    color: #2e2e2e;\r\n\t }\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js__);
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


/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			lists: []
		};
	},
	methods: {
		tab1(event) {
			var that = this;
			$(event.target).addClass("active").siblings().removeClass("active");
			var query_k = location.href.split("list/")[1];
			var url = "https://api.ricebook.com/3/enjoy_product/search.json?city_id=104&keyword=" + query_k + "&page=0";
			__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default.a.vueJson(url, function (data) {
				console.log(data);
				that.lists = data.products;
			});
		},
		tab2(event) {
			var that = this;
			$(event.target).addClass("active").siblings().removeClass("active");
			var query_k = location.href.split("list/")[1];
			var url = "https://api.ricebook.com/3/enjoy_product/search.json?city_id=1&keyword=" + query_k + "&page=0";
			__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default.a.vueJson(url, function (data) {
				console.log(data);
				that.lists = data.products;
			});
		}

	},
	mounted() {
		var that = this;
		var query_k = location.href.split("list/")[1];

		//	var hash  = location.href;
		var url = "https://api.ricebook.com/3/enjoy_product/search.json?city_id=104&keyword=" + query_k + "&page=0";
		__WEBPACK_IMPORTED_MODULE_0__md_MyAjax_js___default.a.vueJson(url, function (data) {
			console.log(data);
			that.lists = data.products;
		});
	}
});

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "category-wrap"
  }, [_c('div', {
    staticClass: "category-header"
  }, [_c('div', {
    staticClass: "content"
  }, [_c('li', {
    staticClass: "active",
    on: {
      "click": function($event) {
        _vm.tab1($event)
      }
    }
  }, [_vm._v("本地服务")]), _vm._v(" "), _c('li', {
    on: {
      "click": function($event) {
        _vm.tab2($event)
      }
    }
  }, [_vm._v("全国送")])])]), _vm._v(" "), _c('ul', {
    staticClass: "kindLists"
  }, _vm._l((_vm.lists), function(list) {
    return _c('li', [_c('router-link', {
      attrs: {
        "to": {
          name: 'detail',
          params: {
            productID: list.product_id
          }
        }
      }
    }, [_c('div', {
      staticClass: "imgwrap"
    }, [_c('img', {
      attrs: {
        "src": list.product_image
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "desc"
    }, [_c('div', {
      staticClass: "title"
    }, [_vm._v(_vm._s(list.name))]), _vm._v(" "), _c('div', {
      staticClass: "price"
    }, [_c('span', [_vm._v(_vm._s(list.price / 100 + "元/" + list.show_entity_name))]), _vm._v(" "), _c('span', {
      staticClass: "oldprice"
    }, [_vm._v(_vm._s("￥" + list.original_price / 100))])]), _vm._v(" "), _c('div', {
      staticClass: "location"
    }, [_c('span', {
      staticClass: "iconfont"
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(list.area))])])])])], 1)
  }))])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3c7be486", esExports)
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map