import { Router, Express } from 'express';
import { AuthController } from '../controllers/AuthController';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */
export class AuthRoutes {
    constructor(app: Express) {
        const router = Router();
        const controller = new AuthController();

        /**
         * @swagger
         * /auth/login:
         *   post:
         *     summary: Login and get JWT token
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/LoginRequest'
         *     responses:
         *       200:
         *         description: Successfully logged in
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/LoginResponse'
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
        router.post('/login', controller.login);

        app.use('/auth', router);
    }
}
