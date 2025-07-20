import { Stock } from '@/types';
import { FaChartLine, FaPiggyBank, FaPercent, FaIndustry, FaChartPie, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface Props {
    stocks: Stock[];
}

export default function SummaryCard({ stocks }: Props) {
    const totalInvestment = stocks.reduce((sum, stock) => sum + stock.purchasePrice * stock.quantity, 0);
    const totalPresentValue = stocks.reduce((sum, stock) => sum + (stock.cmp ?? 0) * stock.quantity, 0);
    const totalGainLoss = totalPresentValue - totalInvestment;
    const returnPercentage = ((totalGainLoss / totalInvestment) * 100).toFixed(2);

    const peRatios = stocks.map(stock => stock.peRatio ?? 0).filter(pe => pe > 0);
    const avgPERatio = peRatios.length ? (peRatios.reduce((sum, pe) => sum + pe, 0) / peRatios.length).toFixed(2) : 'N/A';

    const totalEarnings = stocks.reduce((sum, stock) => sum + (parseFloat(stock.latestEarnings?.toString() ?? '0') * stock.quantity), 0);

    const bestPerformer = stocks.reduce((max, stock) => {
        const gainLoss = (stock.cmp ?? 0) * stock.quantity - stock.purchasePrice * stock.quantity;
        return gainLoss > ((max?.cmp ?? 0) * max.quantity - max.purchasePrice * max.quantity) ? stock : max;
    }, stocks[0]);

    const worstPerformer = stocks.reduce((min, stock) => {
        const gainLoss = (stock.cmp ?? 0) * stock.quantity - stock.purchasePrice * stock.quantity;
        return gainLoss < ((min?.cmp ?? 0) * min.quantity - min.purchasePrice * min.quantity) ? stock : min;
    }, stocks[0]);

    const uniqueSectors = new Set(stocks.map(stock => stock.sector));

    return (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaChartPie className="text-blue-500" /> Portfolio Summary
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <SummaryItem icon={<FaPiggyBank />} label="Total Investment" value={`₹${totalInvestment.toFixed(2)}`} />
                <SummaryItem icon={<FaChartLine />} label="Present Value" value={`₹${totalPresentValue.toFixed(2)}`} />

                <SummaryItem 
                    icon={totalGainLoss >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                    label="Gain/Loss"
                    value={`₹${totalGainLoss.toFixed(2)}`}
                    valueClass={totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}
                />

                <SummaryItem 
                    icon={<FaPercent />}
                    label="Return (%)"
                    value={`${returnPercentage}%`}
                    valueClass={parseFloat(returnPercentage) >= 0 ? 'text-green-600' : 'text-red-600'}
                />

                <SummaryItem icon={<FaIndustry />} label="Sectors Count" value={uniqueSectors.size.toString()} />
                <SummaryItem icon={<FaChartPie />} label="Avg. P/E Ratio" value={avgPERatio} />
                <SummaryItem icon={<FaPiggyBank />} label="Total Earnings" value={`₹${totalEarnings.toFixed(2)}`} />
                <SummaryItem icon={<FaChartLine />} label="Total Stocks" value={stocks.length.toString()} />
            </div>

            <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">Performance Highlights</h3>
                <div className="hover:bg-gray-50 p-2 rounded transition">
                    🏆 Best Performer: <span className="font-medium text-green-700">{bestPerformer?.name} ({bestPerformer?.symbol})</span>
                </div>
                <div className="hover:bg-gray-50 p-2 rounded transition">
                    📉 Worst Performer: <span className="font-medium text-red-700">{worstPerformer?.name} ({worstPerformer?.symbol})</span>
                </div>
            </div>
        </div>
    );
}

function SummaryItem({ label, value, icon, valueClass = 'text-gray-800' }: { label: string, value: string, icon: React.ReactNode, valueClass?: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="text-blue-500">{icon}</div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className={`text-lg font-semibold ${valueClass}`}>{value}</p>
            </div>
        </div>
    );
}
