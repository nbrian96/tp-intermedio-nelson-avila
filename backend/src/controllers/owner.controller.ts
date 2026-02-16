import { Request, Response, NextFunction } from 'express';
import { OwnerService } from '../services/owner.service';
import { CreateOwnerDTO, UpdateOwnerDTO } from '../dto/owner.dto';
import { AuthenticationError, NotFoundError, ValidationError } from '../utils/errors.util';

const ownerService = new OwnerService();

export const getOwners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const owners = await ownerService.findAll(userId);
        res.status(200).json({ success: true, data: owners });
    } catch (error) {
        next(error);
    }
};

export const getOwnerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const owner = await ownerService.findById(req.params.id as string, userId);
        if (!owner) {
            throw new NotFoundError('Owner not found');
        }
        res.status(200).json({ success: true, data: owner });
    } catch (error) {
        next(error);
    }
};

export const getOwnerByDni = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const dni = parseInt(req.params.dni as string, 10);
        if (isNaN(dni)) {
            throw new ValidationError('Invalid DNI format');
        }
        const owner = await ownerService.findByDni(dni, userId);
        if (!owner) {
            throw new NotFoundError('Owner not found');
        }
        res.status(200).json({ success: true, data: owner });
    } catch (error) {
        next(error);
    }
};

export const createOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const ownerData: CreateOwnerDTO = req.body;
        await ownerService.create(ownerData, userId);
        res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const updateOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const updateData: UpdateOwnerDTO = req.body;
        const owner = await ownerService.update(req.params.id as string, updateData, userId);
        if (!owner) {
            throw new NotFoundError('Owner not found');
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const deleteOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const owner = await ownerService.delete(req.params.id as string, userId);
        if (!owner) {
            throw new NotFoundError('Owner not found');
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
