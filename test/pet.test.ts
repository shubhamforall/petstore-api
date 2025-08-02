// test/pet.test.ts
import request from 'supertest';
import app from '../src/app';
import path from 'path';
import { prisma } from '../src/daos/PrismaClientInstance';

let createdPetId: string;

describe('Pet API', () => {
    afterAll(async () => {

        await prisma.image.deleteMany({ where: { petId: createdPetId } });
        await prisma.pet.deleteMany({ where: { id: createdPetId } });
        await prisma.$disconnect();
    });

    it('should create a new pet', async () => {
        const res = await request(app)
            .post('/pets')
            .field('name', 'Rocky')
            .field('type', 'Dog')
            .field('age', '4')
            .field('description', 'Active dog with great energy')
        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data.name).toBe('Rocky');
        expect(res.body.data.type).toBe('Dog');
        expect(res.body.data.breed).toBeNull();
        expect(res.body.data.age).toBe(4);
        expect(res.body.data.description).toBe('Active dog with great energy');
        expect(Array.isArray(res.body.data.images)).toBe(true);
        expect(res.body.data.images.length).toBe(0);
        expect(res.body.errors).toBeNull();
        expect(res.body.messages).toHaveProperty('message', 'Pet added successfully');
        expect(res.body.status_code).toBe(201);
        expect(res.body.is_success).toBe(true);
        createdPetId = res.body.data.id;
    });

    it('should return a list of pets', async () => {
        const res = await request(app).get('/pets');
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty('results');
        expect(Array.isArray(res.body.data.results)).toBe(true);
        expect(res.body.data.count).toBeGreaterThanOrEqual(1);
        expect(res.body.errors).toBeNull();
        expect(res.body.messages).toHaveProperty('message', 'Pets fetched successfully');
        expect(res.body.status_code).toBe(200);
        expect(res.body.is_success).toBe(true);
    });

    it('should return pet by ID', async () => {
        const res = await request(app).get(`/pets/${createdPetId}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty('id', createdPetId);
        expect(res.body.data.name).toBe('Rocky');
        expect(res.body.data.type).toBe('Dog');
        expect(res.body.data.breed).toBeNull();
        expect(res.body.data.age).toBe(4);
        expect(res.body.data.description).toBe('Active dog with great energy');
        expect(typeof res.body.data.createdAt).toBe('string');
        expect(typeof res.body.data.updatedAt).toBe('string');
        expect(Array.isArray(res.body.data.images)).toBe(true);
        expect(res.body.data.images.length).toBe(0);
        expect(res.body.errors).toBeNull();
        expect(res.body.messages).toHaveProperty('message', 'Pet fetched successfully');
        expect(res.body.status_code).toBe(200);
        expect(res.body.is_success).toBe(true);
    });


    it('should delete the pet', async () => {
        const res = await request(app).delete(`/pets/${createdPetId}`);
        expect(res.status).toBe(204);
    });
});
