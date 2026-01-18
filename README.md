# Localloop

**Localloop** est une application web de **parcours de découverte participatifs**.

Les utilisateurs peuvent créer leurs propres parcours composés d’étapes, découvrir ceux proposés par la communauté et sauvegarder leurs favoris.
L’objectif est de favoriser la **découverte** et l’**échange d’expériences** autour des lieux et des monuments locaux.

---

## Table des matières
- [Technologies](#technologies)
- [Variables d'environnement](#variables-denvironnement)
- [Installation et lancement](#installation-et-lancement)
- [Fonctionnalités](#fonctionnalités)
- [Structure du projet](#structure-du-projet)
- [Spécifications de l'API REST](#spécifications-de-lapi-rest)
- [Fonctionnement général](#fonctionnement-général)

---

## Technologies

- **Frontend :** React, React Router, Zustand, Leaflet, Lucide Icons
- **Backend :** Node.js, Express, PostgreSQL, Prisma, JWT
- **UI / Styles :** modules CSS


  Ce frontend consomme une API développée dans un repository backend séparé, disponible à ce lien :

  ```bash
   https://github.com/sophie-rud/localloop-backend.git
   ```

---

## Variables d'environnement

VITE_API_BASE_URL=http://localhost:<PORT>  
VITE_API_URL=http://localhost:<PORT>/api

Remplacer `<PORT>` par le port sur lequel le backend est lancé (3000 par défaut).


- VITE_API_URL : pour les requêtes vers le backend avec /api
- VITE_API_BASE_URL : pour les requêtes sans préfixe /api

---

## Installation et lancement

Cloner le projet :

```bash
git clone https://github.com/sophie-rud/localloop-app.git
```
Entrer dans le dossier
```bash
cd localloop-app
```

Installer les dépendances :
```bash
npm install
```

Lancer le frontend :
```bash
npm run dev
```
Le site sera accessible sur http://localhost:5173 (ou sur le port indiqué par le terminal)

### Authentification :

Les utilisateurs peuvent créer un compte et se connecter via un formulaire d’authentification.

L’accès à certaines fonctionnalités dépend du rôle de l’utilisateur :
- **Utilisateur** : accès aux fonctionnalités standard (consultation et publication de parcours)
- **Administrateur** : accès aux fonctionnalités d’administration

Fonctionnalité “mot de passe oublié” avec envoi d’un email de réinitialisation sécurisé.

L’authentification est gérée côté backend via des tokens JWT.

---

## Fonctionnalités

### Pour les visiteurs
- Explorer les parcours créés par la communauté (liste des parcours et carte).
- Consulter les détails et les étapes d'un parcours.

### Pour les utilisateurs
- Explorer les parcours créés par la communauté.
- Créer, consulter et sauvegarder des parcours.
- Ajouter, modifier des étapes à un de ses parcours, avec texte, photos, informations pratiques, localisation...
- Gérer ses parcours favoris et son profil.

### Pour l’admin
- Visualiser et gérer tous les parcours créés par les utilisateurs.
- Consulter des dashboards des utilisateurs, des lieux et des parcours.
- Ajouter, modifier ou supprimer des parcours, des lieux et des utilisateurs.
- Les admins sont les seuls gestionnaires des lieux (points géographique précis) sur lesquels se basent les étapes.

---

## Structure du projet

```bash
src/
  ├─ assets/       # Ressources statiques (images, icônes, etc.)
  ├─ contexts/     # Contextes React (authentification)
  ├─ components/   # Composants réutilisables
  ├─ hooks/        # Hooks personnalisés
  ├─ layouts/      # Layouts généraux de l’application
  ├─ pages/        # Pages React correspondant aux routes
  ├─ routes/       # Configuration du router
  ├─ services/     # Méthodes pour les appels API
  ├─ stores/       # Stores Zustand
  ├─ styles/       # Variables CSS
  ├─ utils/        # Fonctions utilitaires
  └─ App.jsx       # Point d’entrée de l’application
```

 ---

## Spécifications de l'API REST

La documentation complète de l’API se trouve dans le repository, dans le fichier **spec_api.md**.

---

## Fonctionnement général

- Les utilisateurs explorent et créent des **parcours de découverte**, composés d’une série d’étapes.


- Un **parcours** peut contenir :
    - Une photo et une présentation
    - Informations pratiques : durée, distance, difficulté
    - Un thème
    - Plusieurs étapes, chacune avec : texte (conseils, anecdotes), photo et ordre dans le parcours


- Chaque **étape** est toujours liée à un **lieu**, centralisant les informations géographiques et descriptives.
    - Les **lieux sont gérés par les administrateurs** ; les utilisateurs ne peuvent pas en créer.


- Chaque utilisateur dispose d’un **espace personnel** pour consulter :
    - Ses parcours créés
    - Les parcours sauvegardés dans ses favoris
    - L’ajout aux favoris est actuellement simulé de manière simplifiée via le store Zustand.
    - Dans une version future avec backend complet, les favoris seront stockés dans une table dédiée pour gérer la relation utilisateur ↔ parcours.


- Les **administrateurs** disposent de dashboards pour superviser :
    - Utilisateurs, parcours et lieux
    - Création, modification et suppression des contenus
    - Consultation de leur profil et de leurs parcours publiés

---
