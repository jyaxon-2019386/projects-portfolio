import { useState } from "react";
import { getSettingsResquest } from "../../services/api";
import toast from "react-hot-toast";

export const useGet = () => {
    const [settings, setSettings] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getSettings = async () => {
        setIsFetching(true);
        const response = await getSettingsResquest();
        setIsFetching(false);
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message || 'Error al obtener los datos'
            );
        } else {
            setSettings(response);
        }
    };

    return {
        settings,
        isFetching,
        getSettings
    };
};
