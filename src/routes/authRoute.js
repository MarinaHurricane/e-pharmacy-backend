import { Router } from "express";
import { auth } from "../controllers/index.js";

const authRoute = new Router();

authRoute.post('/register', auth.registerUser);

export default authRoute;