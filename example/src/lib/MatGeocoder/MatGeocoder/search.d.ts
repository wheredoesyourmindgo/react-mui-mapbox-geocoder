export declare const search: (endpoint: string, source: string, accessToken: string, query: string, onResult: (err: any, res: Response | null, searchTime: Date) => void, proximity?: {
    longitude: number;
    latitude: number;
} | undefined, country?: string | undefined, bbox?: number[] | undefined, types?: string | undefined, limit?: number | undefined, autocomplete?: boolean | undefined, language?: string | undefined) => Promise<{
    err: null;
    res: Response;
    searchTime: Date;
} | {
    err: any;
    res: null;
    searchTime: Date;
}>;
