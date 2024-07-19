import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useGetOffer } from "../../shared/hooks/useGetOffer";
import { useUpdateOffer } from "../../shared/hooks/useUpdateOffer";
import { useDeleteOffer } from "../../shared/hooks/useDeleteOffer";
import { ClockLoader, PacmanLoader } from "react-spinners";

export const TablaOffer = () => {
  const { offers, isFetching, getOffers } = useGetOffer();
  const { updateOffer, setUpdatedOffer, updatedOffer } = useUpdateOffer();
  const { deleteOffer } = useDeleteOffer();

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    console.log('Offers:', offers);
  }, [offers]);

  if (isFetching) {
    return (
      <div>
        <ClockLoader />
      </div>
    );
  }

  if (!offers) {
    return (
      <div>
        <PacmanLoader />
      </div>
    );
  }

  const handleDeleteOffer = (offerId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOffer(offerId)
          .then(() => {
            getOffers(); // Refresh the offers list after deletion
            Swal.fire('Eliminado!', 'La oferta se ha eliminado.', 'success');
          })
          .catch(error => {
            console.error('Error al eliminar oferta:', error);
            Swal.fire('Error', 'Hay un problema al eiminar la oferta.', 'error');
          });
      }
    });
  };

  const handleEditOffer = (offerId) => {
    const offerToEdit = offers.find(offer => offer._id === offerId);
    setUpdatedOffer(offerToEdit);
  };

  const handleUpdateOffer = () => {
    updateOffer(updatedOffer, updatedOffer._id)
      .then(response => {
        if (response) {
          getOffers(); // Refresh the offers list after updating
          setUpdatedOffer(null);
          Swal.fire('Actualizado', 'La oferta se ha actualizado.', 'success');
        } else {
          throw new Error('No se encuentra la oferta');
        }
      })
      .catch(error => {
        console.error('Error al actualizar la oferta:', error);
        Swal.fire('Error', 'Hay un problema al actualizar la oferta.', 'error');
      });
  };

  
return (
    <div className="min-h-screen px-1 pt-20">
      <div className="overflow-x-auto mt-2 w-4/5 mx-auto">
        <table className="min-w-full leading-normal shadow-md rounded-lg">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Nombre</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Precio</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Porcentaje</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) => (
              <tr key={index} className="bg-white hover:bg-green-100">
                <td className="px-5 py-2 border-b border-gray-200 ">{offer.name}</td>
                <td className="px-5 py-2 border-b border-gray-200 text-center">Q{offer.price}</td>
                <td className="px-5 py-2 border-b border-gray-200 text-center">{offer.percentage}%</td>
                <td className="px-5 py-2 border-b border-gray-200 text-center">
                <div className="flex justify-center">
                  <AiOutlineEdit className="text-green-500 hover:text-green-800 cursor-pointer" onClick={() => handleEditOffer(offer._id)} />
                  <AiOutlineDelete className="text-red-500 hover:text-red-800 cursor-pointer" onClick={() => handleDeleteOffer(offer._id)} />
                </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>

        {updatedOffer && (
          <div className="edit-wrapper p-4 mt-4 bg-white rounded shadow">
            <input className="p-2 m-2 bg-gray-100 rounded" placeholder="Name" value={updatedOffer.name || ''} onChange={(e) => setUpdatedOffer({ ...updatedOffer, name: e.target.value })} />
            <input className="p-2 m-2 bg-gray-100 rounded" placeholder="Price" value={updatedOffer.price || ''} onChange={(e) => setUpdatedOffer({ ...updatedOffer, price: e.target.value })} />
            <input className="p-2 m-2 bg-gray-100 rounded" placeholder="Percentage" value={updatedOffer.percentage || ''} onChange={(e) => setUpdatedOffer({ ...updatedOffer, percentage: e.target.value })} />
            <button type="button" onClick={handleUpdateOffer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );

};
