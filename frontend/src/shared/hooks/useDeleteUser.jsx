import toast from "react-hot-toast";
import { deleteUserRequest } from "../../services/api";

export const useDeleteUser = () => {
    const deleteUser = async (id) => {
      const response = await deleteUserRequest(id);
      if (response.error) {
        return toast.error(
          response?.err?.response?.data?.message ||
            "Error al eliminar usuario"
        );
      }
      toast.success("Usuario eliminado correctamente");
    };
  
    return {
      deleteUser,
    };
  } 