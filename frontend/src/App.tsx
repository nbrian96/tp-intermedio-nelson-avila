import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Login from '@pages/Login';
import Register from '@pages/Register';
import VeterinarianList from '@pages/VeterinarianList';
import VeterinarianForm from '@pages/VeterinarianForm';
import OwnerList from '@pages/OwnerList';
import OwnerForm from '@pages/OwnerForm';
import OwnerDetail from '@pages/OwnerDetail';
import PetList from '@pages/PetList';

import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import ScrollToTopButton from '@components/ScrollToTopButton';
import ProtectedRoute from '@components/ProtectedRoute';
import { useAuthValidation } from './hooks/useAuthValidation';

function App() {
  useAuthValidation();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              path="/veterinarians"
              element={
                <ProtectedRoute>
                  <VeterinarianList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/veterinarians/new"
              element={
                <ProtectedRoute>
                  <VeterinarianForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/veterinarians/edit/:id"
              element={
                <ProtectedRoute>
                  <VeterinarianForm />
                </ProtectedRoute>
              }
            />

            {/* Owners Routes */}
            <Route
              path="/owners"
              element={
                <ProtectedRoute>
                  <OwnerList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owners/new"
              element={
                <ProtectedRoute>
                  <OwnerForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owners/edit/:id"
              element={
                <ProtectedRoute>
                  <OwnerForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owners/:id"
              element={
                <ProtectedRoute>
                  <OwnerDetail />
                </ProtectedRoute>
              }
            />

            {/* Pets Routes */}
            <Route
              path="/pets"
              element={
                <ProtectedRoute>
                  <PetList />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <ScrollToTopButton />
        <Footer />
      </Box>
    </LocalizationProvider>
  );
}

export default App;
