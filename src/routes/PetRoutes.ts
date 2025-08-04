import { type Express, Router } from 'express';
import { PetController } from '../controllers/PetController';
import { upload } from '../utils/upload';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizePermission } from '../middleware/authorizePermission';
import { cacheResponse } from '../middleware/cacheMiddleware';
import { AddPetDTO } from '../dtos/AddPetDTO';
import { validateRequest } from '../middleware/validateRequest';
import { UrlDataDTO } from '../dtos/UrlDataDTO';
import { PatchPetDTO } from '../dtos/PatchPetDTO';
import { PutPetDTO } from '../dtos/PutPetDTO';
import { IdParamDTO } from '../dtos/IdParamDTO';

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
         * /pet:
         *   get:
         *     summary: Get a list of pets
         *     tags:
         *       - Pets
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
         *       401:
         *         description: Unauthorized - Token missing or invalid
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/UnauthorizedResponse'
         *       404:
         *         description: Not Found - No pets found
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/NotFoundResponse'
         */
        router
            .route('/')
            .get(
                authenticateToken,
                authorizePermission('GET_PETS'),
                validateRequest(UrlDataDTO, 'query'),
                cacheResponse(60),
                petController.listPets
            )
            /**
             * @swagger
             * /pet:
             *   post:
             *     summary: Add a new pet with images
             *     tags:
             *       - Pets
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
             *               $ref: '#/components/schemas/PetAddResponse'
             *       400:
             *         description: Bad Request - Validation failed
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/BadRequestResponse'
             *       401:
             *         description: Unauthorized - Token missing or invalid
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/UnauthorizedResponse'
             */
            .post(
                authenticateToken,
                authorizePermission('CREATE_PET'),
                upload.array('images'),
                validateRequest(AddPetDTO),
                petController.addPetWithImages
            );

        /**
         * @swagger
         * /pet/{id}:
         *   get:
         *     summary: Get pet by ID
         *     tags:
         *       - Pets
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
         *       400:
         *         description: Bad Request - Validation failed
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/BadRequestResponse'
         *       401:
         *         description: Unauthorized - Token missing or invalid
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/UnauthorizedResponse'
         *       404:
         *         description: Not Found - Pet not found
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/NotFoundResponse'
         */
        router
            .route('/:id')
            .get(
                authenticateToken,
                authorizePermission('GET_PETS'),
                validateRequest(UrlDataDTO, 'params'),
                petController.getPetById
            )
            /**
             * @swagger
             * /pet/{id}:
             *   put:
             *     summary: Update a pet
             *     tags:
             *       - Pets
             *     security:
             *       - BearerAuth: []
             *     parameters:
             *       - in: path
             *         name: id
             *         required: true
             *         schema:
             *           type: string
             *           format: uuid
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             $ref: '#/components/schemas/PutPetDTO'
             *     responses:
             *       200:
             *         description: Pet updated successfully
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/UpdatePetResponse'
             *       400:
             *         description: Bad Request - Validation failed
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/BadRequestResponse'
             *       401:
             *         description: Unauthorized - Token missing or invalid
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/UnauthorizedResponse'
             *       404:
             *         description: Not Found - Pet not found
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/NotFoundResponse'
             */
            .put(
                authenticateToken,
                authorizePermission('UPDATE_PET'),
                validateRequest(IdParamDTO, 'params'),
                validateRequest(PutPetDTO),
                petController.updatePet
            )
            /**
             * @swagger
             * /pet/{id}:
             *   patch:
             *     summary: Partially update a pet
             *     tags:
             *       - Pets
             *     security:
             *       - BearerAuth: []
             *     parameters:
             *       - in: path
             *         name: id
             *         required: true
             *         schema:
             *           type: string
             *           format: uuid
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             $ref: '#/components/schemas/PatchPetDTO'
             *     responses:
             *       200:
             *         description: Pet updated successfully
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/UpdatePetResponse'
             *       400:
             *         description: Bad Request - Validation failed
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/BadRequestResponse'
             *       401:
             *         description: Unauthorized - Token missing or invalid
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/UnauthorizedResponse'
             *       404:
             *         description: Not Found - Pet not found
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/NotFoundResponse'
             */
            .patch(
                authenticateToken,
                authorizePermission('UPDATE_PET'),
                validateRequest(IdParamDTO, 'params'),
                validateRequest(PatchPetDTO),
                petController.updatePetPartial
            )
            /**
             * @swagger
             * /pet/{id}:
             *   delete:
             *     summary: Delete a pet
             *     tags:
             *       - Pets
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
             *       400:
             *         description: Bad Request - Validation failed
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/BadRequestResponse'
             *       401:
             *         description: Unauthorized - Token missing or invalid
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/UnauthorizedResponse'
             *       404:
             *         description: Not Found - Pet not found
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/NotFoundResponse'
             */
            .delete(
                authenticateToken,
                authorizePermission('DELETE_PET'),
                validateRequest(IdParamDTO, 'params'),
                petController.deletePet
            );

        app.use('/pet', router);
    }
}
