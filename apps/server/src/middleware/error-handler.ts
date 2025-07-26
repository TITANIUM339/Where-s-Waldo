import type { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "http";
import createHttpError from "http-errors";

export default [
    (_req: Request, _res: Response, next: NextFunction) =>
        next(createHttpError(404)),
    (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        const httpError = createHttpError.isHttpError(err);

        const code = httpError ? err.status : 500;

        if (code >= 500) {
            console.error(err);
        }

        res.status(code).json({
            status: code,
            message: httpError && err.expose ? err.message : STATUS_CODES[code],
            data: httpError && err.expose ? err.data : undefined,
        });
    },
];
