import {mediaFactory} from "./mediaFactory.mjs";
import {photographeFactory} from "./photographeFactory.mjs";

fetch("./FishEyeData.json")
.then(response => {
    return response.json();
})

.then(function fichePhotographes(jsonObj) {
    const main = document.querySelector("main");
    const modalContent = document.getElementById("lightbox-content");
    let medias = jsonObj["media"];

    let url = document.location.href;
    let urlIndex = url.substring(url.lastIndexOf( "?" )+1);
    urlIndex = urlIndex.replace(/[^0-9]/g, '');
    let mediasList = [];
    let mediasArtist = [];


    
    medias.forEach(function(item) {
        if(item.photographerId == urlIndex) {
            mediasList.push(item);
        }
    });
    

    for (let i=0; i<mediasList.length;i++) {
                mediasArtist.push(new mediaFactory(mediasList[i].id, mediasList[i].photographerId, mediasList[i].title, mediasList[i].image, mediasList[i].video, mediasList[i].tags, mediasList[i].likes, mediasList[i].date, mediasList[i].price)); 
    }

        for (let k=0; k<mediasArtist.length;k++) {
            let blocMedia = document.createElement("div");
            blocMedia.setAttribute("class", "bloc_media");
            let a = document.createElement("a");
            a.setAttribute("href", "#");
            a.setAttribute("class", "bloc_media__lien");
            let blocImage = new Image();
            let blocVideo = document.createElement("video");
            let blocTitre = document.createElement("h2");
            blocTitre.setAttribute("class", "bloc_media__titre");
            let blocIcone = new Image();
            let b = document.createElement("a");
            a.setAttribute("href", "#");
            a.setAttribute("class", "bloc_media__lien");
            let blocTitreEtIcone = document.createElement("div");
            blocTitreEtIcone.setAttribute("class", "bloc_media__titre_et_icone");
            let slide = document.createElement("div");
            slide.setAttribute("class", "slide");
            let slideImage = new Image();


            if (mediasArtist[k].image != null) {
                blocImage.src = "images/"+urlIndex+"/"+mediasArtist[k].image;
                blocImage.setAttribute("alt", "");
                blocImage.setAttribute("class", "bloc_media__image");
                blocImage.setAttribute("onclick", "openLightbox();toSlide("+(k+1)+")");
                a.appendChild(blocImage);
                slideImage.src = "images/"+urlIndex+"/"+mediasArtist[k].image;
                slideImage.setAttribute("alt", "");
                slideImage.setAttribute("class", "slide__image");
                slide.appendChild(slideImage);
                modalContent.appendChild(slide);
            }

            if (mediasArtist[k].video != null) {
                blocVideo.src = "images/"+urlIndex+"/"+mediasArtist[k].video;
                blocVideo.setAttribute("alt", "");
                blocVideo.setAttribute("class", "bloc_media__video");
                a.appendChild(blocVideo);

            }

            blocIcone.src = "images/Vector.png";
            blocIcone.setAttribute("alt", "likes");
            blocIcone.setAttribute("class", "bloc_media__icone");
            blocTitre.textContent = mediasArtist[k].title;

            blocMedia.appendChild(a);
            blocMedia.appendChild(blocTitreEtIcone);
            blocTitreEtIcone.appendChild(blocTitre)
            b.append(blocIcone);
            blocTitreEtIcone.appendChild(b);
            main.appendChild(blocMedia);
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