import { Router } from "express";
import newPlayerController from "../../controllers/new-player-controller.js";
import validationErrorHandler from "../../middleware/validation-error-handler.js";
import { validateNewPlayer } from "../../middleware/validation.js";

const router = Router();

const route = "/new-player";

router.post(
    route,
    validateNewPlayer(),
    validationErrorHandler,
    newPlayerController.post,
);

export default router;
