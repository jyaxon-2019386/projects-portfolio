import toast from "react-hot-toast";
import { deleteOfferRequest } from "../../services/api";

export const useDeleteOffer = () => {
  const deleteOffer = async (id) => {
    const response = await deleteOfferRequest(id);
    if (response.error) {
      return toast.error(
        response?.err?.response?.data?.message ||
          "Error al eliminar oferta"
      );
    }
    toast.success("Oferta eliminada correctamente");
  };

  return {
    deleteOffer,
  };
} 