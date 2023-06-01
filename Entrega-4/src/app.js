import express from "express"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"

const app = express();

const PORT = "8080"
app.listen(PORT, console.log("Server UP"))
app.use(express.json())

app.get('/api', (req, res) => {
    res.send("Bienvenido al inicio")
})


app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)