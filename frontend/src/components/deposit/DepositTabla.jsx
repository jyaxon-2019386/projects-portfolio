import React from 'react';

const DepositsTable = ({ deposits }) => {
  if (!deposits) return <p>Loading...</p>;
  if (deposits.length === 0) return <p>No deposits found.</p>;

  return (
    <div className="overflow-auto w-1/2 mx-auto" style={{ maxHeight: '400px' }}>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white sticky top-0">
          <tr>
            <th className="text-left py-3 px-4">Account Number</th>
            <th className="text-left py-3 px-4">Amount</th>
            <th className="text-left py-3 px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((deposit) => (
            <tr key={deposit._id} className="border-b">
              <td className="text-left py-3 px-4">{deposit.accountNumber}</td>
              <td className="text-left py-3 px-4">{deposit.amount}</td>
              <td className="text-left py-3 px-4">{new Date(deposit.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepositsTable;

