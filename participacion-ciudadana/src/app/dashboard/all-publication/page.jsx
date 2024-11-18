"use client";
import CardPublication from "@/components/editor/CardPublication";
import { useDocument } from "@/context/documentContext";
import { FaFileAlt } from "react-icons/fa";

export default function AllPublicationPage() {

const {publications}= useDocument()

if (publications.length === 0) {
  return (
    <div className="flex items-center justify-center min-h-72">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <FaFileAlt className="text-gray-400 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          No hay Propuestas Publicadas
        </h2>
      </div>
    </div>
  );
}

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 ">Propuestas Publicadas</h1>
      <div className="grid grid-cols-2 gap-4">
       {
        publications.map((item,index) => ( 
          <CardPublication
          key={index}
          titulo={item.title}
          fecha={item.createdAt}
          code={item.code}
          id={item._id}
        />
        ))
       }
      </div>
    </div>
  );
}
