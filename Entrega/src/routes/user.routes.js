import { Router } from "express";
import * as userController from "../controllers/user.controllers.js"
import passport from "passport";

const router = Router()

router.post('/register', userController.createUser)
router.post('/login', passport.authenticate('local', {
    successRedirect: "/api/views/products",
    failureRedirect: "/api/views/login"
}))
router.post('/logout', userController.logoutUser)


export default router