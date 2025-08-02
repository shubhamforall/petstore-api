import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { usersDAO } from '../daos/UsersDAO';
import { ApiError } from '../utils/ApiError';
import bcrypt from 'bcrypt';

export class UserModel {
    async createUser(dto: CreateUserDTO) {
        const existing = await usersDAO.findByEmail(dto.email);
        if (existing) {
            throw new ApiError('Email already in use', 400);
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return usersDAO.create({
            email: dto.email,
            password: hashedPassword,
            firstName: dto.firstName,
            lastName: dto.lastName,
            phoneNumber: dto.phoneNumber,
            role: dto.role,
        });
    }

    async listUsers() {
        return usersDAO.list();
    }
}
