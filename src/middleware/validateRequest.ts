import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

type Source = 'body' | 'query' | 'params';

export function validateRequest<T extends object>(
    DTOClass: new () => T,
    source: Source = 'body'
) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            if (
                !DTOClass ||
                typeof DTOClass !== 'function' ||
                !DTOClass.prototype ||
                !DTOClass.prototype.constructor
            ) {
                console.error('Invalid DTOClass:', DTOClass);
                return next(new ApiError('DTO class is not a valid constructor', 500));
            }

            const dataToValidate =
                source === 'query'
                    ? req.query
                    : source === 'params'
                        ? req.params
                        : req.body;

            const dtoObject = plainToInstance(DTOClass, dataToValidate, {
                enableImplicitConversion: true,
            });

            const errors = await validate(dtoObject, { whitelist: true });

            if (errors.length > 0) {
                return next(new ApiError('Validation failed', 400, errors));
            }

            next();
        } catch (err) {
            console.error('Unexpected error in validateRequest:', err);
            return next(new ApiError('Internal validation error', 500));
        }
    };
}
