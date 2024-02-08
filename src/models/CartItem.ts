import {  DataTypes } from 'sequelize';
import { sequelize } from "../utils/db"
import { User } from './User';
import { Product } from './Product';

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // 'Users' would also work
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
});

// `sequelize.define` also returns the model
console.log("For CartItem: ", CartItem === sequelize.models.CartItem); // true

export {
    CartItem
}