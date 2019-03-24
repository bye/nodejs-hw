const User = require('../database/models').User

export const UsersController = {
  getAll: (req, res) => {
    return User
      .findAll()
      .then(products => res.status(200).send(products))
      .catch(error => res.status(400).send(error));
  },
};
