import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000';

export async function fetchStockData(symbol: string) {
    const response = await axios.get(`${BASE_URL}/api/stock/${symbol}`);
    return response.data;
}
