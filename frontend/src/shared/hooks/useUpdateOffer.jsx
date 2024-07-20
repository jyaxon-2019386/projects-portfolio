import { useState } from "react";
import { updateOfferRequest } from "../../services/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateOffer = () => {
  const navigate = useNavigate();
  const [updatedOffer, setUpdatedOffer] = useState(null);

  const updateOffer = async (id, offer) => {
    try {
      const response = await updateOfferRequest(id, offer);
      if (response.error) {
        return toast.error(
          response?.err?.response?.data?.message ||
          'Error al actualizar oferta'
        );
      }
      setUpdatedOffer(response.data);
      toast.success('Oferta actualizada correctamente');
      navigate('/offers');
      return response; // Return the response for further handling if needed
    } catch (error) {
      console.error('Error updating offer:', error);
      toast.error('Error al actualizar la oferta');
      return { error };
    }
  };

  return {
    updatedOffer,
    setUpdatedOffer, // Asegúrate de devolver setUpdatedOffer
    isFetching: !updatedOffer,
    updateOffer
  };
};
