class ProductManager {
    #products
    #idCounter = 0

    constructor() {
        this.#products = [];
    }

    #generateId = () => ++this.#idCounter

    #verifProduct = product => {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("ERROR: Debes completar todos los campos")
            return false
        }
        const exist = this.#products.find(producto => producto.code === product.code)
        if (exist) {
            console.error("ERROR: El codigo de producto ya existe")
            return false
        }
        return true
    }

    getProducts = () => this.#products;

    getProductsById = id => {
        const exist = this.#products.find(product => product.id === id)
        return exist ? exist : "Product Not Found"
    }

    addProduct = product => {
        if (this.#verifProduct(product)) {
            this.#products.push({ id: this.#generateId(), ...product })
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

const productManager = new ProductManager();

const producto1 = new Product(
    "Producto 1",
    "El Bananero",
    500,
    "https://e.radio-grpp.io/medium/2021/04/15/083608_1083232.jpg",
    "5001",
    8
);

const producto2 = new Product(
    "Producto 2",
    "La paraste de pecho colorado",
    800,
    "https://e.radio-grpp.io/medium/2021/04/15/083608_1083232.jpg",
    "5003",
    10
);

const producto3 = new Product(
    "Producto 3",
    "El Peluca Sape",
    600,
    "https://e.radio-grpp.io/medium/2021/04/15/083608_1083232.jpg",
    "5001",
    3
);

// productManager.addProduct(producto1)
// productManager.addProduct(producto2)
// productManager.addProduct(producto3)
// console.log(productManager.getProducts());
// console.log(productManager.getProductsById(2));


///////////////////////////////

const products = [
    {
        id: 30,
        name: "Agua Con Gas 1,5 lts",
        stock: 86,
        cost: 45,
    },
    {
        id: 29,
        name: "Agua Sin Gas 1,5 lts",
        stock: 100,
        cost: 140,
    },
    {
        id: 76,
        name: "Alambrado Chardonnay 750 ml",
        stock: 92,
        cost: 575,
    }
]

let error = true

const traerProductos = () => products

const getProducts = () => {
    return new Promise((resolve, reject) => {
        if (error) {
            reject("Sucedio un error")
        } else {
            setTimeout(() => {
                resolve(traerProductos())
            }, 2000)
        }
    })
}

getProducts(traerProductos)
    .then(datos => console.log(datos))
    .catch(erro => console.log(erro))
