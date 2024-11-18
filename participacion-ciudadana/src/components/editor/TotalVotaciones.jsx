"use client"

export default function TotalVotaciones  ({ votosAFavor = 0, votosEnContra = 0 }){
    return (
      <div className="p-4 bg-gray-200 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800">Total de Votaciones</h1>
        <div className="mt-4 flex justify-between gap-2 ">
          <div className="w-1/2 p-2 bg-white rounded-lg shadow-sm border border-gray-200    ">
            <h2 className="text-lg font-semibold text-gray-700">Votaciones a Favor</h2>
            <p className="text-xl font-bold text-green-600 mt-2">{votosAFavor}</p>
          </div>
          <div className="w-1/2 p-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Votaciones en Contra</h2>
            <p className="text-xl font-bold text-red-600 mt-2">{votosEnContra}</p>
          </div>
        </div>
      </div>
    );
  };
  
