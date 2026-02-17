import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
    Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import { veterinarianService } from '../services/veterinarian.service';
import type { Veterinarian } from '../interfaces/veterinarian.interface';

const VeterinarianList = () => {
    const navigate = useNavigate();
    const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(null);

    const loadVeterinarians = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await veterinarianService.getAll();
            setVeterinarians(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVeterinarians();
    }, []);

    const handleDeleteClick = (vet: Veterinarian) => {
        setSelectedVet(vet);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedVet) {
            try {
                await veterinarianService.delete(selectedVet.id);
                setDeleteDialogOpen(false);
                setSelectedVet(null);
                loadVeterinarians();
            } catch (err) {
                setDeleteDialogOpen(false);
                setError((err as Error).message);
            }
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedVet(null);
    };

    if (loading) {
        return (
            <Container sx={{ mt: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={80} thickness={4} color="primary" />
                <Typography variant="h6" color="text.secondary">Cargando especialistas...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
                <Box>
                    <Typography variant="h3" component="h1" fontWeight="800" color="primary.main">
                        Staff Médico
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Administración de veterinarios de Patitas Felices
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/veterinarians/new')}
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)'
                    }}
                >
                    Nuevo Veterinario
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Card sx={{ borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: 'none' }}>
                <CardContent sx={{ p: 0 }}>
                    {veterinarians.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#fcfcfc' }}>
                            <PetsIcon sx={{ fontSize: 60, color: '#e0e0e0', mb: 2 }} />
                            <Typography variant="h5" color="text.secondary" gutterBottom>
                                No hay veterinarios registrados todavía
                            </Typography>
                            <Typography variant="body1" color="text.disabled" sx={{ mb: 4 }}>
                                Comienza agregando un especialista a nuestro staff médico.
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={() => navigate('/veterinarians/new')}
                                sx={{ borderRadius: 2 }}
                            >
                                Registrar el primero
                            </Button>
                        </Box>
                    ) : (
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Veterinario</TableCell>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Matrícula</TableCell>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Especialidad</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {veterinarians.map((vet) => (
                                        <TableRow key={vet.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main' }}>
                                                        <PersonIcon />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography fontWeight="600">{vet.name} {vet.surname}</Typography>
                                                        <Typography variant="caption" color="text.secondary">Miembro del staff</Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Paper variant="outlined" sx={{ display: 'inline-block', px: 1, py: 0.5, borderRadius: 1, bgcolor: '#f9f9f9', fontSize: '0.85rem' }}>
                                                    {vet.medicalLicense}
                                                </Paper>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">{vet.specialty}</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Editar perfil">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => navigate(`/veterinarians/edit/${vet.id}`)}
                                                        sx={{ mr: 1, bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'white' }, transition: 'all 0.2s' }}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Eliminar del staff">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDeleteClick(vet)}
                                                        sx={{ bgcolor: 'error.light', '&:hover': { bgcolor: 'error.main', color: 'white' }, transition: 'all 0.2s' }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                PaperProps={{
                    sx: { borderRadius: 3, p: 1 }
                }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro que deseas eliminar al veterinario{' '}
                        <Box component="span" fontWeight="bold" color="primary.main">
                            {selectedVet?.name} {selectedVet?.surname}
                        </Box>
                        ? Esta acción no se puede deshacer.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button onClick={handleDeleteCancel} sx={{ borderRadius: 2 }}>Cancelar</Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                        sx={{ borderRadius: 2, px: 3 }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default VeterinarianList;
