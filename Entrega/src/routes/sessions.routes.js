import { Router } from "express";
import * as controllers from "../controllers/sessions.controllers.js"

const router = Router()

router.get('/current', controllers.getCurrentUser)

export default router

