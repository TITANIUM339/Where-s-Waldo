import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export default {
    async get(_req: Request, res: Response) {
        const games = await prisma.game.findMany();

        res.json(games);
    },
};
