export const express = require('express');
const cookieParser = require('cookie-parser');
import apiRouter from './routes/api';
export const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/', apiRouter)