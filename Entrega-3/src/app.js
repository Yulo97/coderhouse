import express from "express"
import { ProductManager } from "./ProductManager.js";

const app = express();
const manager = new ProductManager('./products.json')

const PORT = "8080"
app.listen(PORT, console.log("Server UP"))

app.get('/', (req, res) => {
    res.send("Bienvenido al inicio")
})

app.get('/products', async (req, res) => {
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

app.get('/products/:id', async (req, res) => {
    const id = Number(req.params.id)
    const product = await manager.getProductById(id)
    res.send(product)
})