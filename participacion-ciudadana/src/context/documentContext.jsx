"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { documentAllRequest } from "@/api/editor";
import { documentRequest } from "@/api/editor";
import { documentOneRequest } from "@/api/editor";
import { deleteRequest } from "@/api/editor";
import { publicationRequest } from "@/api/editor";
import { publicationAllRequest } from "@/api/editor"; 
import { OnePublicationRequest } from "@/api/editor";

const DocumentContext = createContext();

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context)
    throw new Error("useDocument must be used within an AuthProvider");
  return context;
};

export const DocumentProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [publications,setPublications]=useState([]);
  const [userDate, setUserDate] = useState(null);
  const [dataPublication, setDataPublication] = useState(null);
  
  const documentAll = async () => {
    try {
      const response = await documentAllRequest();
      setData(response.data.data);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
    }
  };

  const createDocument = async (payload) => {
    try {
      const response = await documentRequest(payload);
      if (response.status === 201) {
        alert("Documento guardado con éxito");
        await documentAll();
      } else {
        console.error("Error al guardar el documento:", response.statusText);
        alert("Hubo un error al guardar el documento.");
      }
    } catch (error) {
      console.error("Error al guardar el documento:", error);
      alert("Hubo un error al guardar el documento.");
    }
  };

  const documentOne = async (id) => {
    try {
      const response = await documentOneRequest(id);
      return response.data.data.content;
    } catch (error) {
      console.error("Error al obtener el documento:", error);
      return null;
    }
  };

  const deleteDocument= async (id) => {
    try {
      const response = await deleteRequest(id);
      if (response.status === 200) {
        await documentAll();
      } else {
        console.error("Error al guardar el documento:", response.statusText);
        alert("Hubo un error al guardar el documento.");
      }
      await documentAll()
    } catch (error) {
      console.error("Error al obtener el documento:", error);
      return null;
    }
  };

  const publicationDocument= async (payload)=>{
    try {
       const response = await publicationRequest(payload);
       if(response.status === 200){
        alert("Documento Publicado con éxito");
        await publicationAll();
       } else {
        console.error("Error al guardar el documento:", response.statusText);
        alert("Hubo un error al guardar el documento.");
      }
    } catch (error) {
      console.error("Error al publicar el documento:", error);
      return null;
    }
  }

  const publicationAll = async () => {
    try {
      const response = await publicationAllRequest();
      setPublications(response.data.data)
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
    }
  };

  const onePublication = async (id) => {
    try {
      const response = await OnePublicationRequest(id);
      setDataPublication(response.data.data.publicacionResponse.content); 

      const date = new Date(response.data.data.voteResponse.voteDate).toLocaleDateString('en-US',{timeZone: 'UTC',})

      setUserDate(date)
    } catch (error) {
      console.error("Error fetching publication:", error);
    }
  };
  useEffect(() => {
    documentAll();
    publicationAll();
  }, []);

  return (
    <DocumentContext.Provider value={{ data, documentAll, createDocument, documentOne, deleteDocument,publicationDocument,publicationAll,publications, onePublication,dataPublication,userDate}}>
      {children}
    </DocumentContext.Provider>
  );
};
