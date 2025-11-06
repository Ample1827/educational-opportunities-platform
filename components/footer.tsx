import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Ample</h3>
            <p className="text-sm opacity-80">Tu plataforma para descubrir oportunidades educativas en el TecNM</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="opacity-80 hover:opacity-100">
                  Buscar
                </Link>
              </li>
              <li>
                <Link href="/login" className="opacity-80 hover:opacity-100">
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 Ample. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
