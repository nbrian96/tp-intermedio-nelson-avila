import Pet, { IPet } from '../models/pet.model';
import Owner from '../models/owner.model';
import { MedicalHistoryService } from './medical-history.service';
import { CreatePetDTO, UpdatePetDTO } from '../dto/pet.dto';
import { NotFoundError } from '../utils/errors.util';

const medicalHistoryService = new MedicalHistoryService();

export class PetService {

    async findAll(userId: string): Promise<IPet[]> {
        return await Pet.find({ userId, deleted: false }).populate('ownerId', 'name surname');
    }

    async findByOwnerId(ownerId: string, userId: string): Promise<IPet[]> {
        return await Pet.find({ ownerId, userId, deleted: false });
    }

    async findById(id: string, userId: string): Promise<IPet | null> {
        return await Pet.findOne({ _id: id, userId, deleted: false }).populate('ownerId', 'name surname');
    }

    async create(data: CreatePetDTO, userId: string): Promise<IPet> {
        const owner = await Owner.findOne({ _id: data.ownerId, userId, deleted: false });
        if (!owner) {
            throw new NotFoundError('El dueño especificado no existe');
        }

        const petData = {
            ...data,
            userId,
            birthdate: data.birthdate ? new Date(data.birthdate) : null
        };
        return await Pet.create(petData as any);
    }

    async update(id: string, data: UpdatePetDTO, userId: string): Promise<IPet | null> {
        if (data.ownerId) {
            const owner = await Owner.findOne({ _id: data.ownerId, userId, deleted: false });
            if (!owner) {
                throw new NotFoundError('El dueño especificado no existe');
            }
        }

        return await Pet.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            data,
            { new: true }
        );
    }

    async delete(id: string, userId: string): Promise<IPet | null> {
        const pet = await Pet.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );

        if (pet) {
            await medicalHistoryService.deleteByPetId(id, userId);
        }

        return pet;
    }
}
