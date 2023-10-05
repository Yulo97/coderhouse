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

// user
import userDAO from "../dao/user.mongo.dao.js"
import UserRepositories from "../repositories/user.repositories.js";

let productServices;
let cartServices;
let ticketServices;
let userServices;

switch (config.dao) {
    case "mongo":
        productServices = new ProductRepositories(new productDAO())
        cartServices = new CartRepositories(new CartDAO())
        ticketServices = new TicketRepositories(new ticketDAO())
        userServices = new UserRepositories(new userDAO())
        break;

    default:
        break;
}

export {
    productServices,
    cartServices,
    ticketServices,
    userServices
}