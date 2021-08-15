// On définit l'index de base à 1
let slideIndex = 1;

// Fonction permettant d'ouvrir la lightbox
function openLightbox() {
  document.getElementById("lightbox").style.display = "block";
};

// Fonction permettant de fermer la lightbox
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
};

// Fonction permettant d'avancer ou de reculer dans la galerie d'images de la lightbox
function changeSlide(n) {
  showSlide(slideIndex += n);
};

// Fonction permettant d'ouvrir l'image de la lightbox correspondant à l'image sur laquelle on a cliqué
function toSlide(n) {
  showSlide(slideIndex = n);
};

// Function qui gère l'affichage de la bonne image en fonction de l'index et de son évolution
function showSlide(n) {
  const slides = document.getElementsByClassName('slide');
          
  if (n > slides.length) {
    slideIndex = 1;	
  };
            
  if (n < 1) {
    slideIndex = slides.length;
  };
          
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  };
            
  slides[slideIndex-1].style.display = 'block';
};

// Ecoute d'événement et fonction permettant de naviguer dans la galerie de la lightbox
document.addEventListener("keydown", function(e) {
  // Si on appuie sur la flèche de gauche on recule d'un cran dans la galerie
  if(e.key === "ArrowLeft") {
    changeSlide(-1);
  }
  // Si on appuie sur la flèche de droite on avance d'un cran dans la galerie
  else if(e.key === "ArrowRight") {
    changeSlide(1);
  }
  // Si on appuie sur le bouton Echap on ferme la lightbox
  else if(e.key === "Escape") {
    closeLightbox();
  }
});
