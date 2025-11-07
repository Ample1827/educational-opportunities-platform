"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/AmpleTecNM.png" alt="Ample Logo" width={32} height={32} className="w-8 h-8" />
            <span className="font-bold text-lg hidden sm:inline text-foreground">Ample</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/search">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Buscar
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
