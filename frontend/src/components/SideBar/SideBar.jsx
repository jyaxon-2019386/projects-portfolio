import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { LuUserPlus2 } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import '../SideBar/styles5.css'; // Asegúrate de importar el archivo CSS con la animación

export const SideBar = () => {
  const menus = [
    { name: "Home", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Cuenta", link: "/account", icon: LuUserPlus2 },
    { name: "Registrar", link: "/registerClient", icon: AiOutlineUser },
    { name: "Análisis", link: "/grafica", icon: TbReportAnalytics, margin: true },
    { name: "Oferta", link: "/offersAdmin", icon: FiShoppingCart },
    { name: "Agregar Oferta", link: "/offer", icon: MdOutlineAddShoppingCart },
    { name: "Deposito", link: "/depositoClient", icon: FaMoneyBillTransfer },
  ];

  // Recuperar el estado del sidebar desde localStorage
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-open");
    return saved === "true" ? true : false;
  });

  useEffect(() => {
    // Guardar el estado del sidebar en localStorage
    localStorage.setItem("sidebar-open", open);
  }, [open]);

  return (
    <section className="flex">
      <div
        className={`sidebar ${open ? 'open' : 'closed'} bg-gray-800`}
      >
        <div className="py-16 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer text-white" // Color del icono
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-2 flex flex-col gap-2 relative">
          {menus.map((menu, i) => (
            <Link
              to={menu.link}
              key={i}
              className={`${
                menu.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md transition-all`} // Cambiado el color de fondo al pasar el ratón
            >
              <div className="text-white">{React.createElement(menu.icon, { size: "20" })}</div> {/* Color de los iconos */}
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                } text-white`} 
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-800 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <main className={`main-content ${open ? 'shifted' : ''} p-4`}>
        {/* Aquí va el contenido principal de la página */}
      </main>
    </section>
  );
};
