import Head from 'next/head';
import { useEffect, useState } from 'react';
import { fetchStockData } from '@/lib/api';
import { Stock } from '@/types';
import PortfolioTable from '@/components/PortfolioTable';
import PortfolioChart from '@/components/PortfolioChart';
import SectorGroup from '@/components/SectorGroup';
import { groupBySector } from '@/lib/helpers';
import LoadingIndicator from '@/components/LoadingIndicator';
import socket from '@/sockets/socket';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SummaryCard from '@/components/SummaryStatsCard';

const initialStocks: Stock[] = [
    { symbol: 'HDFCBANK', name: 'HDFC Bank', purchasePrice: 1490, quantity: 50, exchange: 'NSE', sector: 'Financials' },
    { symbol: 'TCS', name: 'TCS', purchasePrice: 3210, quantity: 20, exchange: 'NSE', sector: 'Technology' },
    { symbol: 'INFY', name: 'Infosys', purchasePrice: 1500, quantity: 15, exchange: 'NSE', sector: 'Technology' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', purchasePrice: 860, quantity: 30, exchange: 'NSE', sector: 'Financials' },
    { symbol: 'SBIN', name: 'State Bank of India', purchasePrice: 600, quantity: 40, exchange: 'NSE', sector: 'Financials' },
    { symbol: 'RELIANCE', name: 'Reliance Industries', purchasePrice: 2450, quantity: 10, exchange: 'NSE', sector: 'Energy' }
];

export default function Home() {
    const [stocks, setStocks] = useState<Stock[]>(initialStocks);
    const [loading, setLoading] = useState(true);

    async function refreshData() {
        const updated = await Promise.all(
            stocks.map(async stock => {
                const data = await fetchStockData(stock.symbol);
                return { ...stock, ...data };
            })
        );
        setStocks(updated);
        setLoading(false);
    }

    useEffect(() => {
        refreshData();
        socket.on('stockUpdate', (updatedStock) => {
            setStocks(prev =>
                prev.map(stock => stock.symbol === updatedStock.symbol ? { ...stock, ...updatedStock } : stock)
            );
        });

        return () => {
            socket.off('stockUpdate');
        };
    }, []);

    const groupedSectors = groupBySector(stocks);

    return (
        <>
            <Head>
                <title>Professional Portfolio Dashboard</title>
            </Head>

            <Header />

            <main className="max-w-7xl mx-auto p-6 space-y-10">
                <h1 className="text-4xl font-bold text-center mb-8">📈 Investment Overview</h1>

                {loading ? <LoadingIndicator /> : (
                    <>
                        {/* Portfolio Table */}
                        <section className="bg-white shadow rounded p-4">
                            <PortfolioTable stocks={stocks} />
                        </section>

                        {/* Summary & Chart Side by Side */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SummaryCard stocks={stocks} />
                            <div className="chart-wrapper">
                                <h2 className="text-xl font-semibold mb-2">Portfolio Distribution</h2>
                                <PortfolioChart stocks={stocks} />
                            </div>
                        </section>

                        {/* Sector-wise Summary */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Sector-wise Summary</h2>
                            {Object.keys(groupedSectors).map(sector => (
                                <SectorGroup key={sector} sector={sector} stocks={groupedSectors[sector]} />
                            ))}
                        </section>
                    </>
                )}
            </main>

            <Footer />
        </>
    );
}
