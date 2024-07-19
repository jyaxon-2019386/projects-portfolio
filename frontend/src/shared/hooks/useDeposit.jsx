import { depositRequest } from '../../services/api';
import toast from 'react-hot-toast';

export const useDeposit = () => {
  const deposit = async (depositData) => {
    try {
      const response = await depositRequest(depositData);
      if (response.error) {
        toast.error(response.err?.response?.data?.message || 'Error al realizar el depósito');
        return null;
      } else {
        toast.success('¡Depósito exitoso!');
        return response.data; // Asumiendo que la respuesta contiene los datos del nuevo depósito
      }
    } catch (error) {
      toast.error('El depósito falló. Por favor, inténtalo de nuevo.');
      return null;
    }
  };

  return {
    deposit,
  };
};
