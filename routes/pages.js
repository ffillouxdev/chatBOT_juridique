const express = require("express");
const path = require('path');
const fs = require('fs');
const fetch = require("node-fetch");
const { deflate } = require('zlib');
const exp = require('constants');
const nodemailer = require('nodemailer');

const router = express.Router();

// indoie la langue par défaut
const lang = /*"en"*/process.env.LANG;


// on définit la route du fichier index.html qui est la page d'accueil du site
router.get('/', (req, res) => {

    let indexHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            indexHTML = fs.readFileSync(__dirname + "/../public/fr/index.html", "utf8");
            break;

        case "en": 
            // Si l'utilisateur est anglais, on lui envoie la page html en anglais
            indexHTML = fs.readFileSync(__dirname + "/../public/en/index.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            indexHTML = fs.readFileSync(__dirname + "/../public/fr/index.html", "utf8")
            break;
    }
    // on envoie le contenu de la page html index.html
    res.send(indexHTML)
});

router.get("/Contact", (req, res) => {
    let contactHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            contactHTML = fs.readFileSync(__dirname + "/../public/fr/nous-contacter.html", "utf8")
            break;

        case "en":
            // Si l'utilisateur est anglais, on lui envoie la page html en anglais
            contactHTML = fs.readFileSync(__dirname + "/../public/en/contact-us.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            contactHTML = fs.readFileSync(__dirname + "/../public/fr/nous-contacter.html", "utf8")
            break;
    }
    res.send(contactHTML)
});


router.post("/Contact", (req, res) => {
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


router.get("/About", (req, res) => {
    let aboutHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            aboutHTML = fs.readFileSync(__dirname + "/../public/fr/A-Propos.html", "utf8")
            break;

        case "en":
            // Si l'utilisateur est anglais, on lui envoie la page html en anglais
            aboutHTML = fs.readFileSync(__dirname + "/../public/en/about.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            aboutHTML = fs.readFileSync(__dirname + "/../public/fr/A-Propos.html", "utf8")
            break;
    }
    res.send(aboutHTML)
});

router.get("/FAQ", (req, res) => {
    let faqHTML;
});

router.get("/CookiePolicy", (req, res) => {
    let cookiePolicyHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            cookiePolicyHTML = fs.readFileSync(__dirname + "/../public/fr/politique-de-cookie.html", "utf8")
            break;

        case "en":
            // if the user is english, we send him the html page in english
            cookiePolicyHTML = fs.readFileSync(__dirname + "/../public/en/cookie-policy.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            cookiePolicyHTML = fs.readFileSync(__dirname + "/../public/fr/politique-de-cookie.html", "utf8")
            break;
    }
    res.send(cookiePolicyHTML)
})


router.get("/Privacy-Policy", (req, res) => {
    let privacyPolicyHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            privacyPolicyHTML = fs.readFileSync(__dirname + "/../public/fr/politique-confidentialite.html", "utf8")
            break;

        case "en":
            // if the user is english, we send him the html page in english
            privacyPolicyHTML = fs.readFileSync(__dirname + "/../public/en/privacy-policy.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            privacyPolicyHTML = fs.readFileSync(__dirname + "/../public/fr/politique-de-confidentialite.html", "utf8")
            break;
    }
    res.send(privacyPolicyHTML)
})


// Permet d'envoyer une page d'erreur 404 si la page demandée n'existe pas selon la langue
router.get("/*", (req, res) => { 
    let  errorHTML;
    switch(lang){
        case "fr" : 
            errorHTML = fs.readFileSync(__dirname + "/../public/fr/404.html", "utf8")
            break;

        case "en" : 
            errorHTML = fs.readFileSync(__dirname + "/../public/en/404.html","utf8")
            break;

        default :  
            // par défaut, on envoie la page html en français
            errorHTML = fs.readFileSync(__dirname + "/../public/fr/404.html", "utf8")
            break;
    }
    res.send(errorHTML)
})

module.exports = router;