import express from "express";
import readText from "../services/readText.js";
import login from "../services/login.js";
import { RPCServer } from "./rpc.js";

const router = express.Router();

router.post("/readText", readText);
router.post("/login", login);
router.post("/rpc", RPCServer.middleware());

export default router;
