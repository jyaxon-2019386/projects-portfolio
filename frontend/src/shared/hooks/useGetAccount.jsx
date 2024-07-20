import { useState } from "react";
import toast from "react-hot-toast";
import { getAccountRequest } from "../../services/api";

export const useGetAccount = () => {
  const [accounts, setAccounts] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getAccounts = async () => {
    setIsFetching(true);
    try {
      const response = await getAccountRequest();
      if (response.error) {
        toast.error(
          response?.err?.response?.data?.message || 'Error al obtener cuentas'
        );
      } else {
        setAccounts(response.accounts); 
      }
    } catch (error) {
      toast.error('Error al obtener cuentas');
    } finally {
      setIsFetching(false);
    }
  };

  return {
    accounts,
    isFetching,
    getAccounts
  };
};
