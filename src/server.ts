import 'reflect-metadata';
import app from './app';
import { connectRedis } from './config/redisClient';

connectRedis();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
