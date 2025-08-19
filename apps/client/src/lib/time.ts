export function getElapsedTime(start: number, end: number) {
    const elapsedSeconds =
        (new Date(end).getTime() - new Date(start).getTime()) / 1000;

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

    return `${hours}:${minutes}:${seconds}`;
}
