import { Prisma } from '@prisma/client'; // at top if missing
import { prisma } from '../daos/PrismaClientInstance';
import { AddPetDTO } from '../dtos/AddPetDTO';
import { PatchPetDTO } from '../dtos/PatchPetDTO';
import { petsDAO } from '../daos/PetsDAO';
import { ApiError } from '../utils/ApiError';

export class PetModel {
    async listPets(page: number, pageSize: number) {
        return await petsDAO.findAll(page, pageSize);
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

    async updatePet(id: string, data: PatchPetDTO) {
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
