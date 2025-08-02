import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: 'SuperAdmin' | 'Admin' | 'User';
    };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) throw new ApiError('Token missing', 401);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded as AuthenticatedRequest['user'];
        next();
    } catch (err) {
        throw new ApiError('Invalid token', 403);
    }
}
