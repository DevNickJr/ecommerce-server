import {  DataTypes } from 'sequelize';
import { sequelize } from "../utils/db"
import { User } from './User';

const Order = sequelize.define('Order', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: "pending",
    // validate: {
    //     isIn: [['pending', 'failed', 'success']],
    // }
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log("For Order: ", Order === sequelize.models.Order); // true

export {
    Order
}