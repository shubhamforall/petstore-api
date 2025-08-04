import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        data: null,
        errors: null,
        messages: { message: 'Too many requests, please try again later.' },
        status_code: 429,
        is_success: false,
    },
});
