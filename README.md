<div align="center">
  <h1>🛡️ SecuScan AppWeb</h1>
  <p><strong>Scanner de sécurité web — analyse YARA, secrets exposés et fichiers PE via interface moderne.</strong></p>

  ![Version](https://img.shields.io/badge/version-1.0.0-blue)
  ![Stack](https://img.shields.io/badge/stack-Rust%20%2B%20Axum%20%2B%20Vue%203-purple)
  ![Platform](https://img.shields.io/badge/platform-Web%20%2F%20Docker-informational)
  ![Prod](https://img.shields.io/badge/prod-secuscan--app.heiphaistos.org-brightgreen)
  ![License](https://img.shields.io/badge/licence-MIT-green)
</div>

---

## 📋 Description

SecuScan AppWeb est la version web de l'outil SecuScan. Il permet d'analyser des fichiers via un navigateur : détection de règles YARA, repérage de secrets en clair, analyse des headers PE Windows, et export de rapports détaillés. L'API backend est écrite en Rust/Axum pour des performances maximales.

**URL de production** : [https://secuscan-app.heiphaistos.org](https://secuscan-app.heiphaistos.org)

---

## 📺 Démonstration

<video src="https://media.heiphaistos.org/videos/secuscan.mp4" controls width="100%" preload="none"></video>

---

## ✨ Fonctionnalités

- **Scan YARA** : application de règles personnalisées sur les fichiers uploadés
- **Détection de secrets** : repérage de clés API, tokens, mots de passe en clair
- **Analyse PE** : parsing des headers de fichiers Windows (sections, imports, exports, entrypoint)
- **Rapports exportables** : génération de rapports HTML et TXT téléchargeables
- **Interface Vue 3 moderne** : upload drag & drop, résultats en temps réel
- **API REST performante** : backend Rust/Axum avec validation stricte des inputs
- **Authentification** : routes protégées, rate limiting sur les endpoints sensibles

---

## 🛠️ Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | Vue 3 + TypeScript + Vite |
| Backend | Rust + Axum |
| Analyse | YARA-rust, goblin (PE parsing) |
| Base de données | SQLite (sqlx) |
| Conteneurisation | Docker + Docker Compose |
| Reverse proxy | nginx (VPS) |
| Process manager | PM2 (port 3005) |

---

## 🚀 Installation & Déploiement

### Prérequis

- Docker + Docker Compose
- Node.js 18+ (développement frontend)
- Rust stable (développement backend)

### Démarrage rapide (Docker)

```bash
# Cloner le dépôt
git clone https://mydepot.heiphaistos.org/Heiphaistos/SecuScan-AppWeb.git
cd SecuScan-AppWeb

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env : JWT_SECRET, ALLOWED_ORIGINS, MAX_FILE_SIZE

# Lancer les conteneurs
docker compose up -d

# Vérifier le statut
docker compose ps
```

### Développement local

```bash
# Backend Rust
cd backend
cargo run

# Frontend Vue 3 (dans un autre terminal)
cd frontend
npm install
npm run dev
```

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `JWT_SECRET` | Secret de signature JWT (min. 32 chars) | `changeme_prod_secret` |
| `ALLOWED_ORIGINS` | CORS whitelist | `https://secuscan-app.heiphaistos.org` |
| `MAX_FILE_SIZE` | Taille max upload (bytes) | `10485760` |
| `PORT` | Port d'écoute backend | `3005` |
| `DATABASE_URL` | Chemin SQLite | `./data/secuscan.db` |

---

## 📂 Architecture

```
SecuScan-AppWeb/
├── backend/
│   ├── src/
│   │   ├── main.rs            # Entrée Axum, routes
│   │   ├── handlers/
│   │   │   ├── scan.rs        # Upload + analyse
│   │   │   └── report.rs      # Export HTML/TXT
│   │   ├── services/
│   │   │   ├── yara.rs        # Moteur YARA
│   │   │   ├── secrets.rs     # Détection secrets
│   │   │   └── pe_parser.rs   # Analyse PE
│   │   └── middleware/
│   │       ├── auth.rs        # JWT middleware
│   │       └── rate_limit.rs  # Tower governor
│   └── Cargo.toml
├── frontend/
│   ├── src/
│   │   ├── components/        # Composants Vue 3
│   │   ├── views/             # Pages principales
│   │   └── api/               # Appels API typés
│   └── package.json
├── docker-compose.yml
├── .env.example
└── nginx/
    └── secuscan.conf          # Config reverse proxy
```

---

## 🔒 Sécurité

- Validation MIME + extension + taille sur chaque upload (serveur, jamais client seul)
- Rate limiting via `tower_governor` (Axum)
- JWT avec expiration courte + token_version (logout propre)
- Aucune stack trace exposée dans les réponses d'erreur
- CORS restreint à l'origine de production
- Healthcheck Docker sur `127.0.0.1` (pas `localhost`)

---

## 📝 Licence

MIT — © 2026 Heiphaistos
