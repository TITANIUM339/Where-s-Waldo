import { Router } from "express";
import gamesController from "../../controllers/games-controller.js";
import game from "./game/game.js";

const router = Router();

const route = "/games";

router.use(route, game);

router.get(route, gamesController.get);

export default router;
