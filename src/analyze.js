const fs = require("fs");
const {parse} = require("csv-parse/sync");
const { log } = require("console");

//​ Lire les données du fichier CSV dataset-sell4all.csv ;
const fileContent= fs.readFileSync("data/dataset-sell4all.csv","utf-8");
const data = parse(fileContent,{rows:true,columns:true});

//●​ Afficher les informations des cinq premières lignes du fichier ;
//console.log("les 5 premiers lignes",data.slice(0,5));

//○​ Le nombre de lignes ;
console.log("nombre de ligne:",data.length);

// ○​ Les colonnes du fichier CSV ;
const NbrColumns = Object.keys(data[0]);
console.log("Nombre de colonnes:",NbrColumns.length);

//○​ Les types de données des différentes colonnes.
const row1 = data[0];
for(const col in row1){
    const value = row1[col];
    if (value === "true" || value==="false"){
        console.log(col,"c'ets un boolean");
    }else if(!isNaN(value)) {
        console.log(col,": c'est un nombre");
    }
    else{
        console.log(col,"c'est un string");
    }
}

//Calculez la moyenne et la médiane des colonnes suivantes :
//●​ Age ;
const ages=[];
for(const row of data){
    ages.push(Number(row["Age"]));
}
//console.log("la liste des ages : \n",ages);
const count = ages.length;
let sum=0;
for(const age of ages){
    sum+=age;
}
const moyenne = sum/count;
console.log("la moyenne d'age est:",moyenne.toFixed(2));


//Calculez la moyenne et la médiane des colonnes suivantes :
//●​ Customer spendings.
const spendings=[];
for(const row of data){
    spendings.push(Number(row["Customer spendings"]));
}
//console.log(spendings)
const count2 = spendings.length;
let sum2 =0;
for(spen of spendings){
    sum2+=spen;
}
const moyenneSpendings = sum2/count2;
console.log("la moyennes de customer spendings is :",moyenneSpendings.toFixed(2));

//Calculez la médiane d'âge pour chaque pays.
//groupement pour chaque pays 
 const ageParCountry={};
 for(row of data){
    const age =Number(row["Age"]);
    const country =row["Country"];

    if(!ageParCountry[country]){
        ageParCountry[country]=[];
    }
    ageParCountry[country].push(age);
 }
 //console.log("l'age par chaque pays est:\n",ageParCountry);
//fonction pour calculer mediane pour une liste
 function Mediane(list){
    if(list.length ===0) return 0;
    const sortedList =[...list].sort((a,b)=>a-b);
    const milieu = Math.floor(sortedList.length/2);

    if(sortedList.length %2 !==0){
        return sortedList[milieu];
    }else{
        return (sortedList[milieu -1] + sortedList[milieu])//2;
    }

 }
 //calcule de mediane des pays
 const medianeParCountry = {};
 for(const country in ageParCountry){
    const ageList = ageParCountry[country];
    medianeParCountry[country] =Mediane(ageList);
 }

 console.log("le médiane d'age pour chaque pays est :",medianeParCountry);
