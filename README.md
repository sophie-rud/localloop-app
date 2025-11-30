# Localloop

**Localloop** est une application web de **parcours de découverte participatifs**.

Les utilisateurs peuvent créer leurs propres parcours composés d’étapes, découvrir ceux proposés par la communauté et sauvegarder leurs favoris.
L’objectif est de favoriser la **découverte** et l’**échange d’expériences** autour des lieux et des monuments locaux.

---

## Technologies

- **Frontend :** React, React Router, Zustand, Leaflet, Lucide Icons
- **Backend :** pour le moment, le backend est simulé avec JSON Server
- **UI / Styles :** modules CSS

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

Lancer le backend simulé :
```bash
npm run api
```

Lancer le frontend :
```bash
npm run dev
```
Le site sera accessible sur http://localhost:5173

Authentification :

Pour l’instant l’interface est simplifiée : pas de login par email/password nécessaires.
Il suffit de sélectionner le rôle et de cliquer sur **Se connecter** :
- utilisateur → accès aux fonctionnalités standard
- admin → accès à l’interface d’administration

---

## Fonctionnalités

### Pour les visiteurs
- Explorer les parcours créés par la communauté (liste des parcours et carte).
- Consulter les détails et les étapes d'un parcours.

### Pour les utilisateurs
- Explorer les parcours créés par la communauté.
- Créer, consulter et sauvegarder des parcours.
- Ajouter, modifier des étapes à un des ses parcours, avec texte, photos, informations pratiques, localisation...
- Gérer ses parcours favoris et son profil.

### Pour l’admin
- Visualiser et gérer tous les parcours créés par les utilisateurs.
- Consulter des dashboards des utilisateurs, des lieux et des parcours.
- Ajouter, modifier ou supprimer des parcours, des lieux et des utilisateurs.
- Les admins sont les seuls gestionnaires des lieux (points géographique précis) sur lesquels se basent les étapes.

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

## Améliorations et prochaines étapes

#### Interface, UX, ergonomie :
- Rendre l’interface admin et les dashboards responsive mobile, ajouter une barre de recherche aux dashboards
- Ajouter les modales de confirmation pour les suppressions.
- Améliorer les icônes des thèmes pour plus de lisibilité.
- Ajouter les pages Contact et Mentions légales.

#### Gestion des utilisateurs :
- Ajouter le formulaire de modification sur le profil utilisateur, 
- Ajouter la fonctionnalité “mot de passe oublié”.

#### Fonctionnalités et cohérence des données :
- Améliorer le système de filtres, 
- Affiner la relation lieu → étape, ajouter la possibilité de modifier l’ordre des étapes (steps).
- Calcul de la distance selon les étapes renseignées (actuellement saisie par l’utilisateur). 
- Objets incomplets : compléter les champs renvoyés via les formulaires.
- À terme, les villes pourront devenir une table dédiée.

#### Code et organisation :
- Fonctionnalité "upload de fichier" : pour l'instant "photo" est un simple champ texte.
- Refactor des dossiers, nettoyage et optimisation du code, 
- Uniformisation des noms de propriétés en camelCase.
