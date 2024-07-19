import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:2656',
    timeout: 5000
});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = token
        return config
    },
    err => Promise.reject(err)
)

export const loginRequest = async (user) => {
    try {
        return await apiClient.post('/user/login', user);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};

export const registerRequest = async (user) => {
    console.log(user)
    try {
        return await apiClient.post('/user/registerClient', user, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    } catch (err) {
        return {
            error: true,
            err
        };
    }
}


export const resetPasswordRequest = async (data) => {
    try {
        return await apiClient.post('/user/resetPassword', data);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};

export const getSettingsResquest = async () => {
    try {
        const response = await apiClient.get('/user/get');
        return response.data;
    } catch (error) {
        console.error('Error fetching settings:', error);
        return { error };
    }
}

export const updateUserRequest = async (user, id) => {
    try {
        return await apiClient.put(`/user/updateS/${id}`, user);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

export const updateSettingsRequest = async (userId, setting) => {
    try {
        const response = await apiClient.put(`/user/updateS/${userId}`, setting);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar los datos: ', error);
        return { error };
    }
};

export const getbuysRequest = async () => {
    try {
        const response = await apiClient.get('/offer/getOfferHistory');
        return response.data
    } catch (error) {
        console.error('Error fetching buys:', error);
        return { error };
    }
}

export const saveOfferRequest = async (offer) => {
    try {
        return await apiClient.post('/offer/save', offer);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}



export const saveAccountRequest = async (account) => {
    try {
        return await apiClient.post('/account/saveAccount', account);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

export const updateAccountRequest = async (account, id) => {
    try {
        return await apiClient.put(`/account/updateAccount/${id}`, account);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

export const deleteAccountRequest = async (id) => {
    try {
        return await apiClient.delete(`/account/deleteAccount/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

export const getAccountRequest = async () => {
    try {
        const response = await apiClient.get('/account/getA');
        return response.data;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return { error };
    }
};

export const getAccounRequest = async () => {
    try {
        const response = await apiClient.get('/account/getAccount');
        return response.data;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return { error };
    }
};

export const deleteUserRequest = async (id) => {
    try {
        return await apiClient.delete(`/user/deletedU/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}


export const getUsersRequest = async () => {
    try {
        const response = await apiClient.get('/user/getU');
        return response.data;
    } catch (error) {
        console.error('Error al actualizar los datos: ', error);
        return { error };
    }
}

export const getOffersRequest = async () => {
    try {
        const response = await apiClient.get('/offer/get');
        return response.data;
    } catch (error) {
        console.error('Error fetching offers:', error);
        return { error };
    }
};

export const getTransferRequest = async () => {
    try {
        const response = await apiClient.get('/transfer/get');
        return response.data;
    } catch (error) {
        console.error('Error fetching transfers:', error);
        return { error };
    }
}

export const getDepositRequest = async () => {
    try {
        const response = await apiClient.get('/deposit/get');
        return response.data
    } catch (error) {
        console.error('Error fetching deposit:', error);
        return { error };
    }
}


export const updateOfferRequest = async (offer, id) => {
    try {
        return await apiClient.put(`/offer/update/${id}`, offer);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

export const deleteOfferRequest = async (id) => {
    try {
        return await apiClient.delete(`/offer/delete/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

export const recogerOfferRequest = async ({ offerId, userId }) => {
    try {
        return await apiClient.post('/offer/offer', { offerId, userId });
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};

export const depositRequest = async (data) => {
    try {
        const response = await apiClient.post('/deposit/save', data);
        return response.data;
    } catch (err) {
        return {
            error: err.response ? err.response.data : { message: 'Error desconocido' }
        };
    }
};

export const makeTransferRequest = async (transferData) => {
    try {
        const response = await apiClient.post('/transfer/trans', transferData);
        return response.data;
    } catch (err) {
        return {
            error: err.response ? err.response.data : { message: 'Error desconocido' }
        };
    }
};

export const getOfferUsers = async () => {
    try {
        const response = await apiClient.get('/offer/grafica');
        return response.data
    } catch (error) {
        console.error('Error fetching graphic:', error);
        return { error };
    }
}

export const fetchDeposits = async () => {
    try {
        const response = await apiClient.get('/deposit/getAllDeposit');
        return response.data
    } catch (error) {
        console.error('Error fetching graphic:', error);
        return { error };
    }
}

export default apiClient;