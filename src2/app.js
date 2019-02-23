export const express = require('express');
const cookieParser = require('cookie-parser');
import router from './routes';
export const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/', router)