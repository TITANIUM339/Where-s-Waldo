import express from "express";
import jwt from "jsonwebtoken";
import request from "supertest";
import { beforeEach, describe, expect, test } from "vitest";
import prisma from "../lib/prisma";
import errorHandler from "../middleware/error-handler";
import routes from "../routes/routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

describe("responds with 400 for bad input", () => {
    test("POST /games/1/end-game (no input)", async () => {
        const response = await request(app).post("/games/1/end-game");

        expect(response.status).toBe(400);
    });

    test("POST /games/1/end-game (incorrect input)", async () => {
        const data = {
            characters: [
                {
                    id: 1,
                    position: {
                        x: 500,
                        y: 1800,
                    },
                },
                {
                    id: "abc",
                    position: {
                        x: "abc",
                        y: 1800,
                    },
                },
            ],
            playerToken: 123,
            gameToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
        };

        const response = await request(app)
            .post("/games/1/end-game")
            .send(data);

        expect(response.status).toBe(400);
    });
});

describe("responds with 201 for correct input", () => {
    let data: {
        characters: { id: number; position: { x: number; y: number } }[];
        playerToken: string;
        gameToken: string;
    };

    beforeEach(async () => {
        data = {
            characters: [
                {
                    id: 1,
                    position: {
                        x: 550,
                        y: 1850,
                    },
                },
                {
                    id: 2,
                    position: {
                        x: 2700,
                        y: 1600,
                    },
                },
                {
                    id: 3,
                    position: {
                        x: 1000,
                        y: 100,
                    },
                },
            ],
            playerToken: (await request(app).get("/new-player?name=TEST")).body
                ?.token,
            gameToken: (await request(app).get("/games/1/new-game")).body
                ?.token,
        };

        return () =>
            prisma.leaderboard.delete({
                where: {
                    id: {
                        playerId: (
                            jwt.decode(data.playerToken) as { id: string }
                        ).id,
                        gameId: 1,
                    },
                },
            });
    });

    test("POST /games/1/end-game", async () => {
        const response = await request(app)
            .post("/games/1/end-game")
            .send(data);

        expect(response.status).toBe(201);
        expect(() =>
            prisma.leaderboard.findUniqueOrThrow({
                where: {
                    id: {
                        playerId: (
                            jwt.decode(data.playerToken) as { id: string }
                        ).id,
                        gameId: 1,
                    },
                },
            }),
        ).not.toThrowError();
    });
});
