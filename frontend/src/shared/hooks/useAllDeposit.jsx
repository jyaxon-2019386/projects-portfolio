import { useState, useEffect } from 'react';
import { fetchDeposits } from '../../services/api.js';

const useDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDeposits = async () => {
      try {
        const data = await fetchDeposits();
        setDeposits(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error);
        setDeposits([]); // Set deposits to an empty array in case of an error
      } finally {
        setLoading(false);
      }
    };

    getDeposits();
  }, []);

  const addDeposit = (newDeposit) => {
    setDeposits((prevDeposits) => [newDeposit, ...prevDeposits]);
  };

  return { deposits, loading, error, addDeposit };
};

export default useDeposits;
