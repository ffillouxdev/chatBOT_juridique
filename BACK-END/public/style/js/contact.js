/* RECUPERE LES INFORMATIONS DU FORMULAIRE ET LES ENVOIE A L'EXPERT */
const nameInput = document.getElementById("Nom");
const firstNameInput = document.getElementById("Préom"); 
const emailInput = document.getElementById("Email"); 
const messageInput = document.getElementById("Message");
const sendBtn = document.getElementById("submit");

//constante qui permet de recuperer toutes les valeurs des inputs et de les envoyer en email
const recupMessage = () => {
    //la valeur du Nom et du Prénom sont recupéré pour être les premières infos du mail
    let valNameClient = nameInput.value;
    let valFirstNameClient = firstNameInput.value;

    //la valeur du message est la partie la plus importante car c'est le contenu de la demande en mail
    let valMessageClient = messageInput.value;    

    //Pour conclure la valeur de l'Email nous permettra de pouvoir repondre à la personne le plus rapidement possible et on y fournit le notre aussi
    let valEmailClient = emailInput.value;
    let notreEmail = "leBOT_et_Juriste@gmail.com";

    /*
        on envoie l'email avec pour syntaxe =
            expéditeur : valEmailClient
            destinataire : notreMail
            Objet: valName valFirstName
            Description : valMessage
    */
}
sendBtn.addEventListener('click', recupMessage);
