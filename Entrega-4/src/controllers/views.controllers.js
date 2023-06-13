import { ProductManager } from "../ProductManager.js";

const manager = new ProductManager("./products.json");

export const getProducts = async (req, res) => {
    const products = await manager.getProducts()
    res.render('index', { products })
};