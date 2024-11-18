import React from 'react'

export function ModalPublication({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Confirmar Publicacion</h3>
          <p className="mb-4">¿Estás seguro de que deseas Publicar este documento?</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-[#0046ef] text-white rounded hover:bg-blue-700"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  }
