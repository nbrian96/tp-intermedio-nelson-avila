import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { IPokemonDetails } from '@interfaces/pokemon.interfaces';

import { fetchPokemonDetailsById } from '@hooks/usePokemon';

import Loading from '@components/Loading';
import ContainerError from '@components/ContainerError';
import CardPokemonDetails from '@components/CardPokemonDetails';

import { Container } from '@mui/material';
import { BACKGROUND_COLOR } from '@constants/index';

export default function PokemonDetails() {
  const { id } = useParams<{ id: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemon = async() => {
      try {
        setLoading(true);
        const details = await fetchPokemonDetailsById(id as string);
        setPokemonDetails(details);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPokemon();
    }
  }, [id]);

  if (loading) {
    return <Loading message="Cargando Pokémon..." />;
  }

  if (error) {
    return <ContainerError message={error} />;
  }

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
      {pokemonDetails && <CardPokemonDetails {...pokemonDetails} />}
    </Container>
  );
}
