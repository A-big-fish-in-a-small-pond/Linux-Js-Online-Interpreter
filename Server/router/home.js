import express from "express";
import readText from "../services/readText.js";
import login from "../services/login.js";

const router = express.Router();

router.post("/readText", readText);
router.post("/login", login);

export default router