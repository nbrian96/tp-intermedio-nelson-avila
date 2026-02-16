import { Box, Container, Grid, Typography } from '@mui/material';

import { BACKGROUND_COLOR } from '@constants/index';
import CardPokemon from '@components/CardPokemon';
import { ClearFavoritesButton } from '@components/ClearFavoritesButton';

import type { IPokemonDetails } from '@interfaces/pokemon.interfaces';

import { useAppSelector } from '@store/hooks';

const FavoritePokemonList = () => {
  const favorites = useAppSelector(state => state.favorites.favorites);

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
        minHeight: '90vh',
        backgroundColor: BACKGROUND_COLOR
      }}
    >

      <Box>
        {favorites.length === 0 && (
          <Typography variant="body1" color="text.primary" gutterBottom align="center" fontSize="2.5rem" sx={{ fontWeight: 'bold' }}>
            No tienes Pokémon Favoritos aún
          </Typography>
        )}
      </Box>

      {favorites.length > 0 && (
        <Container>
          <Typography
            variant="h3"
            component="h1"
            color="text.primary"
            gutterBottom
            align="center"
            fontSize="2.5rem"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Tus Pokémon Favoritos
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: {
                xs: 'center',
                sm: 'flex-end'
              },
              mb: 4
            }}
          >
            <ClearFavoritesButton />
          </Box>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {favorites.map((pokemon: IPokemonDetails) => (
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
        </Container>
      )}
    </Container>
  );
};

export default FavoritePokemonList;
