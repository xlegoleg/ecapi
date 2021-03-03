import 'module-alias/register';
import dotenv from 'dotenv';
import DB_CONNECTOR from './config/db';
import App from './app';
import UserController from '@controllers/base/UserController';
import AuthController from '@controllers/base/AuthController';
import CathegoryController from '@controllers/shop/CathegoryController';
import SpecificationController from '@controllers/shop/SpecificationController';
import ProductController from '@controllers/shop/ProductController';
import CartController from '@controllers/shop/CartController';
import PostController from '@controllers/blog/PostsController';
import { dateWithCurrentTimeZone } from '@utils/dates';

dotenv.config({
  path: './config/config.env'
})

const PORT = process.env.API_BASE_PORT || 3000;

const app = new App([
  new UserController(),
  new CathegoryController(),
  new ProductController(),
  new SpecificationController(),
  new CartController(),
  new AuthController(),
  new PostController()
], PORT);

DB_CONNECTOR();

app.listen();