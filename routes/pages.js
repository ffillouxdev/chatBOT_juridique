import { Router } from "express";
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));


const router = Router();

// Variable globale pour la langue de l'utilisateur
let lang;

// Fonction qui trouve la langue du navigateur de l'utilisateur
const findLanguage = (req, res, next) => {
    const acceptLanguage =  ["fr", "fr-FR"];
    const language = req.headers["accept-language"];
    
    if (language) {
        // on fait une boucle dans req.locals.language pour s'arreter à la premiere ',' et on récupère la langue de l'utilisateur
        for(let i = 0; i < language.length; i++){
            if(language[i] === ','){
                lang = language.slice(0, i);
                break;
            }
        }
    } else {
        // si la langue n'est pas définie, on envoie la page html en français
        lang = "fr";
    }
    next();
}

// On utilise la fonction findLanguage pour trouver la langue de l'utilisateur
router.use(findLanguage);

// on définit la route du fichier index.html qui est la page d'accueil du site
router.get('/', (req, res) => {
    console.log('GET /index');
    let indexHTML;
    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            indexHTML = readFileSync(__dirname + "/../public/index.html", "utf8");
            break;

        case "fr-FR":
            // Si l'utilisateur est français, on lui aussi envoie la page html en français
            indexHTML = readFileSync(__dirname + "/../public/index.html", "utf8");
            break;

        default:
            // par défaut, on envoie la page html en français
            indexHTML = readFileSync(__dirname + "/../public/index.html", "utf8")
            break;
    }
    // on envoie le contenu de la page html index.html
    res.send(indexHTML)
});

router.get("/contact", (req, res) => {
    console.log('GET /contact');
    let contactHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            contactHTML = readFileSync(__dirname + "/../public/contact.html", "utf8")
            break;

        case "fr-FR":
            // Si l'utilisateur est français, on lui aussi envoie la page html en français
            contactHTML = readFileSync(__dirname + "/../public/contact.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            contactHTML = readFileSync(__dirname + "/../public/contact.html", "utf8")
            break;
    }
    res.send(contactHTML)
});

router.get("/about", (req, res) => {
    console.log('GET /about');
    let aboutHTML;
   
    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            aboutHTML = readFileSync(__dirname + "/../public/about.html", "utf8")
            break;

        case "fr-FR":
            // Si l'utilisateur est français, on lui aussi envoie la page html en français
            aboutHTML = readFileSync(__dirname + "/../public/about.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            aboutHTML = readFileSync(__dirname + "/../public/about.html", "utf8")
            break;
    }
    res.send(aboutHTML)
});

router.get("/cookie-policy", (req, res) => {
    console.log('GET /cookie-policy');
    let cookiePolicyHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            cookiePolicyHTML = readFileSync(__dirname + "/../public/politique-de-cookie.html", "utf8")
            break;

        case "fr-FR":
            // Si l'utilisateur est français, on lui aussi envoie la page html en français
            cookiePolicyHTML = readFileSync(__dirname + "/../public/politique-de-cookie.html", "utf8")
            break;

        default:
            // par défaut, on envoie la page html en français
            cookiePolicyHTML = readFileSync(__dirname + "/../public/politique-de-cookie.html", "utf8")
            break;
    }
    res.send(cookiePolicyHTML)
})


router.get("/privacy-policy", (req, res) => {
    console.log('GET /privacy-policy');
    let privacyPolicyHTML;

    // On vérifie la langue de l'utilisateur et on lui envoie la page html correspondante à sa langue
    switch (lang) {
        case "fr":
            // Si l'utilisateur est français, on lui envoie la page html en français
            privacyPolicyHTML = readFileSync(__dirname + "/../public/politique-confidentialite.html", "utf8")
            break;

        case "fr-FR":
            // Si l'utilisateur est français, on lui aussi envoie la page html en français
            privacyPolicyHTML = readFileSync(__dirname + "/../public/politique-confidentialite.html", "utf8")
            break;

            default:
            // par défaut, on envoie la page html en français
            privacyPolicyHTML = readFileSync(__dirname + "/../public/politique-de-confidentialite.html", "utf8")
            break;
    }
    res.send(privacyPolicyHTML)
})


router.get("/FAQ", (req, res) => {
    console.log('GET /FAQ');
    let faqHTML;
    
    switch(lang){
        case "fr" :
            faqHTML = readFileSync(__dirname + "/../public/FAQ.html", "utf8")
            break;

        case "fr-FR":
            faqHTML = readFileSync(__dirname + "/../public/FAQ.html", "utf8")
            break;

        default :
            faqHTML = readFileSync(__dirname + "/../public/FAQ.html", "utf8")
            break;
    }
    res.send(faqHTML)
})


// Permet d'envoyer une page d'erreur 404 si la page demandée n'existe pas selon la langue
router.get("/*", (req, res) => { 
    console.log('GET /*');
    let  errorHTML;

    switch(lang){
        case "fr" : 
            errorHTML = readFileSync(__dirname + "/../public/404.html", "utf8")
            break;

        case "fr-FR":
            errorHTML = readFileSync(__dirname + "/../public/404.html", "utf8")
            break;

        default :  
            // par défaut, on envoie la page html en français
            errorHTML = readFileSync(__dirname + "/../public/404.html", "utf8")
            break;
    }
    res.send(errorHTML)
})

export default router;














// router.post("/Contact", (req, res) => {

   
    
//     console.log(req.body);

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         host: 'smtp.gmail.com',
//         auth : {
//             user : process.env.SMTP_EMAIL,
//             pass : process.env.SMTP_PASSWORD
//         }
//     })

//     const mailOptions = {
//         from : req.body.email,
//         to : 'contactlawtchat@gmail.com',
//         subject : `Message de ${req.body.lastname} ${req.body.firstname} qui vient ${req.body.country}`,
//         text : req.body.message
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//         if(error){
//             console.log("error",error);
//         } else {
//             console.log('Email successfully sent!' + info.response);
//         }
//     })
// });