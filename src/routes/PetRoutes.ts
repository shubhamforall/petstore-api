import { type Express, Router } from 'express';
import { PetController } from '../controllers/PetController';
import { upload } from '../utils/upload';

export class PetRoutes {
    constructor(app: Express) {
        this.configureRoutes(app);
    }

    configureRoutes(app: Express): void {
        const router = Router();
        const petController = new PetController();

        router
            .route('/')
            .get(petController.listPets)
            .post(upload.array('images'), petController.addPetWithImages);

        router
            .route('/:id')
            .get(petController.getPetById)
            .put(petController.updatePet)
            .delete(petController.deletePet);

        app.use('/pets', router);
    }
}
