Count of Money

General
Run with docker compose
cd T-WEB-700-PAR_12/
docker-compose build
docker-compose up
api should be running on port 5000 and client should be running on port 3000

Work in development
Run API in development env
cd T-WEB-700-PAR_12/
cd api/
npm run serve

Run API in development env
cd T-WEB-700-PAR_12/
cd client/
npm run start

Documentation technique - Backend

Introduction
Cette documentation technique a pour but de fournir une vue d'ensemble du backend de notre application, ainsi que de décrire les différentes technologies utilisées et le fonctionnement de l'application.

Architecture de l'application WEB
Pour construire cette application nous avons utlisé MERN stack (MongoDB, Express, React JS, NodeJS)
Web Application Architecture

BACK-END
Technologies utilisées
1- RESTful API réalisé avec Node JS + Express + Mongoose

2 - Base de donnée NoSQL -> MongoDB

NodeJS : JavaScript qui nous permet d'utiliser JavaScript en dehors du navigateur pour construire le serveur.

Express : Cadre NodeJS qui nous permet de construire Restful API de manière plus efficace.

MongoDB : Les bases de données NoSQL MongoDB sont basées sur des documents plutôt que sur des tableaux. Les données sont pensées en termes d'objets au lieu de lignes et de colonnes.

Mongoose : paquet pour travailler avec MongoDB dans une application NodeJS.

Fonctions principales
Utilisateur anonyme
Données de marché en temps réel
Dernières nouvelles sur les crypto-monnaies
Utilisateur authentifié
Données de marché en temps réel
Choisissez vos préférences en matière de données de marché
Dernières nouvelles sur les crypto-monnaies
Permettre aux utilisateurs de naviguer à partir de diverses catégories de nouvelles (mots clés)
L'utilisateur peut gérer et sauvegarder ses préférences
Admin
Peut définir les préférences globales en matière de données de marché pour tous les utilisateurs.
Peut configurer le flux RSS pour les nouvelles
