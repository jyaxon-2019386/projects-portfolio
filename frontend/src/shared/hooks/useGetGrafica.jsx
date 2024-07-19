// useGetGrafica.js
import { useEffect, useState } from 'react';
import { getOfferUsers } from '../../services/api'

export const useGetGrafica = () => {
    const [offers, setOffers] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const getOffers = async () => {
        setIsFetching(true);
        try {
            const data = await getOfferUsers(); // Cambia esto según cómo esté implementada tu función de API
            setOffers(data.offers); // Asumiendo que la respuesta de la API tiene una propiedad `offers`
            setIsFetching(false);
        } catch (error) {
            console.error('Error fetching offers:', error);
            setError(error);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getOffers();
    }, []);

    return { offers, isFetching, error, getOffers };
};