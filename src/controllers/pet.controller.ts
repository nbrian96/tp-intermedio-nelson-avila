import { Request, Response } from 'express';
import { PetService } from '../services/pet.service';

const petService = new PetService();

export const getPets = async (req: Request, res: Response): Promise<void> => {
    try {
        const pets = await petService.findAll();
        res.status(200).json({ success: true, data: pets });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const getPetById = async (req: Request, res: Response): Promise<void> => {
    try {
        const pet = await petService.findById(req.params.id as string);
        if (!pet) {
            res.status(404).json({ success: false, message: 'Pet not found' });
            return;
        }
        res.status(200).json({ success: true, data: pet });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const createPet = async (req: Request, res: Response): Promise<void> => {
    try {
        const pet = await petService.create(req.body);
        res.status(201).json({ success: true, data: pet });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export const updatePet = async (req: Request, res: Response): Promise<void> => {
    try {
        const pet = await petService.update(req.params.id as string, req.body);
        if (!pet) {
            res.status(404).json({ success: false, message: 'Pet not found' });
            return;
        }
        res.status(200).json({ success: true, data: pet });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export const deletePet = async (req: Request, res: Response): Promise<void> => {
    try {
        const pet = await petService.delete(req.params.id as string);
        if (!pet) {
            res.status(404).json({ success: false, message: 'Pet not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};
