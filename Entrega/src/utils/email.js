import nodemailer from "nodemailer"
import config from "../config.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'giulianodv97@gmail.com',
      pass: config.passwordEmail
    }
  });

export const restorePasswordEmail = async (email, token) => {
    try {
        const info = await transporter.sendMail({
            from: 'giulianodv97@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Restablecer contraseña ✔", // Subject line
            html: `<b>Haz click en el siguiente enlace para restablecer tu contraseña</b><br>
            <a href="http://localhost:8080/api/views/restore-password/${token}">Click Aqui</a>
            `
          });

        return info
    } catch (error) {
        console.log(error)
    }
}