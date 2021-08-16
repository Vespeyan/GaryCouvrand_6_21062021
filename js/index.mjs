// On importe la class PhotographeFactory
import {photographeFactory} from "./photographeFactory.mjs";

// On récupère le fichier JSON
fetch("./FishEyeData.json")
.then(response => {
    return response.json();
})

// On définit une fonction nous permettant de traiter le fichier JSON
.then(function fichePhotographes(jsonObj) {

// On stocke les objets du JSON qui nous intéressent dans le tableau photographes en utilisant la classe photographeFactory
let photographesData = jsonObj["photographers"];
let photographes = [];

for (let j=0; j<photographesData.length;j++) {
    photographes.push(new photographeFactory(photographesData[j].name, photographesData[j].id, photographesData[j].city, photographesData[j].country, photographesData[j].tags, photographesData[j].tagline, photographesData[j].price, photographesData[j].portrait)); 
}

const main = document.querySelector("main");

/* On crée une boucle dans laquelle on va définir des éléments du DOM, en créer d'autres,
ainsi qu'utiliser les différentes informations du JSON pour remplir de façon dynamique
différents éléments. Ici la factory n'a aucun réel intérêt, elle est utilisée de façon plus intéressante
pour les médias du fichier page.html après que j'aie mieux compris le concept et l'intérêt des factories */

for (let i = 0; i < photographes.length; i++) {
    let bloc = document.createElement("article");
    bloc.setAttribute("class", "bloc");
    bloc.setAttribute("data-tags", photographes[i].tags);
    let a = document.createElement("a");
    a.setAttribute("href", "page.html?"+photographes[i].id);
    a.setAttribute("class", "bloc__lien");
    a.setAttribute("aria-label", photographes[i].name);
    let blocNom = document.createElement("h2");
    let blocInformation = document.createElement("div");
    blocInformation.setAttribute("class", "bloc__information");
    let blocLieu = document.createElement("p");
    let blocDescription = document.createElement("p");
    let blocTarif = document.createElement("p");
    let blocTags = document.createElement("div");
    let blocImage = new Image();
    
    blocImage.src = "images/Photographers ID Photos/"+photographes[i].portrait;
    blocImage.setAttribute("alt", "");
    blocImage.setAttribute("class", "bloc__photo");
    blocNom.textContent = photographes[i].name;
    blocNom.setAttribute("class", "bloc__nom");
    blocLieu.textContent = photographes[i].city +"," + photographes[i].country;
    blocLieu.setAttribute("class", "bloc__lieu");
    blocDescription.textContent = photographes[i].tagline;
    blocDescription.setAttribute("class", "bloc__description");
    blocTarif.textContent = photographes[i].price+"€/jour";
    blocTarif.setAttribute("class", "bloc__tarif");

    let tags = photographes[i].tags;
    for (let k = 0; k < tags.length; k++) {
        let listeTags = document.createElement("span");
        listeTags.setAttribute("class", "filtre");
        listeTags.textContent = "#"+tags[k];
        blocTags.appendChild(listeTags);
    }
    
    a.appendChild(blocImage);
    a.appendChild(blocNom);
    bloc.appendChild(a);
    blocInformation.appendChild(blocLieu);
    blocInformation.appendChild(blocDescription);
    blocInformation.appendChild(blocTarif);
    bloc.appendChild(blocInformation);
    bloc.appendChild(blocTags);
    main.appendChild(bloc);

    
    // Cette boucle sert à n'afficher que les fiches d'artistes contenant le tag sur lequel on a cliqué
    let filtresArray = document.getElementsByClassName("filtre");
    let blocFiltre = document.getElementsByClassName("bloc");
    let resetButton = document.getElementById("reset-boutton");

    for (let i=0; i<filtresArray.length; i++) {
        filtresArray[i].addEventListener("click", function() {
            let tagname = filtresArray[i].innerText.replace(/[^a-zA-Z]+/g, '');
            [...blocFiltre].forEach((element) => {
                if(!element.dataset.tags.includes(tagname.toLowerCase())) {
                    element.style.display = "none";
                }
                else if (element.dataset.tags.includes(tagname.toLowerCase())) {
                    element.style.display = "block";
                }
            })
        })
    }
    
    // Ecoute d'événement et fonction pour faire un reset des filtres
    resetButton.addEventListener("click", reset);
    function reset() {
        [...blocFiltre].forEach((element) => {
            element.style.display = "block";
        }
        )};

    // Ecoute d'événement et fonction pour le bouton de retour au début de page
    window.addEventListener("scroll", retour);
    function retour() {
        if (window.scrollY !== 0) {
            document.getElementById("retour").style.visibility = "visible";
        }
        else if (window.scrollY == 0) {
            document.getElementById("retour").style.visibility = "hidden";
        }
    }
}
})

