import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    try {
        res.render('index')
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
})

export default router