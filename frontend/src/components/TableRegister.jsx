import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useGetUser} from "../shared/hooks/useGetUser.jsx";
import { useUpdateUser } from "../shared/hooks/useUpdateUser.jsx";
import { ClockLoader, PacmanLoader } from "react-spinners";
import { useDeleteUser } from "../shared/hooks/useDeleteUser.jsx";
import Swal from "sweetalert2";

export const TablaRegister = () => {
  const { users, isFetching, getUser} = useGetUser();
  const { updateUser, setUpdatedUser, updatedUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();
  const [isEditVisible, setIsEditVisible] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log('User:', users);
  }, [users]);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClockLoader />
      </div>
    );
  }

  if (!users) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader />
      </div>
    );
  }

  const handleDeleteUser = (id) => {
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
        deleteUser(id)
          .then(() => {
            getUser();
            Swal.fire('Eliminado!', 'El usuario se ha eliminado.', 'success');
          })
          .catch(error => {
            console.error('Error al eliminar usuario:', error);
            Swal.fire('Error', 'Hay un problema al eliminar el usuario.', 'error');
          });
      }
    });
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find(user => user._id === userId);
    setUpdatedUser(userToEdit);
    setIsEditVisible(true);
  };

  const handleUpdateUser = () => {
    updateUser(updatedUser, updatedUser._id)
      .then(response => {
        if (response) {
          getUser();
          setUpdatedUser(null);
          setIsEditVisible(false);
          Swal.fire('Actualizado', 'El usuario se ha actualizado.', 'success');
        } else {
          throw new Error('No se encuentra el usuario');
        }
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
        Swal.fire('Error', 'Hay un problema al actualizar el usuario.', 'error');
      });
  };

  return (
    <div className="min-h-screen px-4 pt-20">
      <div className="overflow-x-auto mt-4 w-11/12 mx-auto">
        <table className="min-w-full leading-normal shadow-md rounded-lg">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Username</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Address</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Phone</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Email</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Job Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Income</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="bg-white hover:bg-green-100">
                <td className="px-5 py-2 border-b border-gray-200">{user.name}</td>
                <td className="px-5 py-2 border-b border-gray-200 text-center">{user.username}</td>
                <td className="px-5 py-2 border-b border-gray-200 text-center">{user.address}</td>
                <td className="px-5 py-2 border-b border-gray-200 text-center">{user.phone}</td>
                <td className="px-5 py-2 border-b border-gray-200 text-center">{user.email}</td>
                <td className="px-5 py-2 border-b border-gray-200 text-center">{user.jobname}</td>
                <td className="px-5 py-2 border-b border-gray-200 text-center">{user.income}</td>
                <td className="px-5 py-2 border-b border-gray-200 text-center">
                  <div className="flex justify-center">
                    <AiOutlineEdit className="text-green-500 hover:text-green-800 cursor-pointer mx-2" onClick={() => handleEditUser(user._id)} />
                    <AiOutlineDelete className="text-red-500 hover:text-red-800 cursor-pointer mx-2" onClick={() => handleDeleteUser(user._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditVisible && updatedUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl mb-4">Edit User</h2>
            <input className="p-4 m-2 bg-gray-100 rounded w-full" placeholder="Name" value={updatedUser.name || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} />
            <input className="p-4 m-2 bg-gray-100 rounded w-full" placeholder="Username" value={updatedUser.username || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })} />
            <input className="p-4 m-2 bg-gray-100 rounded w-full" placeholder="DPI" value={updatedUser.dpi || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, dpi: e.target.value })} />
            <input className="p-4 m-2 bg-gray-100 rounded w-full" placeholder="Address" value={updatedUser.address || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, address: e.target.value })} />
            <input className="p-4 m-2 bg-gray-100 rounded w-full" placeholder="Phone" value={updatedUser.phone || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })} />
            <input className="p-4 m-2 bg-gray-100 rounded w-full" placeholder="Email" value={updatedUser.email || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} />
            <input className="p-4 m-2 bg-gray-100 rounded w-full" placeholder="Job Name" value={updatedUser.jobname || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, jobname: e.target.value })} />
            <input className="p-4 m-2 bg-gray-100 rounded w-full" placeholder="Income" value={updatedUser.income || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, income: e.target.value })} />
            <div className="flex justify-end">
              <button type="button" onClick={() => setIsEditVisible(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
                Cancel
              </button>
              <button type="button" onClick={handleUpdateUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};