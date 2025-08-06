import { Router } from "express";
import newGameController from "../../controllers/new-game-controller.js";
import { paramHandler } from "../../middleware/validation-error-handler.js";
import { validateNewGameParam } from "../../middleware/validation.js";

const router = Router();

const route = "/new-game/:gameId";

router.get(route, validateNewGameParam(), paramHandler, newGameController.get);

export default router;
