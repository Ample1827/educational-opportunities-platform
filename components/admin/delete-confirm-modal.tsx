"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface Opportunity {
  _id: string
  Estado: string
  "Nombre del tecnológico": string
  Carrera: string
  Modalidad: string
  "Grado que otorga": string
  "Clave oficial": string
  "URL del tecnológico": string
  "URL de la carrera": string
}

interface DeleteConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  opportunity: Opportunity
  onDeleteConfirm: () => void
}

export function DeleteConfirmModal({ open, onOpenChange, opportunity, onDeleteConfirm }: DeleteConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-card border border-border">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <DialogTitle className="text-foreground">Eliminar oportunidad</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2">
                ¿Estás seguro de que deseas eliminar esta oportunidad? Esta acción no se puede deshacer.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="bg-muted/50 p-4 rounded-lg mb-4 space-y-2">
          <p className="text-sm font-medium text-foreground">{opportunity.Carrera}</p>
          <p className="text-sm text-muted-foreground">{opportunity["Nombre del tecnológico"]}</p>
          <p className="text-xs text-muted-foreground">{opportunity.Estado}</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border text-foreground hover:bg-muted flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onDeleteConfirm()
              onOpenChange(false)
            }}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1"
          >
            Eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
