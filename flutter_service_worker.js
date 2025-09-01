'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "553d716d7fa1edaaf012d00a67586eb8",
"assets/AssetManifest.bin.json": "a555b092e54266bdc266bf298dd7f8c2",
"assets/assets/gif/book_fold_0.gif": "2ba8a71de0e7d7c718f2601ca5b3437e",
"assets/assets/gif/book_fold_1.gif": "3a350f84d3d25603dc6739ddd46dfdd2",
"assets/assets/gif/book_fold_2.gif": "b40a815917c7db4f55dd3bc9c79aa0db",
"assets/assets/gif/book_fold_3.gif": "f73eca8a1837959e550cc44f0db67632",
"assets/assets/gif/book_spire.gif": "04919e2a62d6a614276d03336a2c8c9d",
"assets/assets/gif/face_scan_0.gif": "802c000c53063668dc065d36dcc5f5ee",
"assets/assets/gif/face_scan_1.gif": "8ed6b6404244f6873c7f878c53829050",
"assets/assets/gif/ghost_run.gif": "00fc06ed86e975b82f36f5c06b8fe59a",
"assets/assets/html/fos_order_rule.html": "9faa9f25eb41f662d7268f0f37a90748",
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
"assets/assets/jpg/kindergarten.jpg": "f0a638031a66bbe549f9289df7d4d1cf",
"assets/assets/json/brs_locale_en_us.json": "79013e1a330fefffdd2426e30105a3dc",
"assets/assets/json/brs_locale_zh_cn.json": "c3c03b603caa056aa8ff6c5d6e475a9f",
"assets/assets/json/brs_locale_zh_hk.json": "97d113a848864fefb9c6c2b9dd8e33fe",
"assets/assets/json/domain.json": "ab9e0a6f7f6e72105b717744318eba50",
"assets/assets/json/fos_locale_en_us.json": "0847fe1f839493496ab9e75f6c14a46f",
"assets/assets/json/fos_locale_zh_cn.json": "47e1d102d1a84ad71008bbd3a2ebfc0c",
"assets/assets/json/fos_locale_zh_hk.json": "8016d9733fbc83457fd8965be2c5c24f",
"assets/assets/json/motto.json": "f1a57c6f12641786278d3b384914b691",
"assets/assets/json/mwb_locale_en_us.json": "68910890c0514366190979d3fa2f3198",
"assets/assets/json/mwb_locale_zh_cn.json": "56d864659e1c5f07107c962aac0c2e28",
"assets/assets/json/mwb_locale_zh_hk.json": "725b18de3ff8644c74ad2ffa1efb2a4d",
"assets/assets/json/phone_number.json": "964f0438ae47321e38923ea83d08b4ef",
"assets/assets/md/fos_order_rule.md": "049db15002f65b7017597d6a482c3043",
"assets/assets/md/sample.md": "09f9bb49b2651cfbde124e654bce1209",
"assets/assets/mp3/Keys%2520Of%2520Moon%2520-%2520Blooming%2520Melody.mp3": "461546a8a265206342f0ec6af38cf54c",
"assets/assets/mp3/Keys%2520Of%2520Moon%2520-%2520Enchanted.mp3": "607b5b3ab9b4766ab7c2108aade6cb90",
"assets/assets/mp3/Keys%2520Of%2520Moon%2520-%2520Yugen.mp3": "211768b1a0229dc931855a6cb94a0fc8",
"assets/assets/png/brs_background.png": "a0442d967c81fc8973f2ea6ba0f54375",
"assets/assets/png/fos_logo.png": "007cedfa7f1fa35f4ef1f00bc0278018",
"assets/assets/png/mwb_favicon_0.png": "6b32750a9f43f7543ea1db3e319503a6",
"assets/assets/png/mwb_favicon_1.png": "0837036a2fd701eec701a9db6166f1c9",
"assets/assets/png/no_image.png": "81abe832ddfc0eccb7d369c5aa3693f4",
"assets/assets/wav/brs_background.mp3": "0829304c3d649ad609b457d270f0da75",
"assets/assets/wav/brs_intro.wav": "e7951d554bc49b219881c77dd794f062",
"assets/assets/wav/brs_magic.wav": "05c91842eafda1e94e9e347a359c21f3",
"assets/assets/wav/brs_recommend.wav": "a99a3daedbaca2024781d85ca263734c",
"assets/assets/wav/brs_take_pic.wav": "470b97bb190e04c9eb363be5fdfeb102",
"assets/FontManifest.json": "b70cbe19a78e26eb7a9fa520333ffa1b",
"assets/fonts/MaterialIcons-Regular.otf": "1b97d61bc9c706f10b11b0cb4a03ddc5",
"assets/node_modules/jsqr/dist/jsQR.js": "24a9f1fe8467e1578412b8764bac9d84",
"assets/NOTICES": "10bd540c5c2e7b93b29a3b08f2f15150",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_AMS-Regular.ttf": "657a5353a553777e270827bd1630e467",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Caligraphic-Bold.ttf": "a9c8e437146ef63fcd6fae7cf65ca859",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Caligraphic-Regular.ttf": "7ec92adfa4fe03eb8e9bfb60813df1fa",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Fraktur-Bold.ttf": "46b41c4de7a936d099575185a94855c4",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Fraktur-Regular.ttf": "dede6f2c7dad4402fa205644391b3a94",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Bold.ttf": "9eef86c1f9efa78ab93d41a0551948f7",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-BoldItalic.ttf": "e3c361ea8d1c215805439ce0941a1c8d",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Italic.ttf": "ac3b1882325add4f148f05db8cafd401",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Regular.ttf": "5a5766c715ee765aa1398997643f1589",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Math-BoldItalic.ttf": "946a26954ab7fbd7ea78df07795a6cbc",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Math-Italic.ttf": "a7732ecb5840a15be39e1eda377bc21d",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Bold.ttf": "ad0a28f28f736cf4c121bcb0e719b88a",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Italic.ttf": "d89b80e7bdd57d238eeaa80ed9a1013a",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Regular.ttf": "b5f967ed9e4933f1c3165a12fe3436df",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Script-Regular.ttf": "55d2dcd4778875a53ff09320a85a5296",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size1-Regular.ttf": "1e6a3368d660edc3a2fbbe72edfeaa85",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size2-Regular.ttf": "959972785387fe35f7d47dbfb0385bc4",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size3-Regular.ttf": "e87212c26bb86c21eb028aba2ac53ec3",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size4-Regular.ttf": "85554307b465da7eb785fd3ce52ad282",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Typewriter-Regular.ttf": "87f56927f1ba726ce0591955c8b3b42d",
"assets/packages/font_awesome_flutter/lib/fonts/Font%2520Awesome%25207%2520Brands-Regular-400.otf": "b66a46c1150a91482991e85691044c22",
"assets/packages/font_awesome_flutter/lib/fonts/Font%2520Awesome%25207%2520Free-Regular-400.otf": "a03d7ae50d2d2e00b33d40c6b114c1e9",
"assets/packages/font_awesome_flutter/lib/fonts/Font%2520Awesome%25207%2520Free-Solid-900.otf": "e151d7a6f42f17e9ea335c91d07b3739",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "36e5e860173b05bcb074152a7beee4a0",
"canvaskit/canvaskit.wasm": "660dd55992113b3af9e647ba04137044",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "b828e7b064d7fdf14fd4722a7743b5d4",
"canvaskit/chromium/canvaskit.wasm": "b1061f36b71ba8e477f93f935fe1bbc1",
"canvaskit/skwasm.js": "8ae038d421ed77f6b66e57c12db486a2",
"canvaskit/skwasm.js.symbols": "ba8a8f566587a3f12a3d2302ba355f24",
"canvaskit/skwasm.wasm": "f3947cfec55469e5f430eee72331e834",
"canvaskit/skwasm_heavy.js": "d9ae14b9318b0e0fe1620f53383b35db",
"canvaskit/skwasm_heavy.js.symbols": "95011a87adb41da05bc4ae02a61c8cea",
"canvaskit/skwasm_heavy.wasm": "32c5a01e76ec5ac6cd09f44ec7cb1f01",
"deploy.html": "a5cf6500e2c3857b3fb785e06e770d1b",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "35408b1be0f5de68cc5d1c5175d717ed",
"flutter_bootstrap.js": "48d1db4e419e14c1504be40d36792937",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "328b6766b986cde6e21cd4efbb0277f0",
"/": "328b6766b986cde6e21cd4efbb0277f0",
"main.dart.js": "41d4a9d5a37f5e559e354ddb21172bf9",
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
