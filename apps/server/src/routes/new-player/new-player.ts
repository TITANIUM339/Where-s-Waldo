import { Router } from "express";
import newPlayerController from "../../controllers/new-player-controller.js";
import { queryAndBodyHandler } from "../../middleware/validation-error-handler.js";
import { validateNewPlayerQuery } from "../../middleware/validation.js";

const router = Router();

const route = "/new-player";

router.get(
    route,
    validateNewPlayerQuery(),
    queryAndBodyHandler,
    newPlayerController.get,
);

export default router;
