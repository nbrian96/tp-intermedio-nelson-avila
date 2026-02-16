import { Alert, Container } from '@mui/material';

const ContainerError = ({ message }: { message: string }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Alert severity="error">{message}</Alert>
    </Container>
  );
};

export default ContainerError;
