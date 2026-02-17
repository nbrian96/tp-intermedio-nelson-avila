import type { Veterinarian } from './veterinarian.interface';
import type { Pet } from './pet.interface';

export interface MedicalHistory {
    _id: string;
    petId: string | Pet;
    veterinarianId: string | Veterinarian;
    registrationDate: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface MedicalHistoryFormData {
    petId: string;
    veterinarianId: string;
    registrationDate: string;
    description: string;
}
