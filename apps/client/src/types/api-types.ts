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
