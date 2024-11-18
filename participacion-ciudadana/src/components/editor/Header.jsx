"use client";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
export default function Component() {
  const [showName, setShowName] = useState(true);

  return (
    <header className="flex items-center justify-between bg-[#0046ef] px-4 py-3 shadow-sm md:px-6">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <Image
          src="/LogoHorizontal-Gris.png"
          alt="Logo"
          width={80}
          height={50}
          className="hidden md:block rounded-lg shadow-2xl bg-[#0046ef]"
        />
        <Image
          src="/LogoVertical-Gris.png"
          alt="Logo"
          width={30}
          height={30}
          className="block md:hidden rounded-lg shadow-2xl "
        />
      </Link>
      <div className="flex items-center gap-2">
        {showName ? (
          <span className="text-lg font-semibold text-white">
            Propuesta Consulta Ciudadana
          </span>
        ) : (
          <>
            <Link
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-500 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Register
            </Link>
            <Link
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-400 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
