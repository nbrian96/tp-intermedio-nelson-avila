import { Box, Container, Typography } from '@mui/material';
import { BACKGROUND_COLOR } from '@constants/index';
import { useAppSelector } from '@store/hooks';
import PokemonCarousel from '@/components/PokemonCarousel';
import RandomPokemonSection from '@components/RandomPokemonSection';

export default function Home() {
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
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2
          }}
        >
                    ¡Bienvenido a tu Pokédex!
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto' }}
        >
                    Explora el mundo de los Pokémon, descubre sus habilidades y guarda tus favoritos
        </Typography>
      </Box>

      {favorites.length > 0 && (
        <PokemonCarousel pokemons={ favorites } />
      )}

      <RandomPokemonSection />
    </Container>
  );
}
