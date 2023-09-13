const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const smtpTransport = require('nodemailer-smtp-transport'); 
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { google } = require('googleapis'); 


const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(process.env.clientId, process.env.clientSecret);
OAuth2_client.setCredentials({ refresh_token: process.env.refreshToken });



router.post('/Contact', (req, res) => {
    const accessToken = OAuth2_client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        //host: 'smtp.gmail.com',
        auth : {
            type : 'OAuth2',
            user : process.env.SMTP_EMAIL,
            pass : process.env.SMTP_PASSWORD,
            clientId : process.env.clientId,
            clientSecret : process.env.clientSecret,
            refreshToken : process.env.refreshToken,
            accessToken : accessToken,
        }
    })

    const mailOptions = {
        from : req.body.email,
        to : 'contactlawtchat@gmail.com',
        subject : `Message de ${req.body.lastname} ${req.body.firstname} qui vient ${req.body.country}`,
        text : req.body.message,
        html : `<p>${req.body.message}</p>`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("error",error);
            alert("Aie, l'email n'a pas pu être envoyé");
        } else {
            console.log('Email successfully sent!' + info.response);
            alert("L'email a bien été envoyé");
        }
        transporter.close();
    })
});

module.exports = router;