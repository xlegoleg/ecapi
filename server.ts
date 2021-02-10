import 'module-alias/register';
import dotenv from 'dotenv';
import DB_CONNECTOR from './config/db';
import App from './app';
import UserController from '@controllers/base/UserController';
import CathegoryController from '@controllers/shop/CathegoryController';

dotenv.config({
  path: './config/config.env'
})

const PORT = process.env.API_BASE_PORT || 3000;

const app = new App([
  new UserController(),
  new CathegoryController(),
], PORT);

DB_CONNECTOR();

app.listen();