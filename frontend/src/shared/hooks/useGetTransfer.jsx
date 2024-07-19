import { useState } from "react";
import { getTransferRequest } from "../../services/api.js";
import toast from 'react-hot-toast';

export const UseGetTransfer = () => {
  const [transfer, setTransfer] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getTransfer = async () => {
    setIsFetching(true);
    const response = await getTransferRequest();
    setIsFetching(false);
    if (response.error) {
      toast.error(
        response?.err?.response?.data?.message || 'Error al obtener las transferencias'
      );
    } else {
      const transfers = response.transfers || []; 
      setTransfer(transfers);
    }
  };

  return {
    transfer,
    isFetching,
    getTransfer
  };
};
