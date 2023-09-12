import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

import dayjs from 'dayjs';
import useDepartamentos from '../../hooks/useDepartamentos';

const today = dayjs();

const validationSchema = yup.object({
  fecha: yup.date().required('Fecha es requerido'),
  hora: yup.string().required('Hora es requerido'),
  fecha_ingreso: yup.date().required('Fecha de ingreso es requerido'),
  motivo_visita: yup.string().required('Motivo de visita es requerida'),
  estado: yup.string().required('Estado es requerido'),
  novedad: yup.string(),
  departamento: yup.number().required('Departamento que visita es requerido'),
  visitante_nombres: yup.string().required('Nombres es requerido'),
  visitante_apellidos: yup.string().required('Apellidos es requerido'),
  visitante_cedula: yup.string().required('Cedula es requerido')
});

// eslint-disable-next-line react/prop-types
const CreateVisita = ({ createVisita }) => {
  const estados = ['EN CURSO', 'FINALIZADO'];
  const { departamentos } = useDepartamentos();

  const initialFormValues = {
    fecha: today,
    hora: today,
    fecha_ingreso: today,
    motivo_visita: '',
    estado: estados[0],
    novedad: '',
    departamento: 1,
    visitante_nombres: '',
    visitante_apellidos: '',
    visitante_cedula: ''
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createVisita({
          fecha: values.fecha,
          hora: dayjs(values.hora).format('HH:mm:ss'),
          fecha_ingreso: values.fecha_ingreso,
          motivo_visita: values.motivo_visita,
          estado: values.estado,
          novedad: values.novedad,
          departamento_id: values.departamento,
          visitante_nombres: values.visitante_nombres,
          visitante_apellidos: values.visitante_apellidos,
          visitante_cedula: values.visitante_cedula
        });
        formik.setValues(initialFormValues);
        formik.setErrors({});
        formik.setTouched({});
      } catch (error) {
        console.log(error);
        formik.errors.submit = error;
      } finally {
        formik.setSubmitting(false); // Ensure that the form is not stuck in a submitting state
      }
    }
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ padding: 1 }}
    >
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4} md={3}>
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha"
              format="DD-MM-YYYY"
              id="fecha"
              name="fecha"
              type="date"
              value={formik.values.fecha || today}
              onChange={(date) => formik.setFieldValue('fecha', date)}
              onBlur={formik.handleBlur}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  error: formik.touched.fecha && Boolean(formik.errors.fecha),
                  helperText: formik.touched.fecha && formik.errors.fecha
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Hora"
              id="hora"
              name="hora"
              value={formik.values.hora || today}
              onChange={(hora) => formik.setFieldValue('hora', hora)}
              onBlur={formik.handleBlur}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  error: formik.touched.hora && Boolean(formik.errors.hora),
                  helperText: formik.touched.hora && formik.errors.hora
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          sx={{ display: 'flex', justifyContent: 'right' }}
        >
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de ingreso"
              format="DD/MM/YYYY"
              id="fecha_ingreso"
              name="fecha_ingreso"
              type="date"
              value={formik.values.fecha_ingreso || today}
              onChange={(date) => formik.setFieldValue('fecha_ingreso', date)}
              onBlur={formik.handleBlur}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  error:
                    formik.touched.fecha_ingreso &&
                    Boolean(formik.errors.fecha_ingreso),
                  helperText:
                    formik.touched.fecha_ingreso && formik.errors.fecha_ingreso
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 1 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="tipo_estado">Estado</InputLabel>
            <Select
              labelId="tipo_estado"
              label="Estado"
              id="estado"
              name="estado"
              value={formik.values.estado}
              onChange={formik.handleChange}
            >
              {estados?.map((estado) => (
                <MenuItem value={estado} key={estado}>
                  {estado}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.errors.estado && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {' '}
              {formik.errors.estado}{' '}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="departamento_visita">
              Departamento que visita
            </InputLabel>
            <Select
              labelId="departamento_visita"
              label="Departamento que visita"
              id="departamento"
              name="departamento"
              value={formik.values.departamento}
              onChange={formik.handleChange}
            >
              {departamentos &&
                departamentos.length > 0 &&
                departamentos?.map((departamento) => (
                  <MenuItem value={departamento.id} key={departamento.nombre}>
                    {departamento.nombre}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {formik.errors.departamento && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {' '}
              {formik.errors.departamento}{' '}
            </FormHelperText>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TextField
            multiline
            margin="normal"
            required
            fullWidth
            id="motivo_visita"
            name="motivo_visita"
            label="Motivo de la visita"
            value={formik.values.motivo_visita}
            onChange={formik.handleChange}
            error={
              formik.touched.motivo_visita &&
              Boolean(formik.errors.motivo_visita)
            }
            helperText={
              formik.touched.motivo_visita && formik.errors.motivo_visita
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            margin="normal"
            fullWidth
            id="novedad"
            name="novedad"
            label="Novedad"
            autoComplete="novedad"
            value={formik.values.novedad}
            onChange={formik.handleChange}
            error={formik.touched.novedad && Boolean(formik.errors.novedad)}
            helperText={formik.touched.novedad && formik.errors.novedad}
          />
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="visitante_cedula"
            name="visitante_cedula"
            label="Cedula del visitante"
            value={formik.values.visitante_cedula}
            onChange={formik.handleChange}
            error={
              formik.touched.visitante_cedula &&
              Boolean(formik.errors.visitante_cedula)
            }
            helperText={
              formik.touched.visitante_cedula && formik.errors.visitante_cedula
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="visitante_nombres"
            name="visitante_nombres"
            label="Nombres del visitante"
            value={formik.values.visitante_nombres}
            onChange={formik.handleChange}
            error={
              formik.touched.visitante_nombres &&
              Boolean(formik.errors.visitante_nombres)
            }
            helperText={
              formik.touched.visitante_nombres &&
              formik.errors.visitante_nombres
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="visitante_apellidos"
            name="visitante_apellidos"
            label="Apellidos del visitante"
            value={formik.values.visitante_apellidos}
            onChange={formik.handleChange}
            error={
              formik.touched.visitante_apellidos &&
              Boolean(formik.errors.visitante_apellidos)
            }
            helperText={
              formik.touched.visitante_apellidos &&
              formik.errors.visitante_apellidos
            }
          />
        </Grid>
      </Grid>

      {formik.errors.submit && (
        <Grid item xs={12}>
          <FormHelperText error>
            {formik.errors.submit.errors.map((err) => err.msg)}
          </FormHelperText>
        </Grid>
      )}

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Registrar
      </Button>
    </Box>
  );
};

export default CreateVisita;
