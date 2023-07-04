import { Schema, model } from 'mongoose'

const message = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
})

export default model('Message', message)