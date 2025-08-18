import { Router } from "express";
import leaderboardController from "../../../../controllers/leaderboard-controller.js";

const router = Router();

const route = "/leaderboard";

router.get(route, leaderboardController.get);

export default router;
