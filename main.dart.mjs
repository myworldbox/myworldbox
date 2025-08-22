// Compiles a dart2wasm-generated main module from `source` which can then
// instantiatable via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm modules from `bytes` which is then
// instantiatable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export async function instantiate(modulePromise, importObjectPromise) {
  var moduleOrCompiledApp = await modulePromise;
  if (!(moduleOrCompiledApp instanceof CompiledApp)) {
    moduleOrCompiledApp = new CompiledApp(moduleOrCompiledApp);
  }
  const instantiatedApp = await moduleOrCompiledApp.instantiate(await importObjectPromise);
  return instantiatedApp.instantiatedModule;
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredWasm` is a JS function that takes a module name matching a
  //   wasm file produced by the dart2wasm compiler and returns the bytes to
  //   load the module. These bytes can be in either a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  // `loadDynamicModule` is a JS function that takes two string names matching,
  //   in order, a wasm file produced by the dart2wasm compiler during dynamic
  //   module compilation and a corresponding js file produced by the same
  //   compilation. It should return a JS Array containing 2 elements. The first
  //   should be the bytes for the wasm module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The second
  //   should be the result of using the JS 'import' API on the js file path.
  async instantiate(additionalImports, {loadDeferredWasm, loadDynamicModule} = {}) {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + value;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {
            _4: (o, c) => o instanceof c,
      _7: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._7(f,arguments.length,x0) }),
      _8: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._8(f,arguments.length,x0,x1) }),
      _9: (o, a) => o + a,
      _37: x0 => new Array(x0),
      _39: x0 => x0.length,
      _41: (x0,x1) => x0[x1],
      _42: (x0,x1,x2) => { x0[x1] = x2 },
      _44: x0 => new Promise(x0),
      _46: (x0,x1,x2) => new DataView(x0,x1,x2),
      _48: x0 => new Int8Array(x0),
      _49: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      _50: x0 => new Uint8Array(x0),
      _52: x0 => new Uint8ClampedArray(x0),
      _54: x0 => new Int16Array(x0),
      _56: x0 => new Uint16Array(x0),
      _58: x0 => new Int32Array(x0),
      _60: x0 => new Uint32Array(x0),
      _62: x0 => new Float32Array(x0),
      _64: x0 => new Float64Array(x0),
      _66: (x0,x1,x2) => x0.call(x1,x2),
      _71: (decoder, codeUnits) => decoder.decode(codeUnits),
      _72: () => new TextDecoder("utf-8", {fatal: true}),
      _73: () => new TextDecoder("utf-8", {fatal: false}),
      _74: (s) => +s,
      _75: x0 => new Uint8Array(x0),
      _76: (x0,x1,x2) => x0.set(x1,x2),
      _77: (x0,x1) => x0.transferFromImageBitmap(x1),
      _79: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._79(f,arguments.length,x0) }),
      _80: x0 => new window.FinalizationRegistry(x0),
      _81: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
      _82: (x0,x1) => x0.unregister(x1),
      _83: (x0,x1,x2) => x0.slice(x1,x2),
      _84: (x0,x1) => x0.decode(x1),
      _85: (x0,x1) => x0.segment(x1),
      _86: () => new TextDecoder(),
      _88: x0 => x0.click(),
      _89: x0 => x0.buffer,
      _90: x0 => x0.wasmMemory,
      _91: () => globalThis.window._flutter_skwasmInstance,
      _92: x0 => x0.rasterStartMilliseconds,
      _93: x0 => x0.rasterEndMilliseconds,
      _94: x0 => x0.imageBitmaps,
      _121: x0 => x0.remove(),
      _122: (x0,x1) => x0.append(x1),
      _123: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _124: (x0,x1) => x0.querySelector(x1),
      _126: (x0,x1) => x0.removeChild(x1),
      _204: x0 => x0.stopPropagation(),
      _205: x0 => x0.preventDefault(),
      _207: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _252: x0 => x0.unlock(),
      _253: x0 => x0.getReader(),
      _254: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _255: (x0,x1,x2) => x0.removeEventListener(x1,x2),
      _256: (x0,x1) => x0.item(x1),
      _257: x0 => x0.next(),
      _258: x0 => x0.now(),
      _259: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._259(f,arguments.length,x0) }),
      _260: (x0,x1) => x0.addListener(x1),
      _261: (x0,x1) => x0.removeListener(x1),
      _262: (x0,x1) => x0.matchMedia(x1),
      _263: (x0,x1) => x0.revokeObjectURL(x1),
      _264: x0 => x0.close(),
      _265: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
      _266: x0 => new window.ImageDecoder(x0),
      _267: x0 => ({frameIndex: x0}),
      _268: (x0,x1) => x0.decode(x1),
      _269: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._269(f,arguments.length,x0) }),
      _270: (x0,x1) => x0.getModifierState(x1),
      _271: (x0,x1) => x0.removeProperty(x1),
      _272: (x0,x1) => x0.prepend(x1),
      _273: x0 => new Intl.Locale(x0),
      _274: x0 => x0.disconnect(),
      _275: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._275(f,arguments.length,x0) }),
      _276: (x0,x1) => x0.getAttribute(x1),
      _277: (x0,x1) => x0.contains(x1),
      _278: x0 => x0.blur(),
      _279: x0 => x0.hasFocus(),
      _280: (x0,x1) => x0.hasAttribute(x1),
      _281: (x0,x1) => x0.getModifierState(x1),
      _282: (x0,x1) => x0.appendChild(x1),
      _283: (x0,x1) => x0.createTextNode(x1),
      _284: (x0,x1) => x0.removeAttribute(x1),
      _285: x0 => x0.getBoundingClientRect(),
      _286: (x0,x1) => x0.observe(x1),
      _287: x0 => x0.disconnect(),
      _288: (x0,x1) => x0.closest(x1),
      _710: () => globalThis.window.flutterConfiguration,
      _712: x0 => x0.assetBase,
      _718: x0 => x0.debugShowSemanticsNodes,
      _719: x0 => x0.hostElement,
      _720: x0 => x0.multiViewEnabled,
      _721: x0 => x0.nonce,
      _723: x0 => x0.fontFallbackBaseUrl,
      _733: x0 => x0.console,
      _734: x0 => x0.devicePixelRatio,
      _735: x0 => x0.document,
      _736: x0 => x0.history,
      _737: x0 => x0.innerHeight,
      _738: x0 => x0.innerWidth,
      _739: x0 => x0.location,
      _740: x0 => x0.navigator,
      _741: x0 => x0.visualViewport,
      _742: x0 => x0.performance,
      _744: x0 => x0.URL,
      _746: (x0,x1) => x0.getComputedStyle(x1),
      _747: x0 => x0.screen,
      _748: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._748(f,arguments.length,x0) }),
      _749: (x0,x1) => x0.requestAnimationFrame(x1),
      _754: (x0,x1) => x0.warn(x1),
      _756: (x0,x1) => x0.debug(x1),
      _757: x0 => globalThis.parseFloat(x0),
      _758: () => globalThis.window,
      _759: () => globalThis.Intl,
      _760: () => globalThis.Symbol,
      _761: (x0,x1,x2,x3,x4) => globalThis.createImageBitmap(x0,x1,x2,x3,x4),
      _763: x0 => x0.clipboard,
      _764: x0 => x0.maxTouchPoints,
      _765: x0 => x0.vendor,
      _766: x0 => x0.language,
      _767: x0 => x0.platform,
      _768: x0 => x0.userAgent,
      _769: (x0,x1) => x0.vibrate(x1),
      _770: x0 => x0.languages,
      _771: x0 => x0.documentElement,
      _772: (x0,x1) => x0.querySelector(x1),
      _775: (x0,x1) => x0.createElement(x1),
      _778: (x0,x1) => x0.createEvent(x1),
      _779: x0 => x0.activeElement,
      _782: x0 => x0.head,
      _783: x0 => x0.body,
      _784: (x0,x1) => { x0.title = x1 },
      _788: x0 => x0.visibilityState,
      _789: () => globalThis.document,
      _790: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._790(f,arguments.length,x0) }),
      _791: (x0,x1) => x0.dispatchEvent(x1),
      _799: x0 => x0.target,
      _801: x0 => x0.timeStamp,
      _802: x0 => x0.type,
      _804: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
      _811: x0 => x0.firstChild,
      _815: x0 => x0.parentElement,
      _817: (x0,x1) => { x0.textContent = x1 },
      _818: x0 => x0.parentNode,
      _820: x0 => x0.isConnected,
      _824: x0 => x0.firstElementChild,
      _826: x0 => x0.nextElementSibling,
      _827: x0 => x0.clientHeight,
      _828: x0 => x0.clientWidth,
      _829: x0 => x0.offsetHeight,
      _830: x0 => x0.offsetWidth,
      _831: x0 => x0.id,
      _832: (x0,x1) => { x0.id = x1 },
      _835: (x0,x1) => { x0.spellcheck = x1 },
      _836: x0 => x0.tagName,
      _837: x0 => x0.style,
      _839: (x0,x1) => x0.querySelectorAll(x1),
      _840: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _841: x0 => x0.tabIndex,
      _842: (x0,x1) => { x0.tabIndex = x1 },
      _843: (x0,x1) => x0.focus(x1),
      _844: x0 => x0.scrollTop,
      _845: (x0,x1) => { x0.scrollTop = x1 },
      _846: x0 => x0.scrollLeft,
      _847: (x0,x1) => { x0.scrollLeft = x1 },
      _848: x0 => x0.classList,
      _850: (x0,x1) => { x0.className = x1 },
      _852: (x0,x1) => x0.getElementsByClassName(x1),
      _853: (x0,x1) => x0.attachShadow(x1),
      _856: x0 => x0.computedStyleMap(),
      _857: (x0,x1) => x0.get(x1),
      _863: (x0,x1) => x0.getPropertyValue(x1),
      _864: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
      _865: x0 => x0.offsetLeft,
      _866: x0 => x0.offsetTop,
      _867: x0 => x0.offsetParent,
      _869: (x0,x1) => { x0.name = x1 },
      _870: x0 => x0.content,
      _871: (x0,x1) => { x0.content = x1 },
      _875: (x0,x1) => { x0.src = x1 },
      _876: x0 => x0.naturalWidth,
      _877: x0 => x0.naturalHeight,
      _881: (x0,x1) => { x0.crossOrigin = x1 },
      _883: (x0,x1) => { x0.decoding = x1 },
      _884: x0 => x0.decode(),
      _889: (x0,x1) => { x0.nonce = x1 },
      _894: (x0,x1) => { x0.width = x1 },
      _896: (x0,x1) => { x0.height = x1 },
      _899: (x0,x1) => x0.getContext(x1),
      _963: (x0,x1) => x0.fetch(x1),
      _964: x0 => x0.status,
      _966: x0 => x0.body,
      _967: x0 => x0.arrayBuffer(),
      _970: x0 => x0.read(),
      _971: x0 => x0.value,
      _972: x0 => x0.done,
      _979: x0 => x0.name,
      _980: x0 => x0.x,
      _981: x0 => x0.y,
      _984: x0 => x0.top,
      _985: x0 => x0.right,
      _986: x0 => x0.bottom,
      _987: x0 => x0.left,
      _999: x0 => x0.height,
      _1000: x0 => x0.width,
      _1001: x0 => x0.scale,
      _1002: (x0,x1) => { x0.value = x1 },
      _1005: (x0,x1) => { x0.placeholder = x1 },
      _1007: (x0,x1) => { x0.name = x1 },
      _1008: x0 => x0.selectionDirection,
      _1009: x0 => x0.selectionStart,
      _1010: x0 => x0.selectionEnd,
      _1013: x0 => x0.value,
      _1015: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1016: x0 => x0.readText(),
      _1017: (x0,x1) => x0.writeText(x1),
      _1019: x0 => x0.altKey,
      _1020: x0 => x0.code,
      _1021: x0 => x0.ctrlKey,
      _1022: x0 => x0.key,
      _1023: x0 => x0.keyCode,
      _1024: x0 => x0.location,
      _1025: x0 => x0.metaKey,
      _1026: x0 => x0.repeat,
      _1027: x0 => x0.shiftKey,
      _1028: x0 => x0.isComposing,
      _1030: x0 => x0.state,
      _1031: (x0,x1) => x0.go(x1),
      _1033: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
      _1034: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
      _1035: x0 => x0.pathname,
      _1036: x0 => x0.search,
      _1037: x0 => x0.hash,
      _1041: x0 => x0.state,
      _1044: (x0,x1) => x0.createObjectURL(x1),
      _1046: x0 => new Blob(x0),
      _1048: x0 => new MutationObserver(x0),
      _1049: (x0,x1,x2) => x0.observe(x1,x2),
      _1050: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1050(f,arguments.length,x0,x1) }),
      _1053: x0 => x0.attributeName,
      _1054: x0 => x0.type,
      _1055: x0 => x0.matches,
      _1056: x0 => x0.matches,
      _1060: x0 => x0.relatedTarget,
      _1062: x0 => x0.clientX,
      _1063: x0 => x0.clientY,
      _1064: x0 => x0.offsetX,
      _1065: x0 => x0.offsetY,
      _1068: x0 => x0.button,
      _1069: x0 => x0.buttons,
      _1070: x0 => x0.ctrlKey,
      _1074: x0 => x0.pointerId,
      _1075: x0 => x0.pointerType,
      _1076: x0 => x0.pressure,
      _1077: x0 => x0.tiltX,
      _1078: x0 => x0.tiltY,
      _1079: x0 => x0.getCoalescedEvents(),
      _1082: x0 => x0.deltaX,
      _1083: x0 => x0.deltaY,
      _1084: x0 => x0.wheelDeltaX,
      _1085: x0 => x0.wheelDeltaY,
      _1086: x0 => x0.deltaMode,
      _1093: x0 => x0.changedTouches,
      _1096: x0 => x0.clientX,
      _1097: x0 => x0.clientY,
      _1100: x0 => x0.data,
      _1103: (x0,x1) => { x0.disabled = x1 },
      _1105: (x0,x1) => { x0.type = x1 },
      _1106: (x0,x1) => { x0.max = x1 },
      _1107: (x0,x1) => { x0.min = x1 },
      _1108: x0 => x0.value,
      _1109: (x0,x1) => { x0.value = x1 },
      _1110: x0 => x0.disabled,
      _1111: (x0,x1) => { x0.disabled = x1 },
      _1113: (x0,x1) => { x0.placeholder = x1 },
      _1115: (x0,x1) => { x0.name = x1 },
      _1117: (x0,x1) => { x0.autocomplete = x1 },
      _1118: x0 => x0.selectionDirection,
      _1119: x0 => x0.selectionStart,
      _1122: x0 => x0.selectionEnd,
      _1124: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1125: (x0,x1) => x0.add(x1),
      _1128: (x0,x1) => { x0.noValidate = x1 },
      _1129: (x0,x1) => { x0.method = x1 },
      _1130: (x0,x1) => { x0.action = x1 },
      _1156: x0 => x0.orientation,
      _1157: x0 => x0.width,
      _1158: x0 => x0.height,
      _1159: (x0,x1) => x0.lock(x1),
      _1178: x0 => new ResizeObserver(x0),
      _1181: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1181(f,arguments.length,x0,x1) }),
      _1189: x0 => x0.length,
      _1190: x0 => x0.iterator,
      _1191: x0 => x0.Segmenter,
      _1192: x0 => x0.v8BreakIterator,
      _1193: (x0,x1) => new Intl.Segmenter(x0,x1),
      _1195: x0 => x0.language,
      _1196: x0 => x0.script,
      _1197: x0 => x0.region,
      _1215: x0 => x0.done,
      _1216: x0 => x0.value,
      _1217: x0 => x0.index,
      _1221: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
      _1222: (x0,x1) => x0.adoptText(x1),
      _1223: x0 => x0.first(),
      _1224: x0 => x0.next(),
      _1225: x0 => x0.current(),
      _1239: x0 => x0.hostElement,
      _1240: x0 => x0.viewConstraints,
      _1243: x0 => x0.maxHeight,
      _1244: x0 => x0.maxWidth,
      _1245: x0 => x0.minHeight,
      _1246: x0 => x0.minWidth,
      _1247: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1247(f,arguments.length,x0) }),
      _1248: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1248(f,arguments.length,x0) }),
      _1249: (x0,x1) => ({addView: x0,removeView: x1}),
      _1252: x0 => x0.loader,
      _1253: () => globalThis._flutter,
      _1254: (x0,x1) => x0.didCreateEngineInitializer(x1),
      _1255: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1255(f,arguments.length,x0) }),
      _1256: f => finalizeWrapper(f, function() { return dartInstance.exports._1256(f,arguments.length) }),
      _1257: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
      _1260: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1260(f,arguments.length,x0) }),
      _1261: x0 => ({runApp: x0}),
      _1263: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1263(f,arguments.length,x0,x1) }),
      _1264: x0 => x0.length,
      _1265: () => globalThis.window.ImageDecoder,
      _1266: x0 => x0.tracks,
      _1268: x0 => x0.completed,
      _1270: x0 => x0.image,
      _1276: x0 => x0.displayWidth,
      _1277: x0 => x0.displayHeight,
      _1278: x0 => x0.duration,
      _1281: x0 => x0.ready,
      _1282: x0 => x0.selectedTrack,
      _1283: x0 => x0.repetitionCount,
      _1284: x0 => x0.frameCount,
      _1327: x0 => x0.enumerateDevices(),
      _1328: x0 => ({facingMode: x0}),
      _1329: x0 => ({video: x0}),
      _1330: () => globalThis.navigator.mediaDevices.enumerateDevices(),
      _1331: x0 => ({exact: x0}),
      _1332: x0 => ({deviceId: x0}),
      _1333: x0 => globalThis.navigator.mediaDevices.getUserMedia(x0),
      _1334: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _1335: x0 => x0.play(),
      _1336: x0 => x0.getTracks(),
      _1337: x0 => x0.stop(),
      _1338: (x0,x1,x2,x3) => x0.drawImage(x1,x2,x3),
      _1339: (x0,x1,x2,x3,x4) => x0.getImageData(x1,x2,x3,x4),
      _1340: (x0,x1,x2) => globalThis.jsQR(x0,x1,x2),
      _1341: (x0,x1,x2) => x0.setItem(x1,x2),
      _1342: (x0,x1) => x0.getItem(x1),
      _1343: (x0,x1) => x0.removeItem(x1),
      _1347: x0 => globalThis.URL.createObjectURL(x0),
      _1353: (x0,x1) => x0.querySelector(x1),
      _1354: (x0,x1) => x0.createElement(x1),
      _1355: (x0,x1) => x0.append(x1),
      _1358: (x0,x1) => x0.getUserMedia(x1),
      _1359: x0 => x0.getSupportedConstraints(),
      _1360: x0 => x0.getVideoTracks(),
      _1361: x0 => x0.getCapabilities(),
      _1362: x0 => x0.getSettings(),
      _1363: (x0,x1,x2) => x0.setProperty(x1,x2),
      _1365: (x0,x1,x2) => x0.translate(x1,x2),
      _1366: (x0,x1,x2) => x0.scale(x1,x2),
      _1367: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1367(f,arguments.length,x0) }),
      _1368: (x0,x1,x2) => x0.toBlob(x1,x2),
      _1369: x0 => ({torch: x0}),
      _1370: (x0,x1) => x0.applyConstraints(x1),
      _1384: x0 => x0.load(),
      _1385: x0 => globalThis.MediaRecorder.isTypeSupported(x0),
      _1386: x0 => ({type: x0}),
      _1387: (x0,x1) => new Blob(x0,x1),
      _1388: x0 => new Event(x0),
      _1397: (x0,x1) => x0.createElement(x1),
      _1403: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _1405: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1406: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
      _1412: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _1413: x0 => x0.decode(),
      _1414: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _1415: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
      _1416: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1416(f,arguments.length,x0) }),
      _1417: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1417(f,arguments.length,x0) }),
      _1418: x0 => x0.send(),
      _1419: () => new XMLHttpRequest(),
      _1420: (x0,x1) => ({video: x0,audio: x1}),
      _1422: () => new FileReader(),
      _1424: (x0,x1) => x0.readAsArrayBuffer(x1),
      _1432: () => new SpeechSynthesisUtterance(),
      _1433: x0 => x0.pause(),
      _1434: x0 => x0.resume(),
      _1435: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1435(f,arguments.length,x0) }),
      _1436: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1436(f,arguments.length,x0) }),
      _1437: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1437(f,arguments.length,x0) }),
      _1438: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1438(f,arguments.length,x0) }),
      _1439: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1439(f,arguments.length,x0) }),
      _1440: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1440(f,arguments.length,x0) }),
      _1441: (x0,x1) => x0.speak(x1),
      _1442: x0 => x0.cancel(),
      _1443: x0 => x0.getVoices(),
      _1444: Date.now,
      _1446: s => new Date(s * 1000).getTimezoneOffset() * 60,
      _1447: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      _1448: () => {
        let stackString = new Error().stack.toString();
        let frames = stackString.split('\n');
        let drop = 2;
        if (frames[0] === 'Error') {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      _1449: () => typeof dartUseDateNowForTicks !== "undefined",
      _1450: () => 1000 * performance.now(),
      _1451: () => Date.now(),
      _1452: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      _1453: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
      _1454: () => new WeakMap(),
      _1455: (map, o) => map.get(o),
      _1456: (map, o, v) => map.set(o, v),
      _1457: x0 => new WeakRef(x0),
      _1458: x0 => x0.deref(),
      _1465: () => globalThis.WeakRef,
      _1469: s => JSON.stringify(s),
      _1470: s => printToConsole(s),
      _1471: (o, p, r) => o.replaceAll(p, () => r),
      _1472: (o, p, r) => o.replace(p, () => r),
      _1473: Function.prototype.call.bind(String.prototype.toLowerCase),
      _1474: s => s.toUpperCase(),
      _1475: s => s.trim(),
      _1476: s => s.trimLeft(),
      _1477: s => s.trimRight(),
      _1478: (string, times) => string.repeat(times),
      _1479: Function.prototype.call.bind(String.prototype.indexOf),
      _1480: (s, p, i) => s.lastIndexOf(p, i),
      _1481: (string, token) => string.split(token),
      _1482: Object.is,
      _1483: o => o instanceof Array,
      _1484: (a, i) => a.push(i),
      _1485: (a, i) => a.splice(i, 1)[0],
      _1487: (a, l) => a.length = l,
      _1488: a => a.pop(),
      _1489: (a, i) => a.splice(i, 1),
      _1490: (a, s) => a.join(s),
      _1491: (a, s, e) => a.slice(s, e),
      _1492: (a, s, e) => a.splice(s, e),
      _1493: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
      _1494: a => a.length,
      _1496: (a, i) => a[i],
      _1497: (a, i, v) => a[i] = v,
      _1499: o => {
        if (o instanceof ArrayBuffer) return 0;
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
          return 1;
        }
        return 2;
      },
      _1500: (o, offsetInBytes, lengthInBytes) => {
        var dst = new ArrayBuffer(lengthInBytes);
        new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
        return new DataView(dst);
      },
      _1502: o => o instanceof Uint8Array,
      _1503: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      _1504: o => o instanceof Int8Array,
      _1505: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      _1506: o => o instanceof Uint8ClampedArray,
      _1507: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      _1508: o => o instanceof Uint16Array,
      _1509: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      _1510: o => o instanceof Int16Array,
      _1511: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      _1512: o => o instanceof Uint32Array,
      _1513: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      _1514: o => o instanceof Int32Array,
      _1515: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      _1517: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
      _1518: o => o instanceof Float32Array,
      _1519: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      _1520: o => o instanceof Float64Array,
      _1521: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      _1522: (t, s) => t.set(s),
      _1524: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      _1526: o => o.buffer,
      _1527: o => o.byteOffset,
      _1528: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      _1529: (b, o) => new DataView(b, o),
      _1530: (b, o, l) => new DataView(b, o, l),
      _1531: Function.prototype.call.bind(DataView.prototype.getUint8),
      _1532: Function.prototype.call.bind(DataView.prototype.setUint8),
      _1533: Function.prototype.call.bind(DataView.prototype.getInt8),
      _1534: Function.prototype.call.bind(DataView.prototype.setInt8),
      _1535: Function.prototype.call.bind(DataView.prototype.getUint16),
      _1536: Function.prototype.call.bind(DataView.prototype.setUint16),
      _1537: Function.prototype.call.bind(DataView.prototype.getInt16),
      _1538: Function.prototype.call.bind(DataView.prototype.setInt16),
      _1539: Function.prototype.call.bind(DataView.prototype.getUint32),
      _1540: Function.prototype.call.bind(DataView.prototype.setUint32),
      _1541: Function.prototype.call.bind(DataView.prototype.getInt32),
      _1542: Function.prototype.call.bind(DataView.prototype.setInt32),
      _1545: Function.prototype.call.bind(DataView.prototype.getBigInt64),
      _1546: Function.prototype.call.bind(DataView.prototype.setBigInt64),
      _1547: Function.prototype.call.bind(DataView.prototype.getFloat32),
      _1548: Function.prototype.call.bind(DataView.prototype.setFloat32),
      _1549: Function.prototype.call.bind(DataView.prototype.getFloat64),
      _1550: Function.prototype.call.bind(DataView.prototype.setFloat64),
      _1563: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      _1564: (handle) => clearTimeout(handle),
      _1565: (ms, c) =>
      setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
      _1566: (handle) => clearInterval(handle),
      _1567: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      _1568: () => Date.now(),
      _1573: o => Object.keys(o),
      _1574: () => new AbortController(),
      _1575: x0 => x0.abort(),
      _1576: (x0,x1,x2,x3,x4,x5) => ({method: x0,headers: x1,body: x2,credentials: x3,redirect: x4,signal: x5}),
      _1577: (x0,x1) => globalThis.fetch(x0,x1),
      _1578: (x0,x1) => x0.get(x1),
      _1579: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1579(f,arguments.length,x0,x1,x2) }),
      _1580: (x0,x1) => x0.forEach(x1),
      _1581: x0 => x0.getReader(),
      _1582: x0 => x0.read(),
      _1583: x0 => x0.cancel(),
      _1584: () => new XMLHttpRequest(),
      _1585: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _1586: x0 => x0.send(),
      _1593: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1593(f,arguments.length,x0) }),
      _1594: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1594(f,arguments.length,x0) }),
      _1609: x0 => x0.torch,
      _1610: x0 => x0.facingMode,
      _1622: (x0,x1) => x0.getContext(x1),
      _1626: (x0,x1,x2,x3,x4,x5) => x0.drawImage(x1,x2,x3,x4,x5),
      _1629: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      _1630: (x0,x1) => x0.exec(x1),
      _1631: (x0,x1) => x0.test(x1),
      _1632: x0 => x0.pop(),
      _1634: o => o === undefined,
      _1636: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      _1638: o => {
        const proto = Object.getPrototypeOf(o);
        return proto === Object.prototype || proto === null;
      },
      _1639: o => o instanceof RegExp,
      _1640: (l, r) => l === r,
      _1641: o => o,
      _1642: o => o,
      _1643: o => o,
      _1644: b => !!b,
      _1645: o => o.length,
      _1647: (o, i) => o[i],
      _1648: f => f.dartFunction,
      _1649: () => ({}),
      _1650: () => [],
      _1652: () => globalThis,
      _1653: (constructor, args) => {
        const factoryFunction = constructor.bind.apply(
            constructor, [null, ...args]);
        return new factoryFunction();
      },
      _1654: (o, p) => p in o,
      _1655: (o, p) => o[p],
      _1656: (o, p, v) => o[p] = v,
      _1657: (o, m, a) => o[m].apply(o, a),
      _1659: o => String(o),
      _1660: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      _1661: o => {
        if (o === undefined) return 1;
        var type = typeof o;
        if (type === 'boolean') return 2;
        if (type === 'number') return 3;
        if (type === 'string') return 4;
        if (o instanceof Array) return 5;
        if (ArrayBuffer.isView(o)) {
          if (o instanceof Int8Array) return 6;
          if (o instanceof Uint8Array) return 7;
          if (o instanceof Uint8ClampedArray) return 8;
          if (o instanceof Int16Array) return 9;
          if (o instanceof Uint16Array) return 10;
          if (o instanceof Int32Array) return 11;
          if (o instanceof Uint32Array) return 12;
          if (o instanceof Float32Array) return 13;
          if (o instanceof Float64Array) return 14;
          if (o instanceof DataView) return 15;
        }
        if (o instanceof ArrayBuffer) return 16;
        // Feature check for `SharedArrayBuffer` before doing a type-check.
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
            return 17;
        }
        return 18;
      },
      _1662: o => [o],
      _1663: (o0, o1) => [o0, o1],
      _1664: (o0, o1, o2) => [o0, o1, o2],
      _1665: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      _1666: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1667: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1670: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1671: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1672: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1673: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1674: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF64ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1675: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF64ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1676: x0 => new ArrayBuffer(x0),
      _1677: s => {
        if (/[[\]{}()*+?.\\^$|]/.test(s)) {
            s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
        }
        return s;
      },
      _1678: x0 => x0.input,
      _1679: x0 => x0.index,
      _1680: x0 => x0.groups,
      _1681: x0 => x0.flags,
      _1682: x0 => x0.multiline,
      _1683: x0 => x0.ignoreCase,
      _1684: x0 => x0.unicode,
      _1685: x0 => x0.dotAll,
      _1686: (x0,x1) => { x0.lastIndex = x1 },
      _1687: (o, p) => p in o,
      _1688: (o, p) => o[p],
      _1691: x0 => x0.random(),
      _1694: () => globalThis.Math,
      _1695: Function.prototype.call.bind(Number.prototype.toString),
      _1696: Function.prototype.call.bind(BigInt.prototype.toString),
      _1697: Function.prototype.call.bind(Number.prototype.toString),
      _1698: (d, digits) => d.toFixed(digits),
      _1702: x0 => x0.data,
      _1703: () => globalThis.document,
      _1709: (x0,x1) => { x0.height = x1 },
      _1711: (x0,x1) => { x0.width = x1 },
      _1720: x0 => x0.style,
      _1723: x0 => x0.src,
      _1724: (x0,x1) => { x0.src = x1 },
      _1725: x0 => x0.naturalWidth,
      _1726: x0 => x0.naturalHeight,
      _1742: x0 => x0.status,
      _1743: (x0,x1) => { x0.responseType = x1 },
      _1745: x0 => x0.response,
      _1794: (x0,x1) => { x0.responseType = x1 },
      _1795: x0 => x0.response,
      _1871: x0 => x0.style,
      _2443: x0 => x0.videoWidth,
      _2444: x0 => x0.videoHeight,
      _2474: x0 => x0.error,
      _2477: x0 => x0.srcObject,
      _2478: (x0,x1) => { x0.srcObject = x1 },
      _2502: (x0,x1) => { x0.autoplay = x1 },
      _2510: (x0,x1) => { x0.muted = x1 },
      _2525: x0 => x0.code,
      _2526: x0 => x0.message,
      _3149: x0 => x0.width,
      _3150: (x0,x1) => { x0.width = x1 },
      _3151: x0 => x0.height,
      _3152: (x0,x1) => { x0.height = x1 },
      _3278: x0 => x0.data,
      _3571: () => globalThis.window,
      _3633: x0 => x0.navigator,
      _3637: x0 => x0.screen,
      _3897: x0 => x0.localStorage,
      _4006: x0 => x0.mediaDevices,
      _4022: x0 => x0.userAgent,
      _4023: x0 => x0.vendor,
      _6133: x0 => x0.type,
      _6174: x0 => x0.signal,
      _6246: () => globalThis.document,
      _6328: x0 => x0.body,
      _6659: (x0,x1) => { x0.id = x1 },
      _6686: x0 => x0.children,
      _8005: x0 => x0.value,
      _8007: x0 => x0.done,
      _8187: x0 => x0.size,
      _8206: x0 => x0.result,
      _8698: x0 => x0.url,
      _8700: x0 => x0.status,
      _8702: x0 => x0.statusText,
      _8703: x0 => x0.headers,
      _8704: x0 => x0.body,
      _8969: x0 => x0.type,
      _9001: x0 => x0.orientation,
      _9509: x0 => x0.readyState,
      _9523: x0 => x0.facingMode,
      _9598: x0 => x0.facingMode,
      _9737: x0 => x0.width,
      _9739: x0 => x0.height,
      _9822: x0 => x0.deviceId,
      _9823: x0 => x0.kind,
      _9824: x0 => x0.label,
      _11264: (x0,x1) => { x0.height = x1 },
      _11458: (x0,x1) => { x0.objectFit = x1 },
      _11588: (x0,x1) => { x0.pointerEvents = x1 },
      _11886: (x0,x1) => { x0.transform = x1 },
      _11890: (x0,x1) => { x0.transformOrigin = x1 },
      _11954: (x0,x1) => { x0.width = x1 },
      _12322: x0 => x0.name,
      _12323: x0 => x0.message,
      _13069: () => globalThis.speechSynthesis,
      _13070: (x0,x1) => { x0.lang = x1 },
      _13072: (x0,x1) => { x0.pitch = x1 },
      _13075: (x0,x1) => { x0.rate = x1 },
      _13077: (x0,x1) => { x0.text = x1 },
      _13078: (x0,x1) => { x0.voice = x1 },
      _13079: x0 => x0.voice,
      _13081: (x0,x1) => { x0.volume = x1 },
      _13082: (x0,x1) => { x0.onstart = x1 },
      _13083: (x0,x1) => { x0.onend = x1 },
      _13084: (x0,x1) => { x0.onpause = x1 },
      _13085: (x0,x1) => { x0.onresume = x1 },
      _13086: (x0,x1) => { x0.onerror = x1 },
      _13087: (x0,x1) => { x0.onboundary = x1 },
      _13089: x0 => x0.lang,
      _13090: x0 => x0.localService,
      _13091: x0 => x0.name,

    };

    const baseImports = {
      dart2wasm: dart2wasm,
      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
      S: new Proxy({}, { get(_, prop) { return prop; } }),

    };

    const jsStringPolyfill = {
      "charCodeAt": (s, i) => s.charCodeAt(i),
      "compare": (s1, s2) => {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
      },
      "concat": (s1, s2) => s1 + s2,
      "equals": (s1, s2) => s1 === s2,
      "fromCharCode": (i) => String.fromCharCode(i),
      "length": (s) => s.length,
      "substring": (s, a, b) => s.substring(a, b),
      "fromCharCodeArray": (a, start, end) => {
        if (end <= start) return '';

        const read = dartInstance.exports.$wasmI16ArrayGet;
        let result = '';
        let index = start;
        const chunkLength = Math.min(end - index, 500);
        let array = new Array(chunkLength);
        while (index < end) {
          const newChunkLength = Math.min(end - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(a, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
      "intoCharCodeArray": (s, a, start) => {
        if (s === '') return 0;

        const write = dartInstance.exports.$wasmI16ArraySet;
        for (var i = 0; i < s.length; ++i) {
          write(a, start++, s.charCodeAt(i));
        }
        return s.length;
      },
      "test": (s) => typeof s == "string",
    };


    

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      
      "wasm:js-string": jsStringPolyfill,
    });

    return new InstantiatedApp(this, dartInstance);
  }
}

class InstantiatedApp {
  constructor(compiledApp, instantiatedModule) {
    this.compiledApp = compiledApp;
    this.instantiatedModule = instantiatedModule;
  }

  // Call the main function with the given arguments.
  invokeMain(...args) {
    this.instantiatedModule.exports.$invokeMain(args);
  }
}
