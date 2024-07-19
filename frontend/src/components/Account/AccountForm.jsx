import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { NavBar } from '../SideBar/NavBar';
import { SideBar } from '../SideBar/SideBar';
import { useSaveAccount } from '../../shared/hooks/useSaveAccount';
import toast from 'react-hot-toast';
import TablaAccount from './TableAccount';
import { useGetAccount } from '../../shared/hooks/useGetAccount';
import { useGetUsers } from '../../shared/hooks/useGetUsers';
import {
  Box, Button, Container, Paper, TextField, Typography, CircularProgress
} from '@mui/material';

export const AccountForm = () => {
  const { add, isLoading } = useSaveAccount();
  const { accounts, isFetching, getAccounts } = useGetAccount();
  const { users, isFetching: isFetchingUsers } = useGetUsers();

  const [formData, setFormData] = useState({
    user: '',
    totalBalance: '',
    type: '',
  });

  useEffect(() => {
    getAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'totalBalance' && value < 0) {
      return toast.error('El saldo total no puede ser negativo');
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      user: selectedOption.value,
    });
  };

  const handleTypeSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      type: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.type === "") {
      return toast.error('El tipo no puede quedar vacío');
    }
  
    // Check if the username and user ID combination already exists
    const existingAccount = accounts.find(account => account.user === formData.user);
    if (existingAccount) {
      return toast.error('Ya existe una cuenta con este usuario e ID');
    }
  
    console.log('Submitting form data:', formData);
  
    try {
      await add(formData.user, formData.totalBalance, formData.type);
      getAccounts();
      setFormData({ user: '', totalBalance: '', type: '' });
      toast.success('Cuenta guardada con éxito');
    } catch (error) {
      toast.error('No se ha podido guardar. Intentar de nuevo.');
    }
  };
  

  const userOptions = users.filter(user => user.role !== 'ADMIN').map(filteredUser => ({
    value: filteredUser._id,
    label: `${filteredUser.username} | ${filteredUser._id}`
  }));

  const typeOptions = [
    { value: 'Monetario', label: 'Monetaria' },
    { value: 'Crédito', label: 'Crédito' },
    { value: 'Depósito', label: 'Depósito' }
  ];

  if (isFetching || isFetchingUsers) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 pt-10">
        <SideBar />
        <div className="flex-1 flex flex-col md:flex-row mt-8">
          <div className="w-full md:w-3/5 p-4">
            <TablaAccount accounts={accounts} />
          </div>
          <div className="w-full md:w-2/5 p-4">
            <Paper elevation={3} className="p-6 rounded-lg shadow-lg mt-4">
              <Typography variant="h5" component="h2" gutterBottom>
                Nueva Cuenta
              </Typography>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="user" className="block text-sm font-medium text-gray-700">ID de Usuario</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Select
                      name="user"
                      id="user"
                      classNamePrefix="react-select"
                      options={userOptions}
                      onChange={handleUserSelectChange}
                      placeholder="Selecciona un usuario"
                      value={userOptions.find(option => option.value === formData.user)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="totalBalance" className="block text-sm font-medium text-gray-700">Saldo total</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <TextField
                      type="number"
                      name="totalBalance"
                      id="totalBalance"
                      className="block w-full pl-7 pr-12 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      placeholder="0.00"
                      value={formData.totalBalance}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: <span className="text-gray-500 sm:text-sm">Q</span>,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de cuenta</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Select
                      name="type"
                      id="type"
                      classNamePrefix="react-select"
                      options={typeOptions}
                      onChange={handleTypeSelectChange}
                      placeholder="Selecciona un tipo de cuenta"
                      value={typeOptions.find(option => option.value === formData.type)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? 'Guardando...' : 'Guardar Cuenta'}
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountForm;