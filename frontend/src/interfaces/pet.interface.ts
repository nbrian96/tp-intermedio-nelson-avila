import type { Owner } from "./owner.interface";

export interface Pet {
    _id: string;
    name: string;
    species: string;
    birthdate: string | null;
    ownerId: string | Owner;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface PetFormData {
    name: string;
    species: string;
    birthdate?: string | null;
    ownerId: string;
}

export interface PetResponse {
    success: boolean;
    data: Pet | Pet[];
    message?: string;
}
