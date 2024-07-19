import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveOfferRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useSaveOffer = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const add = async (name, price, percentage) => {
    setIsLoading(true);
    const offer = { name, price, percentage };

    try {
      const response = await saveOfferRequest(offer);

      if (response.data.error) {
        throw new Error(response.data.message || 'Error al guardar ofertas.');
      }

      toast.success('Se ha guardado correctamente');
      navigate('/offersAdmin');
    } catch (err) {
      setIsLoading(false);

      if (err.response?.data?.errors) {
        err.response.data.errors.forEach(error => {
          toast.error(error.msg);
        });
      } else {
        toast.error(
          err.response?.data?.msg ||
          err.message ||
          'Error al guardar ofertas.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { add, isLoading };
};
