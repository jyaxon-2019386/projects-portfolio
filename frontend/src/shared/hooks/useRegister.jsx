import { useState } from 'react';
import { registerRequest } from '../../services/api';
import toast from 'react-hot-toast';  
import { useNavigate } from 'react-router-dom';

// Crear una instancia de Axios con una configuración base
export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const register = async (user) => {
    setIsLoading(true);
  const response = await registerRequest(user);
  setIsLoading(false);
  if (response.error) {
    return toast.error(
      response?.err?.response?.data?.message ||
      'Error al registrarse'
    );
  }
  

  navigate('/registerClient');
}

  return {
    isLoading,
    register
  };
} 