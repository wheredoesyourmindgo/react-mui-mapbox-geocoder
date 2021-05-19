export default function search(endpoint: string, source: string, accessToken: string, query: string, onResult: (err: any, res: Response | null, searchTime: Date) => void, proximity?: {
    longitude: number;
    latitude: number;
}, country?: string, bbox?: number[], types?: string, limit?: number, autocomplete?: boolean, language?: string): Promise<{
    err: null;
    res: Response;
    searchTime: Date;
} | {
    err: any;
    res: null;
    searchTime: Date;
}>;
