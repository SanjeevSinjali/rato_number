module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OrderCar', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },

    carId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cars',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('RENTED', 'AVAILABLE'),
      defaultValue: 'AVAILABLE',
    },
    rentStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    rentEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    pickupLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dropLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ratonumberstore',
    }

  }, {
    tableName: 'order_cars',
    timestamps: true
  });
};

