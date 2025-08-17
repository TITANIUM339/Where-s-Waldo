import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { verifyJwt } from "../lib/jwt.js";
import prisma from "../lib/prisma.js";

interface Player {
    id: string;
    name: string;
}

interface Game {
    iat: number;
}

export default {
    async post(req: Request, res: Response) {
        const { playerToken, gameToken } = matchedData(req);

        const [player, game] = await Promise.all([
            verifyJwt(playerToken),
            verifyJwt(gameToken),
        ]);

        const id = (player as Player).id;
        const name = (player as Player).name;
        const start = new Date((game as Game).iat * 1000);

        const entry = await prisma.leaderboard.upsert({
            create: { id, name, start },
            update: { start },
            where: { id },
        });

        res.status(201).json(entry);
    },
};
