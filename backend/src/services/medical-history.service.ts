import MedicalHistory, { IMedicalHistory } from '../models/medical-history.model';
import Pet from '../models/pet.model';
import Veterinarian from '../models/veterinarian.model';
import { CreateMedicalHistoryDTO, UpdateMedicalHistoryDTO } from '../dto/medical-history.dto';
import { NotFoundError } from '../utils/errors.util';

export class MedicalHistoryService {

    async findAll(userId: string, filters: any = {}) {
        const query = { userId, deleted: false, ...filters };
        return await MedicalHistory.find(query)
            .populate('petId', 'name species')
            .populate('veterinarianId', 'name surname specialty')
            .sort({ registrationDate: -1 });
    }

    async findById(id: string, userId: string) {
        return await MedicalHistory.findOne({ _id: id, userId, deleted: false })
            .populate('petId', 'name species')
            .populate('veterinarianId', 'name surname specialty');
    }

    async create(data: CreateMedicalHistoryDTO, userId: string) {
        const pet = await Pet.findOne({ _id: data.petId, userId, deleted: false });
        if (!pet) {
            throw new NotFoundError('La mascota especificada no existe');
        }

        const veterinarian = await Veterinarian.findOne({ _id: data.veterinarianId, userId, deleted: false });
        if (!veterinarian) {
            throw new NotFoundError('El veterinario especificado no existe');
        }

        const medicalHistory = new MedicalHistory({ ...data, userId });
        await medicalHistory.save();
        return medicalHistory;
    }

    async update(id: string, data: UpdateMedicalHistoryDTO, userId: string) {
        if (data.petId) {
            const pet = await Pet.findOne({ _id: data.petId, userId, deleted: false });
            if (!pet) {
                throw new NotFoundError('La mascota especificada no existe');
            }
        }

        if (data.veterinarianId) {
            const veterinarian = await Veterinarian.findOne({ _id: data.veterinarianId, userId, deleted: false });
            if (!veterinarian) {
                throw new NotFoundError('El veterinario especificado no existe');
            }
        }

        return await MedicalHistory.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            data,
            { new: true }
        );
    }

    async deleteMedicalHistory(id: string, userId: string) {
        return await MedicalHistory.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );
    }

    async deleteByPetId(petId: string, userId: string) {
        return await MedicalHistory.updateMany(
            { petId: petId, userId, deleted: false },
            { deleted: true, deletedAt: new Date() }
        );
    }

    async existsByVeterinarianId(veterinarianId: string) {
        const count = await MedicalHistory.countDocuments({ veterinarianId: veterinarianId, deleted: false });
        return count > 0;
    }
}
