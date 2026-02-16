import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography,
    TextField,
    Alert,
    CircularProgress,
    Grid,
    InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { ownerService } from '../services/owner.service';
import type { OwnerFormData } from '../interfaces/owner.interface';

const OwnerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<OwnerFormData>({
        name: '',
        surname: '',
        dni: '',
        phone: '',
        address: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode && id) {
            loadOwner(id);
        }
    }, [id, isEditMode]);

    const loadOwner = async (ownerId: string) => {
        try {
            setInitialLoading(true);
            const owner = await ownerService.getById(ownerId);
            setFormData({
                name: owner.name,
                surname: owner.surname,
                dni: owner.dni,
                phone: owner.phone,
                address: owner.address || ''
            });
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setInitialLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'dni' ? (value === '' ? '' : parseInt(value, 10)) : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.name || !formData.surname || !formData.dni || !formData.phone) {
            setError('Los campos Nombre, Apellido, DNI y Teléfono son obligatorios');
            return;
        }

        try {
            setLoading(true);
            if (isEditMode && id) {
                await ownerService.update(id, formData as any);
            } else {
                await ownerService.create(formData as any);
            }
            navigate('/owners');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <Container sx={{ mt: 20, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={80} />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 6, mb: 10 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/owners')}
                sx={{ mb: 4, borderRadius: 2 }}
            >
                Volver al listado
            </Button>

            <Card sx={{ borderRadius: 4, boxShadow: '0 20px 50px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <Box sx={{ bgcolor: 'primary.main', py: 3, px: 4, color: 'white' }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        {isEditMode ? 'Editar Dueño' : 'Registrar Nuevo Dueño'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Completa la información personal del propietario
                    </Typography>
                </Box>

                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }} onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Nombre"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    disabled={loading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Apellido"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="DNI"
                                    name="dni"
                                    type="number"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    disabled={loading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    disabled={loading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Dirección"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    variant="outlined"
                                    disabled={loading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HomeIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', gap: 2, mt: 6 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                disabled={loading}
                                fullWidth
                                sx={{
                                    borderRadius: 3,
                                    py: 2,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    boxShadow: '0 10px 20px rgba(25, 118, 210, 0.2)'
                                }}
                            >
                                {loading ? 'Guardando...' : isEditMode ? 'Guardar Cambios' : 'Registrar Dueño'}
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/owners')}
                                disabled={loading}
                                sx={{ borderRadius: 3, px: 4 }}
                            >
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default OwnerForm;
