import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL;

export const redisClient = createClient({
    url: redisUrl
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('✅ Connected to Redis:', redisUrl);
    } catch (error) {
        console.error('❌ Failed to connect to Redis:', error);
    }
})();
