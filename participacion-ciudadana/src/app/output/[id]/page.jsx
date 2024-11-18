"use client";

import EditorOutput from "@/components/editor/Output";
import { useState, useEffect } from "react";
import Component from "@/components/editor/Header";
import { VotingComponent } from "@/components/editor/VotingComponent";
import { useDocument } from "@/context/documentContext";

export default function Outputpage({ params }) {
  const { onePublication, dataPublication, userDate } = useDocument();
  const { id } = params;

  const handlePublicacion = async () => {
    try {
      await onePublication(id);
    } catch (error) {
      throw new Error(`Error fetching publication`);
    }
  };

  useEffect(() => {
    handlePublicacion();
  }, [id]);

  return (
    <div className="bg-[#f4f6f7]">
      <Component />
      <div className="mx-auto max-w-6xl h-full mt-10">
        {dataPublication ? (
          <EditorOutput content={dataPublication} />
        ) : (
          <div>Cargando...</div>
        )}
      </div>
      
      <VotingComponent endTime={userDate ? userDate : undefined} />
    </div>
  );
}
