import express from "express";
import bodyParser from "body-parser";
import routeHome from "./router/home.js";
import routeError from "./router/error.js";
import cors from "cors";

// var express = require("express");
// var bodyParser = require("bodyParser");
// var routeHome = require("./router/home.js");
// var routeError = require("./router/error.js");
// var cors = require("cors");

////////////////////////////////////////////
app.io = require("socket.io")();

socket.on("chat-msg-1", (msg) => {
    app.io.emit("chat-msg-2", msg);
});

socket.on("disconnect", () => {
    console.log("socket disconnect !");
});

/////////////////////////////////////////////
const app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routeHome);
app.use(routeError);

export default app;
