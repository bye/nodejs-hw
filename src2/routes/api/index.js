const { Router } = require('express');
const apiRouter = Router();
const products = require('../../models/products');
const users = require('../../models/users');

apiRouter.get('/api/products', function(req, res) {
    res.json(products);
});

apiRouter.get('/api/products/:id', function(req, res) {
    res.send(products[req.params.id]);
});

apiRouter.get('/api/products/:id/reviews', function(req, res) {
    res.send(products[req.params.id].reviews);
});

apiRouter.post('/api/products', function(req, res) {
    products.push(req.body);
    res.send(req.body);
});

apiRouter.get('/api/users', function(req, res) {
    res.send(users);
});

export default apiRouter;