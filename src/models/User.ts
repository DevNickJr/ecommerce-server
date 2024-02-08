import {  DataTypes } from 'sequelize';
import { sequelize } from "../utils/db"
import { Order } from './Order';

const User = sequelize.define('User', {
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
    // validate: {
    //     isEmail: true,
    // }
  },
  password: {
    type: DataTypes.STRING(64),
    // validate: {
    //   is: /^[0-9a-f]{64}$/i
    // },
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
}, {
  // Other model options go here
});



// Movie.belongsToMany(Actor, { through: 'ActorMovies' });
// Actor.belongsToMany(Movie, { through: 'ActorMovies' });
// `sequelize.define` also returns the model
console.log("For User: ", User === sequelize.models.User); // true

export {
    User
}