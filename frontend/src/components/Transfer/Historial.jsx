import React, { useEffect, useState } from 'react';
import { UseGetTransfer } from '../../shared/hooks/useGetTransfer.jsx';
import { useGetDeposit } from '../../shared/hooks/useGetDeposit.jsx';
import { useGetBuys } from '../../shared/hooks/useGetBuys.jsx';
import { ClipLoader } from 'react-spinners';
import { NavBar } from '../SideBar/NavBar.jsx';
import { SideBarClient } from '../SideBarClient/SideBarClient.jsx';
import './Historial.css';

export const Historial = () => {
  const { transfer, isFetching: isFetchingTransfer, getTransfer } = UseGetTransfer();
  const { deposit, isFetching: isFetchingDeposit, getDeposit } = useGetDeposit();
  const { buys, isFetching: isFetchingBuys, getBuys } = useGetBuys();

  const [selectedType, setSelectedType] = useState('todo');

  useEffect(() => {
    getTransfer();
    getDeposit();
    getBuys();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const renderList = () => {
    const renderTransferList = () => (
      transfer && transfer.length > 0 ? (
        <ul className="item-list">
          {transfer.map((trans, index) => (
            <li key={index} className={`list-item ${trans.type === 'sent' ? 'transfer-item sent' : 'transfer-item received'}`}>
              <div className="item-info">
                <div className="item-header">
                  <p><strong>Estado:</strong> {trans.status}</p>
                </div>
                <div className="item-body">
                  <p><strong>Cuenta de origen:</strong> {trans.fromAccount}</p>
                  <p><strong>Cuenta de destino:</strong> {trans.toAccount}</p>
                  <p><strong>Monto:</strong> {trans.amount}</p>
                  <p><strong>Fecha:</strong> {new Date(trans.date).toLocaleDateString()}</p>
                  {trans.type === 'sent' ? (
                    <p><strong>Tipo:</strong> Enviada</p>
                  ) : (
                    <p><strong>Tipo:</strong> Recibida</p>
                  )}
                </div>
                <div className="item-footer">
                  {trans.tags && trans.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={`item-tag ${tag === 'important' ? 'special' : ''}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay transferencias disponibles.</p>
      )
    );

    const renderDepositList = () => (
      deposit && deposit.length > 0 ? (
        <ul className="item-list">
          {deposit.map((item, index) => (
            <li key={index} className="list-item deposit-item">
              <div className="item-info">
                <div className="item-header"></div>
                <div className="item-body">
                  <p><strong>Cuenta:</strong> {item.accountNumber}</p>
                  <p><strong>Fecha:</strong> {new Date(item.date).toLocaleString()}</p>
                  <p><strong>Monto:</strong> ${item.amount}</p>
                </div>
                <div className="item-footer">
                  {item.tags && item.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={`item-tag ${tag === 'important' ? 'special' : ''}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay depósitos disponibles.</p>
      )
    );

    const renderPurchaseList = () => (
      buys && buys.length > 0 ? (
        <ul className="item-list">
          {buys.map((item, index) => (
            <li key={index} className="list-item purchase-item">
              <div className="item-info">
                <div className="item-header">
                  <p><strong>Producto:</strong> {item.name}</p>
                </div>
                <div className="item-body">
                  <p><strong>Fecha:</strong> {new Date(item.date).toLocaleDateString()}</p>
                  <p><strong>Monto:</strong> ${item.price}</p>
                  <p><strong>Descuento:</strong> {item.percentage}%</p>
                </div>
                <div className="item-footer">
                  {item.tags && item.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={`item-tag ${tag === 'important' ? 'special' : ''}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay compras disponibles.</p>
      )
    );

    switch (selectedType) {
      case 'transfer':
        return renderTransferList();
      case 'deposit':
        return renderDepositList();
      case 'purchase':
        return renderPurchaseList();
      case 'todo':
        return (
          <>
            {renderTransferList()}
            {renderDepositList()}
            {renderPurchaseList()}
          </>
        );
      default:
        return null;
    }
  };

  if (isFetchingTransfer || isFetchingDeposit || isFetchingBuys) {
    return <ClipLoader color={"#123abc"} loading={true} size={150} />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex flex-1 overflow-hidden">
          <SideBarClient />
          <div className="flex-1 overflow-y-auto bg-gray-900 py-20 flex justify-center items-center">
            <div className="historial-container w-full max-w-3xl">
              <h1>Historial</h1>
              <div className="filter-container">
                <label htmlFor="typeFilter">Seleccionar Tipo:</label>
                <select id="typeFilter" onChange={handleTypeChange} value={selectedType}>
                  <option value="todo">Todo</option>
                  <option value="transfer">Transferencias</option>
                  <option value="deposit">Depósitos</option>
                  <option value="purchase">Compras</option>
                </select>
              </div>
              {renderList()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Historial;