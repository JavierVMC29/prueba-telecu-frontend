import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import throttle from 'lodash/throttle';

import axios from '../../utils/axios';

const CustomTableRow = ({ data, role }) => {
  const estados = ['EN CURSO', 'FINALIZADO'];

  const [estado, setEstado] = useState('');
  const [novedad, setNovedad] = useState('');

  const [initialRender, setInitialRender] = useState(true);

  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
  };

  const handleNovedadChange = (event) => {
    setNovedad(event.target.value);
  };

  useEffect(() => {
    if (initialRender) {
      setEstado(data.estado);
      setNovedad(data.novedad);
      setInitialRender(false);
    }
  }, [data, initialRender]);

  useEffect(() => {
    if (!initialRender && role === 'RECEPCION') {
      const throttledEstadoChange = throttle((value) => {
        axios.put(`/visitas/${data.id}`, { estado: value });
      }, 500);

      throttledEstadoChange(estado);

      return () => {
        throttledEstadoChange.cancel();
      };
    }
  }, [data.id, estado, initialRender, role]);

  useEffect(() => {
    if (!initialRender && role === 'RECEPCION') {
      const throttledNovedadChange = throttle((value) => {
        axios.put(`/visitas/${data.id}`, { novedad: value });
      }, 500);

      throttledNovedadChange(novedad);

      return () => {
        throttledNovedadChange.cancel();
      };
    }
  }, [data.id, novedad, initialRender, role]);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left" size="small">
        {data.no}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.fecha}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.hora}
      </TableCell>
      <TableCell align="left" size="auto">
        {dayjs(data.fecha_ingreso).format('YYYY-MM-DD HH:mm:ss')}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.motivo_visita}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.visitante}
      </TableCell>
      <TableCell align="left" size="auto">
        {role !== 'RECEPCION' ? (
          <Chip
            label={data.estado}
            color={data.estado === estados[0] ? 'success' : 'error'}
          />
        ) : (
          <FormControl fullWidth>
            <Select
              size="small"
              id={`estadoSelect${data.id}`}
              disabled={role === 'SUPERVISOR'}
              color={estado === estados[0] ? 'success' : 'error'}
              value={estado}
              onChange={handleEstadoChange}
            >
              {estados.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </TableCell>
      <TableCell align="left" size="auto">
        {role !== 'RECEPCION' ? (
          data.novedad
        ) : (
          <TextField
            size="small"
            multiline
            margin="normal"
            fullWidth
            id={`novedad${data.id}`}
            name="novedad"
            label="Novedad"
            autoComplete="novedad"
            value={novedad}
            onChange={handleNovedadChange}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

const VisitasTable = ({ data, role }) => {
  const [rows, setRows] = useState();

  useEffect(() => {
    const rows = data?.map((c, index) => {
      return {
        id: c.id,
        no: index + 1,
        fecha: c.fecha,
        hora: c.hora,
        fecha_ingreso: c.fecha_ingreso,
        motivo_visita: c.motivo_visita,
        estado: c.estado,
        novedad: c.novedad,
        visitante:
          c.Visitante.nombres +
          ' ' +
          c.Visitante.apellidos +
          ' ' +
          c.Visitante.cedula
      };
    });
    setRows(rows);
  }, [data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">N</TableCell>
              <TableCell align="left">Fecha</TableCell>
              <TableCell align="left">Hora</TableCell>
              <TableCell align="left">Fecha Ingreso</TableCell>
              <TableCell align="left">Motivo de la visita</TableCell>
              <TableCell align="left">
                Visitante (Nombre Completo - Cedula)
              </TableCell>
              <TableCell align="left">Estado</TableCell>
              <TableCell align="left">Novedad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <CustomTableRow data={row} key={row.id} role={role} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

VisitasTable.propTypes = {
  data: PropTypes.array,
  role: PropTypes.string
};
CustomTableRow.propTypes = {
  data: PropTypes.object,
  role: PropTypes.string
};

export default VisitasTable;
