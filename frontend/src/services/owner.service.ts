import { API_BASE_URL } from '../constants';
import type { Owner, OwnerFormData, OwnerResponse } from '../interfaces/owner.interface';

const API_URL = `${API_BASE_URL}/owners`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const ownerService = {
    async getAll(): Promise<Owner[]> {
        const response = await fetch(API_URL, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al obtener dueños');
        }

        const data: OwnerResponse = await response.json();
        return data.data as Owner[];
    },

    async getById(id: string): Promise<Owner> {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Error al obtener dueño');
        }

        const data: OwnerResponse = await response.json();
        return data.data as Owner;
    },

    async create(ownerData: OwnerFormData): Promise<void> {
        if (ownerData.address === '') {
            delete ownerData.address;
        }
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(ownerData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear dueño');
        }
    },

    async update(id: string, ownerData: OwnerFormData): Promise<void> {
        if (ownerData.address === '') {
            delete ownerData.address;
        }
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(ownerData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al actualizar dueño');
        }
    },

    async delete(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Error al eliminar dueño');
        }
    }
};
