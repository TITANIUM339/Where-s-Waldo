import jwt from "jsonwebtoken";

export default function verifyJwt(token: string) {
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
