import { type Express, Router } from 'express';
import { PetController } from '../controllers/PetController';
import { upload } from '../utils/upload';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizePermission } from '../middleware/authorizePermission';

export class PetRoutes {
    constructor(app: Express) {
        this.configureRoutes(app);
    }

    configureRoutes(app: Express): void {
        const router = Router();
        const petController = new PetController();

        router
            .route('/')
            .get(
                authenticateToken,
                authorizePermission('GET_PETS'),
                petController.listPets
            )
            .post(
                authenticateToken,
                authorizePermission('CREATE_PET'),
                upload.array('images'),
                petController.addPetWithImages
            );

        router
            .route('/:id')
            .get(
                authenticateToken,
                authorizePermission('GET_PETS'),
                petController.getPetById
            )
            .put(
                authenticateToken,
                authorizePermission('UPDATE_PET'),
                petController.updatePet
            )
            .delete(
                authenticateToken,
                authorizePermission('DELETE_PET'),
                petController.deletePet
            );

        app.use('/pets', router);
    }
}
