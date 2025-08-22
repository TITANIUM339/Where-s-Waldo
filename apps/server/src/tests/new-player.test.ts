import express from "express";
import request from "supertest";
import { describe, expect, test } from "vitest";
import errorHandler from "../middleware/error-handler";
import newPlayerRouter from "../routes/new-player/new-player";

const app = express();

app.use(newPlayerRouter);

app.use(errorHandler);

describe("responds with 400 for bad input", () => {
    test("GET /new-player", async () => {
        const response = await request(app).get("/new-player");

        expect(response.status).toBe(400);
        expect(response.body).toMatchSnapshot();
    });

    test("GET /new-player?name=This string is too long", async () => {
        const response = await request(app).get(
            "/new-player?name=This string is too long",
        );

        expect(response.status).toBe(400);
        expect(response.body).toMatchSnapshot();
    });
});

describe("responds with 200 for correct input", () => {
    test("GET /new-player?name=Player", async () => {
        const response = await request(app).get("/new-player?name=Player");

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            token: /^[\w-]+\.[\w-]+\.[\w-]+$/,
        });
    });
});
