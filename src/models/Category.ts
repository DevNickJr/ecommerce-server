import {  DataTypes } from 'sequelize';
import { sequelize } from "../utils/db"

const Category = sequelize.define('Category', {
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
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log("For Category: ", Category === sequelize.models.Category); // true

export {
    Category
}