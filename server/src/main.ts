import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import * as dbc from "./dbcontroller";
import { IData } from "./dbcontroller";

// initialize app
const app: Express = express();
const dbpath: string = "data.db";

app.use(express.json());

// Serve client
app.use(express.static(path.join(__dirname, "../../client/dist")));

// !REMOVE
// Enable CORS so that we can call the API even from anywhere.
app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  inNext();
});

// ---------- REST API Endpoints ----------

// Get all database table names
app.get("/db",
  async (req: Request, res: Response) => {
    try {
      const dbworker: dbc.DAO = new dbc.DAO(dbpath);
      const data: string[] = await dbworker.listTables();
      res.json(data);
    } catch (inError) {
      console.log("GET /db: Error", inError);
      res.send("error");
    }
  }
);

// Get data from specific table
app.get("/db/:table",
  async (req: Request, res: Response) => {
    try {
      const dbworker: dbc.DAO = new dbc.DAO(dbpath);
      const data: IData[] = await dbworker.getData(req.params.table);
      res.json(data);
    } catch (inError) {
      console.log("GET /db: Error", inError);
      res.send("error getting data from " + req.params.table);
    }
  }
);

// Initialize database code
app.get("/init",
  async (req: Request, res: Response) => {
    try {
      const dbworker: dbc.DAO = new dbc.DAO(dbpath);
      dbworker.initialize();
      res.send("init success");
    } catch (inError) {
      console.log("Database init failed: ", inError);
      res.send("error");
    }
  }
);

app.get("/delete",
  async (req: Request, res: Response) => {
    try {
      const dbworker: dbc.DAO = new dbc.DAO(dbpath);
      dbworker.delete();
      res.send("delete success");
    } catch (inError) {
      console.log("Database delete failed: ", inError);
      res.send("error");
    }
  }
);

// Start app listening.
app.listen(80, () => {
  console.log("Server open");
});