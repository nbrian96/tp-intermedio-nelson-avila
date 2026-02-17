import { useState, useEffect, Fragment } from 'react';
import {
    Box,
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
    Alert,
    CircularProgress,
    Avatar,
    Chip,
    TextField,
    InputAdornment,
    IconButton,
    Collapse
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import { petService } from '../services/pet.service';
import { useMedicalHistories } from '../hooks/useMedicalHistories';
import MedicalHistoryList from '../components/medical-history/MedicalHistoryList';
import type { Pet } from '../interfaces/pet.interface';
import type { Owner } from '../interfaces/owner.interface';

const PetList = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedPet, setExpandedPet] = useState<string | null>(null);

    const {
        histories,
        loading: historiesLoading,
        error: historiesError,
        fetchHistories
    } = useMedicalHistories();

    const handleToggleExpand = (petId: string) => {
        if (expandedPet === petId) {
            setExpandedPet(null);
        } else {
            setExpandedPet(petId);
            fetchHistories({ petId });
        }
    };

    const loadPets = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await petService.getAll();
            setPets(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPets();
    }, []);

    const filteredPets = pets.filter((pet) => {
        const owner = pet.ownerId as Owner;
        const searchLower = searchTerm.toLowerCase();
        return (
            pet.name.toLowerCase().includes(searchLower) ||
            pet.species.toLowerCase().includes(searchLower) ||
            (owner && `${owner.name} ${owner.surname}`.toLowerCase().includes(searchLower))
        );
    });

    if (loading) {
        return (
            <Container sx={{ mt: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={80} thickness={4} color="secondary" />
                <Typography variant="h6" color="text.secondary">Cargando todas las mascotas...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h3" component="h1" fontWeight="800" color="secondary.main">
                        Mascotas
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Listado global de pacientes de Patitas Felices
                    </Typography>
                </Box>

                <TextField
                    placeholder="Buscar por nombre, especie o dueño..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: { xs: '100%', sm: 350 }, bgcolor: 'white' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 3 }
                    }}
                />
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Card sx={{ borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: 'none' }}>
                <CardContent sx={{ p: 0 }}>
                    {filteredPets.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#fcfcfc' }}>
                            <PetsIcon sx={{ fontSize: 60, color: '#e0e0e0', mb: 2 }} />
                            <Typography variant="h5" color="text.secondary" gutterBottom>
                                {searchTerm ? 'No se encontraron mascotas' : 'No hay mascotas registradas'}
                            </Typography>
                            <Typography variant="body1" color="text.disabled">
                                {searchTerm ? 'Prueba con otros términos de búsqueda.' : 'Las mascotas aparecerán aquí una vez que los dueños las registren.'}
                            </Typography>
                        </Box>
                    ) : (
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Mascota</TableCell>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Especie</TableCell>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Dueño</TableCell>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Fecha Nac.</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredPets.map((pet) => {
                                        const owner = pet.ownerId as Owner;
                                        return (
                                            <Fragment key={pet._id}>
                                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleToggleExpand(pet._id)}
                                                            >
                                                                {expandedPet === pet._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                            </IconButton>
                                                            <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main' }}>
                                                                <PetsIcon />
                                                            </Avatar>
                                                            <Box>
                                                                <Typography fontWeight="600">{pet.name}</Typography>
                                                                <Typography variant="caption" color="text.secondary">Paciente</Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={pet.species}
                                                            size="small"
                                                            sx={{ fontWeight: 'bold', textTransform: 'uppercase', borderRadius: 1 }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <PersonIcon fontSize="small" color="action" />
                                                            <Typography variant="body2">
                                                                {owner ? `${owner.name} ${owner.surname}` : 'Desconocido'}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2">
                                                            {pet.birthdate ? new Date(pet.birthdate).toLocaleDateString() : 'No registrada'}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                                        <Collapse in={expandedPet === pet._id} timeout="auto" unmountOnExit>
                                                            <Box sx={{ margin: 2 }}>
                                                                <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                                    <MedicalInformationIcon color="primary" /> Historia Clínica de {pet.name}
                                                                </Typography>

                                                                {historiesLoading ? (
                                                                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                                                                        <CircularProgress size={30} />
                                                                    </Box>
                                                                ) : historiesError ? (
                                                                    <Alert severity="error">{historiesError}</Alert>
                                                                ) : (
                                                                    <MedicalHistoryList
                                                                        histories={histories.filter(h => {
                                                                            const hPetId = typeof h.petId === 'string' ? h.petId : h.petId?._id;
                                                                            return hPetId === pet._id;
                                                                        })}
                                                                    />
                                                                )}
                                                            </Box>
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow>
                                            </Fragment>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default PetList;
