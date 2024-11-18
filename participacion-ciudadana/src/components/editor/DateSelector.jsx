
import React, { useState } from 'react';
import { activateVoteRequest } from '@/api/votacion';
export  function DateSelector({ isOpen, onClose,id }) {
  const [selectedOption, setSelectedOption] = useState('custom');
  const [customDate, setCustomDate] = useState('');
  const [confirmedDate, setConfirmedDate] = useState('');
  const [data, setData] = useState([])
  

  if (!isOpen) return null;

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (value === 'today') {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      setCustomDate(today.toISOString().split('T')[0]);
      setConfirmedDate(formattedDate);
    }
  };

  const handleDateChange = (e) => {
    setCustomDate(e.target.value);
    setSelectedOption('custom');
  };

  const handleCancel = () => {
    setSelectedOption('custom');
    setCustomDate('');
    setConfirmedDate('');
    onClose();
  };

  const handleAccept = async () => {
    const isoDate = customDate.split('-').reverse().join('-'); 
    setConfirmedDate(customDate); 
    const response = await activateVoteRequest({ votedate: isoDate, id: id }); 

    if (response.status === 200) {
        alert(`Votación activada, con fecha ${confirmedDate} elegida`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  z-50 flex items-center justify-center p-6 shadow-sm">
      <div className="text-black p-10 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold mb-4 flex items-center justify-center">Fecha de votaciones</h2>
        <p className='text-center'>Seleccione la fecha para activar las votaciones.</p>
        
        <div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="custom"
              value="custom"
              checked={selectedOption === 'custom'}
              onChange={handleOptionChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
            />
            <label htmlFor="custom" className="ml-2">Fecha personalizada:</label>
            <input
              type="date"
              value={customDate}
              onChange={handleDateChange}
              className="ml-2 border-solid border-2 border-gray-300 rounded-md"
              disabled={selectedOption !== 'custom'}
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              id="today"
              value="today"
              checked={selectedOption === 'today'}
              onChange={handleOptionChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
            />
            <label htmlFor="today" className="ml-2">Establecer fecha de hoy.</label>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={handleCancel}
            className="text-gray-700 font-bold py-2 px-4 rounded-full border border-gray-300 bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleAccept}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Aceptar
          </button>
        </div>
        {confirmedDate && (
          <div className="mt-4 p-2 bg-green-100 rounded">
            <p>Fecha confirmada: {confirmedDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}
