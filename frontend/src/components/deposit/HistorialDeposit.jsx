import React, { useEffect, useState } from 'react';
import { useGetDeposit } from '../../shared/hooks/useGetDeposit';
import { ClipLoader } from 'react-spinners';
import { NavBar } from '../SideBar/NavBar';
import { SideBar } from '../SideBar/SideBar';
import './Deposit.css';

export const HistorialDepositos = () => {
    const { deposit, isFetching, getDeposit } = useGetDeposit();
    const [selectedMonth, setSelectedMonth] = useState('');
    const [filteredDeposits, setFilteredDeposits] = useState([]);

    useEffect(() => {
        getDeposit();
    }, []);

    useEffect(() => {
        if (selectedMonth) {
            const filtered = deposit.filter((item) => {
                const depositDate = new Date(item.date);
                const month = depositDate.getMonth() + 1;
                return month === parseInt(selectedMonth);
            });
            setFilteredDeposits(filtered);
        } else {
            setFilteredDeposits(deposit);
        }
    }, [deposit, selectedMonth]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    if (isFetching) {
        return <ClipLoader color={"#123abc"} loading={true} size={150} />;
    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <div className="flex flex-1 overflow-hidden">
                    <SideBar />
                    <div className="flex-1 overflow-y-auto bg-gray-900 py-20">
                        <div className="historial-container">
                            <h1>Historial de Depósitos</h1>
                            <div className="filter-container">
                                <label htmlFor="monthFilter">Seleccionar Mes:</label>
                                <select id="monthFilter" onChange={handleMonthChange} value={selectedMonth}>
                                    <option value="">Todos los Meses</option>
                                    <option value="1">Enero</option>
                                    <option value="2">Febrero</option>
                                    <option value="3">Marzo</option>
                                    <option value="4">Abril</option>
                                    <option value="5">Mayo</option>
                                    <option value="6">Junio</option>
                                    <option value="7">Julio</option>
                                    <option value="8">Agosto</option>
                                    <option value="9">Septiembre</option>
                                    <option value="10">Octubre</option>
                                    <option value="11">Noviembre</option>
                                    <option value="12">Diciembre</option>
                                </select>
                            </div>
                            {filteredDeposits && filteredDeposits.length > 0 ? (
                                <ul className="deposit-list">
                                    {filteredDeposits.map((item) => (
                                        <li key={item._id} className="deposit-item">
                                            <div className="deposit-info">
                                                <div className="deposit-header">
                                                    <p><strong>Cuenta:</strong> {item.accountNumber}</p>
                                                </div>
                                                <div className="deposit-body">
                                                    <p><strong>Fecha:</strong> {new Date(item.date).toLocaleString()}</p>
                                                    <p><strong>Monto:</strong> ${item.amount}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay depósitos disponibles para el mes seleccionado.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistorialDepositos;
