import { Router } from "express";
import character from "./character/character.js";

const router = Router();

const route = "/characters";

router.use(route, character);

export default router;
