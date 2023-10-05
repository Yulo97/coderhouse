import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const product = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    code: { type: String, unique: true, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    owner: { type: String, default: "admin"},
    thumbnails: { type: [String], default: [] }
}, { versionKey: false })

product.plugin(mongoosePaginate)
export default model('Product', product)