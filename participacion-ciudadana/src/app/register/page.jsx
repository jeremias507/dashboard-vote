"use client";

import axios from "axios";
import Link from "next/link"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function PageRegister(){
  const router = useRouter();
  const [dni, setDni]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError]= useState('');
 const data = {
    dni:dni,
    password:password
 }
 axios.defaults.withCredentials = true;

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if (!dni || !password ){
      setError("Todos los campos son requeridos.")
      return;
    }

    try {

      const res = await axios.post("http://localhost:4000/api/register",data)
    if(res.data.success){
      router.push('/home');
    }
    else{
      console.log("Error de ruta");
    }
    
   
    } catch (error) {
      console.log("Error durante el registro",error);
      setError(error.response.data.messageError)
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-primary flex items-center justify-center p-6 md:p-8">
        <div className="flex flex-col xl:flex-row items-center">
          <Image
            src="/LogoVG.png"
            alt="Logo Alcaldía de Panamá"
            width={200}
            height={200}
            className="mb-4 md:mb-0 md:mr-6"
            style={{ aspectRatio: "1/1", objectFit: "cover" }}
          />
          <div className="text-center md:text-left " >
            <h1 className="text-4xl md:text-5xl font-bold text-white">Participación</h1>
            <h2 className="text-4xl md:text-5xl font-bold text-[#48A9FF]">Ciudadana</h2>
          </div>
        </div>
      </div>
  
      <div className="flex items-center justify-center bg-[#F4F6F7] px-4 py-8 md:px-6 md:py-12">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">Registrarse</h1>
            <p className="text-gray-500">Crear una nueva cuenta</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700">Cédula</label>
              <input
                onChange={e => setDni(e.target.value)}
                id="dni"
                type="text"
                placeholder="Cédula"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                onChange={e => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Contraseña"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#083AC5] text-white font-semibold rounded-md shadow-sm hover:bg-[#0D369B] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Registrarse
            </button>
          </form>
          <div className="text-center text-sm text-gray-500">
            ¿Ya tiene una cuenta?{" "}
            <Link href="/signUp" className="underline">
             Iniciar Sesión
            </Link>
          </div>
          {error && (
            <div className="bg-red-500 border border-red-600 rounded-md mb-4">
              <p className="text-white flex items-center justify-center text-sm p-2">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
