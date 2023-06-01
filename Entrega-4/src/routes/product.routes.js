import { Router } from "express";
import { ProductManager } from "../ProductManager.js"

const router = Router()
const manager = new ProductManager("./products.json")

router.get('/', async (req, res) => {
    const limit = Number(req.query.limit);

    if (!limit) {
        try {
            res.send(await manager.getProducts())
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            res.status(500).send("Error al obtener los productos");
        }
    } else {
        const productos = await manager.getProducts();
        const newProducts = productos.slice(0, limit)
        res.send(newProducts)
    }
})

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const product = await manager.getProductById(id)
    if (product.error) {
        res.status(400).json({ message: product.message })
    } else {
        res.status(200).json(product)
    }
})

router.post('/', async (req, res) => {
    const product = req.body
    const resultado = await manager.addProduct(product)
    if (resultado.error) {
        res.status(400).json({ message: resultado.message })
    } else {
        res.status(201).json({ message: resultado.message })
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const newProduct = req.body
    const respuesta = await manager.updateProduct(id, newProduct)
    if (respuesta.error) {
        res.status(400).json({ message: respuesta.message })
    } else {
        res.status(200).json({ message: respuesta.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const resultado = await manager.deleteProduct(id)
    if (resultado.error) {
        res.status(400).json({ message: resultado.message })
    } else {
        res.status(200).json({ message: resultado.message })
    }
})

export default router