import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BACKGROUND_COLOR } from '@constants/index';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: 'center',
        py: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: BACKGROUND_COLOR
      }}
    >
      <Box>
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}
        >
                    404
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>
                    ¡Ups! Página no encontrada 😅
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    La página que estás buscando no existe o fue movida.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
        >
                    Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
