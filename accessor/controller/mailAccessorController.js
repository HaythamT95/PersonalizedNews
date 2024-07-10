import express from "express";
import logger from "../utils/logger.js";

const mailController = express.Router();

mailController.post('/send-mail', async (req, res) => {
    const {userID , data} = req.body.data;

    logger.info(`${req.method}-${req.originalUrl}: Sending email`)

    console.log(userID)
    console.log(data)

    res.send("Mail sent")
})

export default mailController;