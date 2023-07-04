import { Schema, model } from "mongoose";

const cart = new Schema({
    products: {
        type: [{
            _id: false,
            product: Schema.Types.ObjectId,
            quiantity: Number
        }],
        default: []
    }
})

export default model('Cart', cart);