import { POKEMON_API_BASE_URL, POKEMON_PAGE_SIZE } from '@constants/index';
import type { IPokemon, IPokemonListResponse } from '@interfaces/pokemon.interfaces';

export const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: '#ff6b6b',
    water: '#4dabf7',
    grass: '#51cf66',
    electric: '#eed535',
    psychic: '#da77f2',
    ice: '#74c0fc',
    dragon: '#4d26bf',
    dark: '#495057',
    fairy: '#faa2c1',
    normal: '#868e96',
    fighting: '#e64980',
    flying: '#91a7ff',
    poison: '#b97fc9',
    ground: '#f7de3f',
    rock: '#a38c21',
    bug: '#51cf66',
    ghost: '#9775fa',
    steel: '#868e96'
  };
  return colors[type] || '#868e96';
};

export const fetchPokemonList = async(page: number) => {
  try {
    const offset = (page - 1) * POKEMON_PAGE_SIZE;
    const response = await fetch(
      `${POKEMON_API_BASE_URL}/pokemon?limit=${POKEMON_PAGE_SIZE}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error('Error al cargar la lista de Pokémon');
    }

    const data: IPokemonListResponse = await response.json();

    const detailsPromises = data.results.map(async(pokemon: IPokemon) => {
      return fetchPokemonDetails(pokemon);
    });

    const details = await Promise.all(detailsPromises);
    return { data, details };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const fetchPokemonDetailsById = async(id: string) => {
  try {
    const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Error al buscar pokémon ${id}`);
    }

    const data = await response.json();

    const details = await fetchPokemonDetails(data.species);

    return { ...details, ...data };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const fetchPokemonDetails = async(pokemon: IPokemon) => {
  try {
    const response = await fetch(pokemon.url);
    if (!response.ok) {
      throw new Error(`Error al cargar detalles de ${pokemon.name}`);
    }
    return response.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const fetchRandomPokemon = async(count = 3) => {
  try {
    const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon?limit=1000`);

    if (!response.ok) {
      throw new Error('Error al cargar la lista de Pokémon');
    }

    const data: IPokemonListResponse = await response.json();

    const shuffled = data.results.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    const detailsPromises = selected.map(async(pokemon: IPokemon) => {
      return fetchPokemonDetails(pokemon);
    });

    const details = await Promise.all(detailsPromises);
    return details;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

