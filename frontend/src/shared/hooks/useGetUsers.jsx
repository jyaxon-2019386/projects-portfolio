import { useState, useEffect } from "react";
import { getUsersRequest } from "../../services/api"; 

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setIsFetching(true);
      const response = await getUsersRequest();
      setIsFetching(false);
      if (response.error) {
        toast.error(
          response?.err?.response?.data?.message || 'Error al obtener los datos'
        );
      } else {
        setUsers(response.users);
      }
    };

    getUsers();
  }, []);

  return {
    users,
    isFetching,
  };
};
