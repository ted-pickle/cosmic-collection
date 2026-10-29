// 오프라인에서도 앱이 열리게 해 주는 파일이에요. 고치지 않아도 돼요.
// 인터넷이 되면 항상 최신 버전을 받아 오고, 인터넷이 없으면 저장해 둔 버전을 보여 줘요.
const CACHE = 'app-cache-v1';

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('./')))
  );
});
