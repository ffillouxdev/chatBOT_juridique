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

    Email.send({
        SecureToken : "cff18f15-44fc-42b5-b267-b878e79434ec",
        To : 'forum.lyon1@gmail.com',
        From : emailInputen.value,
        Subject : 'Message from ' + lastNameInputen.value + ' ' + firstNameInputen.value + " who comes from " + recupCountryUser, 
        Body : messageInputen.value
    }).then(
      message => alert("The email has been sent successfully!")
    ); 
  
    // Reset the form
    lastNameInputen.value = '';
    firstNameInputen.value = '';
    emailInputen.value = '';
    messageInputen.value = '';
});
