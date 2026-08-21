const fs = require("fs");
const {parse} = require("csv-parse/sync");
const { log } = require("console");

//​ Lire les données du fichier CSV dataset-sell4all.csv ;
const fileContent= fs.readFileSync("data/dataset-sell4all.csv","utf-8");
const data = parse(fileContent,{rows:true,columns:true});

//●​ Afficher les informations des cinq premières lignes du fichier ;
//console.log("les 5 premiers lignes",data.slice(0,5));
console.log("             RAPPORT D'ANALYSE SELL4ALL           ");
console.log("--------------------------------------------------");
//○​ Le nombre de lignes ;
console.log("\n 1-nombre de ligne:",data.length);

// ○​ Les colonnes du fichier CSV ;
const NbrColumns = Object.keys(data[0]);
console.log("\n 2-Nombre de colonnes:",NbrColumns.length);

//○​ Les types de données des différentes colonnes.
console.log("\n 2-type de données pour chaque colonnes :")
const row1 = data[0];
for(const col in row1){
    const value = row1[col];
    if (value === "true" || value==="false"){
        ;
        console.log(col," : boolean");
    }else if(!isNaN(value)) {
        console.log(col," : nombre");
    }
    else{
        console.log(col," : chaine");
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
console.log("\n 4-la moyenne d'age est:",moyenne.toFixed(2));


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
console.log("\n 5-la moyennes de customer spendings is :",moyenneSpendings.toFixed(2));

//Calculez la médiane d'âge pour chaque pays.
//groupement pour chaque pays par age
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
 //calcule d'age mediane des pays
 const medianeAgeParCountry = {};
 for(const country in ageParCountry){
    const ageList = ageParCountry[country];
    medianeAgeParCountry[country] =Mediane(ageList);
 }
 console.log("\n 6-le médiane d'age pour chaque pays est :",medianeAgeParCountry);



//groupement pour chaque pays par spendings
 const spendParCountry={};
 for(row of data){
    const spendings =Number(row["Customer spendings"]);
    const country =row["Country"];

    if(!spendParCountry[country]){
        spendParCountry[country]=[];
    }
    spendParCountry[country].push(spendings);
 }

const medianeSpendParCountry = {};
 for(const country in spendParCountry){
    const spendList = spendParCountry[country];
    medianeSpendParCountry[country] =Mediane(spendList);
 }
 console.log("\n 7-le médiane d'expenses pour chaque pays est :",medianeSpendParCountry);

 //les dépenses des clients par pays pour le graphe 
 const depensesPerCountry ={}
 for(row of data){
    const country = row["Country"];
    const spendings = Number(row["Customer spendings"]);
    if(!depensesPerCountry[country]){
        depensesPerCountry[country]=0;
    }
    depensesPerCountry[country] = depensesPerCountry[country] + spendings;
 }
//console.log(depensesPerCountry);

 //Nettoyez les données en :
//●​ Supprimant les lignes des utilisateurs ayant dépensé moins de 10 € ;

const dataNetoyage =[];
for(row of data){
    const spendingsByCustomer = Number(row["Customer spendings"]);
    if(spendingsByCustomer >=10){
        dataNetoyage.push(row);
    }
}
console.log("\n 8-Nettoyage des données")
console.log("8-1data before supprimer spendings more than 10 euro",data.length);
console.log("8-2data clean :",dataNetoyage.length);

//●​ Supprimant les lignes dupliquées.
const dataNotDoubeled =[];
for(row of dataNetoyage){
    const rowTxt=JSON.stringify(row);
    const exists=dataNotDoubeled.some(item=>JSON.stringify(item)===rowTxt);
    if(!exists){
    dataNotDoubeled.push(row);
}
}

console.log("8-3data doubled :",data.length);
console.log("8-4data not doubled :",dataNotDoubeled.length);

//les données nettoyées dans un nouveau fichier CSV  ●​ Country ;●​ Age ;●​ Gender ;●​ Customer spendings.
let contentCSV = "Country,Age,Gender,Customer spendings\n"
for (row of dataNotDoubeled){
    const ligne =  row["Country"] +"," +row["Age"]+","+row["Gender"] + ","+ row["Customer spendings"] ;
    contentCSV = contentCSV + ligne +"\n";
}
fs.writeFileSync("data/dataset-clean.csv", contentCSV);


