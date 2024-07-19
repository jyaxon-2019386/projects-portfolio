// NavBar.jsx
import React, { useState, useEffect } from "react";
import { useGet } from "../../shared/hooks/useGet.jsx"; 
import Image from "../../assets/Logo-InvestmentCenter.png";
import { Link } from "react-router-dom";

export const NavBar = () => {
    const { settings, getSettings } = useGet();

    useEffect(() => {
        getSettings();
    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Aca pueden definir los enlaces que necesiten colocar
    const menus = [
        { name: "Settings", link: "/settings" },
        { name: "Sign out", link: "/" }
    ];

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-gray-800 text-white">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <a href="#" className="flex ms-2 md:me-24">
                                <img src={Image} className="h-8 me-3" alt="Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl">Investment Center</span>
                            </a>
                        </div>
                        <div className="relative flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="relative z-10 flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                aria-expanded={isMenuOpen ? "true" : "false"}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg" alt="User photo"/>
                            </button>
                            <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute right-0 top-full mt-1 w-48 bg-gray-800 text-white text-base z-50 float-left py-1 list-none text-left rounded shadow-lg min-w-48`}>
                                {settings && (
                                    <div className="px-4 py-2 text-sm text-gray-300">
                                        {settings.name}
                                    </div>
                                )}
                                {menus.map((menu, index) => (
                                    <Link key={index} to={menu.link} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white">
                                        {menu.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
