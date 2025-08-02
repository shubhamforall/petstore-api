import { Request, Response } from 'express';
import { prisma } from '../daos/PrismaClientInstance';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { sendSuccess } from '../utils/responseHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export class AuthController {
    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new ApiError('Invalid email or password', 401);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new ApiError('Invalid email or password', 401);
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return sendSuccess(res, { token }, 'Login successful');
    };
}
