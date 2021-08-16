// On importe les différentes fonctions dont on va avoir besoin plus tard écrites dans des fichiers .mjs
import {mediaFactory} from "./mediaFactory.mjs";
import {photographeFactory} from "./photographeFactory.mjs";
import {tri} from "./tri.mjs";
import {modal} from "./modal.mjs";

// On récupère le fichier JSON
fetch("./FishEyeData.json")
.then(response => {
    return response.json();
})

// On définit une fonction nous permettant de traiter le fichier JSON
.then(function fichePhotographes(jsonObj) {

    // On définit la variable urlIndex pour savoir quels médias choisir en fonction de la page chargée
    let url = document.location.href;
    let urlIndex = url.substring(url.lastIndexOf( "?" )+1);
    urlIndex = urlIndex.replace(/[^0-9]/g, '');

    /* On stocke les objets du JSON qui nous intéressent dans la variable medias et on crée
    le tableau mediasList dans lequel on ne gardera que ceux correspondants à l'urlIndex voulu
    */ 
    let medias = jsonObj["media"];
    let mediasList = [];
    medias.forEach(function(item) {
        if(item.photographerId == urlIndex) {
            mediasList.push(item);
        }
    });
    
    // On lance la création des objets et du HTML correspondant à travers une boucle qui parcourt le tableau mediasList
    for (let i=0; i<mediasList.length;i++) {
        new mediaFactory(mediasList[i].id, 
                         mediasList[i].photographerId, 
                         mediasList[i].title, 
                         mediasList[i].image, 
                         mediasList[i].video, 
                         mediasList[i].tags, 
                         mediasList[i].likes, 
                         mediasList[i].date, 
                         mediasList[i].price).
                         mediaHTML();
        let a = document.getElementsByClassName("bloc_media__lien")[i];
        a.setAttribute("onclick", "openLightbox();toSlide("+(i+1)+")");
        let likesCount = document.getElementsByClassName("bloc_media__compteur")[i];
        /* On attribue des attributs data aux blocs médias qui contiennent les variables
        sur lesquelles se basent notre fonction de tri */
        document.getElementsByClassName("bloc_media")[i].setAttribute("data-title", mediasList[i].title);
        document.getElementsByClassName("bloc_media")[i].setAttribute("data-date", mediasList[i].date.replace(/[^\d]/g, ""));
        document.getElementsByClassName("bloc_media")[i].setAttribute("data-likes", parseInt(likesCount.textContent, 10));
    }
    // On stocke dans un tableau les éléments du JSON concernant les infos des photographes
    let photographesData = jsonObj["photographers"];
    let photographes = [];
    for (let j=0; j<photographesData.length;j++) {
        photographes.push(new photographeFactory(photographesData[j].name, photographesData[j].id, photographesData[j].city, photographesData[j].country, photographesData[j].tags, photographesData[j].tagline, photographesData[j].price, photographesData[j].portrait)); 
    }

    // On utilise les données du tableau pour créer la fiche d'info du photographe
    for(let l=0; l<photographes.length;l++) {
        if (photographes[l].id == urlIndex) {
            document.getElementById("bloc__nom").innerHTML = photographes[l].name;
            document.getElementById("bloc__lieu").innerHTML = photographes[l].city+", "+photographes[l].country;
            document.getElementById("bloc__description").innerHTML = photographes[l].tagline;
            document.getElementById("prix_jour").innerHTML = photographes[l].price+"€ / jour";
            document.getElementById("modal-title").innerHTML = "Contactez-moi <br>" + photographes[l].name;
            let blocTags = document.createElement("ul");

            let portraitPhotographer = new Image();
            portraitPhotographer.src = "images/Photographers ID Photos/"+photographes[l].portrait;
            portraitPhotographer.setAttribute("alt", "");
            portraitPhotographer.setAttribute("id", "bloc__photo");

            document.getElementById("photo_container").appendChild(portraitPhotographer);

            let tags = photographes[l].tags;
            for (let m = 0; m < tags.length; m++) {
                let listeTags = document.createElement("li");
                listeTags.textContent = "#"+tags[m];
                document.getElementById("bloc").appendChild(blocTags);
                blocTags.appendChild(listeTags);
            }
        }
    }
    // Appel de la fonction de tri sur un changement d'option du menu select
    let select = document.getElementById("tri_select");
    select.addEventListener("change", tri);

    // Appel de la fonction d'ouverture de la modal
    const openButton = document.getElementById("contact");
    openButton.addEventListener("click", modal);

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
})