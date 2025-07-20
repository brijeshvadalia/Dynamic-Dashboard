export interface Stock {
    symbol: string;
    name: string;
    purchasePrice: number;
    quantity: number;
    exchange: string;
    sector: string;
    cmp?: number;
    peRatio?: number;
    latestEarnings?: string;
}
