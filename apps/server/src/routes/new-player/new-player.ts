import { Router } from "express";
import newPlayerController from "../../controllers/new-player-controller.js";
import { bodyHandler } from "../../middleware/validation-error-handler.js";
import { validateNewPlayerBody } from "../../middleware/validation.js";

const router = Router();

const route = "/new-player";

router.post(
    route,
    validateNewPlayerBody(),
    bodyHandler,
    newPlayerController.post,
);

export default router;
