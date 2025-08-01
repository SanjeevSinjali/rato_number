const sequelize = require('../config/db');

const User = require('./User')(sequelize, require('sequelize').DataTypes);
const Car = require("./Car")(sequelize, require('sequelize').DataTypes);
const OrderCar = require("./OrderCar")(sequelize, require('sequelize').DataTypes);


// One User can have many OrderCar
User.hasMany(OrderCar, {
  foreignKey: 'userId',
  as: 'orders',
});

OrderCar.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// One Car can have many OrderCar
Car.hasMany(OrderCar, {
  foreignKey: 'carId',
  as: 'orders',
});
OrderCar.belongsTo(Car, {
  foreignKey: 'carId',
  as: 'car',
});

module.exports = {
  sequelize,
  User,
  Car,
  OrderCar
};


