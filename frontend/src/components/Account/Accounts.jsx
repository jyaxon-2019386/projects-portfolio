import { useEffect } from 'react';
import { NavBar } from '../SideBar/NavBar.jsx';
import { SideBarClient } from '../SideBarClient/SideBarClient.jsx';
import { useGetAccount } from '../../shared/hooks/useGetAccount';
import { ClockLoader, PacmanLoader } from 'react-spinners';

export const Accounts = ({ userId }) => {
  const { accounts, isFetching, getAccounts } = useGetAccount();

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    console.log('Accounts:', accounts);
  }, [accounts]);

  if (isFetching) {
    return (
      <div>
        <ClockLoader />
      </div>
    );
  }

  if (!accounts) {
    return (
      <div>
        <PacmanLoader />
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] min-h-screen">
      <NavBar className="fixed w-full top-0 bg-gray-700 text-white z-10" />
      <div className="flex h-screen bg-white">
        <SideBarClient className="fixed top-16 w-1/4 bg-gray-800 text-white h-full" />
        <div className="container mx-auto px-4 py-8 ">
          <div className="flex flex-wrap -mx-4 justify-center pt-8 ">
            {accounts.map((account, index) => (
              <div key={index} className="max-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg relative mx-4 my-4 w-full md:w-2/2 lg:w-1/4">
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-xl mb-2">{account.accountNumber}</div>
                  </div>
                  <p className="text-gray-700 text-base mt-2">Saldo total: Q{account.totalBalance}</p>
                  <p className="text-gray-700 text-base mt-2">Tipo: {account.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};