import React, { useEffect, useState } from 'react';
import { useGetBuys } from '../../shared/hooks/useGetBuys';
import { ClipLoader } from 'react-spinners';
import { NavBar } from '../SideBar/NavBar';
import { SideBarClient } from '../SideBarClient/SideBarClient.jsx';
import './HistorialBuys.css';

export const HistorialBuys = () => {
    const { buys, isFetching, getBuys } = useGetBuys();
    const [selectedMonth, setSelectedMonth] = useState('');
    const [filteredBuys, setFilteredBuys] = useState([]);

    useEffect(() => {
        getBuys();
    }, []);

    useEffect(() => {
        if (selectedMonth && Array.isArray(buys)) {
            const filtered = buys.filter((item) => {
                const buyDate = new Date(item.date);
                const month = buyDate.getMonth() + 1;
                return month === parseInt(selectedMonth);
            });
            setFilteredBuys(filtered);
        } else {
            setFilteredBuys(buys);
        }
    }, [buys, selectedMonth]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'Fecha inválida' : date.toLocaleString();
    };

    if (isFetching) {
        return <ClipLoader color={"#123abc"} loading={true} size={150} />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-1 overflow-hidden">
                <SideBarClient />
                <div className="flex-1 overflow-y-auto bg-gray-900 py-20">
                    <div className="historial-container mx-auto w-full lg:w-3/4 xl:w-2/3">
                        <h1>Historial de Compras</h1>
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
                        {filteredBuys && filteredBuys.length > 0 ? (
                            <ul className="buys-list">
                                {filteredBuys.map((item) => (
                                    <li key={item._id} className="buy-item">
                                        <div className="buy-info">
                                            <div className="buy-header">
                                                <p><strong>Producto:</strong> {item.name}</p>
                                            </div>
                                            <div className="buy-body">
                                                <p><strong>Fecha:</strong> {formatDate(item.date)}</p>
                                                <p><strong>Monto:</strong> ${item.price}</p>
                                                <p><strong>Descuento:</strong> {item.percentage}%</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay compras disponibles para el mes seleccionado.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistorialBuys;
