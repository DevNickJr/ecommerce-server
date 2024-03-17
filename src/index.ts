import express, { Express, Request, Response, Application, Router } from "express";
import dotenv from "dotenv";
import { connect } from "./utils/db" 
import { syncDB } from "./models/db";
import routes from './routes'
import preRouteMiddleWares from "./middlewares/pre-route.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import { connectRedis } from "./utils/redisConnect";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;


const main = async () => {
  try {
    await connect()
    await connectRedis()
    // await syncDB()
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    
  } catch (error) {
    console.error('Something went wrong while starting server:', error);
  }
}


main()

preRouteMiddleWares(app)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/api/v1', routes)

errorMiddleware(app)