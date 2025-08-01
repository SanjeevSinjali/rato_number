module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transmission: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fuel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('RENTED', 'AVAILABLE', 'PENDING'),
      defaultValue: 'AVAILABLE',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
    {
      tableName: "cars",
      timestamps: true,
    }
  );

  return Car;
};

