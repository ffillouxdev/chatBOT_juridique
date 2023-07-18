// Récupération des éléments HTML
const userInput = document.getElementById('userInput');
const buttonUser = document.getElementById('buttonUser');
const chat = document.querySelector('.chatbot-reponse');

// Déclaration de la variable heightInput
let heightInput = userInput.offsetHeight;

// Déclaration de la variable API_KEY
const API_KEY = "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"; 

// Déclaration de la variable question
let question;

const responseGeneration = (nextChatLi) => {
    // Récupération de la réponse de l'API
    const API_URL = "https://api.openai.com/v1/chat/completions";
    //const ElementOfMessage = nextChatLi.querySelector('p');
    const texteJurdique = "Quelle loi française est en lien avec cette question (répond seulement si la question posé à quelque chose à voir avec le juridique sinon répond juste 'Ce n'est pas une question juridique.') : " + question;

    const requestOptions = {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Aurhorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [ { role: 'user', content: texteJurdique } ],
        })
    }
    fetch(API_URL, requestOptions).then(response => response.json()).then(data => {
        nextChatLi.querySelector('p').textContent = data.choices[0].message.content;
    }).catch(error =>{
        nextChatLi.classList.add("error");
        nextChatLi.querySelector('p').textContent = "Une erreur est survenue, veuillez réessayer plus tard.";
    }).finally(() => {chat.scrollTo(0, chat.scrollHeight);});
}



// Fonction pour créer un li avec la réponse de l'utilisateur
const createReponseLi = (question, nameClass) => {
    // Création d'un li
    const li = document.createElement('li');
    li.classList.add("chat", nameClass);
    let contentChat = (nameClass === "reponse-User") ? '<p></p>' : '<span class="material-symbols-outlined">account_circle</span><p></p>';
    li.innerHTML = contentChat;
    li.querySelector('p').textContent = question;
    return li;
}   


// Fonction pour envoyer la question de l'utilisateur
const sendQuestion = () => {
    // Récupération de la question de l'utilisateur
    question = userInput.value;

    // Affichage de la question de l'utilisateur
    console.log(question);
    if(! question) return;

    setTimeout(() => {
        const nextChatLi = createReponseLi("Je réfléchis...", "reponse-BOT");
        //on simule la reflexion du chatbot (on ameliorera cette partie pour que le chatbot ecrive . puis . puis . puis la reponse  )
        chat.appendChild(nextChatLi);
        chat.scrollTo(0, chat.scrollHeight);
        responseGeneration(nextChatLi);
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
    console.log(newHeight);
    userInput.style.height = newHeight + "px";
});
