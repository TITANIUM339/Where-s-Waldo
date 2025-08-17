interface Position {
    x?: number;
    y?: number;
}

export default function isInProximity(a: Position, b: Position) {
    if (
        typeof a.x !== "number" ||
        typeof a.y !== "number" ||
        typeof b.x !== "number" ||
        typeof b.y !== "number"
    ) {
        return false;
    }

    const radius = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    const tolerance = 50;

    return radius <= tolerance;
}
