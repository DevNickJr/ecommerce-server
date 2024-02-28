import {  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from "../utils/db"
import { Compulsory } from '../interfaces';
import { User } from './User';

// class Order extends Model<Compulsory<IOrder>, IOrder> {}

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare UserId: number;
  declare status: CreationOptional<string>;
}

Order.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // 'Users' would also work
      key: 'id'
    }
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
  sequelize, // We need to pass the connection instance
  modelName: 'Order' // We need to choose the model name
})



// `sequelize.define` also returns the model
console.log("For Order: ", Order === sequelize.models.Order); // true

export {
    Order
}