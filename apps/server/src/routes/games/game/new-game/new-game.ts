import { Router } from "express";
import newGameController from "../../../../controllers/new-game-controller.js";

const router = Router();

const route = "/new-game";

router.get(route, newGameController.get);

export default router;
