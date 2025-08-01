const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Must be a valid email address',
          },
        },
      },
      role: {
        type: DataTypes.ENUM('ADMIN', 'CUSTOMER'),
        allowNull: false,
        defaultValue: 'CUSTOMER',
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
      hooks: {
        beforeSave: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  User.prototype.getSignedJwtToken = function () {
    return jwt.sign(
      { id: this.id, fullName: this.fullName, email: this.email, role: this.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
  };

  User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  return User;
};

