import { useState } from "react";
import { updateUserRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const useUpdateUser = () => {
    const navigate = useNavigate();
    const [updatedUser, setUpdatedUser] = useState(null);
  
    const updateUser = async (id, updatedData) => {
      try {
        const response = await updateUserRequest(id, updatedData);
        if (response.error) {
          toast.error(
            response?.err?.response?.data?.message ||
              "Error al actualizar la información"
          );
        }
        setUpdatedUser(response.data);
          toast.success("Información actualizada correctamente");
          navigate("/registerClient"); // Ajusta esta ruta según tu configuración
        return response;
      } catch (error) {
        console.error("Error al actualizar la información:", error);
        toast.error("Error al actualizar el usuario");
        return { error };
      }
    };
  
    return {
      updatedUser,
      setUpdatedUser,
      isFetching: !updatedUser,
      updateUser
    };
  };
  