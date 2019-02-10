const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();

export const app = express();

const products = [
    {
        name: 'product',
        reviews: {
            Nick: 'jkjkjlj',
            Jan: 'jkjljlkjjkjjkjkj'
        }
    },
    {
        name: 'product1',
        reviews: {
            Nicky: 'jkjkjlj',
            Jany: 'jkjljlkjjkjjkjkj'
        }
    }
];

const users = [
    {
        name: 'Vasya'
    },
    {
        name: "Petya"
    }
];

router.get('/api/products', function(req, res) {
    res.json(products);
});

router.get('/api/products/:id', function(req, res) {
    res.send(products[req.params.id]);
});

router.get('/api/products/:id/reviews', function(req, res) {
    res.send(products[req.params.id].reviews);
});

router.post('/api/products', function(req, res) {
    products.push(req.body);
    res.send(req.body);
});

router.get('/api/users', function(req, res) {
    res.send(users);
});

app.use(cookieParser());

app.use(express.json());

app.use('/', router)