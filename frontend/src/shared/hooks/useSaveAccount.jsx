import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAccountRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useSaveAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

const add = async(user, totalBalance,type)=>{

    setIsLoading(true);
    const account = {
        user,
        totalBalance,
        type,
        
    }

    try {
      const response = await saveAccountRequest(account);

      if (response.data.error) {
        throw new Error(response.data.message || 'Error al guardar cuentas.');
      }
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
          'Error al guardar cuenta.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { add, isLoading };
};