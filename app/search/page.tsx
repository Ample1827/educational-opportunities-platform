"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Eye, Loader2 } from "lucide-react"

interface Opportunity {
  _id: string
  Estado: string
  "Nombre del tecnológico": string
  "Clave oficial": string
  Modalidad: string
  "Grado que otorga": string
  Carrera: string
  "URL del tecnológico": string
  "URL de la carrera": string
}

interface PaginationData {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function SearchPage() {
  // Filter states
  const [selectedState, setSelectedState] = useState<string>("")
  const [selectedUniversity, setSelectedUniversity] = useState<string>("")
  const [selectedModalidad, setSelectedModalidad] = useState<string>("")
  const [selectedGrado, setSelectedGrado] = useState<string>("")
  const [searchCarrera, setSearchCarrera] = useState<string>("")

  // Data states
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [pagination, setPagination] = useState<PaginationData | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter options from API
  const [estados, setEstados] = useState<string[]>([])
  const [universidades, setUniversidades] = useState<string[]>([])
  const [modalidades, setModalidades] = useState<string[]>([])
  const [grados, setGrados] = useState<string[]>([])
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(true)

  // Load filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [estadosRes, univRes, modalidadesRes, gradosRes] = await Promise.all([
          fetch("/api/filters?type=estados"),
          fetch("/api/filters?type=universidades"),
          fetch("/api/filters?type=modalidades"),
          fetch("/api/filters?type=grados"),
        ])

        const [estadosData, univData, modalidadesData, gradosData] = await Promise.all([
          estadosRes.json(),
          univRes.json(),
          modalidadesRes.json(),
          gradosRes.json(),
        ])

        if (estadosData.success) setEstados(estadosData.data)
        if (univData.success) setUniversidades(univData.data)
        if (modalidadesData.success) setModalidades(modalidadesData.data)
        if (gradosData.success) setGrados(gradosData.data)
      } catch (error) {
        console.error("Error loading filter options:", error)
      } finally {
        setFilterOptionsLoading(false)
      }
    }

    loadFilterOptions()
  }, [])

  // Fetch opportunities when filters or page change
  useEffect(() => {
    fetchOpportunities()
  }, [selectedState, selectedUniversity, selectedModalidad, selectedGrado, searchCarrera, currentPage])

  const fetchOpportunities = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedState) params.append("estado", selectedState)
      if (selectedUniversity) params.append("universidad", selectedUniversity)
      if (selectedModalidad) params.append("modalidad", selectedModalidad)
      if (selectedGrado) params.append("grado", selectedGrado)
      if (searchCarrera) params.append("carrera", searchCarrera)
      params.append("page", currentPage.toString())
      params.append("limit", "25")

      const response = await fetch(`/api/opportunities?${params}`)
      const data = await response.json()

      if (data.success) {
        setOpportunities(data.data)
        setPagination(data.pagination)
      } else {
        console.error("API Error:", data.error)
        setOpportunities([])
      }
    } catch (error) {
      console.error("Error fetching opportunities:", error)
      setOpportunities([])
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedState("")
    setSelectedUniversity("")
    setSelectedModalidad("")
    setSelectedGrado("")
    setSearchCarrera("")
    setCurrentPage(1)
  }

  const handleFilterChange = (setter: (value: string) => void, value: string) => {
    setter(value)
    setCurrentPage(1)
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    if (!pagination) return []

    const totalPages = pagination.totalPages
    const current = pagination.page
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)

    if (current > 3) {
      pages.push("...")
    }

    for (let i = Math.max(2, current - 1); i <= Math.min(current + 1, totalPages - 1); i++) {
      pages.push(i)
    }

    if (current < totalPages - 2) {
      pages.push("...")
    }

    pages.push(totalPages)

    return pages
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-8">
          <h2 className="text-xl font-bold mb-6 text-foreground text-center">Filtros de búsqueda</h2>

          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 w-full">
              <div className="min-w-0">
                <label className="block text-sm font-medium mb-2 text-foreground">Estado</label>
                <Select
                  value={selectedState}
                  onValueChange={(value) => handleFilterChange(setSelectedState, value)}
                  disabled={filterOptionsLoading}
                >
                  <SelectTrigger className="w-full truncate">
                    <SelectValue placeholder={filterOptionsLoading ? "Cargando..." : "Seleccionar"} />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium mb-2 text-foreground">Universidad</label>
                <Select
                  value={selectedUniversity}
                  onValueChange={(value) => handleFilterChange(setSelectedUniversity, value)}
                  disabled={filterOptionsLoading}
                >
                  <SelectTrigger className="w-full truncate">
                    <SelectValue placeholder={filterOptionsLoading ? "Cargando..." : "Seleccionar"} />
                  </SelectTrigger>
                  <SelectContent>
                    {universidades.map((uni) => (
                      <SelectItem key={uni} value={uni}>
                        {uni}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium mb-2 text-foreground">Modalidad</label>
                <Select
                  value={selectedModalidad}
                  onValueChange={(value) => handleFilterChange(setSelectedModalidad, value)}
                  disabled={filterOptionsLoading}
                >
                  <SelectTrigger className="w-full truncate">
                    <SelectValue placeholder={filterOptionsLoading ? "Cargando..." : "Seleccionar"} />
                  </SelectTrigger>
                  <SelectContent>
                    {modalidades.map((mod) => (
                      <SelectItem key={mod} value={mod}>
                        {mod}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium mb-2 text-foreground">Grado</label>
                <Select
                  value={selectedGrado}
                  onValueChange={(value) => handleFilterChange(setSelectedGrado, value)}
                  disabled={filterOptionsLoading}
                >
                  <SelectTrigger className="w-full truncate">
                    <SelectValue placeholder={filterOptionsLoading ? "Cargando..." : "Seleccionar"} />
                  </SelectTrigger>
                  <SelectContent>
                    {grados.map((grado) => (
                      <SelectItem key={grado} value={grado}>
                        {grado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium mb-2 text-foreground">Carrera</label>
                <Input
                  placeholder="Buscar carrera..."
                  value={searchCarrera}
                  onChange={(e) => handleFilterChange(setSearchCarrera, e.target.value)}
                  className="bg-background w-full truncate"
                />
              </div>
            </div>

            <div className="w-full flex justify-center sm:justify-start">
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full sm:w-auto border-border text-foreground hover:bg-muted bg-transparent"
              >
                Limpiar filtros
              </Button>
            </div>
          </div>

          {/* Results info */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Cargando...
                </span>
              ) : pagination ? (
                <>
                  Mostrando <span className="font-bold text-foreground">{opportunities.length}</span> de{" "}
                  <span className="font-bold text-foreground">{pagination.total.toLocaleString()}</span> resultados
                  {pagination.page > 1 && (
                    <span>
                      {" "}
                      (Página {pagination.page} de {pagination.totalPages})
                    </span>
                  )}
                </>
              ) : null}
            </p>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Cargando oportunidades...</p>
            </div>
          )}

          {/* Results table */}
          {!loading && opportunities.length > 0 && (
            <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border bg-muted/50">
                      <TableHead className="font-bold text-foreground">Estado</TableHead>
                      <TableHead className="font-bold text-foreground">Universidad</TableHead>
                      <TableHead className="font-bold text-foreground">Carrera</TableHead>
                      <TableHead className="font-bold text-foreground">Modalidad</TableHead>
                      <TableHead className="font-bold text-foreground">Grado</TableHead>
                      <TableHead className="font-bold text-foreground text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities.map((opp) => (
                      <TableRow key={opp._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <TableCell className="text-foreground">{opp.Estado}</TableCell>
                        <TableCell className="text-foreground text-sm">{opp["Nombre del tecnológico"]}</TableCell>
                        <TableCell className="text-foreground">{opp.Carrera}</TableCell>
                        <TableCell className="text-foreground">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {opp.Modalidad}
                          </span>
                        </TableCell>
                        <TableCell className="text-foreground">{opp["Grado que otorga"]}</TableCell>
                        <TableCell className="text-right">
                          <Link href={`/opportunity/${opp._id}`}>
                            <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && opportunities.length === 0 && (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <p className="text-muted-foreground text-lg">No se encontraron resultados</p>
              <Button
                variant="outline"
                onClick={handleReset}
                className="mt-4 border-border text-foreground hover:bg-muted bg-transparent"
              >
                Limpiar filtros
              </Button>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && !loading && (
            <div className="flex justify-center items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.hasPrevPage}
                className="border-border"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {getPageNumbers().map((pageNum, i) =>
                typeof pageNum === "number" ? (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? "bg-primary text-primary-foreground" : "border-border"}
                  >
                    {pageNum}
                  </Button>
                ) : (
                  <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">
                    {pageNum}
                  </span>
                ),
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={!pagination.hasNextPage}
                className="border-border"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
