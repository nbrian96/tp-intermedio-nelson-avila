import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import type { MedicalHistoryFormData } from '../../interfaces/medical-history.interface';
import type { Veterinarian } from '../../interfaces/veterinarian.interface';
import { veterinarianService } from '../../services/veterinarian.service';

interface Props {
    formData: MedicalHistoryFormData;
    onChange: (data: MedicalHistoryFormData) => void;
    error?: string | null;
}

const MedicalHistoryForm = ({ formData, onChange, error }: Props) => {
    const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
    const [loadingVets, setLoadingVets] = useState(true);

    useEffect(() => {
        const fetchVets = async () => {
            try {
                const data = await veterinarianService.getAll();
                setVeterinarians(data);
            } catch (err) {
                console.error('Error fetching veterinarians:', err);
            } finally {
                setLoadingVets(false);
            }
        };
        fetchVets();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (date: any) => {
        onChange({
            ...formData,
            registrationDate: date ? dayjs(date).toISOString() : ''
        });
    };

    return (
        <Box sx={{ mt: 1 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <DatePicker
                        label="Fecha del Registro"
                        value={formData.registrationDate ? dayjs(formData.registrationDate) : null}
                        onChange={handleDateChange}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                required: true
                            }
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        select
                        fullWidth
                        label="Veterinario"
                        name="veterinarianId"
                        value={formData.veterinarianId}
                        onChange={handleChange}
                        required
                        disabled={loadingVets}
                    >
                        {loadingVets ? (
                            <MenuItem disabled>
                                <CircularProgress size={20} sx={{ mr: 1 }} /> Cargando...
                            </MenuItem>
                        ) : (
                            veterinarians.map((vet) => (
                                <MenuItem key={vet.id} value={vet.id}>
                                    {vet.name} {vet.surname} ({vet.specialty})
                                </MenuItem>
                            ))
                        )}
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Descripción / Observaciones"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        multiline
                        rows={4}
                        placeholder="Describa el motivo de la consulta, diagnóstico o tratamiento..."
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MedicalHistoryForm;
