const Review = require('../database/models').Review;

export const ReviewsController = {
    getAll: (req, res) => {
        return Review
          .findAll({where: { productId: req.params.id}})
          .then(products => res.status(200).send(products))
          .catch(error => res.status(400).send(error));
      },
}
