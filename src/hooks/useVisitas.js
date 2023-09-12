import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../providers/authProvider';

const useVisitas = () => {
  const [visitas, setVisitas] = useState([]);
  const { token } = useAuth();

  const fetchVisitas = async (pageNo = 0, pageSize = 10) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/visitas?pageNo=${pageNo}&pageSize=${pageSize}`,
        headers: { Authorization: 'Bearer ' + token }
      });
      setVisitas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createVisitaAndRefresh = async (formData) => {
    const visitaData = {
      fecha: formData.fecha,
      hora: formData.hora,
      fecha_ingreso: formData.fecha_ingreso,
      motivo_visita: formData.motivo_visita,
      novedad: formData.novedad === '' ? null : formData.novedad,
      estado: formData.estado,
      departamento_id: formData.departamento_id
    };
    const response = await axios.get(
      `/visitantes/cedula/${formData.visitante_cedula}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
    const existingVisitante = response.data;

    if (!existingVisitante) {
      const response = await axios.post(
        '/visitantes',
        {
          nombres: formData.visitante_nombres,
          apellidos: formData.visitante_apellidos,
          cedula: formData.visitante_cedula
        },
        { headers: { Authorization: 'Bearer ' + token } }
      );
      const newVisitante = response.data;

      await axios.post(
        '/visitas',
        {
          ...visitaData,
          visitante_id: newVisitante.id
        },
        { headers: { Authorization: 'Bearer ' + token } }
      );
    } else {
      await axios.post(
        '/visitas',
        {
          ...visitaData,
          visitante_id: existingVisitante.id
        },
        { headers: { Authorization: 'Bearer ' + token } }
      );
    }

    fetchVisitas();
  };

  useEffect(() => {
    fetchVisitas();
  }, []);

  return {
    visitas,
    createVisitaAndRefresh,
    fetchVisitas
  };
};

export default useVisitas;
