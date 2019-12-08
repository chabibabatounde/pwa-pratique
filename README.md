# cours-pwa-pratique

# Partie 1 : Commencer le projet et l'ouvrir sur le serveur local

1. Github nouveau projet, copier coller, html, js, css

2. Installer Live Server : 
https://www.npmjs.com/package/live-server
``npm -g install live-server``

Plutôt que afficher explorateur : vrai server local avec une ligne de commande cf package.json : live-server --port=3000

3. Faire fichier package.json pour utiliser les commandes : 
Nouveau terminal pour laisser l'ancien tourner
``npm init -y``
(y pour accepter chaque option par défaut)

4. ajouter la commande dans npm script: 
``"start": "live-server --port=3000",``
Sur le premier terminal (coupe l'ancien)
``npm run start``


# Partie 2 : API Rest

1. Installer json server : https://www.npmjs.com/package/json-server
Permet d'avoir en une ligne de commande une api
``npm install -g json-server``

2. Créer un fichier db.json avec le code db.json
Remarquez les guillemets doubles pour les clefs pour le bon formatage

3. Json server : 
``json-server --watch db.json`` que l'on ajoute dans notre package.json dans "script"
On lance sur le port 3001 car on utilise déjà le port 3000
``"jsonserver": "json-server -p 3001 --watch db.json"``
On execute ``npm run jsonserver`` dans un nouveau terminal

4. Accès aux données : on peut se rendre à l'url pour visualiser comme pour une api : http://localhost:3001/technos

5. Copier - Coller le main.js pour récuéperer les datas directement via l'api
Visualiser les requêtes dans network de la console


# Partie 3 : Service worker

1. Explicatif du SW : intermédiaire entre une page front et un serveur
2. Cycle de vie. Installer le SW
3. Ajout des événements du SW


# Partie 4 : Gestion du cache

1. Détection de l'état de connexion
2. Création d'un cache
3. Ajouter des fichiers en cache
4. Gestion du cache par le SW
5. Revue du code des fichiers ajoutés
6. Ajout d'une techno
7. Récupérer les réponses depuis le cache


# Partie 5 : Gestion du cache avancée

1. Stratégie de récupération en cache, puis réseau si le contenu n'est pas en cache
2. Suite
3. Stratégie de récupération sur le réseau puis en cache si réseau non accessible
4. Supprimer les anciennes instances de cache


# Partie 6 : Rendre application web installable

1. Création du fichier manifest.json


# Partie 7 : Notifications

1. Notifications non persistantes (depuis main.js)
2. Options des notifications
3. Notifications persistantes (envoyées depuis le service worker)
4. Options de notifications grâce aux actions
5. Fermer programmatiquement une notification


# Partie 8 : Notifications Push

1. Intercepter une notification push et afficher son contenu dans une notification
2. Architecture
3. Génération de vapid keys
4. Récupération ou création d'une souscription auprès d'un push service
5. Envoyer une notification push depuis Node


# Partie 9 : Background Sync