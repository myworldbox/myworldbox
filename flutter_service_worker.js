'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "94bba263f28b9d7e249fcbb9aaf4b664",
"assets/AssetManifest.bin.json": "a9abfbc31b1e0de820b6538e3e131e4b",
"assets/assets/gif/11c76a09": "2ba8a71de0e7d7c718f2601ca5b3437e",
"assets/assets/gif/1b670311": "3a350f84d3d25603dc6739ddd46dfdd2",
"assets/assets/gif/1c8116f0": "3a350f84d3d25603dc6739ddd46dfdd2",
"assets/assets/gif/29388f64": "802c000c53063668dc065d36dcc5f5ee",
"assets/assets/gif/2aef0e42": "00fc06ed86e975b82f36f5c06b8fe59a",
"assets/assets/gif/36f978e8": "802c000c53063668dc065d36dcc5f5ee",
"assets/assets/gif/40ac9907": "2ba8a71de0e7d7c718f2601ca5b3437e",
"assets/assets/gif/4514a7cc": "00fc06ed86e975b82f36f5c06b8fe59a",
"assets/assets/gif/452ccf45": "f73eca8a1837959e550cc44f0db67632",
"assets/assets/gif/5a5a6e44": "00fc06ed86e975b82f36f5c06b8fe59a",
"assets/assets/gif/7a2bfa6e": "b40a815917c7db4f55dd3bc9c79aa0db",
"assets/assets/gif/8ef84bd": "00fc06ed86e975b82f36f5c06b8fe59a",
"assets/assets/gif/95ee0aec": "f73eca8a1837959e550cc44f0db67632",
"assets/assets/gif/a2c42107": "04919e2a62d6a614276d03336a2c8c9d",
"assets/assets/gif/a537d079": "00fc06ed86e975b82f36f5c06b8fe59a",
"assets/assets/gif/aa6eb8d": "802c000c53063668dc065d36dcc5f5ee",
"assets/assets/gif/b1b62cda": "802c000c53063668dc065d36dcc5f5ee",
"assets/assets/gif/b78a6ce9": "2ba8a71de0e7d7c718f2601ca5b3437e",
"assets/assets/gif/bdf87ee2": "04919e2a62d6a614276d03336a2c8c9d",
"assets/assets/gif/book_fold_0.gif": "2ba8a71de0e7d7c718f2601ca5b3437e",
"assets/assets/gif/book_fold_1.gif": "3a350f84d3d25603dc6739ddd46dfdd2",
"assets/assets/gif/book_fold_2.gif": "b40a815917c7db4f55dd3bc9c79aa0db",
"assets/assets/gif/book_fold_3.gif": "f73eca8a1837959e550cc44f0db67632",
"assets/assets/gif/book_spire.gif": "04919e2a62d6a614276d03336a2c8c9d",
"assets/assets/gif/cd337172": "8ed6b6404244f6873c7f878c53829050",
"assets/assets/gif/d37e3776": "8ed6b6404244f6873c7f878c53829050",
"assets/assets/gif/d7565a54": "3a350f84d3d25603dc6739ddd46dfdd2",
"assets/assets/gif/e09f34b6": "b40a815917c7db4f55dd3bc9c79aa0db",
"assets/assets/gif/e4448b76": "b40a815917c7db4f55dd3bc9c79aa0db",
"assets/assets/gif/e848a587": "2ba8a71de0e7d7c718f2601ca5b3437e",
"assets/assets/gif/eb22d2a8": "2ba8a71de0e7d7c718f2601ca5b3437e",
"assets/assets/gif/face_scan_0.gif": "802c000c53063668dc065d36dcc5f5ee",
"assets/assets/gif/face_scan_1.gif": "8ed6b6404244f6873c7f878c53829050",
"assets/assets/gif/ghost_run.gif": "00fc06ed86e975b82f36f5c06b8fe59a",
"assets/assets/html/76204956": "9faa9f25eb41f662d7268f0f37a90748",
"assets/assets/html/956eaf22": "9faa9f25eb41f662d7268f0f37a90748",
"assets/assets/html/da3e74cf": "9faa9f25eb41f662d7268f0f37a90748",
"assets/assets/html/f306efa9": "9faa9f25eb41f662d7268f0f37a90748",
"assets/assets/html/fos_order_rule.html": "9faa9f25eb41f662d7268f0f37a90748",
"assets/assets/jpeg/11fb2406": "89b572f98054c3192aed6be300c388ce",
"assets/assets/jpeg/1331b097": "c49a3263ad903703e1489bf2c42c86c6",
"assets/assets/jpeg/1b567394": "2e3ff0940fab3175b27943b5e4b140e2",
"assets/assets/jpeg/1cfc413d": "25b1da52d7caa96d3966c4a3cfabf663",
"assets/assets/jpeg/238f8a39": "bc858d3815e1b94c90f7e588690ffc9d",
"assets/assets/jpeg/2682ddf2": "b68ddaa554ffce230790cb6acb085dcd",
"assets/assets/jpeg/29ef8268": "5f820302c06dc55b135935e4185c0ef1",
"assets/assets/jpeg/2b840ddc": "c49a3263ad903703e1489bf2c42c86c6",
"assets/assets/jpeg/2ecff5e3": "5f820302c06dc55b135935e4185c0ef1",
"assets/assets/jpeg/2fcb62f4": "e725d18cd943fdd636b19dd9df987acc",
"assets/assets/jpeg/35143c61": "0fa267d039c2aa64a5c06516dbd2a507",
"assets/assets/jpeg/373d110c": "2e3ff0940fab3175b27943b5e4b140e2",
"assets/assets/jpeg/3a0b71af": "0fa267d039c2aa64a5c06516dbd2a507",
"assets/assets/jpeg/3f9fc06b": "6b848ae32a1bf9839391c9a6e91905ce",
"assets/assets/jpeg/41c9431a": "f022016aca14f27a69ee5383d97500f1",
"assets/assets/jpeg/47637f0c": "25b1da52d7caa96d3966c4a3cfabf663",
"assets/assets/jpeg/4fb3947d": "5f820302c06dc55b135935e4185c0ef1",
"assets/assets/jpeg/50a8ec27": "86d5e798a1e65f2f460e8cf480aa1043",
"assets/assets/jpeg/527a1d3c": "6b848ae32a1bf9839391c9a6e91905ce",
"assets/assets/jpeg/527b2e8": "c843ceaff9f8077530dd1759a18ec305",
"assets/assets/jpeg/57b8eaed": "25b1da52d7caa96d3966c4a3cfabf663",
"assets/assets/jpeg/5b01b2b2": "a3f42473bd693afe353f15c4c4573064",
"assets/assets/jpeg/5c7eb9c0": "47f429d3f561bce4bf50f67b623aaded",
"assets/assets/jpeg/5c9d8351": "4e1296d6469e316ff7ef409bb9be94b6",
"assets/assets/jpeg/5d676ca7": "86d5e798a1e65f2f460e8cf480aa1043",
"assets/assets/jpeg/63262439": "a66b270483618aa282bcc795381edbf9",
"assets/assets/jpeg/6503c62b": "c843ceaff9f8077530dd1759a18ec305",
"assets/assets/jpeg/69c4a0de": "43f4d8c5e41215c69ef36f5e19c2cbb4",
"assets/assets/jpeg/6de81709": "b68ddaa554ffce230790cb6acb085dcd",
"assets/assets/jpeg/71a5f675": "c2bcb6c5e722a35abc504c0439a14ecc",
"assets/assets/jpeg/754d1344": "a3f42473bd693afe353f15c4c4573064",
"assets/assets/jpeg/75e11101": "f022016aca14f27a69ee5383d97500f1",
"assets/assets/jpeg/76d6154d": "f022016aca14f27a69ee5383d97500f1",
"assets/assets/jpeg/77448eba": "0fa267d039c2aa64a5c06516dbd2a507",
"assets/assets/jpeg/8051bcfe": "89b572f98054c3192aed6be300c388ce",
"assets/assets/jpeg/85afe3ab": "b68ddaa554ffce230790cb6acb085dcd",
"assets/assets/jpeg/88a46f0": "b68ddaa554ffce230790cb6acb085dcd",
"assets/assets/jpeg/8acc6e1c": "2e3ff0940fab3175b27943b5e4b140e2",
"assets/assets/jpeg/8df96e72": "f022016aca14f27a69ee5383d97500f1",
"assets/assets/jpeg/8e651f41": "1613ea198bf9681ac5eece5357e0ed92",
"assets/assets/jpeg/9449f98b": "a66b270483618aa282bcc795381edbf9",
"assets/assets/jpeg/98d4164e": "a3f42473bd693afe353f15c4c4573064",
"assets/assets/jpeg/9bf6efb8": "bc858d3815e1b94c90f7e588690ffc9d",
"assets/assets/jpeg/9d452336": "a66b270483618aa282bcc795381edbf9",
"assets/assets/jpeg/9f677553": "c2bcb6c5e722a35abc504c0439a14ecc",
"assets/assets/jpeg/aa40edd": "47f429d3f561bce4bf50f67b623aaded",
"assets/assets/jpeg/aacf43af": "0fa267d039c2aa64a5c06516dbd2a507",
"assets/assets/jpeg/ab7fa009": "86d5e798a1e65f2f460e8cf480aa1043",
"assets/assets/jpeg/ad7c264": "5f820302c06dc55b135935e4185c0ef1",
"assets/assets/jpeg/b0d7b24b": "43f4d8c5e41215c69ef36f5e19c2cbb4",
"assets/assets/jpeg/b379c116": "a3f42473bd693afe353f15c4c4573064",
"assets/assets/jpeg/b37a4bef": "4e1296d6469e316ff7ef409bb9be94b6",
"assets/assets/jpeg/b89896d9": "43f4d8c5e41215c69ef36f5e19c2cbb4",
"assets/assets/jpeg/background_0.jpeg": "0fa267d039c2aa64a5c06516dbd2a507",
"assets/assets/jpeg/background_1.jpeg": "c49a3263ad903703e1489bf2c42c86c6",
"assets/assets/jpeg/background_10.jpeg": "f022016aca14f27a69ee5383d97500f1",
"assets/assets/jpeg/background_11.jpeg": "c2bcb6c5e722a35abc504c0439a14ecc",
"assets/assets/jpeg/background_12.jpeg": "c843ceaff9f8077530dd1759a18ec305",
"assets/assets/jpeg/background_13.jpeg": "43f4d8c5e41215c69ef36f5e19c2cbb4",
"assets/assets/jpeg/background_14.jpeg": "4e1296d6469e316ff7ef409bb9be94b6",
"assets/assets/jpeg/background_15.jpeg": "bc858d3815e1b94c90f7e588690ffc9d",
"assets/assets/jpeg/background_16.jpeg": "2e3ff0940fab3175b27943b5e4b140e2",
"assets/assets/jpeg/background_17.jpeg": "47f429d3f561bce4bf50f67b623aaded",
"assets/assets/jpeg/background_18.jpeg": "b68ddaa554ffce230790cb6acb085dcd",
"assets/assets/jpeg/background_19.jpeg": "86cc49437f34d3eef8a2084efccf0ca2",
"assets/assets/jpeg/background_2.jpeg": "86d5e798a1e65f2f460e8cf480aa1043",
"assets/assets/jpeg/background_20.jpeg": "a3f42473bd693afe353f15c4c4573064",
"assets/assets/jpeg/background_21.jpeg": "a66b270483618aa282bcc795381edbf9",
"assets/assets/jpeg/background_3.jpeg": "6b848ae32a1bf9839391c9a6e91905ce",
"assets/assets/jpeg/background_4.jpeg": "e725d18cd943fdd636b19dd9df987acc",
"assets/assets/jpeg/background_5.jpeg": "1613ea198bf9681ac5eece5357e0ed92",
"assets/assets/jpeg/background_6.jpeg": "5f820302c06dc55b135935e4185c0ef1",
"assets/assets/jpeg/background_7.jpeg": "89b572f98054c3192aed6be300c388ce",
"assets/assets/jpeg/background_8.jpeg": "e71a64e26072fc1d6aebe56866036045",
"assets/assets/jpeg/background_9.jpeg": "25b1da52d7caa96d3966c4a3cfabf663",
"assets/assets/jpeg/bc16e7c0": "1613ea198bf9681ac5eece5357e0ed92",
"assets/assets/jpeg/c3af2b49": "4e1296d6469e316ff7ef409bb9be94b6",
"assets/assets/jpeg/cad665f1": "bc858d3815e1b94c90f7e588690ffc9d",
"assets/assets/jpeg/cfe213e8": "e71a64e26072fc1d6aebe56866036045",
"assets/assets/jpeg/cff3f7e5": "b68ddaa554ffce230790cb6acb085dcd",
"assets/assets/jpeg/d0a22d27": "5f820302c06dc55b135935e4185c0ef1",
"assets/assets/jpeg/d1c7b872": "4e1296d6469e316ff7ef409bb9be94b6",
"assets/assets/jpeg/d3717d7d": "47f429d3f561bce4bf50f67b623aaded",
"assets/assets/jpeg/d8460d05": "c843ceaff9f8077530dd1759a18ec305",
"assets/assets/jpeg/db233d46": "1613ea198bf9681ac5eece5357e0ed92",
"assets/assets/jpeg/dc1bfbbe": "6b848ae32a1bf9839391c9a6e91905ce",
"assets/assets/jpeg/e0826a83": "4e1296d6469e316ff7ef409bb9be94b6",
"assets/assets/jpeg/e0eaf598": "1613ea198bf9681ac5eece5357e0ed92",
"assets/assets/jpeg/e2c72f1": "e71a64e26072fc1d6aebe56866036045",
"assets/assets/jpeg/e9eb6a7e": "25b1da52d7caa96d3966c4a3cfabf663",
"assets/assets/jpeg/ea669d00": "a66b270483618aa282bcc795381edbf9",
"assets/assets/jpeg/ec510759": "43f4d8c5e41215c69ef36f5e19c2cbb4",
"assets/assets/jpeg/ecb2eaa5": "1613ea198bf9681ac5eece5357e0ed92",
"assets/assets/jpeg/f04c19b8": "e725d18cd943fdd636b19dd9df987acc",
"assets/assets/jpeg/fa2b1e93": "a66b270483618aa282bcc795381edbf9",
"assets/assets/jpg/1b693b85": "f0a638031a66bbe549f9289df7d4d1cf",
"assets/assets/jpg/6e425486": "f0a638031a66bbe549f9289df7d4d1cf",
"assets/assets/jpg/kindergarten.jpg": "f0a638031a66bbe549f9289df7d4d1cf",
"assets/assets/json/brs_locale_en_us.json": "79013e1a330fefffdd2426e30105a3dc",
"assets/assets/json/brs_locale_zh_cn.json": "c3c03b603caa056aa8ff6c5d6e475a9f",
"assets/assets/json/brs_locale_zh_hk.json": "97d113a848864fefb9c6c2b9dd8e33fe",
"assets/assets/json/domain.json": "ab9e0a6f7f6e72105b717744318eba50",
"assets/assets/json/fos_locale_en_us.json": "0847fe1f839493496ab9e75f6c14a46f",
"assets/assets/json/fos_locale_zh_cn.json": "47e1d102d1a84ad71008bbd3a2ebfc0c",
"assets/assets/json/fos_locale_zh_hk.json": "8016d9733fbc83457fd8965be2c5c24f",
"assets/assets/json/motto.json": "5720753ba7acc4f44fdf44a5aa3fa073",
"assets/assets/json/mwb_locale_en_us.json": "5b66c5006a6eb0301cc658306a93bad7",
"assets/assets/json/mwb_locale_zh_cn.json": "8582abe4dfe2cb492234808c0e755d38",
"assets/assets/json/mwb_locale_zh_hk.json": "f80721d7b8c2abec04d0b5fd485cde63",
"assets/assets/json/phone_number.json": "964f0438ae47321e38923ea83d08b4ef",
"assets/assets/md/fos_order_rule.md": "049db15002f65b7017597d6a482c3043",
"assets/assets/md/sample.md": "09f9bb49b2651cfbde124e654bce1209",
"assets/assets/png/32af1c45": "81abe832ddfc0eccb7d369c5aa3693f4",
"assets/assets/png/3547ec2": "81abe832ddfc0eccb7d369c5aa3693f4",
"assets/assets/png/3ba8e1ce": "007cedfa7f1fa35f4ef1f00bc0278018",
"assets/assets/png/60357f9d": "6b32750a9f43f7543ea1db3e319503a6",
"assets/assets/png/63d1d3d7": "0837036a2fd701eec701a9db6166f1c9",
"assets/assets/png/69eb32f4": "007cedfa7f1fa35f4ef1f00bc0278018",
"assets/assets/png/71b1f5c2": "6b32750a9f43f7543ea1db3e319503a6",
"assets/assets/png/864fbd": "6b32750a9f43f7543ea1db3e319503a6",
"assets/assets/png/9d1702fc": "81abe832ddfc0eccb7d369c5aa3693f4",
"assets/assets/png/c41200fb": "0837036a2fd701eec701a9db6166f1c9",
"assets/assets/png/c5d4ec21": "0837036a2fd701eec701a9db6166f1c9",
"assets/assets/png/c81fdf2c": "81abe832ddfc0eccb7d369c5aa3693f4",
"assets/assets/png/cb499599": "6b32750a9f43f7543ea1db3e319503a6",
"assets/assets/png/f240dd63": "0837036a2fd701eec701a9db6166f1c9",
"assets/assets/png/fos_logo.png": "007cedfa7f1fa35f4ef1f00bc0278018",
"assets/assets/png/mwb_favicon_0.png": "6b32750a9f43f7543ea1db3e319503a6",
"assets/assets/png/mwb_favicon_1.png": "0837036a2fd701eec701a9db6166f1c9",
"assets/assets/png/no_image.png": "81abe832ddfc0eccb7d369c5aa3693f4",
"assets/FontManifest.json": "97c2528ecc2fbf4093965257fdba1854",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/node_modules/jsqr/dist/jsQR.js": "24a9f1fe8467e1578412b8764bac9d84",
"assets/NOTICES": "6830ca577ce96c6e1c55073aff07fa2b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b93248a553f9e8bc17f1065929d5934b",
"assets/packages/font_awesome_flutter/lib/fonts/Font%2520Awesome%25207%2520Brands-Regular-400.otf": "440da663f17184f21f007a3a2bf60f69",
"assets/packages/font_awesome_flutter/lib/fonts/Font%2520Awesome%25207%2520Free-Regular-400.otf": "df86a1976d76bd04cf3fcaf5add2dd0f",
"assets/packages/font_awesome_flutter/lib/fonts/Font%2520Awesome%25207%2520Free-Solid-900.otf": "e151d7a6f42f17e9ea335c91d07b3739",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "36e5e860173b05bcb074152a7beee4a0",
"canvaskit/canvaskit.wasm": "989996637efe372016fa18c627f5c6e9",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "b828e7b064d7fdf14fd4722a7743b5d4",
"canvaskit/chromium/canvaskit.wasm": "567c0835df12ce9e7dd9a9dec6ba7009",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "7253dc992ccad7e3bf5b765f0112f737",
"canvaskit/skwasm.wasm": "579b9679cca9de279aaf133f81abf1de",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "9513c4c9560e5f92b2ecfb6336095a15",
"canvaskit/skwasm_heavy.wasm": "7bec619779a37a51e34f7761aec99e27",
"deploy.html": "a5cf6500e2c3857b3fb785e06e770d1b",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "35408b1be0f5de68cc5d1c5175d717ed",
"flutter_bootstrap.js": "305ec44f154ea650683de754effdafd2",
"icons/26a375a7": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/33a6018a": "96e752610906ba2a93c65f8abe1645f1",
"icons/6311f9e7": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/a061278e": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "328b6766b986cde6e21cd4efbb0277f0",
"/": "328b6766b986cde6e21cd4efbb0277f0",
"main.dart.js": "a41aab99e8ff382c14c36b621a7a7fc8",
"main.dart.mjs": "a7e16a134b94ab0e0d77f9663fd87857",
"main.dart.wasm": "6c02876cf783f5d6da8610de5fe513eb",
"manifest.json": "ba5c7f54abd807b20aa52b239bb3adb5",
"version.json": "9692e6a2dac4ad01af0fd4a3db0756bd"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
