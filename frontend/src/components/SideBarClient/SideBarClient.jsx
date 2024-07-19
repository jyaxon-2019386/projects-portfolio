import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import { Link } from "react-router-dom";

export const SideBarClient = () => {
  const menus = [
    { name: "Home", link: "/dashboardClient", icon: MdOutlineDashboard },
    { name: "Offer", link: "/offers", icon: FiShoppingCart },
    { name: "Transfer", link: "/Transfer", icon: FaMoneyBillAlt, margin: true },
    { name: "Historial", link: "/historial", icon: FaMoneyBillAlt, margin: true},
  ];

  const [open, setOpen] = useState(true);
  const [historialOpen, setHistorialOpen] = useState(false);

  return (
    <section className="flex gap-8">
      <div
        className={`bg-gray-800 min-h-screen ${
          open ? "w-50" : "w-12"
        } duration-300 text-gray-100 px-2 fixed top-0 h-full transition-all`}
      >
        <div className="py-16 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-2 flex flex-col gap-2 relative">
          {menus?.map((menu, i) => (
            <div key={i} className={`${menu?.margin && "mt-5"}`}>
              {menu?.submenus ? (
                <div>
                  <button
                    onClick={() => setHistorialOpen(!historialOpen)}
                    className="flex items-center w-full p-2 text-sm font-medium text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                    <span className={`flex-1 ms-3 text-left rtl:text-right whitespace-nowrap transition-all ${!open && "hidden"}`}>
                      {menu.name}
                    </span>
                    <svg
                      className={`w-3 h-3 transition-transform ${historialOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  <div
                    className={`pl-6 mt-2 space-y-2 transition-all duration-300 overflow-hidden ${
                      historialOpen ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    {menu.submenus.map((submenu, index) => (
                      <Link
                        to={submenu.link}
                        key={index}
                        className="block p-2 text-sm text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        {submenu.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={menu?.link}
                  className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md transition-all`}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{ transitionDelay: `${i + 3}00ms` }}
                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {menu?.name}
                  </h2>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
