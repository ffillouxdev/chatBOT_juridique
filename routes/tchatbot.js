import { Router } from "express";
const router = Router();
import fetch from "node-fetch";

let texteJurdique = "";


// Permet de récupérer les données du chatbot
router.post('/api/retrieve-answer', (req, res) => {

    const question = req.body.question;
    const country = req.body.country;

    const API_KEY = process.env.API_KEY;

    const API_URL = "https://api.openai.com/v1/chat/completions";

    // liste des pays francophones
    const countryFr = ["de France", "de Belgique", "de la partie du Canada Francophone", "du Luxembourg", "de Monaco", "de Suisse"];


    // si le pays est francophone alors textJurique correspond à la question posé en français
    if (countryFr.includes(country)) {
        texteJurdique = "Quelle loi " + country + " est en lien avec cette question et explique les fondements de cette loi de façon concise et preconise d'aller demander des conseils à un / une experte si la question concerne la personne (répond seulement si la question posé à quelque chose à voir avec le juridique sinon répond juste 'Ce n'est pas une question juridique.') : " + question;
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: texteJurdique }],
        })
    }
    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            res.status(200).json({ response: data.choices[0].message.content });
        })
        .catch(error => {
            res.status(400).json({ error: "Une erreur est survenue" });
        });
});

export default router;
