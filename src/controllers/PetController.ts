import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { AddPetDTO } from '../dtos/AddPetDTO';
import { PatchPetDTO } from '../dtos/PatchPetDTO';
import { PetModel } from '../models/PetModel';
import { sendSuccess } from '../utils/responseHandler';
import { UrlDataDTO } from '../dtos/UrlDataDTO';
import { validateSync } from 'class-validator';
import { ApiError } from '../utils/ApiError';

export class PetController {
    private petModel = new PetModel();

    listPets = async (req: Request, res: Response) => {
        const queryDto = plainToInstance(UrlDataDTO, req.query, {
            enableImplicitConversion: true,
        });


        const errors = validateSync(queryDto, { whitelist: true });
        if (errors.length > 0) {
            throw new ApiError('Invalid query parameters', 400, errors);
        }

        const page = queryDto.page || 1;
        const pageSize = queryDto.pageSize || 10;

        const result = await this.petModel.listPetsWithFilters({
            page,
            pageSize,
            type: queryDto.type,
            age: queryDto.age,
        });

        return sendSuccess(res, result, 'Pets fetched successfully');
    };

    getPetById = async (req: Request, res: Response) => {
        const result = await this.petModel.getPetById(req.params.id);
        return sendSuccess(res, result, 'Pet fetched successfully');
    };

    addPetWithImages = async (req: Request, res: Response) => {
        const dto = plainToInstance(AddPetDTO, req.body);
        const result = await this.petModel.addPetWithImages(dto, req.files as Express.Multer.File[]);
        return sendSuccess(res, result, 'Pet added successfully', 201);
    };

    updatePet = async (req: Request, res: Response) => {
        const dto = plainToInstance(PatchPetDTO, req.body);
        const result = await this.petModel.updatePet(req.params.id, dto);
        return sendSuccess(res, result, 'Pet updated successfully');
    };

    deletePet = async (req: Request, res: Response) => {
        await this.petModel.deletePet(req.params.id);
        return sendSuccess(res, null, 'Pet deleted successfully', 204);
    };
}
