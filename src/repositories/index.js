import AuthRepository from "./AuthRepository.js";
import CartRepository from "./CartRepository.js";
import TicketRepository from "./TicketRepository.js";
import ProductRepository from "./ProductRepository.js";
import UserRepository from './UserRepository.js';

import CartDao from '../db/mongo/dao/CartDao.js';
import TicketDao from '../db/mongo//dao/TicketDao.js';
import ProductDao from '../db/mongo/dao/ProductDao.js';
import UserDao from '../db/mongo/dao/UserDao.js';


export const authService = new AuthRepository();
export const cartService = new CartRepository(new CartDao());
export const ticketService = new TicketRepository(new TicketDao());
export const productService = new ProductRepository(new ProductDao());
export const userService = new UserRepository(new UserDao());
