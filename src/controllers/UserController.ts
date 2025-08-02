import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UserModel } from '../models/UserModel';
import { sendSuccess } from '../utils/responseHandler';
import { ApiError } from '../utils/ApiError';

export class UserController {
    private userModel = new UserModel();

    createUser = async (req: Request, res: Response) => {
        const dto = plainToInstance(CreateUserDTO, req.body, {
            enableImplicitConversion: true,
        });

        const errors = validateSync(dto, { whitelist: true });
        if (errors.length > 0) {
            throw new ApiError('Invalid user data', 400, errors);
        }

        const user = await this.userModel.createUser(dto);
        return sendSuccess(res, user, 'User created successfully', 201);
    };

    listUsers = async (_req: Request, res: Response) => {
        const users = await this.userModel.listUsers();
        return sendSuccess(res, users, 'Users fetched successfully');
    };
}
