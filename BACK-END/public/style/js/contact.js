/* RECUPERE LES INFORMATIONS DU FORMULAIRE ET LES ENVOIE A L'EXPERT */
const lastNameInput = document.getElementById("Nom");
const firstNameInput = document.getElementById("Prénom"); 
const emailInput = document.getElementById("Email"); 
const messageInput = document.getElementById("Message");
const sendBtn = document.getElementById("submit");
const form = document.getElementsByClassName("form")[0];

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log("clicked"); 

    Email.send({
        SecureToken : "c571acaf-e336-47ea-af57-47b60db16d02",
        To : 'forum.lyon1@gmail.com',
        From : emailInput.value,
        Subject : 'Message from ' + lastNameInput.value + ' ' + firstNameInput.value, 
        Body : messageInput.value
    }).then(
      message => alert("L'email a bien était envoyé !")
    );

    lastNameInput.value = '';
    firstNameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
});

    





