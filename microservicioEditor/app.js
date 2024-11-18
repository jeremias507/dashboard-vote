import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import indexRoutes from "./router/index.js"; // Asegúrate de que la ruta es correcta.
import bodyParser from "body-parser";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    
}));

app.use("/api", indexRoutes);  // Asegúrate de que se está utilizando correctamente el router

export default app;