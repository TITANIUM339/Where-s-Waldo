import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import createHttpError from "http-errors";
import request from "supertest";
import { afterEach, describe, expect, test, vi } from "vitest";
import errorHandler from "../middleware/error-handler.js";

const app = express();

const testError = new Error("Test error");
const customHttpError = createHttpError(400);

app.get("/error-sync", () => {
    throw testError;
});

app.get("/error-async", async () => {
    throw testError;
});

app.post(
    "/custom-http-error",
    (_req: Request, _res: Response, next: NextFunction) =>
        next(customHttpError),
);

app.use(errorHandler);

describe("responds with 404 for non-existent routes", () => {
    test("GET /foo", async () => {
        const response = await request(app).get("/foo");

        expect(response.status).toBe(404);
    });
});

describe("responds with 500 for server errors and logs the error", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => null);

    afterEach(() => spy.mockClear());

    test("GET /error-sync", async () => {
        const response = await request(app).get("/error-sync");

        expect(response.status).toBe(500);
        expect(spy).toHaveBeenCalledWith(testError);
    });

    test("GET /error-async", async () => {
        const response = await request(app).get("/error-async");

        expect(response.status).toBe(500);
        expect(spy).toHaveBeenCalledWith(testError);
    });
});

describe("responds with custom http status codes", () => {
    test("POST /custom-http-error", async () => {
        const response = await request(app).post("/custom-http-error");

        expect(response.status).toBe(customHttpError.status);
    });
});
