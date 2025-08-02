import { Request, Response, NextFunction } from 'express';

interface MockUser {
    userId: string;
    role: 'SuperAdmin' | 'Admin' | 'User';
    email: string;
}

interface AuthenticatedRequest extends Request {
    user?: MockUser;
}

export const mockAuthAsAdmin = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    req.user = {
        userId: 'test-user-id',
        role: 'Admin',
        email: 'test@admin.com',
    };

    next();
};
