import 'module-alias/register';
import dotenv from 'dotenv';
import DB_CONNECTOR from './config/db';
import App from './app';

dotenv.config({
  path: './config/config.env'
})

const PORT = process.env.API_BASE_PORT || 3000;

const app = new App([

], PORT);

//DB_CONNECTOR();

app.listen();