import { type NextFunction, type Request, type Response } from "express";
import createHttpError from "http-errors";

export default [
    (_req: Request, _res: Response, next: NextFunction) =>
        next(createHttpError(404)),
    (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        const code = createHttpError.isHttpError(err) ? err.status : 500;

        if (code >= 500) {
            console.error(err);
        }

        res.sendStatus(code);
    },
];
