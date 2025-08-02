import { Router, Express } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizePermission } from '../middleware/authorizePermission';

export class UserRoutes {
    constructor(app: Express) {
        const router = Router();
        const controller = new UserController();

        router.post(
            '/',
            authenticateToken,
            authorizePermission('CREATE_USER'),
            controller.createUser
        );

        router.get(
            '/',
            authenticateToken,
            authorizePermission('GET_USERS'),
            controller.listUsers
        );

        app.use('/users', router);
    }
}
