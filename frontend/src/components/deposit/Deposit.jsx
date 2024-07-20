import { useState, useEffect } from 'react';
import { AiOutlineNumber, AiOutlineDollar } from 'react-icons/ai';
import { useDeposit } from '../../shared/hooks/useDeposit';
import { NavBar } from '../SideBar/NavBar';
import { SideBar } from '../SideBar/SideBar.jsx';
import { useGetAccoun } from '../../shared/hooks/useGetAccoun';
import { useGetDeposit } from '../../shared/hooks/useGetDeposit'; // Importa tu hook de depósitos
import toast from 'react-hot-toast';
import DepositsTable from './DepositTabla.jsx';

export const Deposit = () => {
  const { deposit } = useDeposit();
  const { accounts, getAccounts, isFetching } = useGetAccoun();
  const { deposit: depositList, getDeposit, isFetching: isFetchingDeposit } = useGetDeposit(); // Usa el hook de depósitos
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
  });
  const [errors, setErrors] = useState({});
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    getAccounts(); // Obtener las cuentas al montar el componente
  }, []);

  useEffect(() => {
    getDeposit(); // Obtener los depósitos al montar el componente
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleAccountNumberChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      accountNumber: value,
    }));

    // Buscar la cuenta seleccionada
    const selectedAccount = accounts.find((account) => account.accountNumber === value);
    if (selectedAccount) {
      setAccountName(selectedAccount.user.name); // Establecer el nombre de la cuenta
    } else {
      setAccountName(''); // Si no se encuentra la cuenta, borrar el nombre
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el monto sea mayor a 0
    if (formData.amount <= 0) {
      toast.error('El monto debe ser mayor a 0.');
      return;
    }

    try {
      await deposit(formData);
      setFormData({
        accountNumber: '',
        amount: '',
      });
      getDeposit(); // Obtener los depósitos actualizados
      toast.success('Depósito realizado con éxito');
    } catch (error) {
      // Manejo de errores específico si es necesario
      toast.error('Error al realizar el depósito');
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex h-screen bg-white">
        <SideBar />
        <div className="flex flex-1 justify-start items-center">
          <DepositsTable deposits={depositList} /> {/* Pasa los depósitos actualizados a la tabla */}
          <div className="bg-white p-1 rounded-lg shadow-lg flex w-1/2 max-w-2xl">
            <div className="p-8 bg-[#202B42] rounded-lg">
              <h1 className="text-3xl font-bold text-white text-center mb-6">Depósito</h1>
              <p className="text-center text-gray-100 mb-4">Realiza un depósito en la cuenta</p>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleAccountNumberChange} // Usar handleAccountNumberChange para actualizar el nombre de la cuenta
                    className={`w-full px-4 py-2 border ${
                      errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Número de Cuenta"
                    required
                  />
                  <AiOutlineNumber className="absolute top-3 right-3 text-gray-400" />
                  {errors.accountNumber && (
                    <span className="text-red-500 text-sm">{errors.accountNumber}</span>
                  )}
                </div>
                <div className="relative mb-4">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.amount ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Monto"
                    required
                  />
                  <AiOutlineDollar className="absolute top-3 right-3 text-gray-400" />
                  {errors.amount && <span className="text-red-500 text-sm">{errors.amount}</span>}
                </div>
                {accountName && (
                  <p className="text-center text-gray-100 mb-4">
                    Nombre de la cuenta: {accountName}
                  </p>
                )}
                <button
                  className="w-full py-2 mb-4 bg-[#4E46DB] text-white font-bold rounded-md hover:bg-[#3b39a3] transition duration-300"
                  type="submit"
                >
                  Depositar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
