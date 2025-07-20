import { Stock } from "@/types";

export function groupBySector(stocks: Stock[]) {
    return stocks.reduce((grouped: Record<string, Stock[]>, stock) => {
        if (!grouped[stock.sector]) {
            grouped[stock.sector] = [];
        }
        grouped[stock.sector].push(stock);
        return grouped;
    }, {});
}
