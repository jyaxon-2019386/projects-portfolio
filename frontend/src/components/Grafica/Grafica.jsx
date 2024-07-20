import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useGetGrafica } from '../../shared/hooks/useGetGrafica';
import { NavBar } from '../SideBar/NavBar';
import { SideBar } from '../SideBar/SideBar';

export const Grafica = () => {
  const { offers, isFetching, error, getOffers } = useGetGrafica();
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    if (!offers || !Array.isArray(offers) || offers.length === 0 || !chartContainer.current) {
      return;
    }

    const labels = offers.map(offer => offer.name);
    const data = offers.map(offer => offer.userCount);

    const ctx = chartContainer.current.getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Número de Usuarios',
          data: data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#66FF99',
            '#FF99FF',
            '#3399FF',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#66FF99',
            '#FF99FF',
            '#3399FF',
          ],
        }],
      },
      options: {
        maintainAspectRatio: false,
      },
    });

    setChartInstance(newChartInstance);

  }, [offers]);

  // Manejo de errores
  useEffect(() => {
    if (error) {
      console.error('Error fetching offers:', error);
      // Aquí podrías mostrar una notificación de error utilizando `toast` u otra librería
    }
  }, [error]);

  return (
    <div className="bg-[#ffffff] min-h-screen">
      <NavBar className="fixed w-full top-0 bg-gray-700 text-white z-10" />
      <div className="flex h-screen bg-white">
        <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-50' : 'ml-12'} flex items-center justify-center`}>
          <div className="w-full lg:w-2/3 p-4">
            <h1 className="text-center py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Ofertas más Recogidas
            </h1>
            <div className="grafica py-5">
              {isFetching ? (
                <p>Cargando ofertas...</p>
              ) : error ? (
                <p>Error al obtener ofertas</p>
              ) : (
                <canvas ref={chartContainer} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grafica;