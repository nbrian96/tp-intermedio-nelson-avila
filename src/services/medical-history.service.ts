
import MedicalHistory, { IMedicalHistory } from '../models/medical-history.model';

export class MedicalHistoryService {

    async findAll() {
        return await MedicalHistory.find({ deleted: false })
            .populate('petId', 'name species')
            .populate('veterinarianId', 'name surname specialty');
    }

    async findById(id: string) {
        return await MedicalHistory.findOne({ _id: id, deleted: false })
            .populate('petId', 'name species')
            .populate('veterinarianId', 'name surname specialty');
    }

    async create(data: Partial<IMedicalHistory>) {
        const medicalHistory = new MedicalHistory(data);
        await medicalHistory.save();
        return medicalHistory;
    }

    async update(id: string, data: Partial<IMedicalHistory>) {
        return await MedicalHistory.findOneAndUpdate(
            { _id: id, deleted: false },
            data,
            { new: true }
        );
    }

    async deleteMedicalHistory(id: string) {
        return await MedicalHistory.findOneAndUpdate(
            { _id: id, deleted: false },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );
    }

    async deleteByPetId(petId: string) {
        return await MedicalHistory.updateMany(
            { petId: petId, deleted: false },
            { deleted: true, deletedAt: new Date() }
        );
    }

    async existsByVeterinarianId(veterinarianId: string) {
        const count = await MedicalHistory.countDocuments({ veterinarianId: veterinarianId, deleted: false });
        return count > 0;
    }
}
