import { Router } from 'express';
import { celebrate } from 'celebrate';
import { auth } from '../controllers/index.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

const authRoute = new Router();

authRoute.post('/register', celebrate(registerUserSchema), auth.registerUser);
authRoute.post('/login', celebrate(loginUserSchema), auth.loginUser);
authRoute.post('/logout', auth.logoutUser);
authRoute.post('/refresh', auth.refreshUserSession);

export default authRoute;
