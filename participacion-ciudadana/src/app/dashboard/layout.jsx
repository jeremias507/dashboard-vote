"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaBell,
  FaUser,
  FaHome,
  FaClipboardList,
  FaUsers,
  FaComments,
  FaCog,
  FaSearch,
  FaBars,
  FaPencilAlt,
  FaMoon,
  FaSun,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useDocument } from "@/context/documentContext";

export default function Dashboard({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState("Escribir");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const { newDocumentCount } = useDocument();

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const getLinkClass = (linkName) => {
    const baseClass = `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200`;
    const activeClass = isDarkMode
      ? "text-blue-400 bg-blue-900"
      : "text-blue-600 bg-blue-100";
    const inactiveClass = isDarkMode
      ? "text-gray-300 hover:bg-gray-700"
      : "text-gray-700 hover:bg-gray-200";

    return `${baseClass} ${
      activeLink === linkName ? activeClass : inactiveClass
    }`;
  };

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`hidden md:flex md:flex-col gap-4 ${
          isSidebarCollapsed ? "md:w-45 " : "md:w-64"
        } ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-r fixed h-screen overflow-y-auto transition-all duration-300`}
      >
        <div
          className={`flex items-center justify-between h-16 px-4 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border-b`}
        >
          {!isSidebarCollapsed && (
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-lg"
            >
              <FaUsers
                className={`h-6 w-6 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <span>Participación Ciudadana</span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className={`p-2 ${
              isDarkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-200"
            } rounded-lg`}
          >
            {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2 ">
            <li>
              <Link
                href="/dashboard"
                className={getLinkClass("Inicio")}
                onClick={() => handleLinkClick("Inicio")}
              >
                <FaHome className="h-5 w-5" />
                {!isSidebarCollapsed && <span>Inicio</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/editor"
                className={getLinkClass("Escribir")}
                onClick={() => handleLinkClick("Escribir")}
              >
                <FaPencilAlt className="h-5 w-5" />
                {!isSidebarCollapsed && <span>Escribir</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/all-document"
                className={getLinkClass("Mis Documentos")}
                onClick={() => handleLinkClick("Mis Documentos")}
              >
                <FaClipboardList className="h-5 w-5" />
                {!isSidebarCollapsed && <span>Mis Documentos</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/all-publication"
                className={getLinkClass("Publicados")}
                onClick={() => handleLinkClick("Publicados")}
              >
                <FaCheckCircle className="h-5 w-5" />
                {!isSidebarCollapsed && <span>Publicados</span>}
              </Link>
            </li>
          </ul>
        </nav>
        {!isSidebarCollapsed && (
          <div
            className={`p-4 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            } border-t`}
          >
            <div
              className={`${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } p-4 rounded-lg`}
            >
              <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
        } flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <header
          className={`${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border-b h-16 flex items-center px-4 fixed top-0 right-0 left-0 ${
            isSidebarCollapsed ? "md:left-16" : "md:left-64"
          } z-10 transition-all duration-300`}
        >
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-2 mr-2 ${
              isDarkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-200"
            } rounded-lg`}
          >
            <FaBars className="h-6 w-6" />
          </button>
          <div className="flex-1 relative">
            <FaSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <input
              type="search"
              placeholder="Buscar Propuestas..."
              className={`w-full md:w-2/3 lg:w-1/3 pl-10 pr-4 py-2 border border-gray-300 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button
            onClick={toggleDarkMode}
            className={`mr-4 p-2 ${
              isDarkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-600"
            } rounded-full`}
          >
            {isDarkMode ? (
              <FaSun className="h-5 w-5" />
            ) : (
              <FaMoon className="h-5 w-5" />
            )}
          </button>
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaUser
                className={`h-5 w-5 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </button>
            {isUserMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow-lg py-1 z-20`}
              >
                <Link
                  href="#"
                  className={`block px-4 py-2 ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Ver perfil
                </Link>
                <hr
                  className={`my-1 ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                />
                <Link
                  href="#"
                  className={`block px-4 py-2 ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Cerrar sesión
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 mt-16">
          <div
            className={`${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border rounded-lg p-5 `}
          >
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 md:hidden">
          <div
            className={`fixed inset-y-0 left-0 w-64 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } p-4 overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-lg"
              >
                <FaUsers
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <span>Participación Ciudadana</span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className={`p-2 ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-200"
                } rounded-lg`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard"
                    className={getLinkClass("Inicio")}
                    onClick={() => handleLinkClick("Inicio")}
                  >
                    <FaHome className="h-5 w-5" />
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/editor"
                    className={getLinkClass("Escribir")}
                    onClick={() => handleLinkClick("Escribir")}
                  >
                    <FaPencilAlt className="h-5 w-5" />
                    Escribir
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/all-document"
                    className={getLinkClass("Mis Documentos")}
                    onClick={() => handleLinkClick("Mis Documentos")}
                  >
                    <FaClipboardList className="h-5 w-5" />
                    Mis Documentos
                    <span className="ml-auto bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {newDocumentCount}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className={getLinkClass("Publicados")}
                    onClick={() => handleLinkClick("Publicados")}
                  >
                    <FaCheckCircle className="h-5 w-5" />
                    Publicados
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
