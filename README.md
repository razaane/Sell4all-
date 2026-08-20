# Sell4All - Exploration de données avec JavaScript
 
## Présentation du besoin
Sell4All est une entreprise de vente de vêtements d'occasion en ligne. Après
six mois d'activité, elle souhaite analyser les données de ses clients (pays,
âge, genre, dépenses) afin de préparer un futur tableau de bord. Ce projet
consiste à faire une première exploration et un premier nettoyage de ces
données avec JavaScript (Node.js).
 
## Pré-requis
- Node.js et npm déjà installés sur ma machine.
- Connaissances de base en JavaScript acquises via un cours sur Coursera.
## Étapes suivies - Jour 1
 
1. Création du dossier du projet.
2. Initialisation du projet avec :
```
   npm init -y
```
3. Installation de la bibliothèque `csv-parse`, utilisée pour lire et
   transformer le fichier CSV en données JavaScript utilisables :
```
   npm install csv-parse
```
4. Création du fichier `src/analyze.js`.
5. Écriture du code permettant de :
   - lire le fichier `data/dataset-sell4all.csv` ;
   - le transformer en tableau d'objets JavaScript avec `parse()` ;
   - afficher les 5 premières lignes du fichier ;
   - afficher le nombre total de lignes ;
   - afficher le nombre de colonnes ;
   - afficher le type de donnée (nombre, booléen ou texte) de chaque colonne,
     en testant la valeur de chaque colonne de la première ligne.
## Remarque technique
Quand on lit un fichier CSV, toutes les valeurs sont d'abord lues comme du
texte (string), même les nombres. Pour connaître le "vrai" type d'une
colonne (par exemple Age ou Customer spendings), il faut donc tester le
contenu de chaque valeur plutôt que de se fier uniquement au type JavaScript
brut.
 
## À faire (prochaines étapes)
- Calculer la moyenne et la médiane des colonnes Age et Customer spendings.
- Calculer la médiane d'âge par pays.
- Créer un graphique à barres des dépenses par pays avec Chart.js.
- Nettoyer les données (supprimer les dépenses < 10€ et les doublons).
- Exporter un CSV nettoyé avec les colonnes Country, Age, Gender, Customer
  spendings.
## Comment exécuter le projet
```bash
npm install
node src/analyze.js
```