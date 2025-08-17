import jwt from "jsonwebtoken";

export function verifyJwt(token: string) {
    return new Promise((resolve, reject) =>
        jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            (err: Error | null, decoded: unknown) => {
                if (err) {
                    reject();

                    return;
                }

                resolve(decoded);
            },
        ),
    );
}

export function signJwt(
    payload: string | object | Buffer<ArrayBufferLike>,
) {
    return new Promise((resolve, reject) =>
        jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            (err: Error | null, token: string | undefined) => {
                if (err) {
                    reject(err);

                    return;
                }

                resolve(token);
            },
        ),
    );
}

