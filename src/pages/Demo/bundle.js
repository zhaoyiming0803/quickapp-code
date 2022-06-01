/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {

  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(2);
  /* harmony import */ var _global_api__WEBPACK_IMPORTED_MODULE_1__ = __authing_webpack_require__(3);
  
  
  
  (0,_global_api__WEBPACK_IMPORTED_MODULE_1__.initGlobalApi)(_instance__WEBPACK_IMPORTED_MODULE_0__["default"])
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_instance__WEBPACK_IMPORTED_MODULE_0__["default"]);
  
  
  /***/ }),
  /* 2 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ AuthingMove)
  /* harmony export */ });
  function AuthingMove () {}
  
  
  /***/ }),
  /* 3 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "initGlobalApi": () => (/* binding */ initGlobalApi)
  /* harmony export */ });
  /* harmony import */ var _use__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(4);
  
  
  function initGlobalApi (AuthingMove) {
    (0,_use__WEBPACK_IMPORTED_MODULE_0__.initUse)(AuthingMove)
  }
  
  
  /***/ }),
  /* 4 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
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
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ install)
  /* harmony export */ });
  /* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(6);
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __authing_webpack_require__(7);
  /* harmony import */ var _promisify__WEBPACK_IMPORTED_MODULE_2__ = __authing_webpack_require__(19);
  
  
  
  
  function install (AuthingMove, options = {}) {
    const {
      custom = {} // custom transform rules
    } = options
    const from = "wx" || 0
    const to = "qa_ux" || 0
  
    const transformedApis = (0,_transform__WEBPACK_IMPORTED_MODULE_0__["default"])({
      from,
      to,
      custom
    })
  
    // reserve some expansion space
    const apis = Object.assign({}, transformedApis, (0,_promisify__WEBPACK_IMPORTED_MODULE_2__.promisify)(transformedApis))
  
    Object.keys(apis).forEach(api => {
      try {
        if (typeof apis[api] !== 'function') {
          AuthingMove[api] = apis[api]
          return
        }
  
        AuthingMove[api] = (...args) => apis[api].apply(AuthingMove, args)
      } catch (e) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.error)(`Call ${AuthingMove}.${api} error:` + JSON.stringify(e))
      }
    })
  }
  
  
  /***/ }),
  /* 6 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ transformApi)
  /* harmony export */ });
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(7);
  /* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_1__ = __authing_webpack_require__(9);
  /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __authing_webpack_require__(18);
  
  
  
  
  const fromMap = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateFromMap)()
  
  function joinName (from = '', to = '') {
    const _from = `__authing_move_src_mode_${from}__`
    return `${fromMap[_from]}_${to}`
  }
  
  function transformApi (options) {
    const envContext = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getEnvContext)()
    const needProxy = Object.create(null)
  
    _config__WEBPACK_IMPORTED_MODULE_2__.supportedApis.concat(Object.keys(_apis__WEBPACK_IMPORTED_MODULE_1__)).forEach(key => {
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
  
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.error)(`"${api}" method does not exist in the current context`)
      }
    })
  
    return apis
  }
  
  
  /***/ }),
  /* 7 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "adaptOptions": () => (/* binding */ adaptOptions),
  /* harmony export */   "error": () => (/* binding */ error),
  /* harmony export */   "generateFromMap": () => (/* binding */ generateFromMap),
  /* harmony export */   "getEnvContext": () => (/* reexport safe */ _runtime_env__WEBPACK_IMPORTED_MODULE_0__.getEnvContext),
  /* harmony export */   "handleSuccess": () => (/* binding */ handleSuccess),
  /* harmony export */   "makeMap": () => (/* binding */ makeMap),
  /* harmony export */   "noop": () => (/* binding */ noop),
  /* harmony export */   "warn": () => (/* binding */ warn)
  /* harmony export */ });
  /* harmony import */ var _runtime_env__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(8);
  
  
  function generateFromMap () {
    const platforms = ['wx', 'ali', 'baidu', 'qq', 'tt', 'jd', 'ks', 'qa_webview', 'qa_ux', 'Mpx', 'Taro', 'uni']
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
    console.warn && console.warn(`[AuthingMove/api-proxy warn in "${"qa_ux"}"]:\n ${message}`)
  }
  
  function error (message) {
    console.error && console.error(`[AuthingMove/api-proxy error in "${"qa_ux"}"]:\n ${message}`)
  }
  
  function noop () {}
  
  function adaptOptions (originalOptions, matchedOptions = {}, extraOptions = {}) {
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
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "getEnvContext": () => (/* binding */ getEnvContext)
  /* harmony export */ });
  function getEnvContext () {
    const noopEnv = {}
  
    switch ("qa_ux") {
    case 'wx':
    case 'Mpx':
      return wx
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
    case 'ks':
      return ks
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
  
  
  /***/ }),
  /* 9 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "getStorage": () => (/* reexport safe */ _storage_storage__WEBPACK_IMPORTED_MODULE_3__.getStorage),
  /* harmony export */   "login": () => (/* reexport safe */ _login_login__WEBPACK_IMPORTED_MODULE_0__.login),
  /* harmony export */   "removeStorage": () => (/* reexport safe */ _storage_storage__WEBPACK_IMPORTED_MODULE_3__.removeStorage),
  /* harmony export */   "request": () => (/* reexport safe */ _network_request__WEBPACK_IMPORTED_MODULE_1__.request),
  /* harmony export */   "scanCode": () => (/* reexport safe */ _scan_scan__WEBPACK_IMPORTED_MODULE_2__.scanCode),
  /* harmony export */   "setStorage": () => (/* reexport safe */ _storage_storage__WEBPACK_IMPORTED_MODULE_3__.setStorage)
  /* harmony export */ });
  /* harmony import */ var _login_login__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(10);
  /* harmony import */ var _network_request__WEBPACK_IMPORTED_MODULE_1__ = __authing_webpack_require__(12);
  /* harmony import */ var _scan_scan__WEBPACK_IMPORTED_MODULE_2__ = __authing_webpack_require__(14);
  /* harmony import */ var _storage_storage__WEBPACK_IMPORTED_MODULE_3__ = __authing_webpack_require__(16);
  
  
  
  
  
  
  /***/ }),
  /* 10 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "login": () => (/* binding */ login)
  /* harmony export */ });
  /* harmony import */ var _service_wxaccount__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(11);
  /* harmony import */ var _service_wxaccount__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__authing_webpack_require__.n(_service_wxaccount__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __authing_webpack_require__(7);
  
  
  
  function login (options = {}) {
    const type = _service_wxaccount__WEBPACK_IMPORTED_MODULE_0___default().getType()
  
    if (type !== 'APP') {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.error)('wxaccount not available!')
    }
  
    return _service_wxaccount__WEBPACK_IMPORTED_MODULE_0___default().authorize(options)
  }
  
  
  /***/ }),
  /* 11 */
  /***/ ((module) => {
  
  module.exports = require("@service.wxaccount");
  
  /***/ }),
  /* 12 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "request": () => (/* binding */ request)
  /* harmony export */ });
  /* harmony import */ var _system_fetch__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(13);
  /* harmony import */ var _system_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__authing_webpack_require__.n(_system_fetch__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __authing_webpack_require__(7);
  
  
  
  function request (options = {}) {
    const _options = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.adaptOptions)(options, {
      dataType: 'responseType'
    })
    return _system_fetch__WEBPACK_IMPORTED_MODULE_0___default().fetch(_options)
  }
  
  
  /***/ }),
  /* 13 */
  /***/ ((module) => {
  
  module.exports = require("@system.fetch");
  
  /***/ }),
  /* 14 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "scanCode": () => (/* binding */ scanCode)
  /* harmony export */ });
  /* harmony import */ var _system_barcode__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(15);
  /* harmony import */ var _system_barcode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__authing_webpack_require__.n(_system_barcode__WEBPACK_IMPORTED_MODULE_0__);
  
  
  function scanCode (options = {}) {
    const { success, fail, complete } = options
    const _options = {
      success,
      fail,
      complete
    }
  
    return _system_barcode__WEBPACK_IMPORTED_MODULE_0___default().scan(_options)
  }
  
  
  /***/ }),
  /* 15 */
  /***/ ((module) => {
  
  module.exports = require("@system.barcode");
  
  /***/ }),
  /* 16 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "getStorage": () => (/* binding */ getStorage),
  /* harmony export */   "removeStorage": () => (/* binding */ removeStorage),
  /* harmony export */   "setStorage": () => (/* binding */ setStorage)
  /* harmony export */ });
  /* harmony import */ var _system_storage__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(17);
  /* harmony import */ var _system_storage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__authing_webpack_require__.n(_system_storage__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __authing_webpack_require__(7);
  
  
  
  function setStorage (options = {}) {
    const _options = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.adaptOptions)(options, {
      data: 'value'
    })
    return _system_storage__WEBPACK_IMPORTED_MODULE_0___default().set(_options)
  }
  
  function getStorage (options = {}) {
    return _system_storage__WEBPACK_IMPORTED_MODULE_0___default().get(options)
  }
  
  function removeStorage (options = {}) {
    return _system_storage__WEBPACK_IMPORTED_MODULE_0___default()["delete"](options)
  }
  
  
  /***/ }),
  /* 17 */
  /***/ ((module) => {
  
  module.exports = require("@system.storage");
  
  /***/ }),
  /* 18 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "supportedApis": () => (/* binding */ supportedApis)
  /* harmony export */ });
  // base wx in /apis directory
  const supportedApis = [
    'login',
    'request',
    'scanCode',
    'login',
    'setStorage',
    'getStorage'
  ]
  
  
  /***/ }),
  /* 19 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "promisify": () => (/* binding */ promisify)
  /* harmony export */ });
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(7);
  
  
  const envContext = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getEnvContext)()
  
  function promisify (apis) {
    const fromMap = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateFromMap)()
  
    return Object.keys(apis).reduce((map, key) => {
      if (typeof apis[key] !== 'function') {
        return map
      }
  
      map[key] = function (...args) {
        if (promisifyFilter(key)) {
          return apis[key].apply(apis, args)
        }
  
        if (!args[0] || fromMap[args[0]]) {
          args.unshift({
            success: _utils__WEBPACK_IMPORTED_MODULE_0__.noop,
            fail: _utils__WEBPACK_IMPORTED_MODULE_0__.noop
          })
        }
  
        const options = args[0]
        let returned
  
        const promise = new Promise((resolve, reject) => {
          const originalSuccess = options.success
          const originalFail = options.fail
  
          options.success = function success (res) {
            originalSuccess && originalSuccess.call(this, res)
            resolve(res)
          }
  
          options.fail = function fail (res) {
            originalFail && originalFail.call(this, res)
            reject(res)
          }
  
          returned = apis[key].apply(envContext, args)
        })
  
        promise.__returned = returned
        return promise
      }
  
      return map
    }, {})
  }
  
  function promisifyFilter (key) {
    return /^get\w*Manager$/.test(key) ||
      /^create\w*Context$/.test(key) ||
      /^(on|off)/.test(key) ||
      /\w+Sync$/.test(key)
  }
  
  
  /***/ }),
  /* 20 */
  /***/ ((__unused_webpack_module, __authing_webpack_exports__, __authing_webpack_require__) => {
  
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "funcA": () => (/* binding */ funcA),
  /* harmony export */   "funcB": () => (/* binding */ funcB)
  /* harmony export */ });
  function funcA () {
    return 'funcA'
  }
  
  function funcB () {
    return 'funcB'
  }
  
  
  /***/ })
  /******/ ]);
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/ 
  /******/ // The require function
  /******/ function __authing_webpack_require__(moduleId) {
  /******/ 	// Check if module is in cache
  /******/ 	var cachedModule = __webpack_module_cache__[moduleId];
  /******/ 	if (cachedModule !== undefined) {
  /******/ 		return cachedModule.exports;
  /******/ 	}
  /******/ 	// Create a new module (and put it into the cache)
  /******/ 	var module = __webpack_module_cache__[moduleId] = {
  /******/ 		// no module.id needed
  /******/ 		// no module.loaded needed
  /******/ 		exports: {}
  /******/ 	};
  /******/ 
  /******/ 	// Execute the module function
  /******/ 	__webpack_modules__[moduleId](module, module.exports, __authing_webpack_require__);
  /******/ 
  /******/ 	// Return the exports of the module
  /******/ 	return module.exports;
  /******/ }
  /******/ 
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__authing_webpack_require__.n = (module) => {
  /******/ 		var getter = module && module.__esModule ?
  /******/ 			() => (module['default']) :
  /******/ 			() => (module);
  /******/ 		__authing_webpack_require__.d(getter, { a: getter });
  /******/ 		return getter;
  /******/ 	};
  /******/ })();
  /******/ 
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
  /******/ 	// define getter functions for harmony exports
  /******/ 	__authing_webpack_require__.d = (exports, definition) => {
  /******/ 		for(var key in definition) {
  /******/ 			if(__authing_webpack_require__.o(definition, key) && !__authing_webpack_require__.o(exports, key)) {
  /******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
  /******/ 			}
  /******/ 		}
  /******/ 	};
  /******/ })();
  /******/ 
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
  /******/ 	__authing_webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  /******/ })();
  /******/ 
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
  /******/ 	// define __esModule on exports
  /******/ 	__authing_webpack_require__.r = (exports) => {
  /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 		}
  /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 	};
  /******/ })();
  /******/ 
  /************************************************************************/
  var __authing_webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
  /* AuthongMove cjs variable */ var AuthingMove = __authing_webpack_require__(1).default;
  __authing_webpack_require__.r(__authing_webpack_exports__);
  /* harmony export */ __authing_webpack_require__.d(__authing_webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _authing_authingmove_core__WEBPACK_IMPORTED_MODULE_0__ = __authing_webpack_require__(1);
  /* harmony import */ var _authing_authingmove_api_proxy__WEBPACK_IMPORTED_MODULE_1__ = __authing_webpack_require__(5);
  /* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_2__ = __authing_webpack_require__(20);
  
  
  
  
  
  _authing_authingmove_core__WEBPACK_IMPORTED_MODULE_0__["default"].use(_authing_authingmove_api_proxy__WEBPACK_IMPORTED_MODULE_1__["default"])
  
  console.log((0,_test__WEBPACK_IMPORTED_MODULE_2__.funcA)())
  
  const storageRes = /* AuthingMove replacement */AuthingMove.setStorage({
    key: 'setStorageKey',
    data: {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    },
    success: res => {
      console.log('wx.setStorage success: ', res)
    }
  })
  
  console.log('storageRes: ', storageRes)
  
  /* AuthingMove replacement */AuthingMove.getStorage({
    key: 'ssdf'
  })
    .then(res => {
      console.log('wx.getStorage then: ', res)
    })
    .catch(res => {
      console.log('wx.getStorage catch: ', res)
    })
  
  // wx.scanCode({}).then(res => {
  //   console.log('wx.scanCode then: ', res)
  // })
  
  /* AuthingMove replacement */AuthingMove.request({
    url: 'https://api.github.com/users/zhaoyiming0803',
    responseType: 'text'
  }).then(res => {
    console.log('wx.request then: ', res)
  })
  
  /* AuthingMove replacement */AuthingMove.login({
    success: res => {
      console.log('-------: ', res)
    }
  })
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});
  
  })();
  
  var __authing_webpack_exports__default = __authing_webpack_exports__["default"];
  export { __authing_webpack_exports__default as default };
  