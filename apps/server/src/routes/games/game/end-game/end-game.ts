import { Router } from "express";
import endGameController from "../../../../controllers/end-game-controller.js";
import { queryAndBodyHandler } from "../../../../middleware/validation-error-handler.js";
import { validateEndGameBody } from "../../../../middleware/validation.js";

const router = Router();

const route = "/end-game";

router.post(
    route,
    validateEndGameBody(),
    queryAndBodyHandler,
    endGameController.post,
);

export default router;
