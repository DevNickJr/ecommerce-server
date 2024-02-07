import { sequelize } from "../utils/db"
import { User } from "./User";
import { Category } from "./Category";
import { Order } from "./Order";
import { Product } from "./Product";


const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.log("Database Synchronization failed: ", error);
    }
}

export {
    syncDB,
    User,
    Category,
    Order,
    Product,
}