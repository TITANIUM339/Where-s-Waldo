import express from "express";
import request from "supertest";
import { describe, expect, test } from "vitest";
import errorHandler from "../middleware/error-handler";
import gameRouter from "../routes/games/game/game";

const app = express();

app.use(gameRouter);

app.use(errorHandler);

describe("responds with data for a new game", () => {
    test("GET /1/new-game", async () => {
        const response = await request(app).get("/1/new-game");

        expect(response.body?.game).toMatchSnapshot();
        expect(response.body?.characters).toMatchSnapshot();
        expect(response.body?.token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
    });
});
