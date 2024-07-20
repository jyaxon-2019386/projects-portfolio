import React, { useState } from "react";
import { NavBar } from "../SideBar/NavBar";
import { SideBar } from "../SideBar/SideBar";
import { useSaveOffer } from "../../shared/hooks/useSaveOffer";
import toast from "react-hot-toast";
import { TablaOffer } from "./TableOffer";

export const OfferForm = () => {
  const { add, isLoading } = useSaveOffer();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    percentage: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name === "") {
      return toast.error('El nombre no puede quedar vacío');
    }

    // Validate if price or percentage is negative
    if (formData.price < 0 || formData.percentage < 0) {
      return toast.error('El precio y el porcentaje no pueden ser negativos');
    }

    console.log('Submitting form data:', formData);

    try {
      await add(formData.name, formData.price, formData.percentage);
      toast.success('Oferta guardada exitosamente');
      setFormData({
        name: "",
        price: "",
        percentage: ""
      });
    } catch (error) {
      toast.error('No se ha podido guardar. Intentar de nuevo.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex h-screen bg-white">
        <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className={`transition-all duration-300 flex-1 ${sidebarOpen ? 'ml-50' : 'ml-12'} flex flex-row`}>
          <div className="w-2/3 p-4">
            <TablaOffer /> {/* Pass offers as props if needed */}
          </div>
          <div className="w-1/3 p-4 flex justify-center items-center">
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre de la oferta
                </label>
                <div className= "w-2/3 relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className=" block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Escribe aquí..."
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Precio
                </label>
                <div className="w-2/3 relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">Q</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                  <div className="w-2/3 absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">Precio</label>
                    <select
                      id="currency"
                      name="currency"
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option>GTQ</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">
                  Porcentaje de descuento
                </label>
                <div className="w-2/3 relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                  <input
                    name="percentage"
                    id="percentage"
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0"
                    value={formData.percentage}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="content-center relative mt-2 rounded-md shadow-sm flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  type="submit"
                  disabled={isLoading}
                >
                  Guardar Oferta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferForm;