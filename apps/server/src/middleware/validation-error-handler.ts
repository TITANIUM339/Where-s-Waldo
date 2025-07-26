import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export default (req: Request, _res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        next(
            createHttpError(400, {
                data: result.array(),
            }),
        );

        return;
    }

    next();
};
