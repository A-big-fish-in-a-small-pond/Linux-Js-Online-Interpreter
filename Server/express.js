import express from "express";
import bodyParser from "body-parser";
import routeHome from "./router/home.js";
import routeError from "./router/error.js";
import cors from "cors";

const app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routeHome);
app.use(routeError);

export default app;
