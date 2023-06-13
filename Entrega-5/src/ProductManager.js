import fs from "fs"

export class ProductManager {
    #path
    #format

    constructor(path) {
        this.#path = path;
        this.#format = 'utf-8'
    }

    addProduct = async product => {
        const verificacion = this.#verifProduct(product)
        if (verificacion.error) return verificacion;

        const products = await this.getProducts();
        if (product.thumbnail) {
            products.push({ id: products.length + 1, status: true, ...product })
        } else {
            products.push({ id: products.length + 1, status: true, thumbnail: [], ...product })
        }
        fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))

        return { error: false, message: "Producto agregado correctamente" }
    }

    getProducts = async () => {
        try {
            const result = await fs.promises.readFile(this.#path, this.#format)
            return JSON.parse(result)
        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async id => {
        try {
            const products = await this.getProducts()
            const NewProduct = products.find(item => item.id === id)
            if (NewProduct) {
                return NewProduct
            }
            else {
                throw new Error("No se encontró ningún producto con el ID proporcionado");
            }
        } catch (error) {
            return { error: true, message: error.message }
        }
    }

    updateProduct = async (id, product) => {
        const products = await this.getProducts();
        const index = products.findIndex(item => item.id === id)
        if (index !== -1) {
            products[index] = { ...products[index], ...product }
            fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))
            return { error: false, message: `Producto con ID: ${id} actualizado` }
        } else {
            return { error: true, message: `No se encontro el ID: ${id}` }
        }
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

    #verifProduct = product => {
        const { title, description, price, thumbnail, code, stock, category } = product

        if (!title || typeof (title) !== "string") return { error: true, message: "No se agrego un titulo al producto" }
        if (!description || typeof (description) !== "string") return { error: true, message: "No se agreego la descripcion al producto" }
        if (!price || typeof (price) !== "number") return { error: true, message: "No se agrego el precio al producto" }
        if (!code || typeof (code) !== "string") return { error: true, message: "No se agrego el codigo al producto" }
        if (!stock || typeof (stock) !== "number") return { error: true, message: "No se agrego el stock al producto" }
        if (!category || typeof (category) !== "string") return { error: true, message: "No se agrego una categoria al producto" }
        if (thumbnail) {
            if (typeof (thumbnail) !== "object")
                return { error: true, message: "No se agrego un formato de imagen correcto" }
            else {
                return { error: false, message: "Producto verificado correctamente" }
            }
        }
        else return { error: false, message: "Producto verificado correctamente" }
    }
}
