const express = require("express");
const router = express.Router();


router.post("/api/set-country", (req, res) => {
    const country = req.body.country;
    res.cookie('country', country, { httpOnly: true });
    res.status(200).json({ country: country });
})

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

router.get("/api/delete-country", (req, res) => {
    res.clearCookie('country');
    res.status(200).json({ country: null });
});

router.post("/api/accept-cookie", (req, res) => {
    res.cookie('acceptCookie', true, { httpOnly: true });
    res.status(200).json({ acceptCookie: true });
})



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

router.delete("/api/delete-accept-cookie", (req, res) => {
    res.clearCookie('acceptCookie');
    res.status(200).json({ acceptCookie: false });
});

module.exports = router;