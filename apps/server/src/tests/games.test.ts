import express from "express";
import request from "supertest";
import { describe, expect, test } from "vitest";
import errorHandler from "../middleware/error-handler";
import gamesRouter from "../routes/games/games";

const app = express();

app.use(gamesRouter);

app.use(errorHandler);

describe("responds with all games", () => {
    test("GET /games", async () => {
        const response = await request(app).get("/games");

        expect(response.status).toBe(200);
        expect(response.body).toMatchSnapshot();
    });
});
