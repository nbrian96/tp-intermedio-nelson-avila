import { Box, LinearProgress, Typography } from '@mui/material';
import { POKEMON_STATS_COLORS, POKEMON_STATS_MAX_VALUE, POKEMON_STATS_NAMES } from '@constants/index';
import type { IPokemonDetails } from '@interfaces/pokemon.interfaces';

interface PokemonStatsProps {
    stats: IPokemonDetails['stats'];
}

const PokemonStats = ({ stats }: PokemonStatsProps) => {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>Estadísticas</Typography>
      {stats.map((stat, index) => {
        const statName = POKEMON_STATS_NAMES[stat.stat.name as keyof typeof POKEMON_STATS_NAMES];
        const percentage = (stat.base_stat / POKEMON_STATS_MAX_VALUE) * 100;

        return (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {statName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.base_stat}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: POKEMON_STATS_COLORS[stat.stat.name as keyof typeof POKEMON_STATS_COLORS]
                }
              }}
            />
          </Box>
        );
      })}
    </>
  );
};

export default PokemonStats;
