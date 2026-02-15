import Owner, { IOwner } from '../models/owner.model';
import Pet from '../models/pet.model';

export class OwnerService {

    async findAll(): Promise<IOwner[]> {
        return await Owner.find({ deleted: false });
    }

    async findById(id: string): Promise<IOwner | null> {
        return await Owner.findOne({ _id: id, deleted: false });
    }

    async findByDni(dni: number): Promise<IOwner | null> {
        return await Owner.findOne({ dni: dni, deleted: false });
    }

    async create(data: Partial<IOwner>): Promise<IOwner> {
        return await Owner.create(data);
    }

    async update(id: string, data: Partial<IOwner>): Promise<IOwner | null> {
        return await Owner.findOneAndUpdate(
            { _id: id, deleted: false },
            data,
            { new: true }
        );
    }

    async delete(id: string): Promise<IOwner | null> {
        const owner = await Owner.findOneAndUpdate(
            { _id: id, deleted: false },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );

        if (owner) {
            await Pet.updateMany(
                { ownerId: id, deleted: false },
                { deleted: true, deletedAt: new Date() }
            );
        }

        return owner;
    }
}
