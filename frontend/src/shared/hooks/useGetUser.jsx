import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getUsersRequest } from "../../services/api"; 

export const useGetUser = () => {
  const [users, setUser] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

    const getUser = async () => {
      setIsFetching(true);
      const response = await getUsersRequest();
      setIsFetching(false);
      if (response.error) {
        toast.error(
          response?.err?.response?.data?.message || 'Error al obtener los datos'
        );
      } else {
        setUser(response.users);
      }
    };

  return {
    users,
    isFetching,
    getUser
  };
};