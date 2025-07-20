import { Stock } from '@/types';
import { useMemo } from 'react';
import { FaArrowUp, FaArrowDown, FaRupeeSign, FaChartPie, FaChartLine, FaInfoCircle, FaPercentage } from 'react-icons/fa';

interface Props {
    sector: string;
    stocks: Stock[];
}

export default function SectorGroup({ sector, stocks }: Props) {
    const totalInvestment = useMemo(
        () => stocks.reduce((sum, stock) => sum + stock.purchasePrice * stock.quantity, 0),
        [stocks]
    );

    const totalPresentValue = useMemo(
        () => stocks.reduce((sum, stock) => sum + (stock.cmp ?? 0) * stock.quantity, 0),
        [stocks]
    );

    const gainLoss = totalPresentValue - totalInvestment;
    const gainLossPercentage = totalInvestment ? (gainLoss / totalInvestment) * 100 : 0;

    const badgeColor = gainLoss >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
    const sectorStatusIcon = gainLoss >= 0 ? <FaArrowUp className="text-green-500" /> : <FaArrowDown className="text-red-500" />;

    const stockContributions = stocks.map(stock => ({
        name: stock.name,
        contribution: totalPresentValue ? (((stock.cmp ?? 0) * stock.quantity) / totalPresentValue) * 100 : 0
    }));

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8 border border-gray-200 hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                    <FaChartPie className="text-indigo-500" /> {sector} Sector
                </h3>
                <span className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 font-medium ${badgeColor}`}>
                    {sectorStatusIcon} {gainLoss >= 0 ? 'Profitable' : 'Underperforming'}
                </span>
            </div>

            <div className="text-base text-gray-700 mb-5 space-y-2 font-medium">
                <p><FaRupeeSign className="inline text-green-500 mr-2" /> Total Investment: ₹{totalInvestment.toFixed(2)}</p>
                <p><FaChartLine className="inline text-blue-500 mr-2" /> Total Present Value: ₹{totalPresentValue.toFixed(2)}</p>
                <p>
                    {gainLoss >= 0 ? <FaArrowUp className="inline text-green-500 mr-2" /> : <FaArrowDown className="inline text-red-500 mr-2" />}
                    Gain/Loss: ₹{gainLoss.toFixed(2)}
                    <span className="ml-3 inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded font-semibold">
                        <FaPercentage className="mr-1 text-gray-500" /> {gainLossPercentage.toFixed(2)}%
                    </span>
                </p>
            </div>

            <div>
                {stockContributions.map(stock => (
                    <div key={stock.name} className="mb-4">
                        <div className="flex justify-between text-sm mb-1 text-gray-700 font-semibold">
                            <span>{stock.name}</span>
                            <span>{stock.contribution.toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded">
                            <div
                                className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-3 rounded transition-all duration-500"
                                style={{ width: `${stock.contribution}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 text-xs text-gray-500 flex items-center gap-1">
                <FaInfoCircle /> Insights updated in real-time
            </div>
        </div>
    );
}
