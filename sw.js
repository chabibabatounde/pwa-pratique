console.log("hello depuis le service worker");

	
self.addEventListener('install', (evt) => {
    console.log(`sw installé à ${new Date().toLocaleTimeString()}`); 
    const cacheName = 'veille-techno' + '1.2';
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
    evt.respondWith(
        // on doit d'abord faire une requête sur le réseau de ce qui a été intercepté
        fetch(evt.request).then(res => {
            console.log("url récupérée depuis le réseau", evt.request.url);
            // mettre dans le cache le résultat de cette réponse : en clef la requête et en valeur la réponse
            caches.open(cacheName).then(cache => cache.put(evt.request, res));
            // quand on a la réponse on la retourne (clone car on ne peut la lire qu'une fois)
            return res.clone();
        })
        // Si on a une erreur et que l'on arrive pas à récupérer depuis le réseau, on va chercher dans le cache
        .catch(err => {
            console.log("url récupérée depuis le cache", evt.request.url);
            return caches.match(evt.request);
        })
    );
});

