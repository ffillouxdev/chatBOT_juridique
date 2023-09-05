/*******************************PARTIE WEBSITE BACK-END *******************************/

// Importation des modules
const fetch = require("node-fetch");
const express = require('express');
const path = require('path');
const fs = require('fs');
const { deflate } = require('zlib');
const nodemailer = require('nodemailer');
const exp = require('constants');
require('dotenv').config();
const jwt = require('jsonwebtoken'); // Ajout de jsonwebtoken
require('dotenv').config();


// Création de l'application express qui va gérer le serveur
const app_juridique = express();

app_juridique.use(express.json())


// Indique quel port utiliser
const PORT = 8080;

const lang = /*"en"*/process.env.LANG;

// Permet d'utiliser les fichiers statiques (css, js, images, etc...)
app_juridique.use(express.static(__dirname + "/public"));

// Permet de récupérer les données du formulaire
app_juridique.use(express.json());


// Fonction pour vérifier l'authentification via un token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); 
        }
        req.user = user;
        next();
    });
}

// Permet de récupérer les données du formulaire
app_juridique.post('/api/retrieve-answer', (req, res) => {

    const question = req.body.question;
    const country = req.body.country;

    const API_KEY = process.env.API_KEY;

     const API_URL = "https://api.openai.com/v1/chat/completions";
    
     //const ElementOfMessage = nextChatLi.querySelector('p');
    const texteJurdique = "Quelle loi "+ country + " est en lien avec cette question et explique les fondements de cette loi (répond seulement si la question posé à quelque chose à voir avec le juridique sinon répond juste 'Ce n'est pas une question juridique.') : " + question;
    const requestOptions = {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [ { role: 'user', content: texteJurdique } ],
        })
    }
    fetch(API_URL, requestOptions)
        .then(response => response.json()).then(data => {
            res.status(200).json({ response:  data.choices[0].message.content });
        })
        .catch(error =>{
            res.status(400).json({ error: "Une erreur est survenue"})    
        })
});

// on définit la route du fichier index.html qui est la page d'accueil du site
app_juridique.get('/', (req, res) => {

    let indexHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            indexHTML = fs.readFileSync(__dirname + "/public/fr/index.html", "utf8");
            break;

        case "en": 
            // Si l'utilisateur est anglais, on lui envoie la page html en anglais
            indexHTML = fs.readFileSync(__dirname + "/public/en/index.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            indexHTML = fs.readFileSync(__dirname + "/public/fr/index.html", "utf8")
            break;
    }
    // on envoie le contenu de la page html index.html
    res.send(indexHTML)
});

app_juridique.get("/Contact", (req, res) => {
    let contactHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            contactHTML = fs.readFileSync(__dirname + "/public/fr/nous-contacter.html", "utf8")
            break;

        case "en":
            // Si l'utilisateur est anglais, on lui envoie la page html en anglais
            contactHTML = fs.readFileSync(__dirname + "/public/en/contact-us.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            contactHTML = fs.readFileSync(__dirname + "/public/fr/nous-contacter.html", "utf8")
            break;
    }
    res.send(contactHTML)
});

app_juridique.post("/Contact", (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
        user : process.env.SMTP_EMAIL,
        pass : process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from : req.body.email,
        to : 'contactlawtchat@gmail.com',
        subject : `Message de ${req.body.lastname} ${req.body.firstname} qui vient de ${req.body.country}`,
        text : req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
});


app_juridique.get("/About", (req, res) => {
    let aboutHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            aboutHTML = fs.readFileSync(__dirname + "/public/fr/A-Propos.html", "utf8")
            break;

        case "en":
            // Si l'utilisateur est anglais, on lui envoie la page html en anglais
            aboutHTML = fs.readFileSync(__dirname + "/public/en/about.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            aboutHTML = fs.readFileSync(__dirname + "/public/fr/A-Propos.html", "utf8")
            break;
    }
    res.send(aboutHTML)
});

app_juridique.get("/FAQ", (req, res) => {
    let faqHTML;
});

app_juridique.get("/CookiePolicy", (req, res) => {
    let cookiePolicyHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            cookiePolicyHTML = fs.readFileSync(__dirname + "/public/fr/politique-de-cookie.html", "utf8")
            break;

        case "en":
            // if the user is english, we send him the html page in english
            cookiePolicyHTML = fs.readFileSync(__dirname + "/public/en/cookie-policy.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            cookiePolicyHTML = fs.readFileSync(__dirname + "/public/fr/politique-de-cookie.html", "utf8")
            break;
    }
    res.send(cookiePolicyHTML)
})


app_juridique.get("/Privacy-Policy", (req, res) => {
    let privacyPolicyHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            privacyPolicyHTML = fs.readFileSync(__dirname + "/public/fr/politique-confidentialite.html", "utf8")
            break;

        case "en":
            // if the user is english, we send him the html page in english
            privacyPolicyHTML = fs.readFileSync(__dirname + "/public/en/privacy-policy.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            privacyPolicyHTML = fs.readFileSync(__dirname + "/public/fr/politique-de-confidentialite.html", "utf8")
            break;
    }
    res.send(privacyPolicyHTML)
})


// on définit les routes des cookies 
app_juridique.get("/set-cookie", (req, res) => {});

app_juridique.get("/get-cookie", (req, res) => {});

app_juridique.get("/delete-cookie", (req, res) => {});




// Permet d'envoyer une page d'erreur 404 si la page demandée n'existe pas selon la langue
app_juridique.get("/*", (req, res) => { 
    let  errorHTML;
    switch(lang){
        case "fr" : 
            errorHTML = fs.readFileSync(__dirname + "/public/fr/404.html", "utf8")
            break;

        case "en" : 
            errorHTML = fs.readFileSync(__dirname + "/public/en/404.html","utf8")
            break;

        default :  
            // par défaut, on envoie la page html en français
            errorHTML = fs.readFileSync(__dirname + "/public/fr/404.html", "utf8")
            break;
    }
    res.send(errorHTML)
})

// Définition des routes de l'app_juridiquelication et indique que le serveur est lancé
app_juridique.listen(PORT, () => {
console.log(`Le serveur est lancé sur le ${PORT}...`)
});

//on écrit en console le contenu envoyé par l'utilisateur dans l'input d'index.html
app_juridique.get("/chatbot", (req, res) => {
console.log(req.query)
res.send("ok")
});


