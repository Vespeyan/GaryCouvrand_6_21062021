// On crée la class gérant la création des objets
export class mediaFactory {
    constructor(id, photographerId, title, image, video, tags, likes, date, price) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image;
        this.video = video;
        this.tags = tags;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }
    // On crée la fonction qui va générer le HTML qui utilisera nos objets
    mediaHTML() {
        // On définit la variable urlIndex pour savoir quels médias choisir en fonction de la page chargée
        let url = document.location.href;
        let urlIndex = url.substring(url.lastIndexOf( "?" )+1);
        urlIndex = urlIndex.replace(/[^0-9]/g, '');

        // On crée de nouveaux éléments HTML en les attribuant à des variables pour les réutiliser plus tard
        const main = document.querySelector("main");
        const modalContent = document.getElementById("lightbox-content");
        const blocMedias = document.getElementById("blocs");
        let blocMedia = document.createElement("div");
        let a = document.createElement("a");
        let blocImage = new Image();
        let blocVideo = document.createElement("video");
        let blocTitre = document.createElement("h2");
        let blocIconeEtCompteur = document.createElement("div");
        let blocIcone = new Image();
        let blocMediaCompteur = document.createElement("p");
        let b = document.createElement("a");
        let blocTitreEtIcone = document.createElement("div");
        let slide = document.createElement("div");
        let slideImage = new Image();
        let slideVideo = document.createElement("video");

        // On attribue les différents attributs et valeurs dont on a besoin aux éléments précédément créés
        blocMedia.setAttribute("class", "bloc_media");
        a.setAttribute("href", "#");
        a.setAttribute("class", "bloc_media__lien");
        blocTitre.setAttribute("class", "bloc_media__titre");
        blocIconeEtCompteur.setAttribute("class", "bloc_media__icone_et_compteur");
        blocMediaCompteur.setAttribute("class", "bloc_media__compteur");
        b.setAttribute("class", "bloc_media__like_button");
        b.addEventListener("click", addLike)
        blocTitreEtIcone.setAttribute("class", "bloc_media__titre_et_icone");
        slide.setAttribute("class", "slide");
        blocIcone.src = "images/Vector.png";
        blocIcone.setAttribute("alt", "likes");
        blocIcone.setAttribute("class", "bloc_media__icone");
        blocTitre.textContent = this.title;
        blocMediaCompteur.textContent = 0;

        function addLike() {
            blocMediaCompteur.textContent++;
            document.getElementById("likes").textContent++;
            blocMedia.setAttribute("data-likes", parseInt(blocMediaCompteur.textContent, 10));
        }
        

        // Condition pour gérer spécifiquement les images
        if (this.image != null) {
            blocImage.src = "images/"+urlIndex+"/"+this.image;
            blocImage.setAttribute("alt", "");
            blocImage.setAttribute("aria-label", this.title+", closeup view")
            blocImage.setAttribute("class", "bloc_media__image");
            a.appendChild(blocImage);
            slideImage.src = "images/"+urlIndex+"/"+this.image;
            document.getElementById("lightbox-content").setAttribute("aria-label", "image closeup view")
            slideImage.setAttribute("alt", "");
            slideImage.setAttribute("aria-label", this.title)
            slideImage.setAttribute("class", "slide__image");
            slide.appendChild(slideImage);
            let slideTitle = document.createElement("h3");
            slideTitle.innerHTML = this.title;
            slide.appendChild(slideTitle);
        }

        //  Condition pour gérer spécifiquement les vidéos
        if (this.video != null) {
            blocVideo.src = "images/"+urlIndex+"/"+this.video;
            blocVideo.setAttribute("alt", "");
            blocVideo.setAttribute("aria-label", this.title+", closeup view")
            blocVideo.setAttribute("class", "bloc_media__video");
            a.appendChild(blocVideo);
            slideVideo.src = "images/"+urlIndex+"/"+this.video;
            document.getElementById("lightbox-content").setAttribute("aria-label", "image closeup view")
            slideVideo.controls = true;
            slideVideo.setAttribute("alt", "");
            slideVideo.setAttribute("aria-label", this.title)
            slideVideo.setAttribute("class", "slide__image");
            slide.appendChild(slideVideo);
            let slideTitle = document.createElement("h3");
            slideTitle.innerHTML = this.title;
            slide.appendChild(slideTitle);
        }


        // On intègre les différents éléments HTML les uns dans les autres pour obtenir la structure désirée
        modalContent.appendChild(slide);
        blocMedia.appendChild(a);
        blocMedia.appendChild(blocTitreEtIcone);
        blocTitreEtIcone.appendChild(blocTitre);
        blocIconeEtCompteur.appendChild(blocMediaCompteur);
        b.append(blocIcone);
        blocIconeEtCompteur.appendChild(b);
        blocTitreEtIcone.appendChild(blocIconeEtCompteur);
        blocMedias.appendChild(blocMedia);
    }
}
