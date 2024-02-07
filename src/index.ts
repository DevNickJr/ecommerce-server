import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { connect } from "./utils/db" 
import { syncDB } from "./models";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const main = async () => {
  try {
    await connect()
    await syncDB()
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main()

