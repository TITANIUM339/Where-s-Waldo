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
