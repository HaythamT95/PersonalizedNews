import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

async function sendMailLatestNews(to, content) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_FROM,
            pass: process.env.PASS_MAIL_FROM,
        },
    });

    await transporter.sendMail({
        from: 'Personalized News',
        to: to,
        subject: "Latest News 🔥🔥",
        html:content.replace(/\n/g, '<br>')
    });
}

export default sendMailLatestNews;