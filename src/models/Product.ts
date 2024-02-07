import {  DataTypes } from 'sequelize';
import { sequelize } from "../utils/db"

const Product = sequelize.define('Product', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log("For Product: ", Product === sequelize.models.Product); // true

export {
    Product
}