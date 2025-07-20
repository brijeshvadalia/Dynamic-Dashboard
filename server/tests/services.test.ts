import { getCMP } from '../services/yahooService';

test('fetch CMP for a stock', async () => {
    const cmp = await getCMP('TCS');
    expect(typeof cmp).toBe('number');
    expect(cmp).toBeGreaterThan(0);
});
