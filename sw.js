console.log("hello depuis le service worker");

	
self.addEventListener('install', (evt) => {
    console.log(`sw installé à ${new Date().toLocaleTimeString()}`); 
    let cacheName = 'veille-techno-1.0'; 
    const cachePromise = caches.open(cacheName).then(cache => {
        return cache.addAll([
            'index.html',
            'main.js',
            'style.css',
            'vendors/bootstrap4.min.css',
            'add_techno.html',
            'add_techno.js',
            'contact.html',
            'contact.js',
        ])
        .then(console.log('cache initialisé'))
    });
    evt.waitUntil(cachePromise);
});
 
self.addEventListener('activate', (evt) => {
    console.log(`sw activé à ${new Date().toLocaleTimeString()}`);    
});

/*
self.addEventListener('fetch', (evt) => {
    console.log('sw intercepte la requête suivante via fetch', evt);
    console.log('url interceptée', evt.request.url);
});
*/

self.addEventListener('fetch', (evt) => {
    console.log('FFFF')
    /*if(!navigator.onLine) {
        const headers = { headers: { 'Content-Type': 'text/html;charset=utf-8'} };
        evt.respondWith(new Response('<h1>+Pas de connexion internet</h1><div>Application en mode dégradé. Veuillez vous connecter</div>', headers));
    }*/

    console.log('sw intercepte la requête suivante via fetch', evt);
    console.log('url interceptée', evt.request.url);


    evt.respondWith(
        caches.match(evt.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(evt.request);
            })
    );
});

