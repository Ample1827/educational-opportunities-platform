"use client"

import { useState, useEffect } from "react"
// Importamos el nuevo componente
import { ThemeToggle } from "./theme-toggle" // {/* MODIFICADO: Corregida la ruta de importación */}

export function Navigation() {
  // ... (toda tu lógica de 'scrolled' se queda igual) ...
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navClasses = scrolled
    ? "border-b border-border bg-card shadow-sm" 
    : "border-b border-transparent bg-transparent"

  const logoTextClass = scrolled ? "text-foreground" : "text-white"
  
  const linkTextClass = scrolled 
    ? "text-foreground nav-link-hover" 
    : "text-white hover:bg-black/10" // Añadido hover para modo transparente

  // --- AÑADIDO ---
  // El botón de tema también cambia de color
  const themeToggleClass = scrolled ? "text-foreground" : "text-white"


  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${navClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center gap-2">
            <img src="/AmpleTecNM.png" alt="Ample Logo" width={32} height={32} className="w-8 h-8" />
            <span className={`font-bold text-lg hidden sm:inline transition-colors ${logoTextClass}`}>
              Ample
            </span>
          </a>
          {/* MODIFICADO: Añadido 'ThemeToggle' */}
          <div className="flex gap-2 items-center"> {/* Ajustado gap de 4 a 2 */}
            <a
              href="/search"
              className={`hidden sm:inline-flex items-center justify-center text-sm font-medium transition-all h-10 px-4 py-2 rounded-md ${linkTextClass}`}
            >
              Buscar
            </a>
            <a
              href="/login"
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold h-10 px-4 py-2 btn-push"
            >
              Iniciar sesión
            </a>
            
            {/* --- AÑADIDO: El botón de Tema --- */}
            <div className={`transition-colors ${themeToggleClass}`}>
              <ThemeToggle />
            </div>

          </div>
        </div>
      </div>
    </nav>
  )
}