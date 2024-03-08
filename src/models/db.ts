import { sequelize } from "../utils/db"
import { User } from "./User";
import { Category } from "./Category";
import { Order } from "./Order";
import { Product } from "./Product";
import { CartItem } from "./CartItem";
import { OrderProduct } from "./OrderProduct";



const syncDB = async () => {
    try {  
        User.hasMany(Order, {
            foreignKey: 'userId'
        });
        Order.belongsTo(User, {
            foreignKey: 'userId'
        });


        Category.belongsToMany(Product, { through: 'ProductCategories' });
        Product.belongsToMany(Category, { through: 'ProductCategories' });
        

        Product.belongsToMany(User, { through: CartItem });
        User.belongsToMany(Product, { through: CartItem });

        Product.belongsToMany(Order, { through: OrderProduct });
        Order.belongsToMany(Product, { through: OrderProduct });
        

        // await sequelize.sync();
        // await sequelize.sync({ alter: true });
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
    CartItem,
    OrderProduct
}