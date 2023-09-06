/******************************PARTIE COOKIES****************************/
const refuserCookies = document.getElementById("refuser_cookies");
const accepterCookies = document.getElementById("accepter_cookies");
const cookiesContainer = document.querySelector(".cookies_container");

// Fonction pour refuser les cookies
refuserCookies.addEventListener("click", function () {
    axios.get("/api/delete-accept-cookie")
    .then(e => {
        console.log("cookie refusé")
        window.location.href = "https://google.com"
    })
    .catch(err => {
        console.error(err)
    })
});


// Fonction pour accepter les cookies
accepterCookies.addEventListener("click", function () {
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
});

// Fonction pour vérifier si l'utilisateur a déjà accepté les cookies
const checkCookie = () => {
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

checkCookie();


/***************************PARTIE LANG POPUP****************************/
const language_Popup_container = document.querySelector(".langage_Popup_container")
const submitToClosePopup = document.getElementById("submitP");

/*
 * Une popup qui demande la localisation en anglais, précise les lois de chaque pays anglais et n'apparaît qu'à la première connexion de l'utilisateur,
 *si je navigue sur le site et que je reviens sur la page d'accueil la popup n'apparaîtra plus.
*/







// Fonction qui permet de changer de pays en fonction du select en bas de la navbar
const changeCountry = () => {
    // On recupere le select dans la navbar
    const recupCountry = document.getElementById("changer_pays").value;

    //On change le cookies pays de la personne en fonction de la nouvelle valeur du select
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
document.getElementById("changer_pays").addEventListener("change", changeCountry);


// Fonction qui permet d'enregistrer le pays de l'utilisateur dans les cookies
const setCountry = () => {
    // On recupere le pays de l'utilisateur dans le select
    const recupCountry = document.getElementById("french_loc");

    //On verifie qu'il ne laisse pas la valeur à null en lui envoyant un warning
    if (recupCountry.value === "null") {
        language_Popup_container.classList.add("show");

        //ajoute un <p> en rouge pour dire à l'utilisateur de sélectionner un pays une seule fois
        if (document.querySelector(".errorLang")) {
        } else {
            const erreurMessage = "Veuillez sélectionner un pays.";
            const selectElement = document.getElementById("french_loc");
            selectElement.insertAdjacentHTML('afterend', '<p class="errorLang">' + erreurMessage + '</p>');
        }
    } else {

        // On enregistre le pays de l'utilisateur dans le cookie
        axios.post('/api/set-country', {
            country: recupCountry.value
        })
            .then(e => {
                console.log(e.data)
            })
            .catch(err => {
                console.error(err)
            })

        // On appelle la methode pour synchroniser le select de la navbar avec le select de la popup
        synchronizeSelectCountry();

        // On ferme la popup
        language_Popup_container.classList.remove("show");
        language_Popup_container.classList.add("close");
    }
}
submitToClosePopup.addEventListener("click", setCountry);


// verification des cookies pays pour savoir si il faut afficher la popup
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
                    document.getElementById("changer_pays").value = e.data.country;
                    document.getElementById("changer_pays").value = e.data.country;
                }
            }

        })
        .catch(err => {
            console.error(err)
        })
}

getCountry();

// variable globale pour le pays
let country;
console.log(country)

// Fonction pour rendre le pays choisi sélectionné dans le <select> de la barre de navigation
function synchronizeSelectCountry() {
    // on recupere le cookie pays enregistrer par setCountry()
    axios.get("/api/get-country")
        .then(e => {
            if (!e.data) {
                language_Popup_container.classList.add("show");
            } else {
                if (e.data.country == null) {
                    language_Popup_container.classList.add("show");
                } else {
                    // on recupere le pays trouvée dans les cookies
                    country = e.data.country; 

                    language_Popup_container.classList.remove("show");
                    language_Popup_container.classList.add("close");
                    document.getElementById("changer_pays").value = e.data.country;
                    document.getElementById("changer_pays").value = e.data.country;
                }
            }
        
        })
        .catch(err => {
            console.error(err)
        })
    
    
    console.log(country)
    // on recupere le select dans la navbar
    const select = document.getElementById("changer_pays");

    // On met la valeur du select dans la navbar 
    select.value = country;
};

// On appelle la fonction pour synchroniser le select de la navbar avec le select de la popup
synchronizeSelectCountry();

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
        responseGeneration(nextChatLi, country);
    }, 600);

    //on affiche la question de l'utilisateur dans un nouveau bloc qui appartient au li de class "reponse-User"
    chat.appendChild(createReponseLi(question, "reponse-User"));

    //on vide le champ de saisie
    userInput.value = "";
}
//on ajoute un evenement au click sur le bouton
buttonUser.addEventListener('click', sendQuestion);


// Fonction pour générer la réponse du chatbot
const responseGeneration = (nextChatLi, country) => {
    // Récupération de la clé API
    axios.post('/api/retrieve-answer',
        {
            question: question,
            country: country
        })
        .then(e => {
            console.log(e.data.response, "responseGeneration")
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

