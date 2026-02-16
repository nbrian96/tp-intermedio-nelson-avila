import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography
} from '@mui/material';

import { getTypeColor } from '@hooks/usePokemon';

import type { IPokemonDetails } from '@interfaces/pokemon.interfaces';

import PokemonStats from '@components/PokemonStats';
import FavoriteButton from '@components/FavoriteButton';

const CardPokemonDetails = (pokemon: IPokemonDetails) => {
  const image = pokemon.sprites.other?.home?.front_default || pokemon.sprites.front_default;

  const history = Array.from(
    new Set(
      pokemon.flavor_text_entries
        .filter((entry: { language: { name: string } }) => entry.language.name === 'es')
        .map((entry: { flavor_text: string }) => entry.flavor_text.replaceAll('\n', ' '))
    )
  );

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Typography
          variant="body1"
          color="text.primary"
          gutterBottom
          align="center"
          fontSize="2.5rem"
          sx={{ fontWeight: 'bold' }}
        >
          {pokemon.name
            .replaceAll('-', ' ')
            .charAt(0).toUpperCase() + pokemon.name.replaceAll('-', ' ').slice(1)}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom align="center"
          fontSize="2.5rem" sx={{ ml: 2, fontWeight: 'bold' }}>
                    N.° {pokemon.id.toString().padStart(3, '0')}
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.2s',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}>
              <FavoriteButton pokemon={pokemon} />
              <CardMedia
                component="img"
                height="100%"
                image={image}
                alt={pokemon.name}
                sx={{ objectFit: 'contain', p: 1 }}
              />
            </Card>
          </Grid>
          <Grid
            size={{ xs: 12, md: 7 }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h6">Datos Curiosos</Typography>
              <Typography variant="body1" sx={{ textAlign: 'justify', p: 1 }}>
                {history.slice(0, 6).join('\n') || 'No hay datos curiosos disponibles'}
              </Typography>
            </Box>
            <Card>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <CardContent>
                    <Typography variant="h6">Tipos</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                      {pokemon.types.map((type, index) => (
                        <Chip
                          key={index}
                          label={type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                          size="medium"
                          sx={{
                            backgroundColor: getTypeColor(type.type.name),
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <CardContent>
                    <Typography variant="h6">Altura</Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center', p: 1 }}>
                      {pokemon.height / 100} m
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <CardContent>
                    <Typography variant="h6">Peso</Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center', p: 1 }}>
                      {pokemon.weight / 10} kg
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CardContent>
                    <PokemonStats stats={pokemon.stats} />
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CardPokemonDetails;
