export const express = require('express');
const cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');
import apiRouter from './routes/api';
import authRouter from './routes/auth'
export const app = express();

const db = new Sequelize('test-db', 'me', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});

db.authenticate()
    .then(() => console.log('Success!'))
    .catch(err => console.error(`Error: ${err}`));

app.use(cookieParser());
app.use(express.json());

app.use('/', apiRouter);
app.use('/auth', authRouter);