import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import errorHandler from "./middleware/error-handler.js";
import routes from "./routes/routes.js";

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(routes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
