'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "00fa8f8905e2058e4f44758f3d30ac35",
"assets/AssetManifest.bin.json": "4c17a3c3ded67f2d3463c95616425b33",
"assets/assets/gif/book_fold_0.gif": "2ba8a71de0e7d7c718f2601ca5b3437e",
"assets/assets/gif/book_fold_1.gif": "3a350f84d3d25603dc6739ddd46dfdd2",
"assets/assets/gif/book_fold_2.gif": "b40a815917c7db4f55dd3bc9c79aa0db",
"assets/assets/gif/book_fold_3.gif": "f73eca8a1837959e550cc44f0db67632",
"assets/assets/gif/book_spire.gif": "04919e2a62d6a614276d03336a2c8c9d",
"assets/assets/gif/face_scan_0.gif": "802c000c53063668dc065d36dcc5f5ee",
"assets/assets/gif/face_scan_1.gif": "8ed6b6404244f6873c7f878c53829050",
"assets/assets/gif/ghost_run.gif": "00fc06ed86e975b82f36f5c06b8fe59a",
"assets/assets/html/599df8a9": "9faa9f25eb41f662d7268f0f37a90748",
"assets/assets/html/eea7b08b": "9faa9f25eb41f662d7268f0f37a90748",
"assets/assets/html/fos_order_rule.html": "9faa9f25eb41f662d7268f0f37a90748",
"assets/assets/jpeg/10c7a56": "b68ddaa554ffce230790cb6acb085dcd",
"assets/assets/jpeg/174d8417": "1613ea198bf9681ac5eece5357e0ed92",
"assets/assets/jpeg/232637f7": "bc858d3815e1b94c90f7e588690ffc9d",
"assets/assets/jpeg/25888e60": "47f429d3f561bce4bf50f67b623aaded",
"assets/assets/jpeg/26b7b60a": "f022016aca14f27a69ee5383d97500f1",
"assets/assets/jpeg/28ba1662": "c2bcb6c5e722a35abc504c0439a14ecc",
"assets/assets/jpeg/2f926f95": "89b572f98054c3192aed6be300c388ce",
"assets/assets/jpeg/2fe1fdc1": "86d5e798a1e65f2f460e8cf480aa1043",
"assets/assets/jpeg/333f44e8": "47f429d3f561bce4bf50f67b623aaded",
"assets/assets/jpeg/36d19688": "5f820302c06dc55b135935e4185c0ef1",
"assets/assets/jpeg/38081ea": "1613ea198bf9681ac5eece5357e0ed92",
"assets/assets/jpeg/3843f402": "86cc49437f34d3eef8a2084efccf0ca2",
"assets/assets/jpeg/3d4af0d3": "b68ddaa554ffce230790cb6acb085dcd",
"assets/assets/jpeg/42e203c0": "5f820302c06dc55b135935e4185c0ef1",
"assets/assets/jpeg/4e98a0bd": "0fa267d039c2aa64a5c06516dbd2a507",
"assets/assets/jpeg/503f014b": "1613ea198bf9681ac5eece5357e0ed92",
"assets/assets/jpeg/5374179a": "47f429d3f561bce4bf50f67b623aaded",
"assets/assets/jpeg/553f2488": "0fa267d039c2aa64a5c06516dbd2a507",
"assets/assets/jpeg/577d92b5": "86cc49437f34d3eef8a2084efccf0ca2",
"assets/assets/jpeg/58f36138": "89b572f98054c3192aed6be300c388ce",
"assets/assets/jpeg/59a3abc0": "6b848ae32a1bf9839391c9a6e91905ce",
"assets/assets/jpeg/5bb770b0": "5f820302c06dc55b135935e4185c0ef1",
"assets/assets/jpeg/5df23abc": "a3f42473bd693afe353f15c4c4573064",
"assets/assets/jpeg/610ae38c": "86d5e798a1e65f2f460e8cf480aa1043",
"assets/assets/jpeg/68e7b6bd": "47f429d3f561bce4bf50f67b623aaded",
"assets/assets/jpeg/68f7c89": "6b848ae32a1bf9839391c9a6e91905ce",
"assets/assets/jpeg/79f1e615": "86cc49437f34d3eef8a2084efccf0ca2",
"assets/assets/jpeg/7ff1e402": "c49a3263ad903703e1489bf2c42c86c6",
"assets/assets/jpeg/804ff200": "6b848ae32a1bf9839391c9a6e91905ce",
"assets/assets/jpeg/97b73d79": "e71a64e26072fc1d6aebe56866036045",
"assets/assets/jpeg/a1b3890e": "e725d18cd943fdd636b19dd9df987acc",
"assets/assets/jpeg/a9d1d852": "a66b270483618aa282bcc795381edbf9",
"assets/assets/jpeg/af07dc04": "b68ddaa554ffce230790cb6acb085dcd",
"assets/assets/jpeg/b324e82": "86cc49437f34d3eef8a2084efccf0ca2",
"assets/assets/jpeg/b792f116": "bc858d3815e1b94c90f7e588690ffc9d",
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
"assets/assets/jpeg/bbdf7619": "c49a3263ad903703e1489bf2c42c86c6",
"assets/assets/jpeg/c5aaf8b": "a66b270483618aa282bcc795381edbf9",
"assets/assets/jpeg/c745ee32": "4e1296d6469e316ff7ef409bb9be94b6",
"assets/assets/jpeg/d1795af8": "43f4d8c5e41215c69ef36f5e19c2cbb4",
"assets/assets/jpeg/dfeaba02": "bc858d3815e1b94c90f7e588690ffc9d",
"assets/assets/jpeg/e102b539": "c2bcb6c5e722a35abc504c0439a14ecc",
"assets/assets/jpeg/e122cff7": "5f820302c06dc55b135935e4185c0ef1",
"assets/assets/jpeg/e43709d8": "25b1da52d7caa96d3966c4a3cfabf663",
"assets/assets/jpeg/f1bc0475": "c843ceaff9f8077530dd1759a18ec305",
"assets/assets/jpeg/f20d3067": "c2bcb6c5e722a35abc504c0439a14ecc",
"assets/assets/jpeg/f7bd6ac0": "1613ea198bf9681ac5eece5357e0ed92",
"assets/assets/jpeg/f8e66017": "4e1296d6469e316ff7ef409bb9be94b6",
"assets/assets/jpeg/fe05487d": "25b1da52d7caa96d3966c4a3cfabf663",
"assets/assets/jpeg/ff884dea": "e71a64e26072fc1d6aebe56866036045",
"assets/assets/jpg/kindergarten.jpg": "f0a638031a66bbe549f9289df7d4d1cf",
"assets/assets/json/brs_locale_en_us.json": "79013e1a330fefffdd2426e30105a3dc",
"assets/assets/json/brs_locale_zh_cn.json": "c3c03b603caa056aa8ff6c5d6e475a9f",
"assets/assets/json/brs_locale_zh_hk.json": "97d113a848864fefb9c6c2b9dd8e33fe",
"assets/assets/json/fos_locale_en_us.json": "0847fe1f839493496ab9e75f6c14a46f",
"assets/assets/json/fos_locale_zh_cn.json": "47e1d102d1a84ad71008bbd3a2ebfc0c",
"assets/assets/json/fos_locale_zh_hk.json": "8016d9733fbc83457fd8965be2c5c24f",
"assets/assets/json/mwb_locale_en_us.json": "5b66c5006a6eb0301cc658306a93bad7",
"assets/assets/json/mwb_locale_zh_cn.json": "8582abe4dfe2cb492234808c0e755d38",
"assets/assets/json/mwb_locale_zh_hk.json": "f80721d7b8c2abec04d0b5fd485cde63",
"assets/assets/json/_domain.json": "ab9e0a6f7f6e72105b717744318eba50",
"assets/assets/json/_motto.json": "5720753ba7acc4f44fdf44a5aa3fa073",
"assets/assets/json/_phone_number.json": "964f0438ae47321e38923ea83d08b4ef",
"assets/assets/md/fos_order_rule.md": "049db15002f65b7017597d6a482c3043",
"assets/assets/md/sample.md": "09f9bb49b2651cfbde124e654bce1209",
"assets/assets/png/109c6349": "0837036a2fd701eec701a9db6166f1c9",
"assets/assets/png/2b77b1a1": "6b32750a9f43f7543ea1db3e319503a6",
"assets/assets/png/5946c90b": "007cedfa7f1fa35f4ef1f00bc0278018",
"assets/assets/png/72970c9a": "007cedfa7f1fa35f4ef1f00bc0278018",
"assets/assets/png/9d52c72d": "81abe832ddfc0eccb7d369c5aa3693f4",
"assets/assets/png/ad4c4314": "81abe832ddfc0eccb7d369c5aa3693f4",
"assets/assets/png/f714999e": "007cedfa7f1fa35f4ef1f00bc0278018",
"assets/assets/png/fos_logo.png": "007cedfa7f1fa35f4ef1f00bc0278018",
"assets/assets/png/mwb_favicon_0.png": "6b32750a9f43f7543ea1db3e319503a6",
"assets/assets/png/mwb_favicon_1.png": "0837036a2fd701eec701a9db6166f1c9",
"assets/assets/png/no_image.png": "81abe832ddfc0eccb7d369c5aa3693f4",
"assets/FontManifest.json": "67a28da3784fc091c2f816d615fbf08a",
"assets/fonts/MaterialIcons-Regular.otf": "3f7d3d1ed3adb773c46dc9a8f644eff5",
"assets/node_modules/jsqr/dist/jsQR.js": "24a9f1fe8467e1578412b8764bac9d84",
"assets/NOTICES": "507aa5a857f9f956262dbd98fbffda66",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "e86dd21e2585eb631e361d4ded129d8b",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "bf21cd8fd775a3c59fd53afdee39e0e6",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "a2eb084b706ab40c90610942d98886ec",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "e97f60fce05dbee2031107f8e966d63c",
"canvaskit/canvaskit.wasm": "206ac6c289d6c797c1b1709e386a2ad4",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "f7429ceb475d3715f725c985bfcb0acc",
"canvaskit/chromium/canvaskit.wasm": "3211f6fd579794063d713e5e85a055bc",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0db1b855a22db2aae0690fe28ea70b2b",
"canvaskit/skwasm.wasm": "963603a581c2e77ba5f9ac306c1fd02f",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "0875c91c6f721c29785312abd87166e4",
"canvaskit/skwasm_heavy.wasm": "b08a880f1366734f5bc0e122273cbe16",
"deploy.html": "a5cf6500e2c3857b3fb785e06e770d1b",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "e883279e32cd80373703ccd7ee4afa57",
"icons/36da3aa": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/6428ddc5": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/dd24849c": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "328b6766b986cde6e21cd4efbb0277f0",
"/": "328b6766b986cde6e21cd4efbb0277f0",
"main.dart.js": "90f514144f6e22f3cb6044ee5afaab35",
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
