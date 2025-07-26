import { body } from "express-validator";

export function validateNewPlayer() {
    return body("name")
        .trim()
        .notEmpty()
        .withMessage("required")
        .isLength({ max: 16 })
        .withMessage("maximum length is 16");
}
