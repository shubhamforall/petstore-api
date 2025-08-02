import { type Express, Router } from 'express';
import { PetController } from '../controllers/PetController';
import { upload } from '../utils/upload';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizePermission } from '../middleware/authorizePermission';
import { cacheResponse } from '../middleware/cacheMiddleware';

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Pet management APIs
 */
export class PetRoutes {
    constructor(app: Express) {
        this.configureRoutes(app);
    }

    configureRoutes(app: Express): void {
        const router = Router();
        const petController = new PetController();

        /**
         * @swagger
         * /pets:
         *   get:
         *     summary: Get a list of pets
         *     tags: [Pets]
         *     security:
         *       - BearerAuth: []
         *     parameters:
         *       - in: query
         *         name: type
         *         schema:
         *           type: string
         *       - in: query
         *         name: age
         *         schema:
         *           type: integer
         *       - in: query
         *         name: page
         *         schema:
         *           type: integer
         *         default: 1
         *       - in: query
         *         name: pageSize
         *         schema:
         *           type: integer
         *         default: 10
         *     responses:
         *       200:
         *         description: A list of pets
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/PetListResponse'
         */
        router
            .route('/')
            .get(
                authenticateToken,
                authorizePermission('GET_PETS'),
                // cacheResponse(60),
                petController.listPets
            )

            /**
             * @swagger
             * /pets:
             *   post:
             *     summary: Add a new pet with images
             *     tags: [Pets]
             *     security:
             *       - BearerAuth: []
             *     requestBody:
             *       required: true
             *       content:
             *         multipart/form-data:
             *           schema:
             *             $ref: '#/components/schemas/AddPetDTO'
             *     responses:
             *       201:
             *         description: Pet created successfully
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/PetResponse'
             */
            .post(
                authenticateToken,
                authorizePermission('CREATE_PET'),
                upload.array('images'),
                petController.addPetWithImages
            );

        /**
         * @swagger
         * /pets/{id}:
         *   get:
         *     summary: Get pet by ID
         *     tags: [Pets]
         *     security:
         *       - BearerAuth: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Pet found
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/PetResponse'
         */
        router
            .route('/:id')
            .get(
                authenticateToken,
                authorizePermission('GET_PETS'),
                petController.getPetById
            )

            /**
             * @swagger
             * /pets/{id}:
             *   put:
             *     summary: Update a pet
             *     tags: [Pets]
             *     security:
             *       - BearerAuth: []
             *     parameters:
             *       - in: path
             *         name: id
             *         required: true
             *         schema:
             *           type: string
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             $ref: '#/components/schemas/PatchPetDTO'
             *     responses:
             *       200:
             *         description: Pet updated
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/PetResponse'
             */
            .put(
                authenticateToken,
                authorizePermission('UPDATE_PET'),
                petController.updatePet
            )

            /**
             * @swagger
             * /pets/{id}:
             *   delete:
             *     summary: Delete a pet
             *     tags: [Pets]
             *     security:
             *       - BearerAuth: []
             *     parameters:
             *       - in: path
             *         name: id
             *         required: true
             *         schema:
             *           type: string
             *     responses:
             *       204:
             *         description: Pet deleted successfully
             */
            .delete(
                authenticateToken,
                authorizePermission('DELETE_PET'),
                petController.deletePet
            );

        app.use('/pets', router);
    }
}
