const express = require("express");
const router = express.Router();

// Permet d'enregistrer le pays de l'utilisateur dans un cookie
router.post("/api/set-country", (req, res) => {
    const country = req.body.country;
    res.cookie('country', country, { maxAge: 86400 * 365, httpOnly: true });
    res.status(200).json({ country: country });
})


// Permet d'obtenir le pays de l'utilisateur depuis le cookie
router.get("/api/get-country", (req, res) => {
    const cookies = req.cookies;
    if(cookies){
        if(cookies.country){
            res.status(200).json({ country: cookies.country })
        }else{
            res.status(200).json({ country: null });
        }
    } else{
        res.status(200).json({ country: null });

    }
})

// Permet de supprimer le cookie pays
router.get("/api/delete-country", (req, res) => {
    res.clearCookie('country');
    res.status(200).json({ country: null });
});


// Permet d'accepter les cookies
router.post("/api/accept-cookie", (req, res) => {
    res.cookie('acceptCookie', true, { maxAge: 86400 * 365, httpOnly: true });
    res.status(200).json({ acceptCookie: true });
})

// Permet de savoir si l'utilisateur a accepté les cookies
router.get("/api/accept-cookie", (req, res) => {
    const cookies = req.cookies;
    if(cookies){
        if(cookies.acceptCookie){
            res.status(200).json({ acceptCookie: cookies.acceptCookie })
        }else{
            res.status(200).json({ acceptCookie: false });
        }
    } else{
        res.status(200).json({ acceptCookie: false });
    }
})

// Permet de supprimer le cookie acceptCookie
router.get("/api/delete-accept-cookie", (req, res) => {
    res.clearCookie('acceptCookie');
    res.status(200).json({ acceptCookie: false });
});


// Permet de suppimer le cookie acceptCookie
router.delete("/api/delete-accept-cookie", (req, res) => {
    res.clearCookie('acceptCookie');
    res.status(200).json({ acceptCookie: false });
});

module.exports = router;