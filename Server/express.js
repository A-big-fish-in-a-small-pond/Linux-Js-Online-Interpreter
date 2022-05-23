import express from "express";
import bodyParser from "body-parser";
// import routeHome from "./router/home.js";
import routeError from "./router/error.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", routeHome);
app.use(routeError);

export default app;
