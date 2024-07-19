import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useGetAccount } from '../../shared/hooks/useGetAccount';
import { useUpdateAccount } from '../../shared/hooks/useUpdateAccount';
import { useDeleteAccount } from '../../shared/hooks/useDeleteAccount';
import { useGetUsers } from '../../shared/hooks/useGetUsers';
import { MoonLoader } from 'react-spinners';
import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa';
import {
  Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Tooltip, IconButton
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const TablaAccount = () => {
  const { accounts, isFetching: isFetchingAccounts, getAccounts } = useGetAccount();
  const { updateAccount, setUpdatedAccount, updatedAccount } = useUpdateAccount();
  const { deleteAccount } = useDeleteAccount();
  const { users, isFetching: isFetchingUsers } = useGetUsers();

  useEffect(() => {
    getAccounts();
  }, []);

  if (isFetchingAccounts || isFetchingUsers) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <MoonLoader />
      </Box>
    );
  }

  if (!accounts || !users) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <MoonLoader />
      </Box>
    );
  }

  const getUserName = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : 'Usuario no encontrado';
  };

  const handleDeleteAccount = (accountId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAccount(accountId)
          .then(() => {
            getAccounts();
            Swal.fire('Eliminado!', 'La cuenta ha sido eliminada.', 'success');
          })
          .catch((error) => {
            console.error('Error al eliminar cuenta:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar la cuenta.', 'error');
          });
      }
    });
  };

  const handleEditAccount = (accountId) => {
    const accountToEdit = accounts.find((account) => account._id === accountId);
    setUpdatedAccount(accountToEdit);
  };

  const handleUpdateAccount = () => {
    if (updatedAccount.totalBalance < 0) {
      return Swal.fire('Error', 'El saldo total no puede ser negativo', 'warning');
    }
    if (/\d/.test(updatedAccount.type)) {
      return Swal.fire('Error', 'El tipo no puede contener números', 'warning');
    }

    updateAccount(updatedAccount, updatedAccount._id)
      .then((response) => {
        if (response) {
          getAccounts();
          setUpdatedAccount(null);
          Swal.fire('Actualizado', 'La cuenta ha sido actualizada.', 'success');
        } else {
          throw new Error('No se encuentra la cuenta');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar la cuenta:', error);
        Swal.fire('Error', 'Hubo un problema al actualizar la cuenta.', 'error');
      });
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      accounts.map((account, index) => ({
        'No.': index + 1,
        'Id': account._id,
        'No. Cuenta': account.accountNumber,
        'ID de Usuario': account.user,
        'Nombre de Usuario': getUserName(account.user),
        'Saldo Total': account.totalBalance,
        'Tipo': account.type
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cuentas');

    ws['!cols'] = [{ wch: 10 }, { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 10 }];
    ws['A1'].s = { font: { bold: true } };
    ws['B1'].s = { font: { bold: true } };
    ws['C1'].s = { font: { bold: true } };
    ws['D1'].s = { font: { bold: true } };
    ws['E1'].s = { font: { bold: true } };
    ws['F1'].s = { font: { bold: true } };
    ws['G1'].s = { font: { bold: true } };

    XLSX.writeFile(wb, 'Cuentas.xlsx');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4" component="h1">
          Gestión de Cuentas
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<FaFileExcel />}
          onClick={handleDownloadExcel}
        >
          Exportar a Excel
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell><strong>Número de Cuenta</strong></TableCell>
              <TableCell><strong>Usuario</strong></TableCell>
              <TableCell><strong>Saldo Total</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account, index) => (
              <TableRow key={account._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <TableCell>{account.accountNumber}</TableCell>
                <TableCell>{getUserName(account.user)}</TableCell>
                <TableCell>{'Q'+account.totalBalance}</TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => handleEditAccount(account._id)}>
                      <AiOutlineEdit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="secondary" onClick={() => handleDeleteAccount(account._id)}>
                      <AiOutlineDelete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(updatedAccount)} onClose={() => setUpdatedAccount(null)}>
        <DialogTitle>Editar Cuenta</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              margin="dense"
              label="ID de Usuario"
              type="text"
              fullWidth
              value={updatedAccount?.user || ''}
              InputProps={{
                readOnly: true,
              }}
              disabled
            />
            <TextField
              margin="dense"
              label="Saldo Total"
              type="number"
              fullWidth
              value={updatedAccount?.totalBalance || ''}
              onChange={(e) => setUpdatedAccount({ ...updatedAccount, totalBalance: parseFloat(e.target.value) })}
            />
            <TextField
              margin="dense"
              label="Tipo"
              type="text"
              fullWidth
              value={updatedAccount?.type || ''}
              onChange={(e) => setUpdatedAccount({ ...updatedAccount, type: e.target.value })}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateAccount} color="primary" variant="contained" startIcon={<SaveIcon />}>
            Guardar
          </Button>
          <Button onClick={() => setUpdatedAccount(null)} color="secondary" variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TablaAccount;