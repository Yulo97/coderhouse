import mongoose from "mongoose"

mongoose.connect('mongodb+srv://giulianodv97:Giuli153064343@cluster0.n4zjmcm.mongodb.net/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch((error) => console.error('Error:', error))
