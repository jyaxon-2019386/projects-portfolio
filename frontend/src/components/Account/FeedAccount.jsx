import { useEffect } from 'react';
import { useGetAccount } from '../../shared/hooks/useGetAccount';
import { Routes, Route } from 'react-router-dom';
import { Accounts } from './Accounts';
import { AccountForm } from './AccountForm';
import { PacmanLoader } from 'react-spinners';

export const FeedAccount = () => {
  const { accounts, getAccounts, isFetching } = useGetAccount();

  useEffect(() => {
    getAccounts();
  }, []);

  if (isFetching) {
    return (
      <div>
        <PacmanLoader />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="accounts" element={<Accounts accounts={accounts} />} />
        <Route path="save" element={<AccountForm />} />
      </Routes>
    </div>
  );
};