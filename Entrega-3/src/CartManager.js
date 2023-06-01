import fs from "fs"

export class CartManager {
    #path
    #format

    constructor(path) {
        this.#path = path;
        this.#format = 'utf-8'
    }

    addCart = async cart => {
        const verificacion = this.#verifCart(cart)
        if (verificacion.error) return verificacion;

        const carts = await this.getCarts();
        carts.push({ id: carts.length + 1, ...cart })
        fs.promises.writeFile(this.#path, JSON.stringify(carts, null, '\t'))

        return { error: false, message: "Cart agregado correctamente" }
    }

    getCarts = async () => {
        return JSON.parse(await fs.promises.readFile(this.#path, this.#format))
    }

    getCartById = async id => {
        try {
            const carts = await this.getCarts()
            const cart = carts.find(item => item.id === id)
            if (cart) {
                return cart
            }
            else {
                throw new Error("No se encontró ningún Cart con el ID proporcionado");
            }
        } catch (error) {
            return { error: true, message: error.message }
        }
    }

    updateCart = async (idCart, idProduct) => {
        const carts = await this.getCarts();
        const index = carts.findIndex(item => item.id === idCart)
        const indexProduct = carts[index]["products"].findIndex(item => item.id === idProduct)
        let respuesta

        if (indexProduct === -1) {
            carts[index]["products"].push({ id: idProduct, quantity: 1 })
            respuesta = { error: false, message: `Se agrego el producto con el ID: ${idProduct} al CartID: ${idCart}` }
        } else {
            carts[index]["products"][indexProduct].quantity++
            respuesta = { error: false, message: `Se sumo 1 al producto con ID: ${idProduct} al CartID: ${idCart} ` }
        }
        fs.promises.writeFile(this.#path, JSON.stringify(carts, null, '\t'))
        return respuesta
    }

    deleteProduct = async id => {
        const products = await this.getProducts();
        const index = products.findIndex(item => item.id === id)
        if (index !== -1) {
            products.splice(index, 1)
            fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))
            return { error: false, message: `Se elimino el producto con el ID: ${id} ` }
        } else {
            return { error: true, message: `No se encontro el producto con el ID: ${id} ` }
        }
    }

    #verifCart = cart => {
        const { products } = cart

        if (!products) return { error: true, message: "Car is undefined" }
        if (typeof (products) !== "object") return { error: true, message: "The type of product is invalid " }

        return { error: false, message: "Cart verificado correctamente" }
    }

}