# Sell4All - Exploration de données avec JavaScript

## Présentation du besoin
Sell4All est une entreprise de vente de vêtements d'occasion en ligne. Après six mois d'activité, elle souhaite analyser les données de ses clients (pays, âge, genre, dépenses) afin de préparer un futur tableau de bord. Ce projet consiste à réaliser une première exploration et un nettoyage rigoureux de ces données avec JavaScript (Node.js), puis à visualiser les dépenses par pays à l'aide de Chart.js.

## Pré-requis
- Node.js et npm installés sur la machine.
- Connaissances de base en JavaScript.

---

## Étapes suivies

### Jour 1
- Prise de connaissance du sujet et analyse du cahier des charges.
- Révision de JavaScript .
- Exploration visuelle préliminaire de la structure du fichier `dataset-sell4all.csv`.
- Initialisation du projet (`npm init -y`) et installation de la dépendance `csv-parse`.

### Jour 2
- Développement du script d'analyse (`src/analyze.js`) :
  - Lecture et parsing synchrone du fichier CSV avec `fs.readFileSync` et `csv-parse/sync`.
  - Affichage des 5 premières lignes et résumé technique (nombre de lignes, colonnes, détection des types de données).
  - Calcul statistique : moyenne et médiane de l'âge et des dépenses (`Customer spendings`).
  - Calcul de la médiane d'âge par pays via une fonction dédiée `Mediane()`.
  - Calcul des dépenses cumulées par pays pour alimenter la visualisation.

### Jour 3
- Implémentation du pipeline de nettoyage des données :
  - Filtrage des transactions inférieures à 10 €.
  - Détection et suppression des doublons stricts via sérialisation JSON (`JSON.stringify`).
- Export des données nettoyées dans un nouveau fichier `data/dataset-clean.csv` restreint aux colonnes demandées (`Country`, `Age`, `Gender`, `Customer spendings`).
- Intégration de Chart.js dans `chart.html` pour générer le graphique à barres des dépenses par pays.
- Rédaction de la documentation finale (`README.md`) et publication sur le dépôt GitHub.

---

## Comment exécuter le projet

1. Cloner le dépôt et installer les dépendances :
```bash
npm install

## Comment exécuter le projet

```bash
npm install
node src/analyze.js
xdg-open chart.html