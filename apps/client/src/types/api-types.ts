export interface APIerror {
    status: number;
    message: string;
    data?: {
        path: string;
        value: unknown;
        msg: string;
    }[];
}

export interface APItoken {
    token: string;
}

export type APIgames = {
    id: number;
    name: string;
    description: string;
    imageURL: string;
    imageWidth: number;
    imageHeight: number;
}[];

export interface APInewGame {
    game: {
        id: number;
        name: string;
        description: string;
        imageURL: string;
        imageWidth: number;
        imageHeight: number;
        characters: {
            id: number;
            name: string;
            imageURL: string;
        }[];
    };
    token: string;
}

export interface APIVerifyPosition {
    found: boolean;
    character: {
        id: number;
        name: string;
        imageURL: string;
    };
    position: { x: number; y: number };
}

export interface APILeaderboard {
    leaderboard: {
        playerId: string;
        name: string;
        start: string;
        updatedAt: string;
        gameId: number;
    }[];
    game: string;
}
