import { Request, Response, NextFunction } from 'express';
import { MedicalHistoryService } from '../services/medical-history.service';
import { AuthenticationError, NotFoundError } from '../utils/errors.util';

const medicalHistoryService = new MedicalHistoryService();

export const getMedicalHistories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const filters: any = {};
        if (req.query.petId) filters.petId = req.query.petId;

        const medicalHistories = await medicalHistoryService.findAll(userId, filters);
        res.status(200).json({ success: true, data: medicalHistories });
    } catch (error) {
        next(error);
    }
};

export const getMedicalHistoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const medicalHistory = await medicalHistoryService.findById(req.params.id as string, userId);
        if (!medicalHistory) {
            throw new NotFoundError('Medical History not found');
        }
        res.status(200).json({ success: true, data: medicalHistory });
    } catch (error) {
        next(error);
    }
};

export const createMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        await medicalHistoryService.create(req.body, userId);
        res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const updateMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const medicalHistory = await medicalHistoryService.update(req.params.id as string, req.body, userId);
        if (!medicalHistory) {
            throw new NotFoundError('Medical History not found');
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const deleteMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('Unauthorized');
        }
        const medicalHistory = await medicalHistoryService.deleteMedicalHistory(req.params.id as string, userId);
        if (!medicalHistory) {
            throw new NotFoundError('Medical History not found');
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
