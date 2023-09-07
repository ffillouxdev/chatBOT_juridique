/* RECUPERE LES INFORMATIONS DU FORMULAIRE ET LES ENVOIE A L'EXPERT */

// Récupère les éléments du formulaire
const lastNameInputfr = document.getElementById("Nom");
const firstNameInputfr = document.getElementById("Prénom"); 
const emailInputfr = document.getElementById("Email"); 
const messageInputfr = document.getElementById("Message");
const sendBtnfr = document.getElementById("submit");
const formfr = document.getElementsByClassName("form")[0];  


// On recupere le cookie qui contient le pays de l'utilisateur
const recupCountryUser = () => {
  axios.get("/api/get-country")
  .then(e => {
    console.log(e.data);
    return e.data;
  })
  .catch(err => {
    console.log(err);
  })
}


// La fonction qui envoie
const submitMessage = () => {
  e.preventDefault();
    
  let formDatafr = {
    lastname : lastNameInputfr.value,
    firstname : firstNameInputfr.value,
    email : emailInputfr.value,
    message : messageInputfr.value,
    country : recupCountryUser()
  }

  // Envoie les données du formulaire à l'expert
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/Contact', true);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function(){
    console.log(xhr.responseText);
    if(xhr.responseText == 'success'){
      alert("L'email a bien été envoyé");

      // Réinitialise le formulaire
      lastNameInputfr.value = '';
      firstNameInputfr.value = '';
      emailInputfr.value = '';
      messageInputfr.value = '';
    } else {
      alert("Aie, l'email n'a pas pu être envoyé");
    }
  }

  xhr.send(JSON.stringify(formDatafr));
 
}


// // Lorsque l'utilisateur clique sur le bouton "Envoyer", le message est envoyé dans la boite mail de l'expert
sendBtnfr.addEventListener('click', submitMessage);

// Lorsque l'utilisateur appuie sur la touche "Entrée", le message est envoyé dans la boite mail de l'expert
sendBtnfr.addEventListener('keypress', (e) => {
   if(e.key === 'Enter'){
      submitMessage();
    }
});


