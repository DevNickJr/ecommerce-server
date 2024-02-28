import {  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from "../utils/db"
import { Compulsory } from '../interfaces';


// class Product extends Model<Compulsory<IProduct>, IProduct> {}

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare title: string;
  declare price: number;
  declare description: string;
}

Product.init({
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
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'Product' // We need to choose the model name
})


// `sequelize.define` also returns the model
console.log("For Product: ", Product === sequelize.models.Product); // true

export {
    Product
}