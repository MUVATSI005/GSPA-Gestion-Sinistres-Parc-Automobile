# GSPA — Gestion des Sinistres pour Parc Automobile

Application web **front-end pure** (HTML + CSS + JavaScript) permettant de gérer les sinistres d’un parc automobile d’entreprise.

![Licence](https://img.shields.io/badge/licence-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## Fonctionnalités

| Module | Description |
|--------|-------------|
| **Connexion** | Authentification avec 3 rôles (Admin, Gestionnaire, Conducteur) |
| **Tableau de bord** | Statistiques adaptées au rôle connecté |
| **Utilisateurs** | CRUD complet (réservé à l’Administrateur) |
| **Parc automobile** | Gestion des véhicules + assignation de conducteur |
| **Sinistres** | Déclaration, suivi, changement de statut, numérotation auto |

Les données sont stockées localement dans le navigateur (`localStorage`). Aucun serveur n’est requis.

---

## Démonstration rapide

1. Ouvrez le fichier [`index.html`](index.html) dans un navigateur moderne.
2. Connectez-vous avec l’un des comptes ci-dessous :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| **Administrateur** | `admin@parc.local` | `admin123` |
| **Gestionnaire** | `marie.dupont@parc.local` | `gest123` |
| **Conducteur** | `jean.martin@parc.local` | `cond123` |

---

## Structure du projet

```
GSPA-Gestion-Sinistres-Parc-Automobile/
├── index.html              # Page de connexion
├── dashboard.html          # Tableau de bord
├── user.html               # Gestion des utilisateurs
├── auto.html               # Gestion du parc automobile
├── sinistre.html           # Gestion des sinistres
├── css/
│   └── style.css           # Styles modernes & responsive
├── js/
│   └── app.js              # Logique métier + localStorage
├── docs/
│   ├── Document_explicatif_GSPA.pdf   # Documentation complète + UML
│   ├── usecase.png
│   ├── class.png
│   ├── sequence_login.png
│   ├── sequence_claim.png
│   └── activity.png
├── .gitignore
└── README.md
```

---

## Documentation

Un **document explicatif complet** (PDF) est fourni dans le dossier `docs/` :

- Contexte et objectifs du projet
- Acteurs et cas d’utilisation
- Diagrammes UML :
  - Diagramme de cas d’utilisation
  - Diagramme de classes
  - Diagrammes de séquence (connexion & déclaration de sinistre)
  - Diagramme d’activité (cycle de vie d’un sinistre)
- Architecture technique
- Guide de démarrage

📄 [Télécharger le document PDF](docs/Document_explicatif_GSPA.pdf)

---

## Rôles et droits

| Action | Admin | Gestionnaire | Conducteur |
|--------|:-----:|:------------:|:----------:|
| Gérer les utilisateurs | ✅ | ❌ | ❌ |
| Gérer les véhicules | ✅ | ✅ | ❌ |
| Déclarer un sinistre | ✅ | ✅ | ✅ (ses véhicules) |
| Modifier le statut d’un sinistre | ✅ | ✅ | ❌ |
| Voir tous les sinistres | ✅ | ✅ | ❌ (uniquement les siens) |

---

## Technologies

- **HTML5** — structure sémantique
- **CSS3** — variables, Flexbox, Grid, design responsive
- **JavaScript (ES6+)** — logique applicative pure
- **localStorage** — persistance des données côté client

Aucune bibliothèque externe ni framework n’est utilisé.

---

## Installation / Utilisation

```bash
# Cloner le dépôt
git clone https://github.com/MUVATSI005/GSPA-Gestion-Sinistres-Parc-Automobile.git
cd GSPA-Gestion-Sinistres-Parc-Automobile

# Ouvrir simplement index.html dans le navigateur
# (ou servir avec un serveur local si besoin)
python -m http.server 8000
# puis aller sur http://localhost:8000
```

---

## Auteur

**Muvatsi KYAHIMBA MESSAGER**

Projet académique — Gestion des sinistres pour parc automobile

---

## Licence

Ce projet est sous licence MIT. Vous êtes libre de l’utiliser, le modifier et le distribuer.
