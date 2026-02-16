import { Request, Response, NextFunction } from 'express';
import { MedicalHistoryService } from '../services/medical-history.service';

const medicalHistoryService = new MedicalHistoryService();

export const getMedicalHistories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const medicalHistories = await medicalHistoryService.findAll();
        res.status(200).json({ success: true, data: medicalHistories });
    } catch (error) {
        next(error);
    }
};

export const getMedicalHistoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const medicalHistory = await medicalHistoryService.findById(req.params.id as string);
        if (!medicalHistory) {
            return res.status(404).json({ success: false, message: 'Medical History not found' });
        }
        res.status(200).json({ success: true, data: medicalHistory });
    } catch (error) {
        next(error);
    }
};

export const createMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await medicalHistoryService.create(req.body);
        res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const updateMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const medicalHistory = await medicalHistoryService.update(req.params.id as string, req.body);
        if (!medicalHistory) {
            return res.status(404).json({ success: false, message: 'Medical History not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const deleteMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const medicalHistory = await medicalHistoryService.deleteMedicalHistory(req.params.id as string);
        if (!medicalHistory) {
            return res.status(404).json({ success: false, message: 'Medical History not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
