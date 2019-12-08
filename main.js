console.log('hello depuis main');
const technosDiv = document.querySelector('#technos');

function loadTechnologies(technos) {
    fetch('https://us-central1-pwa-technos-babatounde-c.cloudfunctions.net/getTechnos')
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
        // 8.4 Récupération ou création d'une souscription auprès d'un push service
        .then(registration =>{
            // public vapid key generated with web-push
            const publicKey = "BAqPpl5snI2RR6wkcuSzdvZWGeEqNk4GGJvMWpTqrepaOrEqknEAS5dfcOakn0mSrh7o0PAYv8Urt8GUdCzILvw";
            registration.pushManager.getSubscription().then(subscription => {
                if(subscription){
                    console.log("subscription", subscription);
                    extractKeysFromArrayBuffer(subscription);
                    return subscription;
                }
                else{
                    // ask for a subscription
                    const convertedKey = urlBase64ToUint8Array(publicKey);
                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: convertedKey
                    })
                    .then(newSubscription => {
                        console.log('newSubscription', newSubscription);
                        extractKeysFromArrayBuffer(newSubscription);
                        return newSubscription;
                    })

                }
            })
        })
        .catch(err => console.error('service worker NON enregistré', err));
}

// 8.4 Récupération ou création d'une souscription auprès d'un push service
function extractKeysFromArrayBuffer(subscription){
    // no more keys proprety directly visible on the subscription objet. So you have to use getKey()
    const keyArrayBuffer = subscription.getKey('p256dh');
    const authArrayBuffer = subscription.getKey('auth');
    const p256dh = btoa(String.fromCharCode.apply(null, new Uint8Array(keyArrayBuffer)));
    const auth = btoa(String.fromCharCode.apply(null, new Uint8Array(authArrayBuffer)));

    // 8.5 Envoyer une notification push depuis Node
    console.log('endpoint :');
    console.dir(subscription.endpoint);
    console.log('p256dh key :', p256dh);
    console.log('auth key :', auth);
}






// 8.4 Récupération ou création d'une souscription auprès d'un push service
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


