import { Router } from "express";
import { passwordEncrypt } from "../utils/password.js";

const router = Router()

router.get('/current', (req, res) => {
    res.json({ user: req.user })
})

router.get('/prueba', (req, res) => {

    const { pass } = req.query

    try {
        res.json({ pass: pass, passEncrypted: passwordEncrypt(pass) })
    } catch (error) {
        console.log(error)
    }
})

export default router

