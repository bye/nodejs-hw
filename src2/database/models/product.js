'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.Review, {
      foreignKey: 'productId',
      as: 'reviews',
      sourceKey: 'id',
    });
  };
  return Product;
};
