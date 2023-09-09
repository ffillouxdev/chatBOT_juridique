/******************************COOKIES PART****************************/
const refuseCookies = document.getElementById("refuse_cookies");
const acceptCookies = document.getElementById("accept_cookies");
const cookiesContainer = document.querySelector(".cookies_container");


// Function to refuse cookies
const refuserCookie = () => {
    axios.get("/api/delete-accept-cookie")
    .then(e => {
        console.log("cookie refusé")
        window.location.href = "https://google.com"
    })
    .catch(err => {
        console.error(err)
    })
}

// Function to accept cookies
const accepterCookie = () => {
    axios.post("/api/accept-cookie")
    .then(e => {
        console.log("cookie accepté")
        if (e.data.acceptCookie) {
            cookiesContainer.classList.remove("show");
            cookiesContainer.classList.add("close");
        } else {
            cookiesContainer.classList.add("show");
            cookiesContainer.classList.remove("close");
        }
    })
    .catch(err => {
        console.error(err)
    })
}

// Function to check the cookies
const checkCookies = () => {
    axios.get("/api/accept-cookie")
    .then(e => {
        if (e.data.acceptCookie) {
            cookiesContainer.classList.remove("show");
            cookiesContainer.classList.add("close");
        } else {
            cookiesContainer.classList.add("show");
            cookiesContainer.classList.remove("close");
        }
    })
    .catch(err => {
        console.error(err)
    })
}

// Call the function to check the localStorage
checkCookies();


/******************************POPUP PART****************************/
const language_Popup_container = document.querySelector(".language_Popup_container")
const submitToClosePopup = document.getElementById("submitP");

/*
 * A popup who ask the english localisation, to be specific on the laws for each english country and appear only for the first connection of the user,
 *if I navigate on the website and I come back on the home page the popup will not appear again.
*/

// Function to change the country with the select in the bottom of the navbar
const changeCountry = () => {
    // On recupere le select dans la navbar
    const recupCountry = document.getElementById("switch_country").value;

    //  On change le cookies pays de la personne en fonction de la nouvelle valeur du select
    axios.post('/api/set-country', {
        country: recupCountry
    })
        .then(e => {
            console.log(e.data)
        })
        .catch(err => {
            console.error(err)
        })

    // On recharge la page pour que le chatbot puisse prendre en compte le nouveau pays
    window.location.reload();
}
document.getElementById("switch_country").addEventListener("change", changeCountry)

// Function to save the country in the cookies
const setCountry = () => {
    // we recup the value of the select
    const recupCountry = document.getElementById("english_loc");

    // if the value is null we show the popup
    if (recupCountry.value === "null") {
        language_Popup_container.classList.add("show");

        // Add an error message if the user don't select a country
        if (document.querySelector(".errorLang")) {
        } else {
            const errorMessage = "Please select a country";
            const selectElement = document.getElementById("english_loc");
            selectElement.insertAdjacentHTML('afterend', '<p class="errorLang">' + errorMessage + '</p>');
        }
    } else {

        // save the country in the cookies
        axios.post('/api/set-country', {
            country: recupCountry.value
        })
            .then(e => {
                console.log(e.data)
            })
            .catch(err => {
                console.error(err)
            })

        // close the popup
        language_Popup_container.classList.remove("show");
        language_Popup_container.classList.add("close");


        // we recup the select in the navbar
        const select = document.getElementById("switch_country");

        // we put the value of the select in the navbar to the value of the select in the popup
        select.value = recupCountry.value;

    }
}
submitToClosePopup.addEventListener("click", setCountry);

// Function to verify if a country is select in the cookies, else we show the popup
const getCountry = () => {
    axios.get("/api/get-country")
        .then(e => {
            if (!e.data) {
                language_Popup_container.classList.add("show");
            } else {
                if (e.data.country == null) {
                    language_Popup_container.classList.add("show");
                } else {
                    language_Popup_container.classList.remove("show");
                    language_Popup_container.classList.add("close");
                    document.getElementById("switch_country").value = e.data.country;
                    document.getElementById("switch_country").value = e.data.country;
                }
            }

        })
        .catch(err => {
            console.error(err)
        })
}

getCountry();

// Global variable for the country
let country;

// Function to synchronize the country select and the one in the navbar
function synchronizeSelectCountry() {
    // we recup the cookie save by setCountry()
    axios.get("/api/get-country")
        .then(e => {
            if(!e.data){
                language_Popup_container.classList.add("show");
            }else{
                if(e.data.country == null){
                    language_Popup_container.classList.add("show");
                }else{
                    // we recup the found country in the cookies
                    country = e.data.country;

                    language_Popup_container.classList.remove("show");
                    language_Popup_container.classList.add("close");
                    document.getElementById("switch_country").value = country;
                }
            }
        })
        .catch(err => {
            console.error(err)
        })
};

// we call the function to synchronize the select in the navbar and the one in the popup
synchronizeSelectCountry();

//When loading the DOM, wait 2 seconds, then display the main content
document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('body-content');
    setTimeout(function () {
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

// Declaring the question variable
let question;


// Function to send the user's question
const sendQuestion = () => {
    // Retrieve the user's question
    question = userInput.value;

    // Display the user's question
    console.log(question);
    if (!question) return;

    setTimeout(() => {
        const nextChatLi = createReponseLi("I'm thinking...", "reponse-BOT");
        //we simulate the reflection of the chatbot (we will improve this part so that the chatbot writes . then . then . then the answer )
        chat.appendChild(nextChatLi);
        chat.scrollTo(0, chat.scrollHeight);
        responseGeneration(nextChatLi, country);
    }, 600);

    //we display the user's question in a new block that belongs to the "response-User" class li
    chat.appendChild(createReponseLi(question, "reponse-User"));

    // we empty the input field
    userInput.value = "";
}
buttonUser.addEventListener('click', sendQuestion); // we add an event to the click on the button


// Function to generate the chatbot's response
const responseGeneration = (nextChatLi, enCountry) => {
    console.log(enCountry);
    axios.post('/api/retrieve-answer',
        {
            question: question,
            country: enCountry
        })
        .then(e => {
            nextChatLi.querySelector('p').textContent = e.data.response;
        })
        .catch(error => {
            nextChatLi.classList.add("error");
            nextChatLi.querySelector('p').textContent = "An error spawned, retry later.";
        })
        .finally(() => {
            chat.scrollTo(0, chat.scrollHeight);
        });
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

//Allows you to enlarge the input control according to the number of lines upwards without leaving the window
userInput.addEventListener('keyup', e => {
    userInput.style.height = "30px";
    let newHeight = e.target.scrollHeight;
    console.log(newHeight);
    userInput.style.height = newHeight + "px";
});

//allows if the enter button is pressed and the popup is closed to send the question
userInput.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendQuestion();
    }
});

const setCursorTextOnTextarea = () => {
    userInput.focus();
}