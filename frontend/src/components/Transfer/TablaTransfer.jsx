import React, { useEffect } from 'react';
import { ClockLoader, PacmanLoader } from 'react-spinners';
import { UseGetTransfer } from '../../shared/hooks/useGetTransfer.jsx';
import { FaArrowUp, FaArrowDown, FaRegCommentDots, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const TablaTransfer = () => {
  const { transfer, isFetching, getTransfer } = UseGetTransfer();

  useEffect(() => {
    getTransfer();
  }, []);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClockLoader size={50} color={"#123abc"} />
      </div>
    );
  }

  if (!transfer || transfer.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PacmanLoader size={50} color={"#123abc"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-900 text-white py-4 px-6">
          <h2 className="text-2xl font-semibold text-center">Historial de Transferencias</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-center">De cuenta</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-center">A cuenta</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-center">Cantidad</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-center">Fecha</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-center">Comentario</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {transfer.map((transfer, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                  <td className="px-6 py-4 border-b border-gray-200 flex items-center justify-center">
                    <FaArrowUp className="text-green-500 mr-2" /> {transfer.fromAccount}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 flex items-center justify-center">
                    <FaArrowDown className="text-red-500 mr-2" /> {transfer.toAccount}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center font-semibold text-blue-700">
                    Q{transfer.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {new Date(transfer.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 flex items-center justify-center">
                    <FaRegCommentDots className="text-gray-500 mr-2" /> {transfer.comment}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {transfer.status === 'completed' ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaTransfer;
