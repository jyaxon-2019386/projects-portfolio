import { useState } from "react";
import { resetPasswordRequest } from '../../services/api';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const resetPassword = async (identifier, newPassword) => {
        setIsLoading(true);
        const response = await resetPasswordRequest({ identifier, newPassword });
        setIsLoading(false);
        if (response.error) {
            return toast.error(
                response?.err?.response?.data?.message ||
                'Error al cambiar la password'
            );
        }

        toast.success("Contraseña restablecida correctamente");
        navigate('/');
    };

    return {
        isLoading,
        resetPassword
    };
};
