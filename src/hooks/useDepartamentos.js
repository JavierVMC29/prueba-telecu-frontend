import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const useDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);

  const fetchDepartamentos = async () => {
    try {
      const response = await axios.get('/departamentos');
      setDepartamentos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  return {
    departamentos
  };
};

export default useDepartamentos;
