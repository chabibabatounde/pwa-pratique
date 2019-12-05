console.log('hello depuis main');
const technosDiv = document.querySelector('#technos');
function loadTechnologies(technos) {
    fetch('http://localhost:3001/technos')
        .then(response => {
            response.json()
                .then(technos => {
                    const allTechnos = technos.map(t => `<div><b>${t.name}</b> ${t.description}  <a href="${t.url}">site de ${t.name}</a> </div>`)
                            .join('');
                    technosDiv.innerHTML = allTechnos; 
                });
        })
        .catch(console.error);
}

loadTechnologies(technos);
if(navigator.serviceWorker) {
    navigator.serviceWorker
    .register('sw.js')
    .catch(err => console.error('service worker NON enregistré', err));
}



/*
if(window.Notification && window.Notification !== "denied"){
    // demande une permission
    Notification.requestPermission(perm => {
        console.log(perm);
        // vérifie si la permission est acceptée par l'utilisateur
        if(perm === "granted"){
            // On crée une nouvelle notification
            // 7.2 Option de la notification
            const options = {
                body : "Body de la notification",
                icon : "images/icons/icon-72x72.png"
            }
            // On crée une nouvelle notification
            // 7.2 On passe les options en deuxième argument
            const notif = new Notification("Hello notification", options);
            console.log('notif envoyé');
        }
        else{
            // Notification refusée
            console.log("Notification refusée");
        }
    })
}
*/





















/*
if(window.caches) {
    caches.open('veille-techno-1.0');
    caches.open('other-1.0');
    caches.keys().then(console.log);
}


//..
/*
if(window.caches) {
    caches.open('veille-techno-1.0').then(cache => {
        cache.addAll([
            'index.html',
            'main.js',
            'vendors/bootstrap4.min.css'
        ]);
    });
} 
*/