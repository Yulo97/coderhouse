import { userServices } from "../services/index.js";
import { restorePasswordEmail } from "../utils/email.js";
import jwt from "jsonwebtoken"
import config from "../config.js";
import { passwordEncrypt } from "../utils/password.js";

export const logoutUser = (req, res) => {
    req.logout((error) => {
        if (error) return res.status(500).json({ status: error, message: 'Error al realizar el logout.' });
        res.redirect('/api/views/login');
    });
}

export const redirectProducts = (req, res) => {
    res.redirect('/api/views/products')
}

export const restorePassword1 = async (req, res) => {
    const email = req.body.email
    const response = await userServices.findOne(email)
    console.log(response)

    if(response === null) return res.status(400).json({error: true, message: "Email no encontrado"})

    const payload = {
        _id: response._id,
        email: response.email
    }
    
    // Genera el token JWT
    const token = jwt.sign(payload, config.keyJWT, { expiresIn: '1h' });
    
    restorePasswordEmail(response.email, token)

    res.status(200).json({status: "success", message: "El correo se envio correctamente para reestablecer la password."})
}

export const resetPassword = async (req,res) => {
    const password = req.body.password
    const verifPassword = req.body.verifpassword
    const token = req.body.token

    const decoded = jwt.verify(token, config.keyJWT)

    if(verifPassword != password) return res.json({status: "error", message: "Las contraseñas no coinciden"})

    try {
        userServices.update(decoded._id, { password: passwordEncrypt(password) })
        res.status(200).json({status: "success", message: "Contraseña cambiada correctamente "})
    } catch (error) {
        console.log("ocurrio un error")
    }
}
