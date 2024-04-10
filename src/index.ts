import dotenv from "dotenv";
import { connect } from "./utils/db" 
// import { connectRedis } from "./utils/redisConnect";
import app from "./app";
import { runAssociations } from "./models/db";

dotenv.config();

const port = process.env.PORT || 3000;


const main = async () => {
  try {
    await connect()
    // // await connectRedis()
    // await runAssociations()
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    
  } catch (error) {
    console.error('Something went wrong while starting server:', error);
  }
}


main()