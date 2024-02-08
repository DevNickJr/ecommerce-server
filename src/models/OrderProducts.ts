import {  DataTypes } from 'sequelize';
import { sequelize } from "../utils/db"
import { Product } from './Product';
import { Order } from './Order';

const OrderProducts = sequelize.define('OrderProducts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    OrderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order, // 'Users' would also work
        key: 'id'
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product, // 'Products' would also work
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
});

// `sequelize.define` also returns the model
console.log("For OrderProducts: ", OrderProducts === sequelize.models.OrderProducts); // true

export {
    OrderProducts
}