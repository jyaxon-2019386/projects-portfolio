import toast from "react-hot-toast";
import { deleteAccountRequest } from "../../services/api";

export const useDeleteAccount = () => {
  const deleteAccount = async (id) => {
    const response = await deleteAccountRequest(id);
    if (response.error) {
      return toast.error(
        response?.err?.response?.data?.message ||
          "Error al eliminar cuenta"
      );
    }
    toast.success("Cuenta eliminada correctamente");
  };

  return {
    deleteAccount,
  };
} 