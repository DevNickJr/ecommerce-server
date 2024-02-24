import {  DataTypes, Model } from 'sequelize';
import { sequelize } from "../utils/db"
import { User } from './User';
import { Product } from './Product';
import { Compulsory, ICartItem } from '../interfaces';

class CartItem extends Model<Compulsory<ICartItem>, ICartItem> {}

CartItem.init({
  // Model attributes are defined here
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
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'CartItem' // We need to choose the model name
})



// `sequelize.define` also returns the model
console.log("For CartItem: ", CartItem === sequelize.models.CartItem); // true

export {
    CartItem
}