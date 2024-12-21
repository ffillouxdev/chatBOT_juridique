/*******************************PARTIE WEBSITE BACK-END *******************************/
// Importation des modules
import express, { json, static as serveStatic } from 'express';
import { config } from 'dotenv';
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

config();

// Importation des routes
import cookieRoutes from './routes/cookies.js';
import tchatbotRoutes from './routes/tchatbot.js';
import pagesRoutes from './routes/pages.js';
import nodemailerRoutes from './routes/nodemailer.js';

// Création de l'application express qui va gérer le serveur
const app_juridique = express();

app_juridique.use(json());

// Indique quel port utiliser
const PORT = 3001;

const __dirname = dirname(fileURLToPath(import.meta.url));

app_juridique.use(serveStatic(__dirname + "/public"));

// Permet de récupérer les données du chatbot, des routes aussi
app_juridique.use(json());
app_juridique.use(cookieParser());
app_juridique.use("/", tchatbotRoutes);
app_juridique.use("/", cookieRoutes);
app_juridique.use("/", pagesRoutes);
app_juridique.use("/", nodemailerRoutes);

// Fonction pour vérifier l'authentification via un token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

// // Définition des routes de l'application et indique que le serveur est lancé
app_juridique.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le ${PORT}...`);
});

// On écrit en console le contenu envoyé par l'utilisateur dans l'input d'index.html
app_juridique.get("/chatbot", (req, res) => {
    console.log(req.query);
    res.send("ok");
});

export default app_juridique;
