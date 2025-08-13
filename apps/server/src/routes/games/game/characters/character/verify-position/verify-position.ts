import { Router } from "express";
import verifyPositionController from "../../../../../../controllers/verify-position-controller.js";
import { queryHandler } from "../../../../../../middleware/validation-error-handler.js";
import { validateCharacterPositionQuery } from "../../../../../../middleware/validation.js";
const router = Router();

const route = "/verify-position";

router.get(
    route,
    validateCharacterPositionQuery(),
    queryHandler,
    verifyPositionController.get,
);

export default router;
