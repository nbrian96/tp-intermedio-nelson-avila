import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { toggleFavorite } from '@store/favoritesSlice';

import type { IPokemonDetails } from '@interfaces/pokemon.interfaces';

const FavoriteButton = ({ pokemon }: { pokemon: IPokemonDetails }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.favorites);

  const isFavorite = favorites.some(fav => fav.id === pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(pokemon));
  };

  return (
    <IconButton
      onClick={handleFavoriteClick}
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }
      }}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      {isFavorite ? (
        <Favorite sx={{ color: '#e91e63' }} />
      ) : (
        <FavoriteBorder sx={{ color: '#666' }} />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
