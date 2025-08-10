import { Router } from "express";
import { paramHandler } from "../../../middleware/validation-error-handler.js";
import { validateGameIdParam } from "../../../middleware/validation.js";
import newGame from "./new-game/new-game.js";

const router = Router();

const route = "/:gameId";

router.use(route, validateGameIdParam(), paramHandler, newGame);

export default router;
