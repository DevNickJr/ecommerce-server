import {  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from "../utils/db"
import { Product } from './Product';
import { Compulsory } from '../interfaces';
import { Order } from './Order';

// class OrderProducts extends Model<Compulsory<IOrderProduct>, IOrderProduct> {}

class OrderProduct extends Model<InferAttributes<OrderProduct>, InferCreationAttributes<OrderProduct>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare orderId: number;
  declare productId: number;
  declare quantity: number;
  declare price: number;
}

OrderProduct.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order, // 'Users' would also work
      key: 'id'
    }
  },
  productId: {
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
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'OrderProducts' // We need to choose the model name
})


// `sequelize.define` also returns the model
console.log("For OrderProducts: ", OrderProduct === sequelize.models.OrderProduct); // true

export {
    OrderProduct
}