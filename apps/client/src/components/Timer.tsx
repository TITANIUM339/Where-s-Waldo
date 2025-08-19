import { useEffect, useState } from "react";
import { getElapsedTime } from "../lib/time";

export default function Timer({ start }: { start: number }) {
    const [timer, setTimer] = useState({ start, now: start });

    useEffect(() => {
        const interval = setInterval(
            () => setTimer((prev) => ({ ...prev, now: Date.now() })),
            10,
        );

        return () => clearInterval(interval);
    }, []);

    return <time>{getElapsedTime(timer.start, timer.now)}</time>;
}
