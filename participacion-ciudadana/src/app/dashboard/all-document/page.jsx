  "use client";

  import React from "react";
  import CardDocument from "@/components/editor/CardDocument";
  import { useDocument } from "@/context/documentContext";
  import { FaFileAlt } from "react-icons/fa";

  export default function AllDocumentPage() {
    const { data } = useDocument();

    if (data.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-72">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaFileAlt className="text-gray-400 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">
              No hay documentos creados
            </h2>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1 className="text-2xl font-semibold mb-6 ">Propuestas Ciudadanas</h1>
        {data.map((item, index) => (
          <CardDocument
            key={index}
            id={item._id}
            Title={item.title}
            ruta={`/dashboard/${item._id}`}
            createdAt={item.createdAt}
            category={item.category}
            direction={item.direction}
            responsible={item.responsible}
            published={item.published}
            code={item.code}
          />
        ))}
      </div>
    );
  }
