import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export default {
    async get(req: Request, res: Response) {
        const { gameId } = matchedData(req);

        const [game, characters] = await Promise.all([
            prisma.game.findUnique({ where: { id: gameId } }),
            prisma.coordinate.findMany({
                where: { gameId },
                select: { character: true },
            }),
        ]);

        const token = await new Promise((resolve, reject) =>
            jwt.sign(
                {},
                process.env.JWT_SECRET as string,
                (err: Error | null, token: string | undefined) => {
                    if (err) {
                        reject(err);

                        return;
                    }

                    resolve(token);
                },
            ),
        );

        res.json({
            game: {
                ...game,
                characters: characters.map((item) => item.character),
            },
            token,
        });
    },
};
