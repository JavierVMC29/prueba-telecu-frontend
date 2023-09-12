import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import WavingHandTwoToneIcon from '@mui/icons-material/WavingHandTwoTone';

import { useAuth } from '../providers/authProvider';

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate('/', { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);

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
          <WavingHandTwoToneIcon />
        </Avatar>
        <Typography component="h1" variant="h6" sx={{ textAlign: 'center' }}>
          Tu sesión se cerrará en unos segundos
        </Typography>

        <Typography component="h2" variant="h6" sx={{ textAlign: 'center' }}>
          Hasta la próxima
        </Typography>
      </Box>
    </Container>
  );
};

export default Logout;
