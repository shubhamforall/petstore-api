import { IsUUID } from 'class-validator';

export class IdParamDTO {
    @IsUUID()
    id!: string;
}
