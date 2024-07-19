// useGetDeposit.jsx
import { useState } from "react";
import { getDepositRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useGetDeposit = () => {
    const [deposit, setDeposit] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getDeposit = async () => {
        setIsFetching(true);
        try {
            const response = await getDepositRequest();
            setIsFetching(false);
            if (response.error) {
                toast.error(response?.err?.response?.data?.message || 'Error al obtener los depósitos');
            } else {
                const deposits = response || []; // Asegúrate de ajustar según la estructura de respuesta de tu API
                setDeposit(deposits);
            }
        } catch (error) {
            console.error("Error retrieving deposit history:", error);
            toast.error('Error al obtener los depósitos');
            setIsFetching(false);
        }
    };

    return {
        deposit,
        isFetching,
        getDeposit
    };
};
