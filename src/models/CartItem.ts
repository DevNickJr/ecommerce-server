import {  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from "../utils/db"
import { User } from './User';
import { Product } from './Product';
// import { Compulsory, ICartItem } from '../interfaces';

// class CartItem extends Model<Compulsory<ICartItem>, ICartItem> {}

class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare userId: number;
  declare productId: number;
  declare quantity: number;
}

CartItem.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // 'Users' would also work
      key: 'id',
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product, // 'Products' would also work
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'CartItem', // We need to choose the model name
  // indexes: [
  //   {
  //     unique: true,
  //     fields: ['userID', 'itemNr'], // Specify the fields for the composite unique constraint
  //   },
  // ],
})



// `sequelize.define` also returns the model
console.log("For CartItem: ", CartItem === sequelize.models.CartItem); // true

export {
    CartItem
}