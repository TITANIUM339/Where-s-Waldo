import { useEffect, useState } from "react";
import { getElapsedTime } from "../lib/time";

export default function Timer() {
    const [timer, setTimer] = useState(() => {
        const now = performance.now();

        return { start: now, now };
    });

    useEffect(() => {
        const interval = setInterval(
            () => setTimer((prev) => ({ ...prev, now: performance.now() })),
            10,
        );

        return () => clearInterval(interval);
    }, []);

    return <time>{getElapsedTime(timer.start, timer.now)}</time>;
}
