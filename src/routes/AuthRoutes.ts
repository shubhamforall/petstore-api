import { Router, Express } from 'express';
import { AuthController } from '../controllers/AuthController';

export class AuthRoutes {
    constructor(app: Express) {
        const router = Router();
        const controller = new AuthController();

        router.post('/login', controller.login);

        app.use('/auth', router);
    }
}
