window.onload=function(){
const openButton = document.getElementById("contact");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("close-modal");
let firstnameInput = document.getElementById("form-firstname");
let nameInput = document.getElementById("form-name");
let emailInput = document.getElementById("form-email");

openButton.addEventListener("click", openModal);

function openModal() {
    modal.style.display = "flex";
}

closeButton.addEventListener("click", closeModal);

function closeModal() {
    modal.style.display = "none";
}

modal.addEventListener("submit", function(e) {
    e.preventDefault();

    console.log(firstnameInput.value);
    console.log(nameInput.value);
    console.log(emailInput.value);
    closeModal();
});
}