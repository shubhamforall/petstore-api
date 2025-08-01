import { PrismaClient, Prisma, Pet } from '@prisma/client';
import { prisma } from './PrismaClientInstance';

export class PetsDAO {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient = prisma) {
        this.prismaClient = prismaClient;
    }

    async get(id: string) {
        return await this.prismaClient.pet.findUnique({
            where: { id },
            include: { images: true },
        });
    }

    async findAll(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const pets = await this.prismaClient.pet.findMany({
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
            include: { images: true },
        });
        const count = await this.prismaClient.pet.count();
        return { results: pets, count };
    }

    async create(data: Prisma.PetCreateInput) {
        return await this.prismaClient.pet.create({ data });
    }

    async update(id: string, data: Partial<Pet>) {
        return await this.prismaClient.pet.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return await this.prismaClient.pet.delete({
            where: { id },
        });
    }
}

export const petsDAO = new PetsDAO();
