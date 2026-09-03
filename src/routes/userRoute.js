import { Router } from "express";
import { user } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";

const userRoute = Router();

userRoute.use(authenticate);

userRoute.get('/', user.getCurrentUser);

export default userRoute;