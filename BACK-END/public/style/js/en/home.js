/******************************COOKIES PART****************************/
const refuseCookies = document.getElementById("refuse_cookies");
const acceptCookies = document.getElementById("accept_cookies");
const cookiesContainer = document.querySelector(".cookies_container");

// Function to refuse cookies
refuseCookies.addEventListener("click", function () {
    localStorage.setItem("cookies", "refuse");
    cookiesContainer.classList.add("close");

    // call  the language popup to appear with a delay of 2 seconds
    setTimeout(function () {
        checkLocalStorage();
    } , 2000);
});

// Function to accept cookies
acceptCookies.addEventListener("click", function () {
    localStorage.setItem("cookies", "accept");

    // If the user accepts cookies, the popup will not appear again
    cookiesContainer.classList.add("close");

    // call  the language popup to appear with a delay of 2 seconds
    setTimeout(function () {
        checkLocalStorage();
    } , 2000);

});

// Function to check the cookies
function checkCookies() {
    // If the cookies are not found in localStorage or it is set to "null", show the popup
    if (localStorage.getItem("cookies") === "null") {
        cookiesContainer.classList.add("show");
    } else {
        // If the cookies are found in localStorage, hide the popup
        cookiesContainer.classList.add("close");
    }
}

// Call the function to check the localStorage
checkCookies();


/******************************POPUP PART****************************/

// recup the <select> in the nav bar
const language_Popup_container = document.querySelector(".language_Popup_container")

/*
 * A popup who ask the english localisation, to be specific on the laws for each english country and appear only for the first connection of the user,
 *if I navigate on the website and I come back on the home page the popup will not appear again.
*/ 
function checkLocalStorage() {

    // If the country is not found in localStorage or it is set to "null", show the popup
    console.log(localStorage.getItem("country"));
    if (localStorage.getItem("country") === "null") {
        language_Popup_container.classList.add("show");
    } else {
        // If the country is found in localStorage, hide the popup
        language_Popup_container.classList.add("close");
        synchronizeSelectCountry();
    }
}

// Call the function to check the localStorage
checkLocalStorage();

const submitToClosePopup = document.getElementById("submitP");

function  selectLangAndClosePopup(){
    //recup the country of the user from the <select> 
    const recupCountry  = document.getElementById("english_loc").value;

    //register the country in the local storage 
    if(recupCountry == "null"){
        language_Popup_container.classList.add("show");

        //add a <p> in red to say to the user to select a country one time only 
        if (document.querySelector(".errorLang")) {
        } else {
            const errorMessage = "Please select a country.";
            const selectElement = document.getElementById("english_loc");
            selectElement.insertAdjacentHTML('afterend', '<p class="errorLang">' + errorMessage + '</p>');
        }
    } else {

        //we put the country in the local storage
        localStorage.setItem("country", recupCountry);
        console.log(localStorage.getItem("country"));

        //We call the function to synchronize the <select> with the local storage
        synchronizeSelectCountry();

        //Add a div name close and this div have for effect "opacity: 0;" so the popup is close 
        language_Popup_container.classList.add("close");
        language_Popup_container.classList.remove("show");
    }


};
submitToClosePopup.addEventListener("click", selectLangAndClosePopup);


// Function to make the country chosen  selected in the <select> in the nav bar
function synchronizeSelectCountry(){
    const recupCountry = localStorage.getItem("country");
    const selectCountry = document.getElementById("switch_country");
    selectCountry.value = recupCountry;
};

// Function to change the english country which is in the local storage
function changeCountry(){
    //recup the country of the user from the <select>
    const recupCountry  = document.getElementById("switch_country").value;

    //register the country in the local storage
    localStorage.setItem("country", recupCountry);
    console.log(localStorage.getItem("country"));
};
document.getElementById("switch_country").addEventListener("change", changeCountry);


//When loading the DOM, wait 2 seconds, then display the main content
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('body-content');
    setTimeout(function() {
      mainContent.style.display = 'block';
    }, 350); // Set timeout in milliseconds (2 seconds in this example)
  });


/******************************PART CHATBOT****************************/  
// Récupération des éléments HTML
const userInput = document.getElementById('userInput');
const buttonUser = document.getElementById('buttonUser');
const chat = document.querySelector('.chatbot-reponse');

// Declaration of the heightInput variable
let heightInput = userInput.offsetHeight;

// Declaration of the API_KEY variable
const API_KEY = "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"; 

// Declaring the question variable
let question;

const responseGeneration = (nextChatLi, enCountry) => {
    // Retrieving the response from the API
    const API_URL = "https://api.openai.com/v1/chat/completions";

    //  The text that will be sent to the API
    const legalText = "Which law from "+ enCountry +" is related to this question (answers only if the question asked has something to do with the legal otherwise just answers 'It is not a legal question.'): " + question; 
    console.log(legalText);
    const requestOptions = {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Aurhorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [ { role: 'user', content: legalText} ],
        })
    }
    fetch(API_URL, requestOptions).then(response => response.json()).then(data => {
        nextChatLi.querySelector('p').textContent = data.choices[0].message.content;
    }).catch(error =>{
        nextChatLi.classList.add("error");
        nextChatLi.querySelector('p').textContent = "An error has occurred, please try again later.";
    }).finally(() => {chat.scrollTo(0, chat.scrollHeight);});
}

// Function to create a li with the user's response
const createReponseLi = (question, nameClass) => {
    // li creation
    const li = document.createElement('li');
    li.classList.add("chat", nameClass);
    let contentChat = (nameClass === "reponse-User") ? '<p></p>' : '<span class="material-symbols-outlined">smart_toy</span><p></p>';
    li.innerHTML = contentChat;
    li.querySelector('p').textContent = question;
    return li;
}   


// Function to send the user's question
const sendQuestion = () => {
// Retrieve the user's question
    question = userInput.value;

// Display the user's question
    console.log(question);
    if(! question) return;

    setTimeout(() => {
        const nextChatLi = createReponseLi("I'm thinking...", "reponse-BOT");
        //we simulate the reflection of the chatbot (we will improve this part so that the chatbot writes . then . then . then the answer )
        chat.appendChild(nextChatLi);
        chat.scrollTo(0, chat.scrollHeight);
        responseGeneration(nextChatLi, localStorage.getItem("country"));
    }, 600);

    //we display the user's question in a new block that belongs to the "response-User" class li
    chat.appendChild(createReponseLi(question, "reponse-User"));

    // we empty the input field
    userInput.value = "";
}
buttonUser.addEventListener('click', sendQuestion); // we add an event to the click on the button

//Allows you to enlarge the input control according to the number of lines upwards without leaving the window
    userInput.addEventListener('keyup', e => {
    userInput.style.height = "30px";
    let newHeight = e.target.scrollHeight;
    console.log(newHeight);
    userInput.style.height = newHeight + "px";
});

//allows if the enter button is pressed and the popup is closed to send the question
userInput.addEventListener('keydown', e => {
    if(e.key === "Enter"){
        e.preventDefault();
        sendQuestion();
    }
});
