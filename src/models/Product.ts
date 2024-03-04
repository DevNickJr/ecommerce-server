import {  BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from "../utils/db"
import { Compulsory } from '../interfaces';
import { Category } from './Category';


// class Product extends Model<Compulsory<IProduct>, IProduct> {}

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare title: string;
  declare price: number;
  declare description: string;

  
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getCategories: BelongsToManyGetAssociationsMixin<Category>; // Note the null assertions!
  declare addCategory: BelongsToManyAddAssociationMixin<Category, number>;
  declare addCategories: BelongsToManyAddAssociationsMixin<Category, number>;
  declare setCategories: BelongsToManySetAssociationsMixin<Category, number>;
  declare removeCategory: BelongsToManyRemoveAssociationMixin<Category, number>;
  declare removeCategories: BelongsToManyRemoveAssociationsMixin<Category, number>;
  declare hasCategory: BelongsToManyHasAssociationMixin<Category, number>;
  declare hasCategories: BelongsToManyHasAssociationsMixin<Category, number>;
  declare countCategories: BelongsToManyCountAssociationsMixin;
  declare createCategory: BelongsToManyCreateAssociationMixin<Category>;

  
}

Product.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
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