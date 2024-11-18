import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import indexRoutes from "./routers/index.js"

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/api", indexRoutes)

export default app;
