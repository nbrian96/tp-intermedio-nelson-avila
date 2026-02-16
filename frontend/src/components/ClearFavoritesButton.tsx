import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';

import { useAppDispatch } from '@store/hooks';
import { clearFavorites } from '@store/favoritesSlice';
import WarningIcon from '@mui/icons-material/Warning';

export const ClearFavoritesButton = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    dispatch(clearFavorites());
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
      >
                Limpiar favoritos
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            textAlign: 'center'
          }}
        >
          <WarningIcon color="warning" sx={{ fontSize: 28 }} />
                    ¿Estás seguro?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
                            Esta acción eliminará todos tus Pokémon favoritos.
            </Typography>
            <Typography>
                            No podrás recuperarlos después.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
                        Cancelar
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained" autoFocus>
                        Sí, limpiar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
