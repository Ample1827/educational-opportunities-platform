import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ample - Descubre tu futuro en el TecNM",
  description: "Plataforma de búsqueda de oportunidades educativas en universidades tecnológicas mexicanas",
  generator: "v0.app",
  icons: {
    icon: "/AmpleTecNM.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // {/* MODIFICADO */}
    // Añadimos 'suppressHydrationWarning' para silenciar el error de 'next-themes'
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}