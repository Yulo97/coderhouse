import { Schema, model } from "mongoose";

const user = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    role: { type: String, default: "user" },
    documents: [
        {
            name: { type: String },
            reference : { type: String }
        }
    ],
    last_connection: { type: Date, default: Date.now },
}, { versionKey: false })

export default model('User', user)