/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "beb0592a05bbec7bced11db704a0fa44"
  },
  {
    "url": "assets/css/styles.styles.58b7cb9e.css",
    "revision": "3d6ca50fce45cdc2fa6e1b535c3683b0"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/swagger-ui-screenshot.3b1dc345.png",
    "revision": "3b1dc3457c56a7244129866dc0e07439"
  },
  {
    "url": "assets/js/0.003c3f10.js",
    "revision": "df297aa343068390f8c09b3e8f936e83"
  },
  {
    "url": "assets/js/1.ec4c58d0.js",
    "revision": "3678163009bc46a214ce0e3d821df0ca"
  },
  {
    "url": "assets/js/10.68d6cc42.js",
    "revision": "3585291a3fb7af19a746b32fc6be378d"
  },
  {
    "url": "assets/js/11.724834be.js",
    "revision": "866cd1d7da3b11b07f564788e7b5a6b5"
  },
  {
    "url": "assets/js/12.847ea70b.js",
    "revision": "5270060dc7b9b10cd8e766f92bd888d1"
  },
  {
    "url": "assets/js/13.235d87b0.js",
    "revision": "eed9317dd483c10a47ea6abd54437f4a"
  },
  {
    "url": "assets/js/14.fb90f721.js",
    "revision": "445417175279946744bae18f442805e6"
  },
  {
    "url": "assets/js/2.8925da02.js",
    "revision": "15f9024cb24c1f95f68ba29d7400f4e3"
  },
  {
    "url": "assets/js/3.5808b7df.js",
    "revision": "8dca64a517bd335d92789cbf590376f4"
  },
  {
    "url": "assets/js/4.dc5af875.js",
    "revision": "59091dbd004bda7b0ca07dfbbd2634de"
  },
  {
    "url": "assets/js/5.7f36b3a0.js",
    "revision": "c295ea8e4552e7bd37f244a1b3c2d0dd"
  },
  {
    "url": "assets/js/6.6146b404.js",
    "revision": "8655799b6f998d25699dea677aad309a"
  },
  {
    "url": "assets/js/7.93586b58.js",
    "revision": "f82448e787dc4c6830ca4348b8b3d4d6"
  },
  {
    "url": "assets/js/8.50aac85b.js",
    "revision": "399b7aeb3b1e6b8d426979f0b870dd35"
  },
  {
    "url": "assets/js/9.5211a8be.js",
    "revision": "6229dbc5c07e16edf5b3ccd4aeceb1bb"
  },
  {
    "url": "assets/js/app.9639b8c9.js",
    "revision": "8250f93b83e32c71e3afe4cc6c96be33"
  },
  {
    "url": "assets/js/styles.58b7cb9e.js",
    "revision": "717c53d70df4c43cc4ac268a421107f1"
  },
  {
    "url": "guide/basics/context.html",
    "revision": "e4e4373b54d6c31fc68b5965b7008771"
  },
  {
    "url": "guide/basics/controllers.html",
    "revision": "e9918ba7fee5d1e2b600216151369929"
  },
  {
    "url": "guide/basics/directory-structure.html",
    "revision": "99b5c4f11784e28a605fad7947186d51"
  },
  {
    "url": "guide/basics/openapi-definitions.html",
    "revision": "9bc5bda61dc8c467307f09046287bf95"
  },
  {
    "url": "guide/basics/swagger-ui.html",
    "revision": "fd2afd9b43af37c1c0e9ea80dc732729"
  },
  {
    "url": "guide/database/mongoose.html",
    "revision": "5f624f0fb94f0ea73053d3bfd39f3ea2"
  },
  {
    "url": "guide/graphql/controllers.html",
    "revision": "bcfc5618e7de3593738885075a9bf3ab"
  },
  {
    "url": "guide/graphql/getting-started.html",
    "revision": "d089c9239c63f11e527712819dd4c997"
  },
  {
    "url": "guide/index.html",
    "revision": "cfa0f3d9dbb52767c73571e65ac1a38c"
  },
  {
    "url": "images/basics/swagger-ui/swagger-ui-screenshot.png",
    "revision": "3b1dc3457c56a7244129866dc0e07439"
  },
  {
    "url": "images/logo.svg",
    "revision": "b561eb446e155dc9538426c0b3da01cb"
  },
  {
    "url": "index.html",
    "revision": "7bd4a8bfb3a1f7590349a0159050b19a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})