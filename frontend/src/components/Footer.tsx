import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'black',
        color: 'white',
        py: 3,
        mt: 'auto'
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
        px: 2,
        width: '100%'
      }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    © {currentYear} Nelson Avila - Trabajo Práctico Final Integrador. Todos los derechos reservados.
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Desarrollado con React, TypeScript y Material-UI
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
