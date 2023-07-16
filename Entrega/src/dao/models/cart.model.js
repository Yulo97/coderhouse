import { Schema, model } from "mongoose";

const cart = new Schema({
    products: {
        type: [{
            _id: false,
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
        }],
        default: []
    }
}, { versionKey: false })

export default model('Cart', cart);