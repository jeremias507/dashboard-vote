import React from "react";

// Componentes de tabla personalizados (puedes ajustarlos si es necesario)
export function Table({ children }) {
  return (
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
      {children}
    </table>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-blue-600 text-white">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-300">{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="transition-colors duration-300 hover:bg-blue-50">{children}</tr>;
}

export function TableHead({ children }) {
  return (
    <th className="p-4 text-left font-semibold uppercase tracking-wider text-white bg-blue-600">{children}</th>
  );
}

export function TableCell({ children }) {
  return (
    <td className="p-4 text-gray-800 border-b border-gray-300 bg-gray-50">{children}</td>
  );
}

// Componente de tabla para el modal
export default function ModalVotingTable({ isOpen, onClose, voters }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-3xl"
        >
          &times;
        </button>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cédula</TableHead>
                <TableHead>Votación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voters.map((voter) => (
                <TableRow key={voter.cedula}>
                  <TableCell>{voter.nombre}</TableCell>
                  <TableCell>{voter.cedula}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        voter.inFavor
                          ? "bg-green-300 text-green-900"
                          : "bg-red-300 text-red-900"
                      }`}
                    >
                      {voter.inFavor ? "A Favor" : "En Contra"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
