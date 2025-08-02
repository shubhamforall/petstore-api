import { Role } from '../../types/roles';

export const petPermissions: Record<string, Role[]> = {
    CREATE_PET: ['Admin'],
    UPDATE_PET: ['Admin'],
    DELETE_PET: ['Admin'],
    GET_PETS: ['Admin', 'SuperAdmin', 'User'],
};
