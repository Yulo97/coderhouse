import mongoose from "mongoose"
import config from "./config.js"

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch((error) => console.error('Error:', error))
