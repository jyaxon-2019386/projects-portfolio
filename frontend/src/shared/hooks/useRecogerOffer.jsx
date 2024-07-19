import { useState } from 'react';
import { recogerOfferRequest } from '../../services/api';
import toast from 'react-hot-toast';

export const useRecogerOffer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const recogerOffer = async (offerId, userId) => {
    try {
      setIsLoading(true);

      const response = await recogerOfferRequest({ offerId });

      setIsLoading(false);

      // Verificar si la respuesta tiene un error explícito
      if (response.error) {
        // Manejar el error específico, por ejemplo, un 403
        if (response.error.status === 403) {
          // Mostrar un toast o realizar alguna acción específica para el error 403
          toast.error('Ya ha recogido esta oferta o no tiene suficientes fondos.');
        } else {
          toast.error('Ya ha recogido esta oferta o no tiene suficientes fondos.');
        }
        return;
      }

      // Si no hay errores, mostrar mensaje de éxito
      toast.success('Oferta recogida correctamente');
      return response.data; // Opcional: devolver datos adicionales según sea necesario

    } catch (error) {
      // Capturar cualquier error inesperado
      console.error('Error al recoger la oferta:', error);
      toast.error('Error al recoger la oferta');
    } finally {
      setIsLoading(false);
    }
  };

  return { recogerOffer, isLoading };
};