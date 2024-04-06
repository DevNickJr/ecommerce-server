import express, { Express, Request, Response, Application, Router } from "express";
import dotenv from "dotenv";
import routes from './routes'
import preRouteMiddleWares from "./middlewares/pre-route.middleware";
import errorMiddleware from "./middlewares/error.middleware";

dotenv.config();

const app: Application = express();

preRouteMiddleWares(app)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/api/v1', routes)

errorMiddleware(app)


export default app