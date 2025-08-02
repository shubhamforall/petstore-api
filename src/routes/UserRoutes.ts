import { Router, Express } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizePermission } from '../middleware/authorizePermission';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints (SuperAdmin only)
 */
export class UserRoutes {
    constructor(app: Express) {
        const router = Router();
        const controller = new UserController();

        /**
         * @swagger
         * /users:
         *   post:
         *     summary: Create a new user (SuperAdmin only)
         *     tags: [Users]
         *     security:
         *       - BearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateUserDTO'
         *     responses:
         *       201:
         *         description: User created successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/UserResponse'
         *             example:
         *               data:
         *                 id: "52385711-3891-4591-a2a1-72e790c2520c"
         *                 email: "user2@example.com"
         *                 password: "$2b$10$..."
         *                 firstName: "Priya"
         *                 lastName: "Verma"
         *                 phoneNumber: "+911234567890"
         *                 role: "Admin"
         *                 createdAt: "2025-08-02T17:12:16.053Z"
         *                 updatedAt: "2025-08-02T17:12:16.053Z"
         *               errors: null
         *               messages:
         *                 message: "User created successfully"
         *               status_code: 201
         *               is_success: true
         *       400:
         *         description: Invalid input or user already exists
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/UserResponse'
         *       401:
         *         description: Unauthorized
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/UserResponse'
         *       403:
         *         description: Forbidden – only SuperAdmin can create users
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/UserResponse'
         */
        router.post(
            '/',
            authenticateToken,
            authorizePermission('CREATE_USER'),
            controller.createUser
        );

        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Get a list of all users (SuperAdmin only)
         *     tags: [Users]
         *     security:
         *       - BearerAuth: []
         *     responses:
         *       200:
         *         description: List of users
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/UserListResponse'
         *       401:
         *         description: Unauthorized
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/UserResponse'
         *       403:
         *         description: Forbidden – only SuperAdmin can view users
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/UserResponse'
         */
        router.get(
            '/',
            authenticateToken,
            authorizePermission('GET_USERS'),
            controller.listUsers
        );

        app.use('/users', router);
    }
}
