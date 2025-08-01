import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { AddPetDTO } from '../dtos/AddPetDTO';
import { PatchPetDTO } from '../dtos/PatchPetDTO';
import { PetModel } from '../models/PetModel';
import { sendSuccess } from '../utils/responseHandler';

export class PetController {
    private petModel = new PetModel();

    listPets = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const result = await this.petModel.listPets(page, pageSize);
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
