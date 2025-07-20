import yahooFinance from 'yahoo-finance2';

/**
 * Fetches the Current Market Price (CMP) of the given stock symbol from Yahoo Finance.
 * Always append .NS for NSE listed stocks.
 */
export const getCMP = async (symbol: string): Promise<number> => {
    try {
        const adjustedSymbol = symbol.endsWith('.NS') ? symbol : `${symbol}.NS`;
        const quote = await yahooFinance.quote(adjustedSymbol);

        if (!quote || quote.regularMarketPrice === undefined) {
            console.warn(`No market price returned for ${adjustedSymbol}`);
            return 0;
        }

        console.log(`Fetched CMP for ${adjustedSymbol}: ${quote.regularMarketPrice}`);
        return quote.regularMarketPrice;
    } catch (error) {
        console.error(`Error fetching CMP for ${symbol}:`, error);
        return 0;
    }
};
