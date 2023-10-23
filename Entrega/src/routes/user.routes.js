import { Router } from "express";
import * as controllers from "../controllers/user.controllers.js"
import passport from "passport";
import { lastConnection } from "../middlewares/auth.middleware.js";
import { uploadDocument } from "../middlewares/multer.middleware.js"

const router = Router()

router.post('/register', passport.authenticate('register', {
    successRedirect: '/api/views/products',
    failureRedirect: '/api/views/login',
    failureFlash: true
}));


router.post('/login', passport.authenticate('local', {
    successRedirect: "/api/views/products",
    failureRedirect: "/api/views/login"
}), lastConnection)

router.get('/login-github', lastConnection , passport.authenticate('github', {
    scope: ['email'],
}))

router.get('/callbackgithub', passport.authenticate('github', {
    failureRedirect: '/api/views/login'
}), lastConnection , controllers.redirectProducts)

router.post('/logout', lastConnection ,controllers.logoutUser)

router.post('/restore-password', controllers.restorePassword1)
router.post('/reset-password', controllers.resetPassword)

router.put('/premium/:uid', controllers.updateRole)

router.post('/:uid/documents', uploadDocument, (req, res) => {
    res.send("hola")
})


export default router