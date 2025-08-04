import { Prisma, Pet } from '@prisma/client';
import { prisma } from '../daos/PrismaClientInstance';
import { AddPetDTO } from '../dtos/AddPetDTO';
import { PatchPetDTO } from '../dtos/PatchPetDTO';
import { PutPetDTO } from '../dtos/PutPetDTO';
import { petsDAO } from '../daos/PetsDAO';
import { ApiError } from '../utils/ApiError';

export class PetModel {
    async listPetsWithFilters(filters: {
        type?: string;
        age?: number;
        page: number;
        pageSize: number;
    }) {
        const { page, pageSize, type, age } = filters;

        const where: any = {};
        if (type) where.type = type;
        if (typeof age === 'number') where.age = age;

        const skip = (page - 1) * pageSize;

        const [results, count] = await Promise.all([
            prisma.pet.findMany({
                where,
                include: { images: true },
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.pet.count({ where }),
        ]);

        return { results, count };
    }


    async getPetById(id: string) {
        const pet = await petsDAO.get(id);
        if (!pet) {
            throw new ApiError('Pet not found', 404);
        }
        return pet;
    }

    async addPetWithImages(data: AddPetDTO, files: Express.Multer.File[]) {
        const now = new Date();

        const pet = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const createdPet = await tx.pet.create({
                data: {
                    name: data.name,
                    type: data.type,
                    age: parseInt(data.age as unknown as string, 10),
                    breed: data.breed,
                    description: data.description,
                    createdAt: now,
                    updatedAt: now,
                },
            });

            if (files?.length) {
                await tx.image.createMany({
                    data: files.map((file) => ({
                        petId: createdPet.id,
                        url: `/uploads/${file.filename}`,
                        createdAt: now,
                    })),
                });
            }

            return createdPet;
        });

        return petsDAO.get(pet.id);
    }

    async updatePetPartial(id: string, data: Partial<Pet>): Promise<Pet> {
        const existing = await petsDAO.get(id);
        if (!existing) {
            throw new ApiError('Pet not found', 404);
        }
        return await prisma.pet.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        });
    }


    async updatePet(id: string, data: PutPetDTO) {
        const existing = await petsDAO.get(id);
        if (!existing) {
            throw new ApiError('Pet not found', 404);
        }
        return petsDAO.update(id, data);
    }

    async deletePet(id: string) {
        const existing = await petsDAO.get(id);
        if (!existing) {
            throw new ApiError('Pet not found', 404);
        }
        return petsDAO.delete(id);
    }
}
