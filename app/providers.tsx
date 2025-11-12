"use client"

import { SessionProvider } from "next-auth/react"
// --- AÑADIDO ---
// Importamos el ThemeProvider que creamos en el Paso A (usamos ruta relativa)
import { ThemeProvider } from "../components/theme-provider" 

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // --- MODIFICADO ---
    // Envolvemos todo con el ThemeProvider
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}