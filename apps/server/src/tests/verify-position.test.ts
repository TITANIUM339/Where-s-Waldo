import express from "express";
import request from "supertest";
import { describe, expect, test } from "vitest";
import errorHandler from "../middleware/error-handler";
import gameRouter from "../routes/games/game/game";

const app = express();

app.use(gameRouter);

app.use(errorHandler);

describe("responds with 200 for correct character positions", () => {
    test("GET /1/characters/1/verify-position?x=550&y=1850", async () => {
        const response = await request(app).get(
            "/1/characters/1/verify-position?x=550&y=1850",
        );

        expect(response.status).toBe(200);
        expect(response.body).toMatchSnapshot();
    });

    test("GET /1/characters/2/verify-position?x=2700&y=1600", async () => {
        const response = await request(app).get(
            "/1/characters/2/verify-position?x=2700&y=1600",
        );

        expect(response.status).toBe(200);
        expect(response.body).toMatchSnapshot();
    });

    test("GET /1/characters/3/verify-position?x=1000.123&y=123.123", async () => {
        const response = await request(app).get(
            "/1/characters/3/verify-position?x=1000.123&y=123.123",
        );

        expect(response.status).toBe(200);
        expect(response.body).toMatchSnapshot();
    });
});

describe("responds with 400 for bad input", () => {
    test("GET /1/characters/1/verify-position", async () => {
        const response = await request(app).get(
            "/1/characters/1/verify-position",
        );

        expect(response.status).toBe(400);
        expect(response.body).toMatchSnapshot();
    });

    test("GET /1/characters/2/verify-position?x=abc&y=xyz", async () => {
        const response = await request(app).get(
            "/1/characters/2/verify-position?x=abc&y=xyz",
        );

        expect(response.status).toBe(400);
        expect(response.body).toMatchSnapshot();
    });
});
