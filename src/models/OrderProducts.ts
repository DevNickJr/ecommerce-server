import {  DataTypes, Model } from 'sequelize';
import { sequelize } from "../utils/db"
import { Product } from './Product';
import { Compulsory, IOrder, IOrderProduct } from '../interfaces';
import { Order } from './Order';

class OrderProducts extends Model<Compulsory<IOrderProduct>, IOrderProduct> {}

OrderProducts.init({
  // Model attributes are defined here
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
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'OrderProducts' // We need to choose the model name
})


// `sequelize.define` also returns the model
console.log("For OrderProducts: ", OrderProducts === sequelize.models.OrderProducts); // true

export {
    OrderProducts
}