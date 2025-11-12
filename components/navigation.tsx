"use client"

import Link from "next/link"
// import Image from "next/image" // --- MODIFICADO --- Eliminado 'next/image' para compatibilidad
// import { Button } from "@/components/ui/button" // Ya no necesitamos Button aquí

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            
            {/* --- MODIFICADO --- 
                Se reemplazó el componente <Image> de Next.js por una etiqueta <img> estándar 
                para solucionar el error de compilación.
            */}
            <img 
              src="/AmpleTecNM.png" 
              alt="Ample Logo" 
              className="w-8 h-8" // El tamaño ya está definido por Tailwind
            />
            
            <span className="font-bold text-lg hidden sm:inline text-foreground">Ample</span>
          </Link>
          <div className="flex gap-4 items-center">
            
            {/* --- MODIFICADO --- 
                Se reemplazó el <Button> anidado por un <Link> estilizado
                y se añadió la clase 'nav-link-hover'.
            */}
            <Link 
              href="/search" 
              className="hidden sm:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground nav-link-hover"
            >
              Buscar
            </Link>

            {/* --- MODIFICADO --- 
                Se reemplazó el <Button> anidado por un <Link> estilizado
                y se añadió la clase 'btn-push'.
            */}
            <Link 
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 btn-push"
            >
              Iniciar sesión
            </Link>

          </div>
        </div>
      </div>
    </nav>
  )
}