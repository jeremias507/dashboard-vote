"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useDocument } from "@/context/documentContext"

export default function Editor() {
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [documentName, setDocumentName] = useState("")
  const [category, setCategory] = useState("")
  const [direction, setDirection] = useState("")
  const [responsible, setResponsible] = useState("")
  const { createDocument } = useDocument()

  const categories = ["Categoría 1", "Categoría 2", "Categoría 3", "Categoría 4"]

  const handleSubmit = async (payload) => {
    if (!documentName || !category || !direction || !responsible) {
      alert("No se puede guardar, asegúrese de que todos los campos estén completos.");
      return; 
    }

    const updatedData = {
      title: documentName,
      category: category,
      direction: direction,
      responsible: responsible,
      content: payload,
    }
    await createDocument(updatedData)
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleAccept = () => {
    console.log("Document name:", documentName)
    console.log("Category:", category)
    console.log("Direction:", direction)
    console.log("Responsible:", responsible)
    closeModal()
    save()
  }

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const ImageTool = (await import("@editorjs/image")).default
    const Marker = (await import("@editorjs/marker")).default
    const LinkTool = (await import("@editorjs/link")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "http://localhost:8008/fetchUrl",
            },
          },
          Marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "http://localhost:8008/uploadFile",
                byUrl: "http://localhost:8008/fetchUrl",
              },
            },
          },
          header: Header,
          table: Table,
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
        },
      })
      ref.current = editor
    }
  }

  useEffect(() => {
    setIsMounted(typeof window !== "undefined")
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()
    }

    if (isMounted) {
      init()
      return () => {
        if (ref.current) {
          ref.current.destroy()
          ref.current = null
        }
      }
    }
  }, [isMounted])

  const save = async () => {

  
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          localStorage.setItem("outputData", JSON.stringify(outputData))
          handleSubmit(outputData)
        })
        .catch((error) => {
          console.error("Saving failed: ", error)
        })
    }
  }

  return (
    <>
      <div
        id="editorjs"
        className={`mx-auto prose min-h-screen border border-gray-300 rounded-sm p-5 bg-white shadow text-black ${
          isModalOpen ? "pointer-events-none opacity-50" : ""
        }`}
      ></div>
      <div className="mt-4 flex justify-end gap-3 ">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-[#083ac5] text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-custom-dark w-[450px]">
            <h2 className="text-2xl font-bold mb-6 text-black">
              Guardar Documento
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="documentName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del documento
                </label>
                <input
                  id="documentName"
                  required
                  type="text"
                  placeholder="Ingrese el nombre del documento"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                >
                  <option value="">Seleccione una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="direction" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  id="direction"
                  type="text"
                  placeholder="Ingrese la dirección"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
              <div>
                <label htmlFor="responsible" className="block text-sm font-medium text-gray-700 mb-1">
                  Responsables
                </label>
                <input
                  id="responsible"
                  type="text"
                  placeholder="Ingrese los responsables"
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-[#083ac5] text-white rounded hover:bg-[#0D369B]"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}