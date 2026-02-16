import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import PokemonDetails from '@pages/PokemonDetails';
import PokemonList from '@pages/PokemonList';
import FavoritePokemonList from '@pages/FavoritePokemonList';
import Login from '@pages/Login';
import Register from '@pages/Register';

import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import ScrollToTopButton from '@components/ScrollToTopButton';
import ProtectedRoute from '@components/ProtectedRoute';
import { useAuthValidation } from './hooks/useAuthValidation';

function App() {
  useAuthValidation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pokedex"
            element={
              <ProtectedRoute>
                <PokemonList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pokemon/:id"
            element={
              <ProtectedRoute>
                <PokemonDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritePokemonList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <ScrollToTopButton />
      <Footer />
    </Box>
  );
}

export default App;
