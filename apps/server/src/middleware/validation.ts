import { body, matchedData, param, query } from "express-validator";
import isInProximity from "../lib/isInProximity.js";
import prisma from "../lib/prisma.js";
import verifyJwt from "../lib/verifyJwt.js";

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
            .customSanitizer((value) => Number(value)),
        query("y")
            .isNumeric()
            .withMessage("must be number")
            .customSanitizer((value) => Number(value)),
    ];
}

export function validateEndGameBody() {
    return [
        body("characters.*.id")
            .isInt({ min: 1 })
            .withMessage("must be integer")
            .bail()
            .toInt()
            .custom(
                async (value, { req }) =>
                    await prisma.coordinate.findUniqueOrThrow({
                        where: {
                            id: {
                                characterId: value,
                                gameId: matchedData(req).gameId,
                            },
                        },
                    }),
            )
            .withMessage("character does not exist"),
        body("characters.*.position.x")
            .isNumeric()
            .withMessage("must be number")
            .customSanitizer((value) => Number(value)),
        body("characters.*.position.y")
            .isNumeric()
            .withMessage("must be number")
            .customSanitizer((value) => Number(value)),
        body("characters")
            .isArray()
            .withMessage("must be array")
            .bail()
            .custom(async (value, { req }) => {
                const coordinates = await prisma.coordinate.findMany({
                    where: { gameId: matchedData(req).gameId },
                    orderBy: { characterId: "asc" },
                });

                value.sort(
                    ({ id: a }: { id: number }, { id: b }: { id: number }) =>
                        a - b,
                );

                for (let i = 0; i < coordinates.length; i++) {
                    const a = { x: coordinates[i]?.x, y: coordinates[i]?.y };
                    const b = {
                        x: value[i]?.position?.x,
                        y: value[i]?.position?.y,
                    };

                    if (!isInProximity(a, b)) {
                        throw new Error("invalid value");
                    }
                }
            }),
        body("playerToken")
            .notEmpty()
            .withMessage("required")
            .custom(async (value) => {
                const data = await verifyJwt(value);

                if (
                    typeof (data as { id?: unknown }).id !== "string" ||
                    typeof (data as { name?: unknown }).name !== "string"
                ) {
                    throw new Error();
                }
            })
            .withMessage("invalid token"),
        body("gameToken")
            .notEmpty()
            .withMessage("required")
            .custom(async (value) => {
                const data = await verifyJwt(value);

                if (typeof (data as { iat?: unknown }).iat !== "number") {
                    throw new Error();
                }
            })
            .withMessage("invalid token"),
    ];
}
