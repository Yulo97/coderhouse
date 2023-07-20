import { Schema, model } from "mongoose";

const user = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }
}, { versionKey: false })

export default model('User', user)