const { Router } = require('express');
const router = Router();
const products = require('../models/products');
const users = require('../models/users');

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

export default router;