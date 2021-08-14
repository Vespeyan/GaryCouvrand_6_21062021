import {photographeFactory} from "./photographeFactory.mjs";

fetch("./FishEyeData.json")
.then(response => {
    return response.json();
})

.then(function fichePhotographes(jsonObj) {

let photographesData = jsonObj["photographers"];
let photographes = [];

for (let j=0; j<photographesData.length;j++) {
    photographes.push(new photographeFactory(photographesData[j].name, photographesData[j].id, photographesData[j].city, photographesData[j].country, photographesData[j].tags, photographesData[j].tagline, photographesData[j].price, photographesData[j].portrait)); 
}

const main = document.querySelector("main");

for (let i = 0; i < photographes.length; i++) {
    let bloc = document.createElement("div");
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
    let blocTags = document.createElement("ul");
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
        let listeTags = document.createElement("li");
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

    
    let filtresArray = document.getElementsByClassName("filtre");

    for (let k = 0; k < filtresArray.length; k++) {
        let tagname = filtresArray[k].innerHTML;
        let tagnameBrut = tagname.substring(tagname.lastIndexOf("#")+1);
        filtresArray[k].addEventListener("click", filtre);

        let filtresResetBoutton = document.getElementById("reset-boutton");
        filtresResetBoutton.addEventListener("click", resetFunction);

        function resetFunction() {
            bloc.style.display = "block";
        }


        function filtre() {
            if(!bloc.dataset.tags.includes(tagnameBrut.toLowerCase())) {
           bloc.style.display = "none";
        } else if(bloc.dataset.tags.includes(tagnameBrut.toLowerCase())) {
            bloc.style.display = "block";
         }
        }
    }



    


}
})

