import {
    IsInt,
    IsOptional,
    IsString,
    Min,
    MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UrlDataDTO {
    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    age?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    pageSize?: number;
}
