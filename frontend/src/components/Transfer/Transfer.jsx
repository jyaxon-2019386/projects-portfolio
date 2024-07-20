import { useState, useEffect } from 'react';
import { AiOutlineNumber, AiOutlineDollar, AiOutlineComment } from 'react-icons/ai';
import { useMakeTransfer } from '../../shared/hooks/useMakeTransfer.jsx';
import { NavBar } from '../SideBar/NavBar.jsx';
import { SideBarClient } from '../SideBarClient/SideBarClient.jsx';
import toast from 'react-hot-toast';
import { useGetAccoun } from '../../shared/hooks/useGetAccoun.jsx';

export const Transfer = () => {
  const { makeTransfer } = useMakeTransfer();
  const { accounts, isFetching, getAccounts } = useGetAccoun();
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const [fromAccountInfo, setFromAccountInfo] = useState('');
  const [toAccountInfo, setToAccountInfo] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      await getAccounts();
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const initialAccount = accounts[0];
      setFormData((prevData) => ({
        ...prevData,
        fromAccount: initialAccount.accountNumber
      }));
      setFromAccountInfo(`${initialAccount.accountNumber} - ${initialAccount.user.name}`);
    }
  }, [accounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  useEffect(() => {
    if (accounts) {
      const selectedFromAccount = accounts.find(account => account.accountNumber === formData.fromAccount);
      setFromAccountInfo(selectedFromAccount ? `${selectedFromAccount.accountNumber} - ${selectedFromAccount.user.name}` : '');

      const selectedToAccount = accounts.find(account => account.accountNumber === formData.toAccount);
      setToAccountInfo(selectedToAccount ? `${selectedToAccount.accountNumber} - ${selectedToAccount.user.name}` : '');
    }
  }, [formData.fromAccount, formData.toAccount, accounts]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.amount <= 0) {
      toast.error('El monto debe ser mayor a 0.');
      return;
    }

    if (formData.fromAccount === formData.toAccount) {
      toast.error('No se puede transferir a la misma cuenta.');
      return;
    }

    try {
      await makeTransfer(formData);
      toast.success('Transferencia realizada con éxito');
      setFormData({
        fromAccount: accounts ? accounts[0].accountNumber : '',
        toAccount: '',
        amount: '',
        comment: ''
      });
    } catch (error) {
      toast.error('Error al realizar la transferencia');
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex h-screen bg-white">
        <SideBarClient />
        <div className="flex flex-col flex-1 items-center">
          <div className="bg-white p-1 rounded-lg shadow-lg flex w-4/2 max-w-2xl mb-8 mt-16">
            <div className="p-8 bg-[#202B42] rounded-lg">
              <h1 className="text-3xl font-bold text-white text-center mb-6">Transferencia</h1>
              <p className="text-center text-gray-100 mb-4">
                Realiza una transferencia entre cuentas
              </p>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="fromAccount"
                    value={formData.fromAccount}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.fromAccount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Cuenta de Origen"
                    required
                  />
                  <AiOutlineNumber className="absolute top-3 right-3 text-gray-400" />
                  {fromAccountInfo && <p className="text-sm text-white mt-1">{fromAccountInfo}</p>}
                  {errors.fromAccount && <span className="text-red-500 text-sm">{errors.fromAccount}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="toAccount"
                    value={formData.toAccount}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.toAccount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Cuenta de Destino"
                    required
                  />
                  <AiOutlineNumber className="absolute top-3 right-3 text-gray-400" />
                  {toAccountInfo && <p className="text-sm text-white mt-1">{toAccountInfo}</p>}
                  {errors.toAccount && <span className="text-red-500 text-sm">{errors.toAccount}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Monto"
                    required
                  />
                  <AiOutlineDollar className="absolute top-3 right-3 text-gray-400" />
                  {errors.amount && <span className="text-red-500 text-sm">{errors.amount}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.comment ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Comentario (opcional)"
                  />
                  <AiOutlineComment className="absolute top-3 right-3 text-gray-400" />
                  {errors.comment && <span className="text-red-500 text-sm">{errors.comment}</span>}
                </div>
                <button
                  className="w-full py-2 mb-4 bg-[#4E46DB] text-white font-bold rounded-md hover:bg-[#3b39a3] transition duration-300"
                  type="submit"
                >
                  Transferir
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transfer;
