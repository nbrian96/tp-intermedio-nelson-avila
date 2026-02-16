import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getTypeColor } from '@hooks/usePokemon';

import FavoriteButton from '@components/FavoriteButton';

import type { IPokemonDetails } from '@interfaces/pokemon.interfaces';

const CardPokemon = (pokemon: IPokemonDetails) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  const image = pokemon.sprites.other?.home?.front_default || pokemon.sprites.front_default;

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <FavoriteButton pokemon={pokemon} />
      <CardMedia
        component="img"
        height="150rem"
        image={image}
        alt={pokemon.name}
        sx={{ objectFit: 'contain', p: 1 }}
      />
      <CardContent sx={{
        flexGrow: 1,
        pt: { xs: 0, sm: 0, md: 1 }
      }}>
        <Typography sx={{
          textAlign: 'center',
          fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
          my: 1
        }}>
          #{pokemon.id.toString().padStart(3, '0')}
        </Typography>
        <Typography sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
          my: 1
        }}>
          {pokemon.name
            .replaceAll('-', ' ')
            .charAt(0).toUpperCase() + pokemon.name.replaceAll('-', ' ').slice(1)}
        </Typography>
        <Box sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {pokemon.types.map((type, index) => (
            <Chip
              key={index}
              label={type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
              size="small"
              sx={{
                backgroundColor: getTypeColor(type.type.name),
                color: 'white',
                fontWeight: 'bold'
                // fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' }
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardPokemon;
