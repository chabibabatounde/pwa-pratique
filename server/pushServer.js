const webPush = require('web-push');
const pushServerKeys = require('./pushServerKeys.json');
const pushClientSubscription = require('./pushClientSubscription.json');

// console.log(pushServerKeys, pushClientSubscription);

webPush.setVapidDetails('mailto:monemail@domain.com', pushServerKeys.publicKey, pushServerKeys.privateKey);


// TODO retrieve all users subscriptions and send the push notification to every user

// see https://github.com/web-push-libs/web-push for sendNotification API reference sendNotification(pushSubscription, payload, options)
webPush.sendNotification(pushClientSubscription, 'Notification envoyée depuis le serveur push node :)')
        .then(res => console.log('ma push notif a bien été poussée :)', res))
        .catch(err => console.error); 