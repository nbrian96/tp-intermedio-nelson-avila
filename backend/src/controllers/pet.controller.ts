import { Request, Response, NextFunction } from 'express';
import { PetService } from '../services/pet.service';
import { CreatePetDTO, UpdatePetDTO } from '../dto/pet.dto';
import { AuthenticationError, NotFoundError } from '../utils/errors.util';

const petService = new PetService();

export const getPets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const pets = await petService.findAll(userId);
        res.status(200).json({ success: true, data: pets });
    } catch (error) {
        next(error);
    }
};

export const getPetsByOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const pets = await petService.findByOwnerId(req.params.ownerId as string, userId);
        res.status(200).json({ success: true, data: pets });
    } catch (error) {
        next(error);
    }
};

export const getPetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const pet = await petService.findById(req.params.id as string, userId);
        if (!pet) {
            throw new NotFoundError('Pet not found');
        }
        res.status(200).json({ success: true, data: pet });
    } catch (error) {
        next(error);
    }
};

export const createPet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const petData: CreatePetDTO = req.body;
        await petService.create(petData, userId);
        res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const updatePet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const updateData: UpdatePetDTO = req.body;
        const pet = await petService.update(req.params.id as string, updateData, userId);
        if (!pet) {
            throw new NotFoundError('Pet not found');
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const deletePet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const pet = await petService.delete(req.params.id as string, userId);
        if (!pet) {
            throw new NotFoundError('Pet not found');
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
