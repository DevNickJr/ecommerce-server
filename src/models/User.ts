import {  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize';
import { sequelize } from "../utils/db"
import { Order } from './Order';
import { Compulsory, IUser } from '../interfaces';



// export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
//   // Some fields are optional when calling UserModel.create() or UserModel.build()
//   id: CreationOptional<number>;
//   email: string;
//   password: string
//   firstName: string
//   lastName: string 
//   role: CreationOptional<string>
// } 


class User extends Model<Compulsory<IUser>, IUser> {}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER",
    validate: {
      isIn: [["USER", "ADMIN"]]
    }
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
})

// const User = sequelize.define('User', {
//   // Model attributes are defined here
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true
//     }
//   },
//   password: {
//     type: DataTypes.STRING(64),
//     allowNull: false,
//   },
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   role: {
//     type: DataTypes.STRING,
//     defaultValue: "USER",
//     validate: {
//       isIn: [["USER", "ADMIN"]]
//     }
//   },
// }, {
//   // Other model options go here
// });



// Movie.belongsToMany(Actor, { through: 'ActorMovies' });
// Actor.belongsToMany(Movie, { through: 'ActorMovies' });
// `sequelize.define` also returns the model
console.log("For User: ", User === sequelize.models.User); // true

export {
    User
}