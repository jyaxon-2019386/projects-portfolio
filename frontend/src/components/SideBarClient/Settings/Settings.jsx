import React, { useEffect, useState } from "react";
import { useGet } from "../../../shared/hooks/useGet";
import { useUpdateUser } from "../../../shared/hooks/useUpdateUser";
import { SideBar } from "../../SideBar/SideBar.jsx";
import { SideBarClient } from "../../SideBarClient/SideBarClient";
import { NavBar } from "../../SideBar/NavBar";
import Swal from 'sweetalert2';
import "./Settings.css";

const Settings = () => {
  const { settings, getSettings } = useGet();
  const { updateSettings } = useUpdateUser();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    dpi: "",
    address: "",
    phone: "",
    email: "",
    jobname: "",
    income: "",
    role: "",

  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      await getSettings();
      console.log(settings); // Agrega esto para verificar los datos obtenidos
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      setFormData({
        name: settings.name,
        username: settings.username,
        dpi: settings.dpi,
        address: settings.address,
        phone: settings.phone,
        email: settings.email,
        jobname: settings.jobname,
        income: settings.income,
        role: settings.role,

      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleEdit = async () => {
    if (isEditing) {
      if (!settings || !settings._id) {
        Swal.fire('Error', 'No se proporcionó un ID de usuario válido', 'error');
        return;
      }

      const response = await updateSettings(settings._id, formData);

      if (!response.error) {
        setIsEditing(false);
        Swal.fire('Actualizado', 'La configuración ha sido actualizada.', 'success');
      } else {
        Swal.fire('Error', 'Hubo un problema al actualizar la configuración.', 'error');
      }
    } else {
      setIsEditing(true);
    }
  };

  // Determine the Sidebar component based on the user role
  const SidebarComponent = settings?.role === 'ADMIN' ? SideBar : SideBarClient;

  return (
    <>
      <div className="bg-[#ffffff] min-h-screen">
        <NavBar className="fixed w-full top-0 bg-gray-700 text-white z-10" />
        <div className="flex h-screen bg-white">
          <SidebarComponent className="fixed top-16 w-1/4 bg-gray-800 text-white h-full" />
          <div className="container mx-auto p-4 py-20">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Configuración del Usuario</h2>
              {settings ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase border-b border-gray-300 bg-gray-100">Campo</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase border-b border-gray-300 bg-gray-100">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.keys(formData).map((key) => (
                        <tr key={key}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 font-semibold border-b border-gray-300 capitalize">{key}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-b border-gray-300">
                            <input
                              type={key === "income" ? "number" : "text"}
                              name={key}
                              value={formData[key]}
                              onChange={handleChange}
                              disabled={!isEditing || key === "dpi" || key === "role"}
                              className={`w-full p-2 border ${
                                !isEditing || key === "dpi" || key === "role"
                                  ? "bg-gray-100 cursor-not-allowed"
                                  : "bg-white"
                              } rounded-md`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500">Cargando configuración...</p>
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={toggleEdit}
                  className={`px-4 py-2 rounded-md text-white font-bold ${
                    isEditing ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isEditing ? "Guardar Cambios" : "Editar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;