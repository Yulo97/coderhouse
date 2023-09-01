import { Schema, model } from "mongoose";

const ticket = new Schema({
    code: String,
    purcharse_datetime: { type: Date, default: Date.now },
    amount: Number,
    purcharser: String
}, { versionKey: false })

export default model('Ticket', ticket)