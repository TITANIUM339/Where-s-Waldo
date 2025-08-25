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

describe("responds with the leaderboard of a specific game", () => {
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

        await request(app).post("/games/1/end-game").send(data);

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

    test("GET /games/1/leaderboard", async () => {
        const response = await request(app).get("/games/1/leaderboard");

        const entry = response.body?.leaderboard?.find(
            (entry: {
                playerId: string;
                name: string;
                start: string;
                updatedAt: string;
                gameId: number;
            }) =>
                entry.playerId ===
                    (jwt.decode(data.playerToken) as { id: string }).id &&
                entry.gameId === 1,
        );

        expect(response.status).toBe(200);
        expect(entry?.name).toBe("TEST");
        expect(entry?.start).toBeDefined();
        expect(entry?.updatedAt).toBeDefined();
        expect(response.body?.game).toBe("HORSEPLAY IN TROY");
    });
});
