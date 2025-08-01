import { Router } from "express";
import gamesController from "../../controllers/games-controller.js";

const router = Router();

const route = "/games";

router.get(route, gamesController.get);

export default router;
