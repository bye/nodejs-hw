const { Router } = require('express');
const apiRouter = Router();
const pg = require('pg');
import { products } from '../../models/products';
import { users } from '../../models/users';
import { checkToken } from '../../middlewares';

apiRouter.get('/api/products', checkToken, function(req, res) {
    const client = new pg.Client(process.env.DATABASE_URL);
    client.connect((connectionError) => {
        client.query('')
    })
    res.json(products);
});

apiRouter.get('/api/products/:id', checkToken, function(req, res) {
    res.send(products[req.params.id]);
});

apiRouter.get('/api/products/:id/reviews', checkToken, function(req, res) {
    res.send(products[req.params.id].reviews);
});

apiRouter.post('/api/products', checkToken, function(req, res) {
    products.push(req.body);
    res.send(req.body);
});

apiRouter.get('/api/users', checkToken, function(req, res) {
    res.send(users);
});

export default apiRouter;