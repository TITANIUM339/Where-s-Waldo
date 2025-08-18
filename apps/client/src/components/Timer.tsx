import { useEffect, useState } from "react";

export default function Timer({ start }: { start: number }) {
    const [timer, setTimer] = useState({ start, now: start });

    useEffect(() => {
        const interval = setInterval(
            () => setTimer((prev) => ({ ...prev, now: Date.now() })),
            10,
        );

        return () => clearInterval(interval);
    }, []);

    const elapsedSeconds = (timer.now - timer.start) / 1000;

    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = (Math.floor(elapsedSeconds / 60) % 60).toLocaleString(
        "en-US",
        {
            minimumIntegerDigits: 2,
        },
    );
    const seconds = (elapsedSeconds % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });

    return (
        <time>
            {hours}:{minutes}:{seconds}
        </time>
    );
}
