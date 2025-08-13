import { param, query } from "express-validator";
import prisma from "../lib/prisma.js";

export function validateNewPlayerQuery() {
    return query("name")
        .trim()
        .notEmpty()
        .withMessage("required")
        .isLength({ max: 16 })
        .withMessage("maximum length is 16");
}

export function validateGameIdParam() {
    return param("gameId")
        .isInt({ min: 1 })
        .bail()
        .toInt()
        .custom(
            async (value) =>
                await prisma.game.findUniqueOrThrow({ where: { id: value } }),
        );
}

export function validateCharacterIdParam() {
    return param("characterId")
        .isInt({ min: 1 })
        .bail()
        .toInt()
        .custom(
            async (value) =>
                await prisma.character.findUniqueOrThrow({
                    where: { id: value },
                }),
        );
}

export function validateCharacterPositionQuery() {
    return [
        query("x")
            .isNumeric()
            .withMessage("must be number")
            .custom((value) => Number(value)),
        query("y")
            .isNumeric()
            .withMessage("must be number")
            .custom((value) => Number(value)),
    ];
}
