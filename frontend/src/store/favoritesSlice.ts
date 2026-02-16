import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IFavoritesState, IPokemonDetails } from '@interfaces/pokemon.interfaces';
import { clearFavoritesFromStorage, getFavoritesFromStorage, loadFavoritesFromStorage, saveFavoritesToStorage } from './localStorage';

const initialState: IFavoritesState = {
  favorites: loadFavoritesFromStorage()
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<IPokemonDetails>) => {
      const pokemon = action.payload;
      const isAlreadyFavorite = state.favorites.some(fav => fav.id === pokemon.id);

      if (!isAlreadyFavorite) {
        state.favorites.push(pokemon);
        saveFavoritesToStorage(state.favorites);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      state.favorites = state.favorites.filter(pokemon => pokemon.id !== pokemonId);
      saveFavoritesToStorage(state.favorites);
    },
    toggleFavorite: (state, action: PayloadAction<IPokemonDetails>) => {
      const pokemon = action.payload;
      const existingIndex = state.favorites.findIndex(fav => fav.id === pokemon.id);

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(pokemon);
      }
      saveFavoritesToStorage(state.favorites);
    },
    clearFavorites: (state) => {
      state.favorites = [];
      clearFavoritesFromStorage();
    },
    getFavorites: (state) => {
      state.favorites = getFavoritesFromStorage();
    }
  }
});

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
