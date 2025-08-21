import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { signJwt } from "../lib/jwt.js";
import prisma from "../lib/prisma.js";

export default {
    async get(req: Request, res: Response) {
        const { gameId } = matchedData(req);

        const [game, characters] = await Promise.all([
            prisma.game.findUniqueOrThrow({ where: { id: gameId } }),
            prisma.coordinate.findMany({
                where: { gameId },
                select: { character: true },
            }),
        ]);

        const token = await signJwt({});

        res.json({
            game: {
                ...game,
                characters: characters.map((item) => item.character),
            },
            token,
        });
    },
};
