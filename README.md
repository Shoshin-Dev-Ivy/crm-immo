# Mini CRM Immobilier

Application full-stack en cours de développement, simulant un CRM pour la gestion de biens immobiliers et de prospects.

---

## 🧱 Stack technique

- Backend : PHP 8 – Symfony (en cours d'initialisation)
- Frontend : Angular (structure initialisée)
- Base de données : PostgreSQL + PostGIS
- Conteneurisation : Docker
- Serveur web : Nginx
- Versionning : Git

---

## ⚙️ Architecture (en place)

- api : environnement Symfony en cours de mise en place
- frontend : application Angular initialisée
- db : PostgreSQL + PostGIS opérationnel
- reverse-proxy : Nginx configuré via Docker
- infrastructure : Docker Compose

---

## 🚀 Lancement du projet

```bash
docker compose up -d --build
```

---

## 🌐 Accès

- Frontend : http://localhost:4200  
- API : http://localhost:8000  
- Base de données : PostgreSQL (via container Docker)

---

## 📊 État actuel du projet

- Infrastructure Docker (Nginx, PHP, PostgreSQL + PostGIS) opérationnelle
- Environnement Symfony en cours de configuration
- Structure Angular initialisée
- Connexion inter-services en préparation

---

## 📌 Objectif

Projet réalisé dans le cadre d’une préparation à un poste de développeur full-stack dans un environnement :

- Open Source  
- orienté microservices  
- avec forte exigence sur la qualité et la maintenabilité  

Projet aligné avec une stack proche production (Symfony, Angular, PostGIS, Docker).

---

## 🔧 Prochaines étapes

- Mise en place API Symfony (structure REST)
- Création des premières entités métier (biens, clients)
- Début intégration Angular ↔ API
- Mise en place des premiers endpoints fonctionnels
- Ajout de tests backend  