# CRM Immobilier – Symfony & Angular

<p align="center">

![Symfony](https://img.shields.io/badge/Symfony-7.4-000000?style=for-the-badge&logo=symfony)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana)

</p>

Application CRM immobilier full-stack développée dans une logique proche production.

Le projet simule un environnement métier réel :
gestion de prospects, authentification sécurisée, protection des accès, dashboard métier, architecture API découplée et monitoring complet.

---

## Fonctionnalités implémentées

### Backend Symfony API
- API REST Symfony 7.4 + API Platform 4.3
- Authentification JWT (LexikJWTAuthenticationBundle)
- Sécurisation des endpoints
- Gestion des rôles (`ROLE_ADMIN`, `ROLE_USER`)
- Voters Symfony pour contrôle d'accès métier (owner/admin)
- Relations utilisateurs ↔ leads
- Architecture orientée services + event-driven
- Event system : `LeadCreatedEvent` dispatché après chaque création de lead

### Frontend Angular
- Application Angular standalone
- Login sécurisé connecté à l'API
- Gestion centralisée du JWT
- HTTP Interceptor
- Route Guards (auth + rôles)
- Dashboard protégé
- Gestion d'état utilisateur
- UX orientée CRM immobilier

### Dashboard CRM
- Affichage des leads récents
- KPIs métier
- Pipeline visuel
- Statuts colorés
- Cartes statistiques
- Interface responsive

### Monitoring (production-ready)
- Métriques Prometheus exposées sur `/metrics`
  - `crm_leads_total` — nombre de leads créés (via event)
  - `crm_api_requests_total` — requêtes par méthode/route/status
  - `crm_api_request_duration_seconds` — latence par route (histogram)
- SLO/SLI :
  - Disponibilité — objectif 99.5% de requêtes non-5xx
  - Latence — objectif 95% de requêtes sous 500ms
- Alerting Alertmanager :
  - Routing par severity : `critical` → Slack, `warning` → Slack + Email
  - Anti-fatigue : grouping, repeat_interval, inhibition sur `CRMAPIDown`
- Dashboard Grafana provisionné (9 panels) :
  - KPIs : leads total, req/s, taux d'erreur 5xx, latence p99
  - Timeseries : trafic par route, répartition statuts HTTP, latence p50/p95/p99
  - Gauges SLO : disponibilité et latence

---

## Stack technique

### Backend
- PHP 8.3
- Symfony 7.4
- API Platform 4.3
- JWT Authentication
- PostgreSQL 16
- PostGIS 3.4
- promphp/prometheus_client_php (stockage APCu)

### Frontend
- Angular (standalone, RxJS, TypeScript)

### Infrastructure
- Docker + Docker Compose
- Nginx 1.27
- Prometheus
- Alertmanager
- Grafana 11.4

### Outils
- Git / GitHub
- Composer
- npm

---

## Architecture du projet

```txt
crm-immo/
├── backend/
│   ├── src/
│   │   ├── Controller/       → HealthController, MetricsController
│   │   ├── DataFixtures/     → AppFixtures (users de dev)
│   │   ├── Entity/           → Lead, User
│   │   ├── Event/            → LeadCreatedEvent
│   │   ├── EventSubscriber/  → MetricsSubscriber
│   │   ├── Service/          → MetricsRegistry
│   │   ├── State/            → LeadProcessor, LeadCollectionProvider
│   │   └── Security/         → LeadVoter
│   ├── alertmanager/
│   │   ├── alertmanager.yml          → config réelle (non versionnée)
│   │   └── alertmanager.yml.example  → template sans secrets
│   └── docker/prometheus/
│       ├── prometheus.yml
│       └── alert-rules.yml
├── frontend/     → Application Angular
├── docker/
│   ├── nginx/
│   └── grafana/
│       └── provisioning/
│           ├── datasources/  → prometheus.yml
│           └── dashboards/   → crm.yml, crm-dashboard.json
└── docker-compose.yml
```

---

## Sécurité implémentée

### Authentification
- Login JWT sécurisé
- Token Bearer
- Interceptor Angular
- Routes protégées

### Autorisations
- Voters Symfony
- Contrôle d'accès par propriétaire
- Gestion des rôles
- Protection des endpoints sensibles

---

## Lancement du projet

### Prérequis
- Docker + Docker Compose
- Node.js / npm (pour le frontend)

### Configuration secrets Alertmanager
Copier le template et renseigner les credentials :
```bash
cp backend/alertmanager/alertmanager.yml.example backend/alertmanager/alertmanager.yml
```
Renseigner les credentials personnels dans `alertmanager.yml` avant de lancer.

### Démarrage
```bash
# Backend + infrastructure
docker compose up -d

# Charger les données de développement
docker exec crm-immo-php-1 php bin/console doctrine:fixtures:load --no-interaction

# Frontend
cd frontend && ng serve
```

---

## Accès

| Service | URL | Credentials |
|---|---|---|
| Frontend Angular | http://localhost:4200 | voir comptes de développement |
| API Symfony | http://localhost:8080 | JWT |
| Prometheus | http://localhost:9090 | — |
| Alertmanager | http://localhost:9093 | — |
| Grafana | http://localhost:3000 | admin / (défini au premier login) |
| PostgreSQL | localhost:5433 | crm / crm |

---

## Comptes de développement

| Rôle | Email | Mot de passe |
|---|---|---|
| Admin | admin@example.com | password |
| User | user@example.com | password |

> Ces comptes sont créés automatiquement via les fixtures Doctrine (`doctrine:fixtures:load`).
> Ne jamais utiliser ces credentials en production.

---

## Progression du projet

- ✅ Infrastructure Docker
- ✅ API Symfony + API Platform
- ✅ Authentification JWT
- ✅ Sécurisation endpoints + Voters
- ✅ Event-driven architecture (LeadCreatedEvent)
- ✅ Guards & Interceptors Angular
- ✅ Dashboard CRM Angular
- ✅ Fixtures Doctrine (users de dev)
- ✅ Métriques Prometheus (counter, histogram)
- ✅ SLO/SLI (disponibilité 99.5%, latence 95% < 500ms)
- ✅ Alertmanager (routing, anti-fatigue, inhibition)
- ✅ Dashboard Grafana provisionné (9 panels)

---

## Roadmap

### Backend
- CRUD complet des leads
- Gestion des biens immobiliers
- Pagination / filtres
- Validation avancée
- Tests automatisés

### Frontend
- Gestion complète des leads
- Formulaires dynamiques
- Pipeline Kanban
- Recherche et filtres
- Responsive mobile avancé

### DevOps
- CI/CD
- Logs centralisés
- Environnement staging

---

## Objectif du projet

Ce projet sert de démonstration de compétences full-stack dans un environnement proche production :

- architecture API moderne (Symfony + API Platform)
- sécurisation applicative (JWT, Voters, Guards)
- Angular + Symfony découplés
- logique métier CRM immobilier
- event-driven architecture
- monitoring production-ready (Prometheus, Alertmanager, Grafana)
- bonnes pratiques de développement

---

## Repository GitHub

https://github.com/Shoshin-Dev-Ivy/crm-immo