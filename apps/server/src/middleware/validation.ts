import { body, param } from "express-validator";
import prisma from "../lib/prisma.js";

export function validateNewPlayerBody() {
    return body("name")
        .trim()
        .notEmpty()
        .withMessage("required")
        .isLength({ max: 16 })
        .withMessage("maximum length is 16");
}

export function validateNewGameParam() {
    return param("gameId")
        .isInt({ min: 1 })
        .bail()
        .toInt()
        .custom(
            async (value) =>
                await prisma.game.findUniqueOrThrow({ where: { id: value } }),
        );
}
