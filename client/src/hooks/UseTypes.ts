import { useState, useEffect } from 'react';
import { Types } from '../interfaces/models';
import getTypes from '../services/api/endpoints/types/getTypes';


const useTypes = () => {
  const [types, setTypes] = useState<Types[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const typesData = await getTypes();
        setTypes(typesData);
      } catch (error) {
        throw new Error(`Ha habido un error al tratar de hacer esta llamada a la API: ${ error }`)
      }
    };

    fetchTypes();
  }, []);

  return { types };
};

export default useTypes;
