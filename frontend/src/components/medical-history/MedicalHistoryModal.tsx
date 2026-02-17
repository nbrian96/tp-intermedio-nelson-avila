import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Box
} from '@mui/material';
import type { MedicalHistoryFormData } from '../../interfaces/medical-history.interface';
import MedicalHistoryForm from './MedicalHistoryForm';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: MedicalHistoryFormData;
    onChange: (data: MedicalHistoryFormData) => void;
    title: string;
    loading?: boolean;
    error?: string | null;
}

const MedicalHistoryModal = ({
    open,
    onClose,
    onSubmit,
    formData,
    onChange,
    title,
    loading = false,
    error = null
}: Props) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box component="form" onSubmit={onSubmit}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>
                <DialogContent dividers>
                    <MedicalHistoryForm
                        formData={formData}
                        onChange={onChange}
                        error={error}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} color="inherit" />}
                    >
                        Guardar Registro
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default MedicalHistoryModal;
