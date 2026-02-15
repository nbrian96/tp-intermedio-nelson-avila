import Pet, { IPet } from '../models/pet.model';

export class PetService {

    async findAll(): Promise<IPet[]> {
        return await Pet.find({ deleted: false }).populate('ownerId', 'name surname');
    }

    async findById(id: string): Promise<IPet | null> {
        return await Pet.findOne({ _id: id, deleted: false }).populate('ownerId', 'name surname');
    }

    async create(data: Partial<IPet>): Promise<IPet> {
        return await Pet.create(data);
    }

    async update(id: string, data: Partial<IPet>): Promise<IPet | null> {
        return await Pet.findOneAndUpdate(
            { _id: id, deleted: false },
            data,
            { new: true }
        );
    }

    async delete(id: string): Promise<IPet | null> {
        return await Pet.findOneAndUpdate(
            { _id: id, deleted: false },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );
    }
}
