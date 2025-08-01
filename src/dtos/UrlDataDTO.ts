import {
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    Min,
    MaxLength,
} from 'class-validator';

export class UrlDataDTO {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    pageSize?: number;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    type?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    age?: number;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    search?: string;
}
