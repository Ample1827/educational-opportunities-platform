"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
          <DialogTitle className="text-foreground">Eliminar oportunidad</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            ¿Estás seguro de que deseas eliminar esta oportunidad? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <p className="text-sm font-medium text-foreground">{opportunity.carrera}</p>
          <p className="text-sm text-muted-foreground">{opportunity.universidad}</p>
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
