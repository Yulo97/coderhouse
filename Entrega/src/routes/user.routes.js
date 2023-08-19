import { Router } from "express";
import * as controllers from "../controllers/user.controllers.js"
import passport from "passport";

const router = Router()

router.post('/register', passport.authenticate('register', {
    successRedirect: '/api/views/products',
    failureRedirect: '/api/views/login',
    failureFlash: true
}));


router.post('/login', passport.authenticate('local', {
    successRedirect: "/api/views/products",
    failureRedirect: "/api/views/login"
}))

router.get('/login-github', passport.authenticate('github', {
    scope: ['email'],
}))

router.get('/callbackgithub', passport.authenticate('github', {
    failureRedirect: '/api/views/login'
}), controllers.redirectProducts)

router.post('/logout', controllers.logoutUser)

export default router