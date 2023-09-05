/******************************PARTIE COOKIES****************************/
const refuserCookies = document.getElementById("refuser_cookies");
const accepterCookies = document.getElementById("accepter_cookies");
const cookiesContainer = document.querySelector(".cookies_container");

// Fonction pour refuser les cookies
refuserCookies.addEventListener("click", function () {
    localStorage.setItem("cookies", "refuser");
    cookiesContainer.classList.add("close");

    // appeler la popup de langue pour apparaître avec un délai de 2 secondes
    setTimeout(function () {
        checkLocalStorage();
    }, 2000);
});

// Fonction pour accepter les cookies
accepterCookies.addEventListener("click", function () {
    localStorage.setItem("cookies", "accepter");

    // Si l'utilisateur accepte les cookies, la popup n'apparaîtra plus
    cookiesContainer.classList.add("close");

    // appeler la popup de langue pour apparaître avec un délai de 2 secondes
    setTimeout(function () {
        checkLocalStorage();
    }, 2000);

});

const cookieAccepted = () => {
    axios.get("/api/accept-cookie")
        .then(e => {
            if(e.data.acceptCookie){
                cookiesContainer.classList.remove("show");
                cookiesContainer.classList.add("close");
            }else{
                cookiesContainer.classList.add("show");
                cookiesContainer.classList.remove("close");
            }
        })
        .catch(err => {
            console.error(err)
        })
}

cookieAccepted();


// verif du pays selectionné

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
                    document.getElementById("computer_changer_pays").value = e.data.country;
                    document.getElementById("changer_pays").value = e.data.country;
                }
            }

        })
        .catch(err => {
            console.error(err)
        })
}

getCountry();

/***************************PARTIE POPUP****************************/
const language_Popup_container = document.querySelector(".langage_Popup_container")


/*
 * Une popup qui demande la localisation en anglais, précise les lois de chaque pays anglais et n'apparaît qu'à la première connexion de l'utilisateur,
 *si je navigue sur le site et que je reviens sur la page d'accueil la popup n'apparaîtra plus.
*/


const submitToClosePopup = document.getElementById("submitP");

function selectLangAndClosePopup() {
    //recuperer le pays de l'utilisateur depuis le <select>
    const recupCountry = document.getElementById("french_loc").value;

    //enregistrer le pays dans le local storage
    if (recupCountry == "null") {
        language_Popup_container.classList.add("show");

        //ajoouter un <p> en rouge pour dire à l'utilisateur de sélectionner un pays une seule fois
        if (document.querySelector(".errorLang")) {
        } else {
            const errorMessage = "Veuillez sélectionner un pays.";
            const selectElement = document.getElementById("french_loc");
            selectElement.insertAdjacentHTML('afterend', '<p class="errorLang">' + errorMessage + '</p>');
        }
    } else {

        //on met le pays dans le local storage
        localStorage.setItem("country", recupCountry);

        //on appelle la fonction pour que le pays choisi soit selectionné dans le <select> de la nav bar
        synchronizeSelectCountry();

        //Ajoutez un nom de div close et ce div aura pour effet "opacity: 0;" donc la popup est fermée
        language_Popup_container.classList.add("close");
        language_Popup_container.classList.remove("show");
    }


};
submitToClosePopup.addEventListener("click", selectLangAndClosePopup);


// Fonction pour rendre le pays choisi sélectionné dans le <select> de la barre de navigation
function synchronizeSelectCountry() {
    const recupCountry = localStorage.getItem("country");
    const selectCountry = document.getElementById("changer_pays");
    selectCountry.value = recupCountry;
};

// Fonction pour changer le pays anglais qui est dans le stockage local
function changeCountry() {
    //recupere le pays de l'utilisateur depuis le <select>
    const recupCountry = document.getElementById("changer_pays").value;

    //enregistrer le pays dans le local storage
    localStorage.setItem("country", recupCountry);
};
document.getElementById("changer_pays").addEventListener("change", changeCountry);

