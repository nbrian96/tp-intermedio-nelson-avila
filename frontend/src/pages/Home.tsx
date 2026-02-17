import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              display: 'inline-flex',
              p: 2,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: 'white',
              mb: 3,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
          >
            <PetsIcon sx={{ fontSize: 60 }} />
          </Box>

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            fontWeight="800"
            sx={{
              color: '#2c3e50',
              textShadow: '2px 2px 4px rgba(0,0,0,0.05)',
              mb: 1
            }}
          >
            Bienvenido a Patitas Felices
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            gutterBottom
            sx={{ mb: 6, fontWeight: 500 }}
          >
            Excelencia Médica en el Cuidado de tus Mascotas
          </Typography>

          <Card
            sx={{
              mt: 4,
              maxWidth: 700,
              mx: 'auto',
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              border: 'none'
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h5" gutterBottom fontWeight="600" color="primary">
                ¡Hola, {user?.username || 'Usuario'}!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                Te encuentras en el panel de administración de <strong>Patitas Felices</strong>.
                Nuestra misión es brindar la mejor atención a los pequeños de la casa.
                Usa las herramientas a continuación para comenzar a gestionar la clínica.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/owners')}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem'
                  }}
                >
                  Gestionar Dueños
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  startIcon={<PetsIcon />}
                  onClick={() => navigate('/pets')}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  Ver Mascotas
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AssignmentIndIcon />}
                  onClick={() => navigate('/veterinarians')}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                  }}
                >
                  Gestionar Veterinarios
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center', gap: { xs: 4, md: 8 }, opacity: 0.6 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">24/7</Typography>
              <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Soporte Emergencias</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">+100</Typography>
              <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Pacientes Felices</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">Top</Typography>
              <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Especialistas</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
