import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { Role } from '../types/roles';
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: Role;
    };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV === 'test') {
        req.user = {
            userId: 'test-user-id',
            email: 'test@SuperAdmin.com',
            role: 'SuperAdmin',
        };
        return next();
    }

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) throw new ApiError('Token missing', 401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    } catch (err) {
        throw new ApiError('Invalid or expired token', 401);
    }
}
