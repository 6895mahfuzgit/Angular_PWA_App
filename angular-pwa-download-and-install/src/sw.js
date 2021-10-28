
const VERSION = 'v11';


log('Installing ServiceWorker');


self.addEventListener('install', event => event.waitUntil(installServiceWorker()));

/*

    These are the files that we want to download and install on the background

        '/',
        '/polyfills.bundle.js',
        '/inline.bundle.js',
        '/styles.bundle.js',
        '/vendor.bundle.js',
        '/main.bundle.js',
        '/assets/bundle.css',
        '/assets/angular-pwa-course.png',
        '/assets/main-page-logo-small-hat.png'
*/

async function installServiceWorker() {

    log("Service Worker installation started ");

    const cache = await caches.open(getCacheVersion());

    return cache.addAll(
        [
            '/',
            '/polyfills.js',
            '/styles.js',
            '/vendor.js',
            '/runtime.js',
            '/main.js',
            '/favicon.ico',
            '/assets/bundle.css',
            '/assets/angular-pwa-course.png',
            '/assets/main-page-logo-small-hat.png',
            '/api/lessons'
        ]
    );
}

self.addEventListener('activate', () => {

    log('Service Worker activated');
});

self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));

async function cacheThenNetwork(event) {
    const cache = await caches.open(getCacheVersion());
    const cacheResponse = await cache.match(event.request);

    if (cacheResponse) {
        log('from cache :'+ event.request.url);
        return cacheResponse;
    }

    const networkResponse = await fetch(event.request);
    log('Calling Network :'+ event.request.url);
    return networkResponse;

}

function getCacheVersion() {
    return "app-cache-" + VERSION;
}








function log(message, ...data) {
    if (data.length > 0) {
        console.log(VERSION, message, data);
    }
    else {
        console.log(VERSION, message);
    }
}

















