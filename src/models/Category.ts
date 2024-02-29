import {  BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from "../utils/db"
import { Product } from './Product';
// import { Compulsory, ICategory } from '../interfaces';

// class Category extends Model<Compulsory<ICategory>, ICategory> {}

class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare title: string;


  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getProducts: BelongsToManyGetAssociationsMixin<Product>; // Note the null assertions!
  declare addProduct: BelongsToManyAddAssociationMixin<Product, number>;
  declare addProducts: BelongsToManyAddAssociationsMixin<Product, number>;
  declare setProducts: BelongsToManySetAssociationsMixin<Product, number>;
  declare removeProduct: BelongsToManyRemoveAssociationMixin<Product, number>;
  declare removeProducts: BelongsToManyRemoveAssociationsMixin<Product, number>;
  declare hasProduct: BelongsToManyHasAssociationMixin<Product, number>;
  declare hasProducts: BelongsToManyHasAssociationsMixin<Product, number>;
  declare countProducts: BelongsToManyCountAssociationsMixin;
  declare createProduct: BelongsToManyCreateAssociationMixin<Product>;
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