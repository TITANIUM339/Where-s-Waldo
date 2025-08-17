import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import isInProximity from "../lib/isInProximity.js";
import prisma from "../lib/prisma.js";

export default {
    async get(req: Request, res: Response) {
        const { gameId, characterId, x, y } = matchedData(req);

        const coordinate = await prisma.coordinate.findUniqueOrThrow({
            where: { id: { gameId, characterId } },
            include: { character: true },
        });

        if (isInProximity({ x: coordinate.x, y: coordinate.y }, { x, y })) {
            res.json({ character: coordinate.character, found: true });
        } else {
            res.json({ character: coordinate.character, found: false });
        }
    },
};
