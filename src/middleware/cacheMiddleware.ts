import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../config/redisClient';
import { sendSuccess } from '../utils/responseHandler';

export function cacheResponse(ttlSeconds: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const cacheKey = `${req.originalUrl}`;

        const cached = await redisClient.get(cacheKey);
        if (cached) {
            const parsed = JSON.parse(cached);
            return sendSuccess(res, parsed, 'Fetched from cache');
        }

        // Hook into response to cache after it runs
        const originalJson = res.json.bind(res);
        res.json = (body: any) => {
            redisClient.setEx(cacheKey, ttlSeconds, JSON.stringify(body.data || body));
            return originalJson(body);
        };

        next();
    };
}
