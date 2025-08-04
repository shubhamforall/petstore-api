import {
    IsInt,
    IsOptional,
    IsString,
    Min,
    IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UrlDataDTO {
    @IsOptional()
    @IsUUID()
    id?: string;

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
