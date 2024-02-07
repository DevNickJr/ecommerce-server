import {  DataTypes } from 'sequelize';
import { sequelize } from "../utils/db"

const Order = sequelize.define('Order', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
    validate: {
        isIn: [['pending', 'failed', 'success']],
    }
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log("For Order: ", Order === sequelize.models.Order); // true

export {
    Order
}