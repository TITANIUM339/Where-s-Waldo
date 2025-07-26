import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

export default {
    async post(req: Request, res: Response) {
        const { name } = matchedData(req);

        const token = await new Promise((resolve, reject) =>
            jwt.sign(
                { id: crypto.randomUUID(), name },
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

        res.json({ token });
    },
};
