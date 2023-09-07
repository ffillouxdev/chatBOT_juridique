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
      return e.data;
    })
    .catch(err => {
      console.log(err);
    })
  }


  // La fonction qui envoie
  const submitMessage = (e) => {
    e.preventDefault();
    // On recupere le pays de l'utilisateur
    const countryUser = recupCountryUser();



  
  }


  // // Lorsque l'utilisateur clique sur le bouton "Envoyer", le message est envoyé dans la boite mail de l'expert
  sendBtnfr.addEventListener('click', submitMessage);

  // Lorsque l'utilisateur appuie sur la touche "Entrée", le message est envoyé dans la boite mail de l'expert
  sendBtnfr.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();  
        submitMessage();
      }
  });


