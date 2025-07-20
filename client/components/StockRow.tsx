import { Stock } from '@/types';
import { FaArrowUp, FaArrowDown, FaRupeeSign, FaChartLine, FaPercentage } from 'react-icons/fa';

interface Props {
    stock: Stock;
    totalInvestment: number;
}

export default function StockRow({ stock, totalInvestment }: Props) {
    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = (stock.cmp ?? 0) * stock.quantity;
    const gainLoss = presentValue - investment;
    const portfolioPercent = totalInvestment ? (investment / totalInvestment) * 100 : 0;

    const gainLossColor = gainLoss >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
    const GainLossIcon = gainLoss >= 0 ? <FaArrowUp /> : <FaArrowDown />;

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 text-sm text-gray-700">
            <td className="p-3 font-medium">{stock.name} <span className="text-gray-500 text-xs">({stock.symbol})</span></td>
            <td className="p-3">₹{stock.purchasePrice.toFixed(2)}</td>
            <td className="p-3">{stock.quantity}</td>
            <td className="p-3">₹{investment.toFixed(2)}</td>
            <td className="p-3">{portfolioPercent.toFixed(2)}%</td>
            <td className="p-3">
                <span className="inline-flex items-center bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                    <FaRupeeSign className="mr-1" /> {stock.cmp?.toFixed(2) ?? 'N/A'}
                </span>
            </td>
            <td className="p-3">₹{presentValue.toFixed(2)}</td>
            <td className="p-3">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${gainLossColor}`}>
                    {GainLossIcon} ₹{gainLoss.toFixed(2)}
                </span>
            </td>
            <td className="p-3">
                <span className="inline-flex items-center bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                    <FaChartLine className="mr-1" /> {stock.peRatio?.toFixed(2) ?? 'N/A'}
                </span>
            </td>
            <td className="p-3">
                <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                    <FaPercentage className="mr-1" /> {stock.latestEarnings ?? 'N/A'}
                </span>
            </td>
        </tr>
    );
}
