import express from "express";
import request from "supertest";
import { describe, expect, test } from "vitest";
import errorHandler from "../middleware/error-handler";
import gameRouter from "../routes/games/game/game";

const app = express();

app.use(gameRouter);

app.use(errorHandler);

describe("responds with 404 for bad :gameId values or non existent games", () => {
    test("GET /abc", async () => {
        const response = await request(app).get("/abc");

        expect(response.status).toBe(404);
    });

    test("GET /1000", async () => {
        const response = await request(app).get("/1000");

        expect(response.status).toBe(404);
    });

    test("GET /-1000", async () => {
        const response = await request(app).get("/-1000");

        expect(response.status).toBe(404);
    });
});
