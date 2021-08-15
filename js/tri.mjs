export function tri () {

    // On définit les variables à manipuler plus tard
    let blocMedia = document.getElementsByClassName("bloc_media");
    let blocs = document.getElementById("blocs");
    let blocMediaArray = [];
    let select = document.getElementById("tri_select");

    // On crée une boucle pour transformer une HTMLCollection en Tableau pour pouvoir utiliser la fonction sort
    for(let w=0; w<blocMedia.length; w++) {
    blocMediaArray.push(blocMedia[w]);
    }

    if (select.value === "titre") {
        // Fonction permettant de trier par ordre alphabétique en fonction du dataset.title
        blocMediaArray.sort(function(a, b) {
            if (a.dataset.title < b.dataset.title) {
                return -1;
            }
            if (a.dataset.title > b.dataset.title) {
                return 1;
            }
        return 0;
        })
        // On vide ensuite le container
        blocs.innerHTML = "";
        // Pour le remplir à nouveau avec le contenu du tableau mis dans le bon ordre
        blocMediaArray.forEach(function(el) {
        blocs.appendChild(el);
        })
    }

    else if (select.value ==="popularite") {
        //Fonction permettant de trier par ordre numérique en fonction du dataset.likes
        blocMediaArray.sort(function(a, b) {
            return b.dataset.likes - a.dataset.likes
        })
        // On vide ensuite le container
        blocs.innerHTML = "";
        // Pour le remplir à nouveau avec le contenu du tableau mis dans le bon ordre
        blocMediaArray.forEach(function(el) {
        blocs.appendChild(el);
        })
    } 

    else if (select.value === "date") {
        blocMediaArray.sort(function(a, b) {
            return b.dataset.date - a.dataset.date
        })
        // On vide ensuite le container
        blocs.innerHTML = "";
        // Pour le remplir à nouveau avec le contenu du tableau mis dans le bon ordre
        blocMediaArray.forEach(function(el) {
        blocs.appendChild(el);
        })
    }
}