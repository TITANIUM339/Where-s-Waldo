import { Router } from "express";
import newPlayerController from "../../controllers/new-player-controller.js";
import { queryHandler } from "../../middleware/validation-error-handler.js";
import { validateNewPlayerQuery } from "../../middleware/validation.js";

const router = Router();

const route = "/new-player";

router.get(
    route,
    validateNewPlayerQuery(),
    queryHandler,
    newPlayerController.get,
);

export default router;
