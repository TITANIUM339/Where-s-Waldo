import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import prisma from "../lib/prisma.js";

export default {
    async get(req: Request, res: Response) {
        const { gameId } = matchedData(req);

        const leaderboard =
            await prisma.$queryRaw`SELECT * FROM "Leaderboard" WHERE "gameId" = ${gameId} ORDER BY "updatedAt" - "start" ASC`;

        res.json(leaderboard);
    },
};
