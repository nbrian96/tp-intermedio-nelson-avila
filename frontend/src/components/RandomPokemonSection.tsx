import { useEffect, useState } from 'react';

import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Casino, Lightbulb, Refresh, Shuffle } from '@mui/icons-material';

import { fetchRandomPokemon } from '@hooks/usePokemon';

import CardPokemon from '@components/CardPokemon';
import Loading from '@components/Loading';

import type { IPokemonDetails } from '@interfaces/pokemon.interfaces';

const RandomPokemonSection = () => {
  const [randomPokemon, setRandomPokemon] = useState<IPokemonDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRandomPokemon = async() => {
    try {
      setLoading(true);
      setError(null);
      const pokemon = await fetchRandomPokemon(4);
      setRandomPokemon(pokemon);
    } catch (err) {
      setError('Error al cargar Pokémon aleatorios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomPokemon();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
                    Descubre Pokémon Aleatorios
        </Typography>
        <Loading message="Cargando Pokémon aleatorios..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={loadRandomPokemon}
            startIcon={<Refresh />}
          >
                        Reintentar
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          <Casino fontSize="small" />
                    Descubre Pokémon Aleatorios
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
                    ¡Explora Pokémon que quizás no conocías!
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Shuffle />}
          onClick={loadRandomPokemon}
          sx={{
            mb: 3,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
                    Obtener Nuevos Pokémon
        </Button>
      </Box>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        {randomPokemon.map((pokemon: IPokemonDetails) => (
          <Grid
            key={pokemon.id}
            size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
            display="flex"
            justifyContent="center"
          >
            <CardPokemon {...pokemon} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}
        >
          <Lightbulb fontSize="small" />
                    Haz clic en cualquier Pokémon para ver más detalles
        </Typography>
      </Box>
    </Container>
  );
};

export default RandomPokemonSection;
