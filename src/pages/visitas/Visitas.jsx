import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Pagination from '@mui/material/Pagination';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import useVisitas from '../../hooks/useVisitas';
import CreateVisita from './CreateVisita';
import VisitasTable from './VisitasTable';
import { Box } from '@mui/material';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';

import { useAuth } from '../../providers/authProvider';

export default function Visitas() {
  const { visitas, createVisitaAndRefresh, fetchVisitas } = useVisitas();
  const [page, setPage] = useState(1);

  const { token } = useAuth();

  const tokenDecoded = jwt_decode(token);

  const handleChange = (event, value) => {
    setPage(value);
    fetchVisitas(value - 1);
  };

  return (
    <Grid container spacing={3}>
      {tokenDecoded.role === 'RECEPCION' ? (
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Registrar nueva visita</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreateVisita createVisita={createVisitaAndRefresh} />
            </AccordionDetails>
          </Accordion>
        </Grid>
      ) : (
        ''
      )}
      <Grid item xs={12}>
        <VisitasTable data={visitas.content} role={tokenDecoded.role} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px 0'
          }}
        >
          <Pagination
            count={visitas?.totalPages ?? 0}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
