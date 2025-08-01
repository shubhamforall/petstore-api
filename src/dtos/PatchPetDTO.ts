import {
    IsInt,
    IsOptional,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';

export class PatchPetDTO {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    type?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    breed?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    age?: number;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;
}
