import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.DB_USERNAME || '';
const database = process.env.DB_DATABASE || '';
const password = process.env.DB_PASSWORD || "";
const host = process.env.DB_HOST || "";
const dialect: Dialect = process.env.DB_DIALECT as Dialect || "mysql";

// console.log({
//   username,
//   password,
//   host,
//   dialect
// })

const sequelize = new Sequelize(
  database,
    username,
    password,
     {
       host,
       dialect,
     }
);


const connect = async () => {
  if (!username || !password || !host || !dialect) {
    throw new Error("Provide all Database Environment Variables")
  }
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
}

export {
    connect,
    sequelize
}