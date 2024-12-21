import { Router } from "express";
const router = Router();


// Permet d'accepter les cookies
router.post("/api/accept-cookie", (req, res) => {
    res.cookie('acceptCookie', true, { maxAge: 86400 * 365, httpOnly: true });
    res.status(200).json({ acceptCookie: true });
})

// Permet de savoir si l'utilisateur a accepté les cookies
router.get("/api/accept-cookie", (req, res) => {
    const cookies = req.cookies;
    if (cookies) {
        if (cookies.acceptCookie) {
            res.status(200).json({ acceptCookie: cookies.acceptCookie })
        } else {
            res.status(200).json({ acceptCookie: false });
        }
    } else {
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

export default router;