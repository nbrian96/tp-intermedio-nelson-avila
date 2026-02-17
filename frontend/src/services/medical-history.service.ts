import type { MedicalHistory, MedicalHistoryFormData } from '../interfaces/medical-history.interface';
import { API_BASE_URL } from '../constants';

const API_URL = `${API_BASE_URL}/medical-histories`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const medicalHistoryService = {
    getAll: async (filters?: { petId?: string }): Promise<MedicalHistory[]> => {
        const params = new URLSearchParams();
        if (filters?.petId) params.append('petId', filters.petId);

        const response = await fetch(`${API_URL}?${params.toString()}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al obtener la historia clínica');
        }

        const data = await response.json();
        return data.data;
    },

    getById: async (id: string): Promise<MedicalHistory> => {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al obtener el registro médico');
        }

        const data = await response.json();
        return data.data;
    },

    create: async (data: MedicalHistoryFormData): Promise<MedicalHistory> => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear el registro médico');
        }

        const result = await response.json();
        return result?.success;
    },

    update: async (id: string, data: Partial<MedicalHistoryFormData>): Promise<MedicalHistory> => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar el registro médico');
        }

        const result = await response.json();
        return result?.success;
    },

    delete: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el registro médico');
        }
    }
};
