import fs from "fs"

class ProductManager {
    #path
    #format

    constructor(path) {
        this.#path = path;
        this.#format = 'utf-8'
    }

    addProduct = async product => {
        const products = await this.getProducts();
        products.push({ id: products.length + 1, ...product })
        return fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))
    }

    getProducts = async () => {
        return JSON.parse(await fs.promises.readFile(this.#path, this.#format))
    }

    getProductById = async id => {
        const products = await this.getProducts()
        const NewProduct = products.find(item => item.id === id)
        if (NewProduct) {
            return NewProduct
        } else {
            console.log("No se encontro el producto")
        }
    }

    updateProduct = async (id, product) => {
        const products = await this.getProducts();
        const index = products.findIndex(item => item.id === id)
        if (index !== -1) {
            products.splice(index, 1, { id: id, ...product })
            return fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))
        } else {
            console.log("No se encontro el producto a actualizar")
        }
    }

    deleteProduct = async id => {
        const products = await this.getProducts();
        const index = products.findIndex(item => item.id === id)
        if (index !== -1) {
            products.splice(index, 1, { id: id, ...product })
            return fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'))
        } else {
            console.error("No se encontro el producto a eliminar")
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const manager = new ProductManager('./products.json')

const producto = new Product(
    "Producto 5",
    "El Pelucaaaa Sapeeeee",
    600,
    "https://e.radio-grpp.io/medium/2021/04/15/083608_1083232.jpg",
    "5041",
    8
);
