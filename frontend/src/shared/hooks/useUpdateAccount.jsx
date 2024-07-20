import { useState } from "react";
import { updateAccountRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateAccount = () => {
  const navigate = useNavigate();
  const [updatedAccount, setUpdatedAccount] = useState(null);

  const updateAccount = async (id, account) => {
    try {
      const response = await updateAccountRequest(id, account);
      if (response.error) {
        return toast.error(
          response?.err?.response?.data?.message ||
          'Error al actualizar cuenta'
        );
      }
      setUpdatedAccount(response.data);
      toast.success('Cuenta actualizada correctamente');
      navigate('/account');
      return response;
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error('Error al actualizar la cuenta');
      return { error };
    }
  };

  return {
    updatedAccount,
    setUpdatedAccount,
    isFetching: !updatedAccount,
    updateAccount
  };
};
