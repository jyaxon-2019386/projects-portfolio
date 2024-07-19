import { useState } from "react";
import { getbuysRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useGetBuys = () => {
    const [buys, setBuys] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getBuys = async () => {
        setIsFetching(true);
        try {
            const response = await getbuysRequest();
            setIsFetching(false);
            if (response.error) {
                toast.error(response?.err?.response?.data?.message || 'Error al obtener las compras');
            } else {
                setBuys(response.offers || []); // Maneja la estructura de la respuesta
            }
        } catch (error) {
            console.error("Error retrieving buys history:", error);
            toast.error('Error al obtener las compras realizadas');
            setIsFetching(false);
        }
    };

    return {
        buys,
        isFetching,
        getBuys
    };
};
