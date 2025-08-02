import { PrismaClient, User } from '@prisma/client';
import { prisma } from './PrismaClientInstance';

export class UsersDAO {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient = prisma) {
        this.prismaClient = prismaClient;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prismaClient.user.findUnique({ where: { email } });
    }

    async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
        return this.prismaClient.user.create({ data: user });
    }

    async list() {
        return this.prismaClient.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                role: true,
                createdAt: true,
            },
        });
    }
}

export const usersDAO = new UsersDAO();
