import express from "express";
import logger from "../utils/logger.js";
import sendMailLatestNews from "../service/mailService.js";

const mailController = express.Router();

mailController.post('/send-mail', async (req, res) => {
    try{
        logger.info(`${req.method}-${req.originalUrl}: Sending email`)

        const { email, data } = req.body.data;

        await sendMailLatestNews(email, data)
    
        logger.info(`${req.method}-${req.originalUrl}: Email sent`)
    
        res.status(200).send("Mail sent")
    }catch(err){
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default mailController;