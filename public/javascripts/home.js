/******************************PARTIE COOKIES****************************/
const refuserCookies = document.getElementById("refuser_cookies");
const accepterCookies = document.getElementById("accepter_cookies");
const cookiesContainer = document.querySelector(".cookies_container");
// Fonction pour vérifier si l'utilisateur a déjà accepté les cookies
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.display = "none";
    checkCookie();
    setTimeout(() => {
        document.body.style.display = "block";
       
    }, 500);
});

const checkCookie = () => {
    axios.get("/api/accept-cookie")
        .then(e => {
            if (e.data.acceptCookie) {
                cookiesContainer.classList.remove("show");
                cookiesContainer.classList.add("close");
            }
        })
        .catch(err => {
            console.error(err);
            document.body.style.display = "block";
        });
}



// Fonction pour refuser les cookies
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


// Fonction pour accepter les cookies
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
// On ajoute un evenement au click sur le bouton
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

// Permet d'agrandir le champ de saisie en fonction du nombre de ligne vers le haut sans que cela sorte de la fenetre
userInput.addEventListener('keyup', e => {
    userInput.style.height = "30px";
    let newHeight = e.target.scrollHeight;
    userInput.style.height = newHeight + "px";
});

// Permet si le bouton Entrée est enfoncé et que la fenêtre contextuelle est fermée pour envoyer la question
userInput.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendQuestion();
    }
});

const setCursorTextOnTextarea = () => {
    userInput.focus();
}

