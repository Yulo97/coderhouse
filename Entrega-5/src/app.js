import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.routes.js"
import { ProductManager } from "./ProductManager.js";

const app = express();
const PORT = "8080"
const httpServer = app.listen(PORT, console.log("Server UP"))
const io = new Server(httpServer)

app.set('socketio', io)
app.use(express.json())
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use(express.static('./public'))

app.get('/api', (req, res) => {
    res.send("Bienvenido al inicio")
})

app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/realtimeproducts', viewsRouter)


const manager = new ProductManager("./products.json");

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('addProduct', async data => {
        console.log('Se ha recibido un nuevo producto:', data);
        await manager.addProduct(data);
        const nuevosProductos = await manager.getProducts();
        io.emit('updateProducts', nuevosProductos);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});