import { sequelize } from "../utils/db"
import { User } from "./User";
import { Category } from "./Category";
import { Order } from "./Order";
import { Product } from "./Product";
import { CartItem } from "./CartItem";
import { OrderProducts } from "./OrderProducts";



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

        Product.belongsToMany(Order, { through: OrderProducts });
        Order.belongsToMany(Product, { through: OrderProducts });
        

        await sequelize.sync();
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
    OrderProducts
}