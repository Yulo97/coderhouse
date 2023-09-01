import config from "../config.js";

// products
import productDAO from "../dao/product.mongo.dao.js";
import ProductRepositories from "../repositories/product.repositories.js";

// carts
import CartDAO from "../dao/cart.mongo.dao.js";
import CartRepositories from "../repositories/cart.repositories.js";

// ticket
import ticketDAO from "../dao/ticket.mongo.dao.js";
import TicketRepositories from "../repositories/ticket.repositories.js";

let productServices;
let cartServices;
let ticketServices;

switch (config.dao) {
    case "mongo":
        productServices = new ProductRepositories(new productDAO())
        cartServices = new CartRepositories(new CartDAO())
        ticketServices = new TicketRepositories(new ticketDAO())
        break;

    default:
        break;
}

export {
    productServices,
    cartServices,
    ticketServices
}