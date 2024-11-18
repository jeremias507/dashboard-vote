"use client";

import { useState } from "react";
import { DateSelector } from "./DateSelector";

export default function CardPublication({ titulo, fecha, code,id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleActivarVotacion = () => {
    setIsModalOpen(true);
    console.log("Activar votación para:", titulo);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <span className="text-sm text-gray-600">Code: {code}</span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-900">{titulo}</h2>
          <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
            Publicado
          </span>
        </div>
        <div className="flex justify-between items-center">
          <time
            className="text-sm text-gray-500 flex items-center"
            dateTime={fecha}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            {formatearFecha(fecha)}
          </time>
          <button
            onClick={handleActivarVotacion}
            className="px-4 py-2 text-sm font-medium text-white bg-[#083ac5] hover:bg-blue-700 rounded-md transition-colors duration-300 focus:outline-none"
          >
            Activar votación
          </button>
        </div>
      </div>

      {/* Aquí está el modal */}
      <DateSelector isOpen={isModalOpen} onClose={handleCloseModal} id={id} />
    </div>
  );
}
