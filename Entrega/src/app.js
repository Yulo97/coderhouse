import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.routes.js"
import chatRouter from "./routes/chat.routes.js"
import productModel from "./dao/models/product.model.js"
import './db.js'

import messageModel from "./dao/models/message.model.js"


const app = express();
const PORT = "8080"
const httpServer = app.listen(PORT, console.log("Server UP"))
export const io = new Server(httpServer)

app.set('socketio', io)
app.use(express.json())
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use(express.static('./public'))

app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/realtimeproducts', viewsRouter)
app.use('/api/chat', chatRouter)


// WEBSOCKET 
io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('viewProducts', async () => {
        const result = await productModel.find()
        socket.emit('products', result)
    })

    socket.on('addProduct', async data => {

    })

    socket.on('viewMessage', async () => {
        const messages = await messageModel.find()
        socket.emit('messages', messages)
    })

    socket.on('chatMessage', async (data) => {

        if (!data) return console.log("No se envio ningun mensaje")

        const message = {
            user: socket.id.slice(0, 10),
            message: data
        }

        try {
            await messageModel.create(message)
            socket.broadcast.emit('chatMessage', message.user + ' : ' + message.message);
        } catch (error) {
            console.log(error)
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});