/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {

  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__(2);
  /* harmony import */ var _global_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__(3);
  
  
  
  (0,_global_api__WEBPACK_IMPORTED_MODULE_1__.initGlobalApi)(_instance__WEBPACK_IMPORTED_MODULE_0__["default"])
  
  _instance__WEBPACK_IMPORTED_MODULE_0__["default"].version = "0.0.1-alpha.0"
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_instance__WEBPACK_IMPORTED_MODULE_0__["default"]);
  
  
  /***/ }),
  /* 2 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "default": () => (/* binding */ AuthingMove)
  /* harmony export */ });
  function AuthingMove () {}
  
  /***/ }),
  /* 3 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "initGlobalApi": () => (/* binding */ initGlobalApi)
  /* harmony export */ });
  /* harmony import */ var _use__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__(4);
  
  
  function initGlobalApi (AuthingMove) {
    (0,_use__WEBPACK_IMPORTED_MODULE_0__.initUse)(AuthingMove)
  }
  
  
  /***/ }),
  /* 4 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "initUse": () => (/* binding */ initUse)
  /* harmony export */ });
  function initUse (AuthingMove) {
    AuthingMove.use = function use (plugin, options = {}) {
      const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
  
      if (installedPlugins.indexOf(plugin) > -1) {
        return this
      }
    
      const args = [options]
    
      args.unshift(this)
    
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args)
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args)
      }
    
      installedPlugins.push(plugin)
    
      return this
    }
  }
  
  
  /***/ }),
  /* 5 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "default": () => (/* binding */ install)
  /* harmony export */ });
  /* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__(6);
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__(7);
  
  
  
  function install (AuthingMove, options = {}) {
    const {
      custom = {} // custom transform rules
    } = options
    const from = "wx" || 0
    const to = "qa_ux" || 0
  
    if (['uni'].includes(to)) {
      return
    }
  
  
    const transformedApi = (0,_transform__WEBPACK_IMPORTED_MODULE_0__["default"])({
      from,
      to,
      custom
    })
  
    Object.keys(transformedApi).forEach(api => {
      try {
        if (typeof transformedApi[api] !== 'function') {
          AuthingMove[api] = transformedApi[api]
          return
        }
  
        AuthingMove[api] = (...args) => transformedApi[api].apply(AuthingMove, args)
      } catch (e) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.error)(`Call ${AuthingMove}.${api} error:` + JSON.stringify(e))
      }
    })
  }
  
  
  /***/ }),
  /* 6 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "default": () => (/* binding */ transformApi)
  /* harmony export */ });
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__(7);
  /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__(8);
  
  
  
  const fromMap = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateFromMap)()
  
  function joinName (from = '', to = '') {
    const _from = `__authing_move_src_mode_${from}__`
    return `${fromMap[_from]}_${to}`
  }
  
  function transformApi (options) {
    const envContext = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getEnvContext)()
    const needProxy = Object.create(null)
  
    Object.keys(envContext).concat(Object.keys(_apis__WEBPACK_IMPORTED_MODULE_1__)).forEach(key => {
      needProxy[key] = envContext[key] || _apis__WEBPACK_IMPORTED_MODULE_1__[key]
    })
  
    const apis = Object.create(null)
  
    Object.keys(needProxy).forEach(api => {
      if (typeof needProxy[api] !== 'function') {
        apis[api] = needProxy[api]
        return
      }
  
      apis[api] = (...args) => {
        let from = options.from
        const to = options.to
        
        if (args.length) {
          from = args.pop()
  
          if (typeof from !== 'string' || !fromMap[from]) {
            args.push(from)
            from = options.from
          }
        }
  
        const fromTo = joinName(from, to)
  
        if (options.custom[fromTo] && options.custom[fromTo][api]) {
          return options.custom[fromTo][api].apply(this, args)
        }
        
        if (_apis__WEBPACK_IMPORTED_MODULE_1__[api]) {
          return _apis__WEBPACK_IMPORTED_MODULE_1__[api].apply(this, args)
        }
  
        if (envContext[api]) {
          return envContext[api].apply(this, args)
        }
  
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.error)(`当前小程序环境不存在 ${api} 方法`)
      }
    })
  
    return apis
  }
  
  
  /***/ }),
  /* 7 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  /* AuthongMove cjs variable */ var AuthingMove = __webpack_require_authing__(1).default;
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "adaptOptions": () => (/* binding */ adaptOptions),
  /* harmony export */   "error": () => (/* binding */ error),
  /* harmony export */   "generateFromMap": () => (/* binding */ generateFromMap),
  /* harmony export */   "getEnvContext": () => (/* binding */ getEnvContext),
  /* harmony export */   "handleSuccess": () => (/* binding */ handleSuccess),
  /* harmony export */   "makeMap": () => (/* binding */ makeMap),
  /* harmony export */   "noop": () => (/* binding */ noop),
  /* harmony export */   "warn": () => (/* binding */ warn)
  /* harmony export */ });
  function getEnvContext () {
    const noopEnv = {}
  
    switch ("qa_ux") {
      case 'wx':
      case 'Mpx':
        return /* AuthingMove replacement */AuthingMove
      case 'ali':
        return my
      case 'baidu':
        return swan
      case 'qq':
        return qq
      case 'tt':
        return tt
      case 'jd':
        return jd
      case 'qa_webview':
        return qa
      case 'qa_ux':
        return noopEnv
      case 'Taro':
        return Taro
      case 'uni':
        return uni
    }
  }
  
  function generateFromMap () {
    const platforms = ['wx', 'ali', 'baidu', 'qq', 'tt', 'jd', 'qa_webview', 'qa_ux']
    return platforms.reduce((map, platform) => {
      map[`__authing_move_src_mode_${platform}__`] = platform
      return map
    }, {})
  }
  
  function makeMap (arr) {
    return arr.reduce((map, item) => {
      map[item] = true
      return map
    }, {})
  }
  
  function warn (message) {
    console.warn && console.warn(`[AuthingMove/api-proxy warn]:\n ${message}`)
  }
  
  function error (message) {
    console.error && console.error(`[AuthingMove/api-proxy error]:\n ${message}`)
  }
  
  function noop () {}
  
  function adaptOptions (originalOptions, matchedOptions, extraOptions) {
    let options = {}
    
    Object.keys(originalOptions).forEach(key => {
      const _key = matchedOptions.hasOwnProperty(key) ? matchedOptions[key] : key
      if (_key) {
        options[_key] = originalOptions[key]
      }
    })
  
    options = Object.assign({}, options, extraOptions)
  
    return options
  }
  
  function handleSuccess (originalOptions, wrappedSuccess = noop, context) {
    if (!originalOptions.success) {
      return
    }
  
    const _this = context || this
    const cachedSuccess = originalOptions.success
  
    originalOptions.success = res => cachedSuccess.call(_this, wrappedSuccess(res) || res)
  }
  
  
  /***/ }),
  /* 8 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "clearStorage": () => (/* reexport safe */ _store_storage__WEBPACK_IMPORTED_MODULE_3__.clearStorage),
  /* harmony export */   "getStorage": () => (/* reexport safe */ _store_storage__WEBPACK_IMPORTED_MODULE_3__.getStorage),
  /* harmony export */   "login": () => (/* reexport safe */ _login_login__WEBPACK_IMPORTED_MODULE_0__.login),
  /* harmony export */   "removeStorage": () => (/* reexport safe */ _store_storage__WEBPACK_IMPORTED_MODULE_3__.removeStorage),
  /* harmony export */   "request": () => (/* reexport safe */ _network_request__WEBPACK_IMPORTED_MODULE_1__.request),
  /* harmony export */   "scanCode": () => (/* reexport safe */ _scan_scan__WEBPACK_IMPORTED_MODULE_2__.scanCode),
  /* harmony export */   "setStorage": () => (/* reexport safe */ _store_storage__WEBPACK_IMPORTED_MODULE_3__.setStorage)
  /* harmony export */ });
  /* harmony import */ var _login_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__(9);
  /* harmony import */ var _network_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__(10);
  /* harmony import */ var _scan_scan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require_authing__(11);
  /* harmony import */ var _store_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require_authing__(12);
  
  
  
  
  
  
  /***/ }),
  /* 9 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  /* AuthongMove cjs variable */ var AuthingMove = __webpack_require_authing__(1).default;
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "login": () => (/* binding */ login)
  /* harmony export */ });
  function login (options = {}) {
    return /* AuthingMove replacement */AuthingMove.login(options)
  }
  
  
  /***/ }),
  /* 10 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  /* AuthongMove cjs variable */ var AuthingMove = __webpack_require_authing__(1).default;
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "request": () => (/* binding */ request)
  /* harmony export */ });
  function request (options = {}) {
    return /* AuthingMove replacement */AuthingMove.request(options)
  }
  
  
  /***/ }),
  /* 11 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  /* AuthongMove cjs variable */ var AuthingMove = __webpack_require_authing__(1).default;
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "scanCode": () => (/* binding */ scanCode)
  /* harmony export */ });
  function scanCode (options) {
    return /* AuthingMove replacement */AuthingMove.scanCode(options)
  }
  
  
  /***/ }),
  /* 12 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "clearStorage": () => (/* binding */ clearStorage),
  /* harmony export */   "getStorage": () => (/* binding */ getStorage),
  /* harmony export */   "removeStorage": () => (/* binding */ removeStorage),
  /* harmony export */   "setStorage": () => (/* binding */ setStorage)
  /* harmony export */ });
  /* harmony import */ var _system_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__(13);
  /* harmony import */ var _system_storage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require_authing__.n(_system_storage__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__(7);
  
  
  
  function setStorage (options) {
    const _options = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.adaptOptions)(options, {
      data: 'value'
    })
    return _system_storage__WEBPACK_IMPORTED_MODULE_0___default().set(_options)
  }
  
  function getStorage (options) {
    return _system_storage__WEBPACK_IMPORTED_MODULE_0___default().get(options)
  }
  
  function clearStorage (options) {
    return _system_storage__WEBPACK_IMPORTED_MODULE_0___default().clear()
  }
  
  function removeStorage (options) {
    return _system_storage__WEBPACK_IMPORTED_MODULE_0___default()["delete"](options)
  }
  
  
  /***/ }),
  /* 13 */
  /***/ ((module) => {
  
  module.exports = require("@system.storage");
  
  /***/ }),
  /* 14 */
  /***/ ((__unused_webpack_module, __webpack_exports_authing__, __webpack_require_authing__) => {
  
  /* AuthongMove cjs variable */ var AuthingMove = __webpack_require_authing__(1).default;
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "callStorage": () => (/* binding */ callStorage),
  /* harmony export */   "funcA": () => (/* binding */ funcA)
  /* harmony export */ });
  function funcA () {
    return 'this is function A'
  }
  
  function callStorage () {
    /* AuthingMove replacement */AuthingMove.setStorage({
      key: 'callStorage',
      data: 'callStorage'
    })
  }
  
  /***/ })
  /******/ 	]);
  /************************************************************************/
  /******/ 	// The module cache
  /******/ 	var __webpack_module_cache__ = {};
  /******/ 	
  /******/ 	// The require function
  /******/ 	function __webpack_require_authing__(moduleId) {
  /******/ 		// Check if module is in cache
  /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
  /******/ 		if (cachedModule !== undefined) {
  /******/ 			return cachedModule.exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = __webpack_module_cache__[moduleId] = {
  /******/ 			// no module.id needed
  /******/ 			// no module.loaded needed
  /******/ 			exports: {}
  /******/ 		};
  /******/ 	
  /******/ 		// Execute the module function
  /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require_authing__);
  /******/ 	
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/ 	
  /************************************************************************/
  /******/ 	/* webpack/runtime/compat get default export */
  /******/ 	(() => {
  /******/ 		// getDefaultExport function for compatibility with non-harmony modules
  /******/ 		__webpack_require_authing__.n = (module) => {
  /******/ 			var getter = module && module.__esModule ?
  /******/ 				() => (module['default']) :
  /******/ 				() => (module);
  /******/ 			__webpack_require_authing__.d(getter, { a: getter });
  /******/ 			return getter;
  /******/ 		};
  /******/ 	})();
  /******/ 	
  /******/ 	/* webpack/runtime/define property getters */
  /******/ 	(() => {
  /******/ 		// define getter functions for harmony exports
  /******/ 		__webpack_require_authing__.d = (exports, definition) => {
  /******/ 			for(var key in definition) {
  /******/ 				if(__webpack_require_authing__.o(definition, key) && !__webpack_require_authing__.o(exports, key)) {
  /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
  /******/ 				}
  /******/ 			}
  /******/ 		};
  /******/ 	})();
  /******/ 	
  /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
  /******/ 	(() => {
  /******/ 		__webpack_require_authing__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  /******/ 	})();
  /******/ 	
  /******/ 	/* webpack/runtime/make namespace object */
  /******/ 	(() => {
  /******/ 		// define __esModule on exports
  /******/ 		__webpack_require_authing__.r = (exports) => {
  /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 			}
  /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 		};
  /******/ 	})();
  /******/ 	
  /************************************************************************/
  var __webpack_exports_authing__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
  /* AuthongMove cjs variable */ var AuthingMove = __webpack_require_authing__(1).default;
  __webpack_require_authing__.r(__webpack_exports_authing__);
  /* harmony export */ __webpack_require_authing__.d(__webpack_exports_authing__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _AuthingMove_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require_authing__(1);
  /* harmony import */ var _AuthingMove_api_proxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require_authing__(5);
  /* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require_authing__(14);
  
  
  
  
  
  _AuthingMove_core__WEBPACK_IMPORTED_MODULE_0__["default"].use(_AuthingMove_api_proxy__WEBPACK_IMPORTED_MODULE_1__["default"])
  
  _AuthingMove_core__WEBPACK_IMPORTED_MODULE_0__["default"].funcA = _a__WEBPACK_IMPORTED_MODULE_2__.funcA
  
  /* AuthingMove replacement */AuthingMove.setStorage({
    key: 'hello11111111',
    data: '123hello'
  })
  
  ;(0,_a__WEBPACK_IMPORTED_MODULE_2__.callStorage)()
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_AuthingMove_core__WEBPACK_IMPORTED_MODULE_0__["default"]);
  
  })();
  
  var __webpack_export_target__ = exports;
  for(var i in __webpack_exports_authing__) __webpack_export_target__[i] = __webpack_exports_authing__[i];
  if(__webpack_exports_authing__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
  /******/ })()
  ;