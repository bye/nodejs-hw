export const express = require('express');
const cookieParser = require('cookie-parser');
import apiRouter from './routes/api';
import authRouter from './routes/auth'
export const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/', apiRouter);
app.use('/auth', authRouter);
