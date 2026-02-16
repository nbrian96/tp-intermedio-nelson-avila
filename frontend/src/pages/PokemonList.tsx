import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Pagination,
  Typography
} from '@mui/material';

import { BACKGROUND_COLOR, POKEMON_PAGE_SIZE } from '@constants/index';

import CardPokemon from '@components/CardPokemon';
import ContainerError from '@components/ContainerError';
import Loading from '@components/Loading';

import { fetchPokemonList } from '@hooks/usePokemon';
import type { IPokemonDetails, IPokemonListResponse } from '@interfaces/pokemon.interfaces';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<IPokemonListResponse | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const renderPokemonList = async(page: number) => {
    try {
      setLoading(true);

      const { data, details } = await fetchPokemonList(page);

      setPokemonList(data);
      setPokemonDetails(details);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    renderPokemonList(currentPage);
  }, [currentPage]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loading message="Cargando Pokémon..." />;
  }

  if (error) {
    return <ContainerError message={error} />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: BACKGROUND_COLOR }}>
      <Typography
        variant="h3"
        component="h1"
        color="text.primary"
        gutterBottom
        align="center"
        fontSize="2.5rem"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          my: 8
        }}
      >
        Encuentra tus Pokémon favoritos
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        {pokemonDetails.map((pokemon: IPokemonDetails) => (
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

      {pokemonList && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(pokemonList.count / POKEMON_PAGE_SIZE)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="small"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};

export default PokemonList;
