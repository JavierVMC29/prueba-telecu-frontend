import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PageNotFound = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '50px'
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: 'secondary.main',
            width: '70px',
            height: '70px'
          }}
        >
          <ErrorOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          Ocurrio un error
        </Typography>
        <Typography component="h2" variant="h6" sx={{ textAlign: 'center' }}>
          Refresca la pagina
        </Typography>
      </Box>
    </Container>
  );
};

export default PageNotFound;
