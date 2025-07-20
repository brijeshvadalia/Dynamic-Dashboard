import { render } from '@testing-library/react';
import PortfolioTable from '@/components/PortfolioTable';

test('renders portfolio table', () => {
    const stocks = [{ symbol: 'TCS', name: 'TCS', purchasePrice: 3000, quantity: 5, exchange: 'NSE', sector: 'Tech', cmp: 3100 }];
    const { getByText } = render(<PortfolioTable stocks={stocks} />);
    expect(getByText('TCS')).toBeInTheDocument();
});
