import Veterinarian, { IVeterinarian } from '../models/veterinarian.model';
import { MedicalHistoryService } from './medical-history.service';

const medicalHistoryService = new MedicalHistoryService();

export class VeterinarianService {

    async findAllSpecialists(): Promise<IVeterinarian[]> {
        return await Veterinarian.find(
            { deleted: false },
            { name: 1, surname: 1, specialty: 1, medicalLicense: 1, id: '$_id', _id: 0 }
        );
    }

    async create(data: Partial<IVeterinarian>): Promise<IVeterinarian> {
        return await Veterinarian.create(data);
    }

    async findById(id: string): Promise<IVeterinarian | null> {
        return await Veterinarian.findOne({ _id: id, deleted: false });
    }

    async update(id: string, data: Partial<IVeterinarian>): Promise<IVeterinarian | null> {
        return await Veterinarian.findOneAndUpdate(
            { _id: id, deleted: false },
            data,
            { new: true }
        );
    }

    async delete(id: string): Promise<IVeterinarian | null> {
        const hasMedicalHistory = await medicalHistoryService.existsByVeterinarianId(id);
        if (hasMedicalHistory) {
            throw new Error('Cannot delete veterinarian with existing medical records.');
        }

        return await Veterinarian.findOneAndUpdate(
            { _id: id, deleted: false },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );
    }
}
