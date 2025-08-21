import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import prisma from "../lib/prisma.js";

export default {
    async get(req: Request, res: Response) {
        const { gameId } = matchedData(req);

        const [leaderboard, { name }] = await Promise.all([
            prisma.$queryRaw`SELECT * FROM "Leaderboard" WHERE "gameId" = ${gameId} ORDER BY "updatedAt" - "start" ASC`,
            prisma.game.findUniqueOrThrow({
                where: { id: gameId },
                select: { name: true },
            }),
        ]);

        res.json({ leaderboard, game: name });
    },
};
