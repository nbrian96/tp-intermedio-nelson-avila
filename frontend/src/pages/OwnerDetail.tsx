import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography,
    Grid,
    IconButton,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
    Divider,
    Paper,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { ownerService } from '../services/owner.service';
import { petService } from '../services/pet.service';
import type { Owner } from '../interfaces/owner.interface';
import type { Pet, PetFormData } from '../interfaces/pet.interface';

const OwnerDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [owner, setOwner] = useState<Owner | null>(null);
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pet Form Dialog State
    const [petDialogOpen, setPetDialogOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [petFormData, setPetFormData] = useState<PetFormData>({
        name: '',
        species: '',
        birthdate: '',
        ownerId: id || ''
    });
    const [petSubmitting, setPetSubmitting] = useState(false);
    const [petError, setPetError] = useState<string | null>(null);

    // Delete Pet Dialog State
    const [deletePetDialogOpen, setDeletePetDialogOpen] = useState(false);
    const [petToDelete, setPetToDelete] = useState<Pet | null>(null);

    const loadData = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            const [ownerData, petsData] = await Promise.all([
                ownerService.getById(id),
                petService.getByOwnerId(id)
            ]);
            setOwner(ownerData);
            setPets(petsData);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleOpenPetDialog = (pet: Pet | null = null) => {
        if (pet) {
            setSelectedPet(pet);
            setPetFormData({
                name: pet.name,
                species: pet.species,
                birthdate: pet.birthdate ? new Date(pet.birthdate).toISOString().split('T')[0] : '',
                ownerId: id || ''
            });
        } else {
            setSelectedPet(null);
            setPetFormData({
                name: '',
                species: '',
                birthdate: '',
                ownerId: id || ''
            });
        }
        setPetError(null);
        setPetDialogOpen(true);
    };

    const handleClosePetDialog = () => {
        setPetDialogOpen(false);
        setSelectedPet(null);
        setPetError(null);
    };

    const handlePetFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPetFormData({
            ...petFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (date: any) => {
        setPetFormData({
            ...petFormData,
            birthdate: date ? dayjs(date).format('YYYY-MM-DD') : ''
        });
    };

    const handlePetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!petFormData.name || !petFormData.species) {
            setPetError('Nombre y Especie son obligatorios');
            return;
        }

        try {
            setPetSubmitting(true);
            if (selectedPet) {
                await petService.update(selectedPet._id, petFormData);
            } else {
                await petService.create(petFormData);
            }
            handleClosePetDialog();
            const updatedPets = await petService.getByOwnerId(id!);
            setPets(updatedPets);
        } catch (err) {
            setPetError((err as Error).message);
        } finally {
            setPetSubmitting(false);
        }
    };

    const handleOpenDeletePet = (pet: Pet) => {
        setPetToDelete(pet);
        setDeletePetDialogOpen(true);
    };

    const handleCloseDeletePet = () => {
        setDeletePetDialogOpen(false);
        setPetToDelete(null);
    };

    const handleConfirmDeletePet = async () => {
        if (!petToDelete) return;
        try {
            await petService.delete(petToDelete._id);
            handleCloseDeletePet();
            const updatedPets = await petService.getByOwnerId(id!);
            setPets(updatedPets);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    if (loading) {
        return (
            <Container sx={{ mt: 20, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={80} />
            </Container>
        );
    }

    if (!owner) {
        return (
            <Container sx={{ mt: 10 }}>
                <Alert severity="error">Dueño no encontrado</Alert>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/owners')} sx={{ mt: 2 }}>
                    Volver
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/owners')}
                sx={{ mb: 4, borderRadius: 2 }}
            >
                Volver al listado
            </Button>

            <Grid container spacing={4}>
                {/* Left Side: Owner Profile Card */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'sticky', top: 20 }}>
                        <Box sx={{ bgcolor: 'primary.main', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    mb: -5,
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                    border: '4px solid white'
                                }}
                            >
                                <PersonIcon sx={{ fontSize: 60 }} />
                            </Avatar>
                        </Box>
                        <CardContent sx={{ pt: 7, textAlign: 'center' }}>
                            <Typography variant="h5" fontWeight="bold">
                                {owner.name} {owner.surname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Cliente de Patitas Felices
                            </Typography>

                            <Divider sx={{ my: 3 }} />

                            <Box sx={{ textAlign: 'left', px: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                                    <BadgeIcon color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">DNI</Typography>
                                        <Typography variant="body1" fontWeight="500">{owner.dni}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                                    <PhoneIcon color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">Teléfono</Typography>
                                        <Typography variant="body1" fontWeight="500">{owner.phone}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <HomeIcon color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">Dirección</Typography>
                                        <Typography variant="body1" fontWeight="500">{owner.address || 'No especificada'}</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => navigate(`/owners/edit/${owner._id}`)}
                                sx={{ mt: 4, borderRadius: 2 }}
                            >
                                Editar Perfil
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Side: Pets List */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h4" fontWeight="bold" color="primary.main">
                            Mascotas
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenPetDialog()}
                            sx={{ borderRadius: 2 }}
                        >
                            Nueva Mascota
                        </Button>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <Card sx={{ borderRadius: 4, boxShadow: '0 5px 20px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                        <CardContent sx={{ p: 0 }}>
                            {pets.length === 0 ? (
                                <Box sx={{ textAlign: 'center', py: 8 }}>
                                    <PetsIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2, opacity: 0.3 }} />
                                    <Typography variant="h6" color="text.secondary">Este dueño no tiene mascotas registradas</Typography>
                                    <Typography variant="body2" color="text.disabled">Agrega una mascota para comenzar el seguimiento médico.</Typography>
                                </Box>
                            ) : (
                                <TableContainer>
                                    <Table>
                                        <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Especie</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Fecha Nac.</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {pets.map((pet) => (
                                                <TableRow key={pet._id} hover>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.light', color: 'secondary.main' }}>
                                                                <PetsIcon fontSize="small" />
                                                            </Avatar>
                                                            <Typography fontWeight="600">{pet.name}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Paper
                                                            variant="outlined"
                                                            sx={{
                                                                display: 'inline-block',
                                                                px: 1,
                                                                py: 0.2,
                                                                borderRadius: 1,
                                                                bgcolor: '#f0f0f0',
                                                                fontSize: '0.8rem',
                                                                textTransform: 'uppercase'
                                                            }}
                                                        >
                                                            {pet.species}
                                                        </Paper>
                                                    </TableCell>
                                                    <TableCell>
                                                        {pet.birthdate ? dayjs(pet.birthdate).format('DD/MM/YYYY') : '-'}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Tooltip title="Editar mascota">
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => handleOpenPetDialog(pet)}
                                                                sx={{ mr: 1, bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Eliminar mascota">
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={() => handleOpenDeletePet(pet)}
                                                                sx={{ bgcolor: 'error.light', '&:hover': { bgcolor: 'error.main', color: 'white' } }}
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
                </Grid>
            </Grid>

            {/* Pet Form Dialog */}
            <Dialog open={petDialogOpen} onClose={handleClosePetDialog} fullWidth maxWidth="xs">
                <Box component="form" onSubmit={handlePetSubmit}>
                    <DialogTitle sx={{ fontWeight: 'bold' }}>
                        {selectedPet ? 'Editar Mascota' : 'Nueva Mascota'}
                    </DialogTitle>
                    <DialogContent>
                        {petError && <Alert severity="error" sx={{ mb: 2 }}>{petError}</Alert>}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
                            <TextField
                                fullWidth
                                label="Nombre de la Mascota"
                                name="name"
                                value={petFormData.name}
                                onChange={handlePetFormChange}
                                required
                                autoFocus
                            />
                            <TextField
                                fullWidth
                                label="Especie"
                                name="species"
                                value={petFormData.species}
                                onChange={handlePetFormChange}
                                required
                                placeholder="Ej: Perro, Gato, Conejo"
                            />
                            <DatePicker
                                label="Fecha de Nacimiento"
                                value={petFormData.birthdate ? dayjs(petFormData.birthdate) : null}
                                onChange={handleDateChange}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                    }
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleClosePetDialog}>Cancelar</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={petSubmitting}
                            startIcon={petSubmitting && <CircularProgress size={20} color="inherit" />}
                        >
                            {selectedPet ? 'Guardar Cambios' : 'Registrar Mascota'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            {/* Delete Pet Confirmation Dialog */}
            <Dialog open={deletePetDialogOpen} onClose={handleCloseDeletePet}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>Eliminar Mascota</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro que deseas eliminar a <b>{petToDelete?.name}</b>?
                        Esta acción no se puede deshacer y se perderá su historia clínica.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCloseDeletePet}>Cancelar</Button>
                    <Button onClick={handleConfirmDeletePet} color="error" variant="contained">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default OwnerDetail;
