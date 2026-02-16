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
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { ownerService } from '../services/owner.service';
import type { Owner } from '../interfaces/owner.interface';

const OwnerList = () => {
    const navigate = useNavigate();
    const [owners, setOwners] = useState<Owner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

    const loadOwners = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ownerService.getAll();
            setOwners(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOwners();
    }, []);

    const handleDeleteClick = (owner: Owner) => {
        setSelectedOwner(owner);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedOwner) {
            try {
                await ownerService.delete(selectedOwner._id);
                setDeleteDialogOpen(false);
                setSelectedOwner(null);
                loadOwners();
            } catch (err) {
                setError((err as Error).message);
            }
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedOwner(null);
    };

    if (loading) {
        return (
            <Container sx={{ mt: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={80} thickness={4} color="primary" />
                <Typography variant="h6" color="text.secondary">Cargando dueños...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
                <Box>
                    <Typography variant="h3" component="h1" fontWeight="800" color="primary.main">
                        Dueños
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Gestión de clientes de Patitas Felices
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/owners/new')}
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)'
                    }}
                >
                    Nuevo Dueño
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Card sx={{ borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: 'none' }}>
                <CardContent sx={{ p: 0 }}>
                    {owners.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#fcfcfc' }}>
                            <GroupIcon sx={{ fontSize: 60, color: '#e0e0e0', mb: 2 }} />
                            <Typography variant="h5" color="text.secondary" gutterBottom>
                                No hay dueños registrados todavía
                            </Typography>
                            <Typography variant="body1" color="text.disabled" sx={{ mb: 4 }}>
                                Comienza agregando un cliente a la base de datos.
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={() => navigate('/owners/new')}
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
                                        <TableCell sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Dueño</TableCell>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>DNI</TableCell>
                                        <TableCell sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Teléfono</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: '700', fontSize: '0.9rem', color: 'text.secondary', textTransform: 'uppercase', py: 2 }}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {owners.map((owner) => (
                                        <TableRow key={owner._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                                                        <PersonIcon />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography fontWeight="600">{owner.name} {owner.surname}</Typography>
                                                        <Typography variant="caption" color="text.secondary">Cliente</Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Paper variant="outlined" sx={{ display: 'inline-block', px: 1, py: 0.5, borderRadius: 1, bgcolor: '#f9f9f9', fontSize: '0.85rem' }}>
                                                    {owner.dni}
                                                </Paper>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">{owner.phone}</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Ver perfil">
                                                    <IconButton
                                                        color="info"
                                                        onClick={() => navigate(`/owners/${owner._id}`)}
                                                        sx={{ mr: 1, bgcolor: 'info.light', '&:hover': { bgcolor: 'info.main', color: 'white' }, transition: 'all 0.2s' }}
                                                    >
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Editar datos">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => navigate(`/owners/edit/${owner._id}`)}
                                                        sx={{ mr: 1, bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'white' }, transition: 'all 0.2s' }}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Eliminar dueño">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDeleteClick(owner)}
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
                        ¿Estás seguro que deseas eliminar al dueño{' '}
                        <Box component="span" fontWeight="bold" color="primary.main">
                            {selectedOwner?.name} {selectedOwner?.surname}
                        </Box>
                        ? Se eliminarán también todas sus mascotas asociadas. Esta acción no se puede deshacer.
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

export default OwnerList;
