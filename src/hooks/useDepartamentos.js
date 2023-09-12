import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../providers/authProvider';

const useDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const { token } = useAuth();
  const fetchDepartamentos = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/departamentos',
        headers: { Authorization: 'Bearer ' + token }
      });
      setDepartamentos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartamentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    departamentos
  };
};

export default useDepartamentos;
