    /*******************************PARTIE WEBSITE BACK-END *******************************/

    // Importation des modules
    const express = require('express');
    const path = require('path');
    const fs = require('fs');
    const { deflate } = require('zlib');

    // Création de l'application express qui va gérer le serveur
    const app_juridique = express();

    // Indique quel port utiliser
    const PORT = 8080;

    const lang = process.env.LANG.slice(0, 2);

    // Permet d'utiliser les fichiers statiques (css, js, images, etc...)
    app_juridique.use(express.static(__dirname + "/public"));

    // on définit la route du fichier index.html qui est la page d'accueil du site
    app_juridique.get('/', (_, res) => {
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
    })

    app_juridique.get("/Contact", (_, res) => {
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
    })

    app_juridique.get("/About", (_, res) => {
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
    })


    // Permet d'envoyer une page d'erreur 404 si la page demandée n'existe pas selon la langue
    app_juridique.get("/*", (_, res) => { 
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
