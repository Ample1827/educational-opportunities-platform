"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminTable } from "@/components/admin/admin-table"
import { CreateOpportunityModal } from "@/components/admin/create-opportunity-modal"
import { EditOpportunityModal } from "@/components/admin/edit-opportunity-modal"
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, TrendingUp, Users, MapPin, GraduationCap, Database, Copy, Check } from "lucide-react"

interface Opportunity {
  _id: string
  Estado: string
  "Nombre del tecnológico": string
  Carrera: string
  Modalidad: string
  "Grado que otorga": string
  "URL del tecnológico": string
  "URL de la carrera": string
  "Clave oficial": string
}

interface Stats {
  totalOpportunities: number
  totalUniversities: number
  totalStates: number
  totalCareers: number
  modalityBreakdown: Array<{ name: string; count: number }>
  degreeBreakdown: Array<{ name: string; count: number }>
}

export default function AdminPage() {
  const router = useRouter()
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [activeTab, setActiveTab] = useState<"dashboard" | "opportunities">("dashboard")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showJsonView, setShowJsonView] = useState(false)
  const [copied, setCopied] = useState(false)
  const limit = 25

  // Check authorization
  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  // Fetch opportunities
  useEffect(() => {
    if (!isAuthorized) return

    const fetchOpportunities = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(searchTerm && { search: searchTerm })
        })
        
        const response = await fetch(`/api/opportunities?${params}`)
        const data = await response.json()

        if (data.success) {
          setOpportunities(data.data)
          setTotalPages(data.pagination?.totalPages || 1)
        }
      } catch (error) {
        console.error("Error fetching opportunities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [isAuthorized, page, searchTerm])

  // Fetch stats
  useEffect(() => {
    if (!isAuthorized) return

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()

        if (data.success) {
          setStats(data.data)
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [isAuthorized, opportunities.length])

  if (!isAuthorized) {
    return null
  }

  const handleCreate = async (newOpp: Omit<Opportunity, "_id">) => {
    try {
      const response = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOpp)
      })

      const data = await response.json()

      if (data.success) {
        setOpportunities([data.data, ...opportunities])
        setShowCreateModal(false)
        alert('✅ Oportunidad creada exitosamente')
      } else {
        alert('❌ Error: ' + data.error)
      }
    } catch (error) {
      console.error("Error creating opportunity:", error)
      alert('❌ Error al crear oportunidad')
    }
  }

  const handleEdit = async (updatedOpp: Opportunity) => {
    try {
      const response = await fetch(`/api/opportunities/${updatedOpp._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOpp)
      })

      const data = await response.json()

      if (data.success) {
        setOpportunities(opportunities.map((opp) => 
          opp._id === updatedOpp._id ? data.data : opp
        ))
        setShowEditModal(false)
        setSelectedOpportunity(null)
        alert('✅ Oportunidad actualizada exitosamente')
      } else {
        alert('❌ Error: ' + data.error)
      }
    } catch (error) {
      console.error("Error updating opportunity:", error)
      alert('❌ Error al actualizar oportunidad')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/opportunities/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        setOpportunities(opportunities.filter((opp) => opp._id !== id))
        setShowDeleteModal(false)
        setSelectedOpportunity(null)
        alert('✅ Oportunidad eliminada exitosamente')
      } else {
        alert('❌ Error: ' + data.error)
      }
    } catch (error) {
      console.error("Error deleting opportunity:", error)
      alert('❌ Error al eliminar oportunidad')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/login")
  }

  const copyToClipboard = async (data: any) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  // Calculate top states from stats
  const topStates = stats?.modalityBreakdown 
    ? stats.modalityBreakdown.slice(0, 5)
    : []

  return (
    <AdminLayout onLogout={handleLogout} activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "dashboard" ? (
        <div className="space-y-6">
          {/* Dashboard Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-2">Resumen de oportunidades educativas</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowJsonView(!showJsonView)}
              className="flex items-center gap-2"
            >
              <Database className="w-4 h-4" />
              {showJsonView ? "Ocultar JSON" : "Ver JSON"}
            </Button>
          </div>

          {/* Stats Cards */}
          {stats && !showJsonView && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Programas</p>
                      <h3 className="text-3xl font-bold text-foreground mt-2">
                        {stats.totalOpportunities.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tecnológicos</p>
                      <h3 className="text-3xl font-bold text-foreground mt-2">
                        {stats.totalUniversities}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Estados</p>
                      <h3 className="text-3xl font-bold text-foreground mt-2">
                        {stats.totalStates}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Carreras</p>
                      <h3 className="text-3xl font-bold text-foreground mt-2">
                        {stats.totalCareers}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Modality Breakdown */}
              {stats.modalityBreakdown && stats.modalityBreakdown.length > 0 && (
                <Card className="p-6 border border-border bg-card">
                  <h3 className="text-lg font-bold text-foreground mb-4">Programas por Modalidad</h3>
                  <div className="space-y-3">
                    {stats.modalityBreakdown.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <span className="text-sm text-foreground font-medium">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${(item.count / stats.totalOpportunities) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground font-semibold w-16 text-right">
                            {item.count.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Degree Breakdown */}
              {stats.degreeBreakdown && stats.degreeBreakdown.length > 0 && (
                <Card className="p-6 border border-border bg-card">
                  <h3 className="text-lg font-bold text-foreground mb-4">Programas por Grado</h3>
                  <div className="space-y-3">
                    {stats.degreeBreakdown.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <span className="text-sm text-foreground font-medium">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full transition-all duration-500"
                              style={{ width: `${(item.count / stats.totalOpportunities) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground font-semibold w-16 text-right">
                            {item.count.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}

          {/* JSON View for Dashboard */}
          {showJsonView && stats && (
            <Card className="p-6 border border-border bg-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-foreground">Vista JSON - Estadísticas Completas</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(stats)}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar JSON
                    </>
                  )}
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs max-h-[600px] overflow-y-auto">
                <code>{JSON.stringify(stats, null, 2)}</code>
              </pre>
            </Card>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Opportunities Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestionar Oportunidades</h1>
              <p className="text-muted-foreground mt-2">
                Mostrando {opportunities.length} de {stats?.totalOpportunities.toLocaleString() || 0} oportunidades
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowJsonView(!showJsonView)}
                className="flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                JSON
              </Button>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Agregar Nueva
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div>
            <Input
              placeholder="Buscar por carrera, universidad o estado..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="bg-card border-border"
            />
          </div>

          {/* JSON View for Opportunities */}
          {showJsonView && (
            <Card className="p-6 border border-border bg-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-foreground">
                  Vista JSON - Oportunidades (Página {page} de {totalPages})
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(opportunities)}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar JSON
                    </>
                  )}
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs max-h-[600px] overflow-y-auto">
                <code>{JSON.stringify(opportunities, null, 2)}</code>
              </pre>
            </Card>
          )}

          {/* Table */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-4">Cargando datos de MongoDB...</p>
            </div>
          ) : !showJsonView ? (
            <>
              <AdminTable
                opportunities={opportunities}
                onEdit={(opp) => {
                  setSelectedOpportunity(opp)
                  setShowEditModal(true)
                }}
                onDelete={(opp) => {
                  setSelectedOpportunity(opp)
                  setShowDeleteModal(true)
                }}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Anterior
                  </Button>
                  <span className="flex items-center px-4 text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </>
          ) : null}
        </div>
      )}

      {/* Modals */}
      <CreateOpportunityModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
        onCreateSuccess={handleCreate} 
      />

      {selectedOpportunity && (
        <>
          <EditOpportunityModal
            open={showEditModal}
            onOpenChange={setShowEditModal}
            opportunity={selectedOpportunity}
            onEditSuccess={handleEdit}
          />

          <DeleteConfirmModal
            open={showDeleteModal}
            onOpenChange={setShowDeleteModal}
            opportunity={selectedOpportunity}
            onDeleteConfirm={() => handleDelete(selectedOpportunity._id)}
          />
        </>
      )}
    </AdminLayout>
  )
}
