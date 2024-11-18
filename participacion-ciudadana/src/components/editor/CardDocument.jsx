import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ModalDelete } from "./modalDelete";
import { ModalPublication } from "./modalPublication";
import { useDocument } from "@/context/documentContext";

export default function CardDocument({
  Title,
  ruta,
  id,
  createdAt,
  category,
  direction,
  responsible,
  published: initialPublished,
  code
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublicationModalOpen, setIsPublicationModalOpen] = useState(false);
  const [published, setPublished] = useState(initialPublished);

  const { deleteDocument, publicationDocument, unpublishDocument } = useDocument();

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleteModalOpen(false);
      await new Promise((resolve) => setTimeout(resolve, 300));
      await deleteDocument(id);
      alert("Documento Eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
    }
  };

  const handleConfirmPublication = async () => {
    try {
      setIsPublicationModalOpen(false);
      await publicationDocument({ documentId: id });
      setPublished(true); 
    } catch (error) {
      console.error("Error al publicar el documento:", error);
    }
  };

  const handleConfirmUnpublication = async () => {
    try {
      setIsPublicationModalOpen(false);
      const response = await unpublishDocument({ documentId: id });
      if (response.status === 200) {
        setPublished(false); // Actualiza el estado published a false
      }
    } catch (error) {
      console.error("Error al retirar la publicación:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenPublicationModal = () => {
    setIsPublicationModalOpen(true);
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mb-5">
      <div className="p-4 border-b border-gray-200">
        <span className="text-sm text-gray-600">Code: {code}</span>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-black text-xl font-bold mb-2">{Title}</h3>
            <time className="text-sm text-gray-500 dark:text-gray-400 flex items-center" dateTime={createdAt}>
              {formatearFecha(createdAt)}
            </time>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-semibold">Categoría:</span> {category}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-semibold">Dirección:</span> {direction}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Responsable:</span> {responsible}
            </p>
          </div>
          <div>
            {published ? (
              <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                Publicado
              </span>
            ) : (
              <span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                No Publicado
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            href={ruta}
          >
            Ver documento
          </Link>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDeleteClick}
              className="flex items-center justify-center gap-2 text-white px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
              aria-label="Eliminar documento"
            >
              Eliminar
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
              aria-label="Editar documento"
            >
              Editar
            </button>
            {published ? (
              <button
                onClick={handleConfirmUnpublication}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                aria-label="Retirar Publicación"
              >
                Retirar Publicación
              </button>
            ) : (
              <button
                onClick={handleOpenPublicationModal}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                aria-label="Publicar documento"
              >
                Publicar
              </button>
            )}
          </div>
        </div>
      </div>
      <ModalDelete
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
      <ModalPublication
        isOpen={isPublicationModalOpen}
        onClose={() => setIsPublicationModalOpen(false)}
        onConfirm={published ? handleConfirmUnpublication : handleConfirmPublication}
      />
    </div>
  );
}
