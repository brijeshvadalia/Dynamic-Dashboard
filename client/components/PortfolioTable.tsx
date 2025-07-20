import { Stock } from '@/types';
import StockRow from './StockRow';

interface Props {
    stocks: Stock[];
}

export default function PortfolioTable({ stocks }: Props) {
    const totalInvestment = stocks.reduce((sum, stock) => sum + stock.purchasePrice * stock.quantity, 0);

    return (
        <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="">
                <tr>
                    <th>Stock</th>
                    <th>Purchase Price</th>
                    <th>Qty</th>
                    <th>Investment</th>
                    <th>Portfolio %</th>
                    <th>CMP</th>
                    <th>Present Value</th>
                    <th>Gain/Loss</th>
                    <th>P/E Ratio</th>
                    <th>Latest Earnings</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map((stock, idx) => (
                    <StockRow key={idx} stock={stock} totalInvestment={totalInvestment} />
                ))}
            </tbody>
        </table>
    );
}
