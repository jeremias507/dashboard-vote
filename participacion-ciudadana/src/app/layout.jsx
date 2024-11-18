"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { DocumentProvider } from "../context/documentContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DocumentProvider>
          {children}
          
        </DocumentProvider>
        
      </body>
    </html>
  );
}
