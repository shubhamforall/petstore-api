import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export enum UserRole {
    Admin = 'Admin',
    User = 'User'
}

export class CreateUserDTO {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password!: string;

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsPhoneNumber()
    phoneNumber!: string;

    @IsEnum(UserRole)
    role!: UserRole;
}
