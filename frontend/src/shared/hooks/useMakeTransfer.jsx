import { makeTransferRequest } from '../../services/api.js';

export const useMakeTransfer = () => {
  const makeTransfer = async (transferData) => {
    try {
      const response = await makeTransferRequest(transferData);
      return response;
    } catch (error) {
      console.error('Error making transfer:', error);
      throw error;
    }
  };

  return { makeTransfer };
};
