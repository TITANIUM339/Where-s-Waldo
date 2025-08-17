import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import crypto from "node:crypto";
import { signJwt } from "../lib/jwt.js";

export default {
    async get(req: Request, res: Response) {
        const { name } = matchedData(req);

        const token = await signJwt({ id: crypto.randomUUID(), name });

        res.json({ token });
    },
};
