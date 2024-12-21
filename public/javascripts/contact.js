  /* RECUPERE LES INFORMATIONS DU FORMULAIRE ET LES ENVOIE A L'EXPERT */
  // Récupère les éléments du formulaire
  const lastNameInputfr = document.getElementById("Nom");
  const firstNameInputfr = document.getElementById("Prénom"); 
  const emailInputfr = document.getElementById("Email"); 
  const messageInputfr = document.getElementById("Message");
  const sendBtnfr = document.getElementById("submit");

  // Variable globale pour le pays
  let countryUser;

  // On recupere le cookie qui contient le pays de l'utilisateur
  const recupCountryUser = () => {
    axios.get("/api/get-country")
    .then(e => {
      countryUser = e.data;
    })
    .catch(err => {
      console.log(err);
    })
  }

  recupCountryUser();

  // La fonction qui envoie
  const submitMessage = (e) => {
    e.preventDefault();
      
    let formDatafr = {
      lastname : lastNameInputfr.value,
      firstname : firstNameInputfr.value,
      email : emailInputfr.value,
      message : messageInputfr.value,
      country : countryUser.country
    }

    // Envoie les données du formulaire à l'expert
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/Contact', true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
      if(xhr.responseText == 'success'){
        alert("L'email a bien été envoyé");

        // Réinitialise le formulaire
        lastNameInputfr.value = '';
        firstNameInputfr.value = '';
        emailInputfr.value = '';
        messageInputfr.value = '';
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


