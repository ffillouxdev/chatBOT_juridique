/* GET THE INFORMATION FROM THE FORM AND SEND IT TO THE EXPERT */
const lastNameInputen = document.getElementById("Lastname");
const firstNameInputen = document.getElementById("Firstname");
const emailInputen = document.getElementById("Email");
const messageInputen = document.getElementById("Message");
const sendBtnen = document.getElementById("submit");
const formen = document.getElementsByClassName("form")[0];
const recupCountryUser = localStorage.getItem("country");


// When the user clicks on the "Send" button, the message is sent to the expert's mailbox
formen.addEventListener('submit', (e)=>{
  e.preventDefault();
    
  let formDatafr = {
    lastname : lastNameInputfr.value,
    firstname : firstNameInputfr.value,
    email : emailInputfr.value,
    message : messageInputfr.value,
    country : recupCountryUser
  }

  // Send the form data to the expert
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/Contact', true);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function(){
    console.log(xhr.responseText);
    if(xhr.responseText == 'success'){
      alert("L'email a bien été envoyé");

      // Reset the form
      lastNameInputfr.value = '';
      firstNameInputfr.value = '';
      emailInputfr.value = '';
      messageInputfr.value = '';
    } else {
      alert("Aie, l'email n'a pas pu être envoyé");
    }
  }

  xhr.send(JSON.stringify(formDatafr));
 
})