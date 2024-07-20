import React from 'react';
import { useNavigate } from 'react-router-dom';
import './notpage.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      navigate('/dashboard');
    } else if (role === 'USER') {
      navigate('/dashboardClient');
    }
  };

  return (
    <section className="fondo">
      <div className="text rounded-box bg-black bg-opacity-50  border-black rounded-lg py-10 px-10">
        <div>ERROR</div>
        <h1>404</h1>
        <hr />
        <div className='py-2'>
          <button 
            onClick={handleReturnHome} 
            className="shadow-[inset_0_0_0_2px_#000000] text-white px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#1b1d1f] hover:text-white dark:text-neutral-200 transition duration-200">
            Regresa al Home
          </button>
        </div>
        <div>Page Not Found</div>
      </div>
      <div className="ladron">
        <img
          src="https://images.vexels.com/media/users/3/127786/isolated/preview/0a633855c250798d3ab1b2dbfe28f18e-historieta-divertida-profesion-de-ladron.png"
          alt="Ladrón"
          className="src"
        />
      </div>
    </section>
  );
};
