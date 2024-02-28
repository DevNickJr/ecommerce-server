import {  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from "../utils/db"
// import { Compulsory, ICategory } from '../interfaces';

// class Category extends Model<Compulsory<ICategory>, ICategory> {}

class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare title: string;
}

Category.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'Category' // We need to choose the model name
})


// `sequelize.define` also returns the model
console.log("For Category: ", Category === sequelize.models.Category); // true

export {
    Category
}