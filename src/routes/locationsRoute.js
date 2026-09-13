import { Router } from "express";
import { locations } from "../controllers/index.js";

const locationsRoute = new Router();

locationsRoute.get('/', locations.getLocations);

export default locationsRoute;