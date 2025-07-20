import { Stock } from '@/types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#5E5CE6', '#34C759', '#FF9500', '#AF52DE', '#FF3B30', '#007AFF'];

interface Props {
    stocks: Stock[];
}

export default function PortfolioChart({ stocks }: Props) {
    const data = stocks.map(stock => ({
        name: stock.name,
        value: (stock.cmp ?? 0) * stock.quantity
    }));

    return (
        <div className="bg-white rounded-lg shadow p-5 w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">💡 Portfolio Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60}
                        paddingAngle={5}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
