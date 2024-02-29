import {  BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from "../utils/db"
import { Compulsory } from '../interfaces';
import { User } from './User';
import { Product } from './Product';

// class Order extends Model<Compulsory<IOrder>, IOrder> {}

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare userId: number;
  declare status: CreationOptional<string>;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getUser: BelongsToGetAssociationMixin<User>; // Note the null assertions!
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

 
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

Order.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
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