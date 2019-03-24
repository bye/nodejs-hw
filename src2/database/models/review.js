'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    user: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Product, {
      foreignKey: 'productId',
      targetKey: 'id',
    });
  };
  return Review;
};
