import dotenv from "dotenv"
dotenv.config()

export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    secretSession: process.env.SECRET_SESSION,
    passportIdGithub: process.env.PASSPORT_ID_GITHUB,
    passportClientSecretGithub: process.env.PASSPORT_CLIENT_SECRET_GITHUB,
    passportCallbackUrlGithub: process.env.PASSPORT_CALLBACK_URL_GITHUB,
    dao: process.env.DAO,
    enviroment: process.env.ENVIROMENT
}