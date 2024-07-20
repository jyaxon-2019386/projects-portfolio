import { useState } from "react";
import toast from "react-hot-toast";
import { getOffersRequest } from "../../services/api";

export const useGetOffer = () => {
  const [offers, setOffers] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getOffers = async () => {
    setIsFetching(true);
    try {
      const response = await getOffersRequest();
      if (response.error) {
        toast.error(
          response?.err?.response?.data?.message || 'Error al obtener ofertas'
        );
      } else {
        setOffers(response.offers); // Actualizar el estado con los datos de las ofertas
      }
    } catch (error) {
      toast.error('Error al obtener ofertas');
    } finally {
      setIsFetching(false);
    }
  };

  return {
    offers,
    isFetching,
    getOffers
  };
};
