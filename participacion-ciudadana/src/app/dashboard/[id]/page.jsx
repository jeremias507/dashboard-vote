"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EditorOutput from "@/components/editor/Output";
import TotalVotaciones from "@/components/editor/TotalVotaciones";
import ModalVotingTable from "@/components/editor/ModalVotingTable";
import { useDocument } from "@/context/documentContext";

export default function OutputDashboardPage({ params }) {
  const { id } = params;
  const { documentOne } = useDocument();

  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [voters, setVoters] = useState([]); // Agregar estado para los votantes
  const router = useRouter();

  useEffect(() => {
    const fetchDocument = async () => {
      const doc = await documentOne(id);
      if (doc) {
        setData(doc);
        setVoters([
          { nombre: "Alice Johnson", cedula: "AJ001", inFavor: true },
          { nombre: "Bob Smith", cedula: "BS002", inFavor: false },
          { nombre: "Charlie Brown", cedula: "CB003", inFavor: true },
        ]);
      } else {
        throw new Error("No se encontró el documento.");
      }
    };
    fetchDocument();
  }, [id]);

  if (!data) {
    return <div>Cargando...</div>;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmPublication = () => {
    closeModal();
  };

  const handleCreateDocumentClick = () => {
    router.push("/dashboard/editor");
  };

  const handleViewVotersClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="relative mx-auto max-w-screen-md mb-10">
      {/* <div className="mb-3">
        <div className="flex gap-2 justify-end mb-4">
          <button
            onClick={handleCreateDocumentClick}
            className="px-4 py-2 bg-[#083ac5] text-white rounded hover:bg-[#0D369B]"
          >
            Crear Documento
          </button>
          <button
            onClick={handleViewVotersClick}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Ver Votantes
          </button>
        </div>
        <TotalVotaciones />
      </div> */}
     
      <div className="max-w-6xl">
        <EditorOutput content={data} />
      </div>
     <div className="absolute mt-3 mb-3 right-0">
     <Link
          href={"/output"}
          className="px-4 py-2 bg-[#28a745] text-white font-semibold rounded hover:bg-green-700 transition"
        >
          Ver Web
        </Link>
     </div>
     
      <ModalVotingTable
        isOpen={isModalOpen}
        onClose={closeModal}
        voters={voters}
      />
    </div>
  );
}
