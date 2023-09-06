/*******************************PARTIE WEBSITE BACK-END *******************************/
// Importation des modules
const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken'); // Ajout de jsonwebtoken
require('dotenv').config();
const cookieParser = require("cookie-parser");


// Importation des routes
const cookieRoutes = require("./routes/cookies");
const chatbotRoutes = require("./routes/chatbot");
const pagesRoutes = require("./routes/pages");

// Création de l'application express qui va gérer le serveur
const app_juridique = express();

app_juridique.use(express.json())


// Indique quel port utiliser
const PORT = 8080;



// Permet d'utiliser les fichiers statiques (css, js, images, etc...)
app_juridique.use(express.static(__dirname + "/public"));

// Permet de récupérer les données du chatbot, des routes aussi
app_juridique.use(express.json());
app_juridique.use(cookieParser());
app_juridique.use("/", chatbotRoutes);
app_juridique.use("/", cookieRoutes);
app_juridique.use("/", pagesRoutes);

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


// Définition des routes de l'app_juridiquelication et indique que le serveur est lancé
app_juridique.listen(PORT, () => {
console.log(`Le serveur est lancé sur le ${PORT}...`)
});

//on écrit en console le contenu envoyé par l'utilisateur dans l'input d'index.html
app_juridique.get("/chatbot", (req, res) => {
console.log(req.query)
res.send("ok")
});

