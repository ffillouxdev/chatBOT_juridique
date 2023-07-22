/* RECUPERE LES INFORMATIONS DU FORMULAIRE ET LES ENVOIE A L'EXPERT */
const lastNameInputfr = document.getElementById("Nom");
const firstNameInputfr = document.getElementById("Prénom"); 
const emailInputfr = document.getElementById("Email"); 
const messageInputfr = document.getElementById("Message");
const sendBtnfr = document.getElementById("submit");
const formfr = document.getElementsByClassName("form")[0];  
const recupCountryUser = localStorage.getItem("country");


// Lorsque l'utilisateur clique sur le bouton "Envoyer", le message est envoyé dans la boite mail de l'expert
formfr.addEventListener('submit', (e)=>{
    e.preventDefault();

    Email.send({
      SecureToken : "cff18f15-44fc-42b5-b267-b878e79434ec",
      To : "forum.lyon1@gmail.com",
      From : emailInputfr.value,
      Subject : 'Message de ' + lastNameInputfr.value + ' ' + firstNameInputfr.value + " qui vient " + recupCountryUser,
      Body : messageInputfr.value
  }).then(
    message => alert("L'email a bien était envoyé !"),
  );

  // Réinitialise le formulaire
  lastNameInputfr.value = '';
  firstNameInputfr.value = '';
  emailInputfr.value = '';
  messageInputfr.value = '';
});





