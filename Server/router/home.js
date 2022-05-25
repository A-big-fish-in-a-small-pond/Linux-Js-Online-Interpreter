import express from "express";
import readText from "../services/readText.js";
import login from "../services/login.js";
import serverConnect from "../services/serverConnect.js";

const router = express.Router();

router.post("/serverConnect", serverConnect);
router.post("/readText", readText);
router.post("/login", login);

export default router;
