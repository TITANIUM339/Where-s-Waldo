import { Router } from "express";
import { paramHandler } from "../../../../../middleware/validation-error-handler.js";
import { validateCharacterIdParam } from "../../../../../middleware/validation.js";
import verifyPosition from "./verify-position/verify-position.js";

const router = Router();

const route = "/:characterId";

router.use(route, validateCharacterIdParam(), paramHandler, verifyPosition);

export default router;