// Au chargement du DOM, attendez 2 secondes, puis affichez le contenu principal
document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('body-content');
    setTimeout(function () {
        mainContent.style.display = 'block';
    }, 350); // Définir le délai d'attente en millisecondes (2 secondes dans cet exemple)
});



/***************************PARTIE CHATBOT****************************/

// Récupération des éléments HTML
const userInput = document.getElementById('userInput');
const buttonUser = document.getElementById('buttonUser');
const chat = document.querySelector('.chatbot-reponse');

// Déclaration de la variable heightInput
let heightInput = userInput.offsetHeight;

// Déclaration de la variable question
let question;


const responseGeneration = (nextChatLi, country) => {
    // Récupération de la clé API
    axios.post('/api/retrieve-answer',
        {
            question: question,
            country: country
        })
        .then(e => {
            nextChatLi.querySelector('p').textContent = e.data.response;
        })
        .catch(error => {
            nextChatLi.classList.add("error");
            nextChatLi.querySelector('p').textContent = "Une erreur est survenue, veuillez réessayer plus tard.";
        })
        .finally(() => {
            chat.scrollTo(0, chat.scrollHeight);
        });
}

// Fonction pour créer un li avec la réponse de l'utilisateur
const createReponseLi = (question, nameClass) => {
    // Création d'un li
    const li = document.createElement('li');
    li.classList.add("chat", nameClass);
    let contentChat = (nameClass === "reponse-User") ? '<p></p>' : '<span class="material-symbols-outlined">smart_toy</span><p></p>';
    li.innerHTML = contentChat;
    li.querySelector('p').textContent = question;
    return li;
}


// Fonction pour envoyer la question de l'utilisateur
const sendQuestion = () => {
    // Récupération de la question de l'utilisateur
    question = userInput.value;

    // Affichage de la question de l'utilisateur
    if (!question) return;

    setTimeout(() => {
        const nextChatLi = createReponseLi("Je réfléchis...", "reponse-BOT");
        //on simule la reflexion du chatbot (on ameliorera cette partie pour que le chatbot ecrive . puis . puis . puis la reponse  )
        chat.appendChild(nextChatLi);
        chat.scrollTo(0, chat.scrollHeight);
        responseGeneration(nextChatLi, localStorage.getItem("country"));
    }, 600);

    //on affiche la question de l'utilisateur dans un nouveau bloc qui appartient au li de class "reponse-User"
    chat.appendChild(createReponseLi(question, "reponse-User"));

    //on vide le champ de saisie
    userInput.value = "";
}
//on ajoute un evenement au click sur le bouton
buttonUser.addEventListener('click', sendQuestion);

//Permet d'agrandir le champ de saisie en fonction du nombre de ligne vers le haut sans que cela sorte de la fenetre
userInput.addEventListener('keyup', e => {
    userInput.style.height = "30px";
    let newHeight = e.target.scrollHeight;
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

const setCountry = (mode) => {
    let value = "none"
    if (mode == "computer") {
        const select = document.getElementById("computer_changer_pays");
        value = select.value;
    } else if(mode == "phone"){
        const select = document.getElementById("changer_pays");
        value = select.value;
    }else{
        const select = document.getElementById("french_loc");
        value = select.value; 

        const popup = document.querySelector(".langage_Popup_container")
        popup.classList.remove("show");
    }

    axios.post("/api/set-country", {
        country: value
    })
        .then(e => {
            console.log(e.data)
        })
        .catch(err => {
            console.error(err);
        })

}


const refuseCookie = () => {
    axios.delete("/api/accept-cookie")
        .then(e => {
            console.log("cookie refusé")
            window.location.href = "https://google.com"
        })
        .catch(err => {
            console.error(err)
        })
}

const acceptCookie = () => {
    axios.post("/api/accept-cookie")
        .then(e => {
            console.log("cookie accepté")
        })
        .catch(err => {
            console.error(err)
        })
}
