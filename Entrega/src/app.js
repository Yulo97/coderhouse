import express, { urlencoded } from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.routes.js"
import userRouter from "./routes/user.routes.js"
import sessionsRouter from "./routes/sessions.routes.js"
import productModel from "./models/product.model.js"
import messageModel from "./models/message.model.js"
import session from "express-session"
import passport from "./passport-config.js"
import config from "./config.js"
import errorHanlder from "./middlewares/errors.middleware.js"
import './db.js'

const app = express();
const PORT = config.port
const httpServer = app.listen(PORT, console.log("Server UP"))
export const io = new Server(httpServer)

app.set('socketio', io)
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.engine('handlebars', handlebars.engine())

app.use(express.json())
app.use(express.static('./public'))
app.use(errorHanlder)

// Sesion
app.use(urlencoded({ extended: true }))
app.use(session({
    secret: config.secretSession,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.session())
app.use(passport.initialize())

// Routes
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/user', userRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/views', viewsRouter)

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