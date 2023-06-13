import { Router } from "express";
import * as viewsControllers from "../controllers/views.controllers.js"

const router = Router()

router.get('/', viewsControllers.getProducts)

export default router