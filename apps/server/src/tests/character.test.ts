import express from "express";
import request from "supertest";
import { describe, expect, test } from "vitest";
import errorHandler from "../middleware/error-handler";
import gameRouter from "../routes/games/game/game";

const app = express();

app.use(gameRouter);

app.use(errorHandler);

describe("responds with 404 for bad :characterId values or non existent characters", () => {
    test("GET /1/characters/abc", async () => {
        const response = await request(app).get("/1/characters/abc");

        expect(response.status).toBe(404);
    });

    test("GET /1/characters/1000", async () => {
        const response = await request(app).get("/1/characters/1000");

        expect(response.status).toBe(404);
    });

    test("GET /1/characters/-1000", async () => {
        const response = await request(app).get("/1/characters/-1000");

        expect(response.status).toBe(404);
    });
});
