export function modal() {
    // On définit les éléments du DOM dont on aura besoin plus tard
    const modal = document.getElementById("modal");
    const closeButton = document.getElementById("close-modal");
    let firstnameInput = document.getElementById("form-firstname");
    let nameInput = document.getElementById("form-name");
    let emailInput = document.getElementById("form-email");

    // On affiche la modal au lancement de l'événement sur le fichier mjs principal
    modal.style.display = "flex";

    // Evenement de fermerture de la modale
    closeButton.addEventListener("click", closeModal);

    // Fonction de fermeture de la modale
    function closeModal() {
        modal.style.display = "none";
    }

    // Evenement de soumission des informations
    modal.addEventListener("submit", function(e) {
    // On empêche le comportement par défaut pour ne pas recharger la page
    e.preventDefault();
    // On affiche les inputs dans la console
    console.log(firstnameInput.value);
    console.log(nameInput.value);
    console.log(emailInput.value);
    closeModal();
    });
}