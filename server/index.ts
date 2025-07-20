import express from 'express';
import cors from 'cors';
import http from 'http';
import { initSocket, broadcastUpdate } from './sockets';
import { getCMP } from './services/yahooService';
import { getPERatioAndEarnings } from './services/googleService';
import { redisClient } from './cache/redisClient';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

async function connectRedis() {
    if (!redisClient.isOpen) {
        try {
            await redisClient.connect();
            console.log(`✅ Connected to Redis: ${process.env.REDIS_URL}`);
        } catch (err) {
            console.error(`❌ Failed to connect to Redis:`, err);
        }
    }
}

app.get('/api/stock/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const cacheKey = `stock:${symbol}`;
    try {
        const cached = await redisClient.get(cacheKey);
        if (cached) {
            return res.json(JSON.parse(cached));
        }

        const cmp = await getCMP(symbol);
        const { peRatio, latestEarnings } = await getPERatioAndEarnings(symbol);
        const data = { cmp, peRatio, latestEarnings };

        await redisClient.set(cacheKey, JSON.stringify(data), { EX: 60 });
        broadcastUpdate({ symbol, ...data });

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching stock data');
    }
});

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await connectRedis();
});
