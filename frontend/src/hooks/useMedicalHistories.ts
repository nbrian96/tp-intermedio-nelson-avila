import { useState, useCallback } from 'react';
import { medicalHistoryService } from '../services/medical-history.service';
import type { MedicalHistory, MedicalHistoryFormData } from '../interfaces/medical-history.interface';

export const useMedicalHistories = () => {
    const [histories, setHistories] = useState<MedicalHistory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHistories = useCallback(async (filters?: { petId?: string }) => {
        try {
            setLoading(true);
            setError(null);
            const data = await medicalHistoryService.getAll(filters);
            setHistories(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar la historia clínica');
        } finally {
            setLoading(false);
        }
    }, []);

    const createHistory = async (data: MedicalHistoryFormData) => {
        try {
            setLoading(true);
            setError(null);
            const success = await medicalHistoryService.create(data);
            if (success) {
                fetchHistories();
            }
            return success;
        } catch (err: any) {
            setError(err.message || 'Error al crear el registro médico');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateHistory = async (id: string, data: Partial<MedicalHistoryFormData>) => {
        try {
            setLoading(true);
            setError(null);
            const success = await medicalHistoryService.update(id, data);
            if (success) {
                fetchHistories();
            }
            return success;
        } catch (err: any) {
            setError(err.message || 'Error al actualizar el registro médico');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteHistory = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await medicalHistoryService.delete(id);
            setHistories(prev => prev.filter(h => h._id !== id));
        } catch (err: any) {
            setError(err.message || 'Error al eliminar el registro médico');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        histories,
        loading,
        error,
        fetchHistories,
        createHistory,
        updateHistory,
        deleteHistory
    };
};
