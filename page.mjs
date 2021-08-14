import {mediaFactory} from "./mediaFactory.mjs";
import {photographeFactory} from "./photographeFactory.mjs";

fetch("./FishEyeData.json")
.then(response => {
    return response.json();
})

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
        document.getElementsByClassName("bloc_media")[i].setAttribute("data-title", mediasList[i].title);
        document.getElementsByClassName("bloc_media")[i].setAttribute("data-date", mediasList[i].date);
        document.getElementsByClassName("bloc_media")[i].setAttribute("data-likes", parseInt(likesCount.textContent, 10));

    }




    

let photographesData = jsonObj["photographers"];
let photographes = [];

for (let j=0; j<photographesData.length;j++) {
    photographes.push(new photographeFactory(photographesData[j].name, photographesData[j].id, photographesData[j].city, photographesData[j].country, photographesData[j].tags, photographesData[j].tagline, photographesData[j].price, photographesData[j].portrait)); 
}

for(let l=0; l<photographes.length;l++) {
    if (photographes[l].id == urlIndex) {
        document.getElementById("bloc__nom").innerHTML = photographes[l].name;
        document.getElementById("bloc__lieu").innerHTML = photographes[l].city+", "+photographes[l].country;
        document.getElementById("bloc__description").innerHTML = photographes[l].tagline;
        document.getElementById("prix_jour").innerHTML = photographes[l].price+"€ / jour";
        let blocTags = document.createElement("ul");

        let portraitPhotographer = new Image();
        portraitPhotographer.src = "images/Photographers ID Photos/"+photographes[l].portrait;
        portraitPhotographer.setAttribute("alt", "");
        portraitPhotographer.setAttribute("id", "bloc__photo");

        document.getElementById("photo container").appendChild(portraitPhotographer);

        let tags = photographes[l].tags;
        for (let m = 0; m < tags.length; m++) {
            let listeTags = document.createElement("li");
            listeTags.textContent = "#"+tags[m];
            document.getElementById("bloc").appendChild(blocTags);
            blocTags.appendChild(listeTags);
        }

    }
}
})