import { Request, Response } from 'express';
import { OwnerService } from '../services/owner.service';

const ownerService = new OwnerService();

export const getOwners = async (req: Request, res: Response): Promise<void> => {
    try {
        const owners = await ownerService.findAll();
        res.status(200).json({ success: true, data: owners });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const getOwnerById = async (req: Request, res: Response): Promise<void> => {
    try {
        const owner = await ownerService.findById(req.params.id as string);
        if (!owner) {
            res.status(404).json({ success: false, message: 'Owner not found' });
            return;
        }
        res.status(200).json({ success: true, data: owner });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const getOwnerByDni = async (req: Request, res: Response): Promise<void> => {
    try {
        const dni = parseInt(req.params.dni as string, 10);
        if (isNaN(dni)) {
            res.status(400).json({ success: false, message: 'Invalid DNI format' });
            return;
        }
        const owner = await ownerService.findByDni(dni);
        if (!owner) {
            res.status(404).json({ success: false, message: 'Owner not found' });
            return;
        }
        res.status(200).json({ success: true, data: owner });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const createOwner = async (req: Request, res: Response): Promise<void> => {
    try {
        await ownerService.create(req.body);
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export const updateOwner = async (req: Request, res: Response): Promise<void> => {
    try {
        const owner = await ownerService.update(req.params.id as string, req.body);
        if (!owner) {
            res.status(404).json({ success: false, message: 'Owner not found' });
            return;
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export const deleteOwner = async (req: Request, res: Response): Promise<void> => {
    try {
        const owner = await ownerService.delete(req.params.id as string);
        if (!owner) {
            res.status(404).json({ success: false, message: 'Owner not found' });
            return;
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};
