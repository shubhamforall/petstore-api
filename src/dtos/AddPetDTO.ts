import {
    IsInt,
    IsOptional,
    IsString,
    IsNotEmpty,
    MaxLength,
    Min,
} from 'class-validator';

export class AddPetDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    type!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    breed!: string;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    age!: number;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;
}
