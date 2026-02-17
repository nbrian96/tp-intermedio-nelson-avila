import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
    Paper,
    Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import dayjs from 'dayjs';
import type { MedicalHistory } from '../../interfaces/medical-history.interface';
import type { Veterinarian } from '../../interfaces/veterinarian.interface';

interface Props {
    histories: MedicalHistory[];
    onEdit?: (history: MedicalHistory) => void;
    onDelete?: (history: MedicalHistory) => void;
}

const MedicalHistoryList = ({ histories, onEdit, onDelete }: Props) => {
    const showActions = Boolean(onEdit || onDelete);

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid #eee' }}>
            <Table size="small">
                <TableHead sx={{ bgcolor: '#fafafa' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Veterinario</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                        {showActions && <TableCell align="right" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {histories.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={showActions ? 4 : 3} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                No hay registros médicos para esta mascota.
                            </TableCell>
                        </TableRow>
                    ) : (
                        histories.map((history) => {

                            return (
                                <TableRow key={history._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EventIcon fontSize="small" color="action" />
                                            <Typography variant="body2">
                                                {dayjs(history.registrationDate).format('DD/MM/YYYY')}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                                {typeof history.veterinarianId === 'object' ? (history.veterinarianId as Veterinarian).name?.charAt(0) : '?'}
                                            </Avatar>
                                            <Typography variant="body2">
                                                {typeof history.veterinarianId === 'object'
                                                    ? `${(history.veterinarianId as Veterinarian).name} ${(history.veterinarianId as Veterinarian).surname}`
                                                    : 'Cargando...'}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {history.description}
                                        </Typography>
                                    </TableCell>
                                    {showActions && (
                                        <TableCell align="right">
                                            {onEdit && (
                                                <Tooltip title="Editar registro">
                                                    <IconButton size="small" color="primary" onClick={() => onEdit(history)}>
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            {onDelete && (
                                                <Tooltip title="Eliminar registro">
                                                    <IconButton size="small" color="error" onClick={() => onDelete(history)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MedicalHistoryList;
