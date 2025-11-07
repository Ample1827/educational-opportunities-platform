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
import { Plus } from "lucide-react"
import { AdminStats } from "@/components/admin/admin-stats"

interface Opportunity {
  id: number
  estado: string
  universidad: string
  carrera: string
  modalidad: string
  grado: string
  url: string
  claveOficial: string
}

const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 1,
    estado: "Aguascalientes",
    universidad: "Instituto Tecnológico de Aguascalientes",
    carrera: "Ingeniería Electrónica",
    modalidad: "Escolarizada",
    grado: "Licenciatura",
    url: "https://example.com",
    claveOficial: "ITA-001",
  },
  {
    id: 2,
    estado: "Jalisco",
    universidad: "Instituto Tecnológico de Guadalajara",
    carrera: "Ingeniería en Sistemas",
    modalidad: "Escolarizada",
    grado: "Licenciatura",
    url: "https://example.com",
    claveOficial: "ITG-002",
  },
]

export default function AdminPage() {
  const router = useRouter()
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [activeTab, setActiveTab] = useState<"dashboard" | "opportunities">("dashboard")

  useEffect(() => {
    // Check authorization
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  if (!isAuthorized) {
    return null
  }

  const filteredOpportunities = opportunities.filter(
    (opp) =>
      opp.carrera.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.universidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.estado.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreate = (newOpp: Omit<Opportunity, "id">) => {
    const opportunity: Opportunity = {
      ...newOpp,
      id: Math.max(...opportunities.map((o) => o.id), 0) + 1,
    }
    setOpportunities([...opportunities, opportunity])
    setShowCreateModal(false)
  }

  const handleEdit = (updatedOpp: Opportunity) => {
    setOpportunities(opportunities.map((opp) => (opp.id === updatedOpp.id ? updatedOpp : opp)))
    setShowEditModal(false)
    setSelectedOpportunity(null)
  }

  const handleDelete = (id: number) => {
    setOpportunities(opportunities.filter((opp) => opp.id !== id))
    setShowDeleteModal(false)
    setSelectedOpportunity(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/login")
  }

  return (
    <AdminLayout onLogout={handleLogout} activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "dashboard" ? (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Resumen de oportunidades educativas</p>
          </div>
          <AdminStats opportunities={opportunities} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestionar Oportunidades</h1>
              <p className="text-muted-foreground mt-2">Total: {opportunities.length} oportunidades</p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Agregar Nueva Oportunidad
            </Button>
          </div>

          {/* Search bar */}
          <div>
            <Input
              placeholder="Buscar por carrera, universidad o estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card border-border"
            />
          </div>

          {/* Table */}
          <AdminTable
            opportunities={filteredOpportunities}
            onEdit={(opp) => {
              setSelectedOpportunity(opp)
              setShowEditModal(true)
            }}
            onDelete={(opp) => {
              setSelectedOpportunity(opp)
              setShowDeleteModal(true)
            }}
          />
        </div>
      )}

      {/* Modals */}
      <CreateOpportunityModal open={showCreateModal} onOpenChange={setShowCreateModal} onCreateSuccess={handleCreate} />

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
            onDeleteConfirm={() => handleDelete(selectedOpportunity.id)}
          />
        </>
      )}
    </AdminLayout>
  )
}
