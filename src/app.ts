import express, { Express, Request, Response, Application, Router } from "express";
import dotenv from "dotenv";
import routes from './routes'
import preRouteMiddleWares from "./middlewares/pre-route.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import { connect } from "./utils/db" 
// import { connectRedis } from "./utils/redisConnect";
import { runAssociations } from "./models/db";


dotenv.config();

const app: Application = express();

preRouteMiddleWares(app)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/api/v1', routes)

errorMiddleware(app)


const setup = async () => {
  try {
    await connect()
    // await connectRedis()
    await runAssociations()
    
  } catch (error) {
    console.error('Something went wrong while starting server:', error);
  }
}


setup()


export default app