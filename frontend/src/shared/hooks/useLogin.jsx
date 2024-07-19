import { useState } from "react";
import { loginRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);

    const login = async (user) => {
        setisLoading(true);
        const response = await loginRequest(user);
        setisLoading(false);

        if (response.error) {
            return toast.error(
                response?.err?.response?.data?.message || 'Error al logearse'
            );
        }

        toast.success('Logeado correctamente');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);

        const role = response.data.role;
        if (role === 'ADMIN') {
            navigate('/dashboard');
        } else if (role === 'USER') {
            navigate('/dashboardClient');
        }
    };

    return {
        isLoading,
        login
    };
};
