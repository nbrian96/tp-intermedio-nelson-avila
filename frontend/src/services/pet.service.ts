import { API_BASE_URL } from '../constants';
import type { Pet, PetFormData, PetResponse } from '../interfaces/pet.interface';

const API_URL = `${API_BASE_URL}/pets`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const petService = {
    async getAll(): Promise<Pet[]> {
        const response = await fetch(API_URL, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al obtener mascotas');
        }

        const data: PetResponse = await response.json();
        return data.data as Pet[];
    },

    async getByOwnerId(ownerId: string): Promise<Pet[]> {
        const response = await fetch(`${API_URL}/owner/${ownerId}`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Error al obtener mascotas del dueño');
        }

        const data: PetResponse = await response.json();
        return data.data as Pet[];
    },

    async getById(id: string): Promise<Pet> {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Error al obtener mascota');
        }

        const data: PetResponse = await response.json();
        return data.data as Pet;
    },

    async create(petData: PetFormData): Promise<void> {
        if (petData.birthdate === '') {
            delete petData.birthdate;
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(petData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear mascota');
        }
    },

    async update(id: string, petData: PetFormData): Promise<void> {
        if (petData.birthdate === '') {
            delete petData.birthdate;
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(petData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al actualizar mascota');
        }
    },

    async delete(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Error al eliminar mascota');
        }
    }
};
