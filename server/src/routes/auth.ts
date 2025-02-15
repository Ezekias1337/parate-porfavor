import express from "express";
import env from "../util/validateEnv";
import * as AuthController from "../controllers/auth";

const router = express.Router();

// GET requests
router.get("/get-token", AuthController.getToken);

// POST requests
router.post("/login", AuthController.login);
/* router.post("/logout", AuthController.logout); */


export default router;