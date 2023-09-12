import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const useVisitas = () => {
  const [visitas, setVisitas] = useState([]);

  const fetchVisitas = async (pageNo = 0, pageSize = 10) => {
    try {
      const response = await axios.get(
        `/visitas?pageNo=${pageNo}&pageSize=${pageSize}`
      );
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
      `/visitantes/cedula/${formData.visitante_cedula}`
    );
    const existingVisitante = response.data;

    if (!existingVisitante) {
      const response = await axios.post('/visitantes', {
        nombres: formData.visitante_nombres,
        apellidos: formData.visitante_apellidos,
        cedula: formData.visitante_cedula
      });
      const newVisitante = response.data;

      await axios.post('/visitas', {
        ...visitaData,
        visitante_id: newVisitante.id
      });
    } else {
      await axios.post('/visitas', {
        ...visitaData,
        visitante_id: existingVisitante.id
      });
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
