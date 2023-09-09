/* GET THE INFORMATION FROM THE FORM AND SEND IT TO THE EXPERT */
const lastNameInputen = document.getElementById("Lastname");
const firstNameInputen = document.getElementById("Firstname");
const emailInputen = document.getElementById("Email");
const messageInputen = document.getElementById("Message");
const sendBtnen = document.getElementById("submit");


// Global variable for the country
let countryUser;

// function to recup the country cookie
const recupCountryUser = () => {
  axios.get("/api/get-country")
  .then(e => {
    countryUser = e.data;
    console.log(countryUser);
  })
  .catch(err => {
    console.log(err);
  })
}


// When the user clicks on the "Send" button, the message is sent to the expert's mailbox
const submitMessage = (e) => {
  e.preventDefault();
    
  let formDataen = {
    lastname : lastNameInputen.value,
    firstname : firstNameInputen.value,
    email : emailInputen.value,
    message : messageInputen.value,
    country : countryUser
  }

  // Send the form data to the expert
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/Contact', true);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function(){
    if(xhr.responseText == 'success'){
      alert("The email has been sent");

      // Reset the form
      lastNameInputen.value = '';
      firstNameInputen.value = '';
      emailInputen.value = '';
      messageInputen.value = '';

    } else {
      alert("Oops, the email couldn't be sent");
      console.log(xhr.responseText);
    }
  }

  xhr.send(JSON.stringify(formDatafr));

}


// When the user clicks on the "Send" button, the message is sent to the expert's mailbox
sendBtnen.addEventListener('click', submitMessage);

// When the user presses the "Enter" key, the message is sent to the expert's mailbox
sendBtnen.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
      e.preventDefault();  
      submitMessage();
    }
});
