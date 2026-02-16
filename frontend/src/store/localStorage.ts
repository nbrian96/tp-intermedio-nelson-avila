import type { IPokemonDetails } from '@interfaces/pokemon.interfaces';

const FAVORITES_STORAGE_KEY = 'pokemon-favorites';

export const loadFavoritesFromStorage = (): IPokemonDetails[] => {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      return JSON.parse(storedFavorites);
    }
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
  }
  return [];
};

export const saveFavoritesToStorage = (favorites: IPokemonDetails[]): void => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

export const clearFavoritesFromStorage = (): void => {
  try {
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing favorites from localStorage:', error);
  }
};

export const getFavoritesFromStorage = (): IPokemonDetails[] => {
  return loadFavoritesFromStorage();
};
