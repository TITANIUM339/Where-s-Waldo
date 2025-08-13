import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { TOLERANCE } from "../lib/constants.js";
import prisma from "../lib/prisma.js";

export default {
    async get(req: Request, res: Response) {
        const { gameId, characterId, x, y } = matchedData(req);

        const coordinate = await prisma.coordinate.findUniqueOrThrow({
            where: { id: { gameId, characterId } },
            include: { character: true },
        });

        const radius = Math.sqrt(
            (x - coordinate.x) ** 2 + (y - coordinate.y) ** 2,
        );

        if (radius >= TOLERANCE) {
            res.json({ character: coordinate.character, found: false });
        } else {
            res.json({ character: coordinate.character, found: true });
        }
    },
};
