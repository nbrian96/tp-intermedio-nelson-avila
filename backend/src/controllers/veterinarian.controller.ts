import { Request, Response, NextFunction } from 'express';
import { VeterinarianService } from '../services/veterinarian.service';
import { CreateVeterinarianDTO, UpdateVeterinarianDTO } from '../dto/veterinarian.dto';
import { AuthenticationError, NotFoundError } from '../utils/errors.util';

const veterinarianService = new VeterinarianService();

export const getSpecialists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const specialists = await veterinarianService.findAllSpecialists(userId);
        res.status(200).json({ success: true, data: specialists });
    } catch (error) {
        next(error);
    }
};

export const createVeterinarian = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const veterinarianData: CreateVeterinarianDTO = req.body;
        await veterinarianService.create(veterinarianData, userId);
        res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const getVeterinarianById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const veterinarian = await veterinarianService.findById(req.params.id as string, userId);
        if (!veterinarian) {
            throw new NotFoundError('Veterinarian not found');
        }
        res.status(200).json({ success: true, data: veterinarian });
    } catch (error) {
        next(error);
    }
};

export const updateVeterinarian = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const updateData: UpdateVeterinarianDTO = req.body;
        const veterinarian = await veterinarianService.update(req.params.id as string, updateData, userId);
        if (!veterinarian) {
            throw new NotFoundError('Veterinarian not found');
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const deleteVeterinarian = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const veterinarian = await veterinarianService.delete(req.params.id as string, userId);
        if (!veterinarian) {
            throw new NotFoundError('Veterinarian not found');
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
