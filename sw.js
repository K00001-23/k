const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/my-icon.png'
  // ...其他资源文件，你需要根据你的应用实际情况添加
];

// 在安装Service Worker时，预缓存应用的核心资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  console.log('Service Worker installed!');
});

// 激活Service Worker时，清理旧版本的缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME1];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  console.log('Service Worker activated!');
});

// 拦截网络请求，先尝试从缓存中获取资源，如果缓存中没有该资源，再从网络获取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

