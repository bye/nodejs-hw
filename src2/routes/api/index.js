const { Router } = require('express');
const apiRouter = Router();
import { UsersController } from '../../controllers/usersController';
import { ProductsController } from '../../controllers/productsController';
import { ReviewsController }from '../../controllers/reviewsController';
import { checkToken } from '../../middlewares';

apiRouter.get('/api/products', checkToken, ProductsController.getAll);

apiRouter.get('/api/products/:id', checkToken, ProductsController.getById);

apiRouter.get('/api/products/:id/reviews', checkToken, ReviewsController.getAll);

apiRouter.post('/api/products', checkToken, ProductsController.create);

apiRouter.get('/api/users', checkToken, UsersController.getAll);

export default apiRouter;