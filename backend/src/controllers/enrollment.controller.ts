import { Request, Response, NextFunction } from 'express';
import { EnrollmentService } from '../services/enrollment.service';

const enrollmentService = new EnrollmentService();

export class EnrollmentController {
    async getByStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user!.id;
            const status = req.query.status as string;
            const enrollments = await enrollmentService.findByStatus(userId, status);
            res.status(200).json({ success: true, data: enrollments });
        } catch (error) {
            next(error);
        }
    }

    async getEligible(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user!.id;
            const subjects = await enrollmentService.getEligibleSubjects(userId);
            res.status(200).json({ success: true, data: subjects });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user!.id;
            const enrollments = await enrollmentService.findAll(userId);
            res.status(200).json({ success: true, data: enrollments });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user!.id;
            const enrollment = await enrollmentService.findById(req.params.id as string, userId);
            res.status(200).json({ success: true, data: enrollment });
        } catch (error) {
            next(error);
        }
    }

    async bulkCreate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user!.id;
            await enrollmentService.bulkCreate(req.body, userId);
            res.status(201).json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user!.id;
            const enrollment = await enrollmentService.create(req.body, userId);
            res.status(201).json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user!.id;
            await enrollmentService.update(req.params.id as string, req.body, userId);
            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user!.id;
            await enrollmentService.delete(req.params.id as string, userId);
            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    }
}
