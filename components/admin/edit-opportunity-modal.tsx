"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

interface EditOpportunityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  opportunity: Opportunity
  onEditSuccess: (opportunity: Opportunity) => void
}

const STATES = ["Aguascalientes", "Jalisco", "CDMX", "Nuevo León", "Veracruz"]
const MODALIDADES = ["Escolarizada", "No Escolarizada", "Mixta"]
const GRADOS = ["Licenciatura", "Maestría", "Ingeniería"]

export function EditOpportunityModal({ open, onOpenChange, opportunity, onEditSuccess }: EditOpportunityModalProps) {
  const [formData, setFormData] = useState(opportunity)

  useEffect(() => {
    setFormData(opportunity)
  }, [opportunity])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEditSuccess(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Editar Oportunidad</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-foreground">Estado</Label>
            <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value })}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-foreground">Universidad</Label>
            <Input
              value={formData.universidad}
              onChange={(e) => setFormData({ ...formData, universidad: e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">Clave Oficial</Label>
            <Input
              value={formData.claveOficial}
              onChange={(e) => setFormData({ ...formData, claveOficial: e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">Carrera</Label>
            <Input
              value={formData.carrera}
              onChange={(e) => setFormData({ ...formData, carrera: e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">Modalidad</Label>
            <Select
              value={formData.modalidad}
              onValueChange={(value) => setFormData({ ...formData, modalidad: value })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MODALIDADES.map((mod) => (
                  <SelectItem key={mod} value={mod}>
                    {mod}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-foreground">Grado</Label>
            <Select value={formData.grado} onValueChange={(value) => setFormData({ ...formData, grado: value })}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GRADOS.map((grado) => (
                  <SelectItem key={grado} value={grado}>
                    {grado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-foreground">URL Tecnológico</Label>
            <Input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border text-foreground hover:bg-muted flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
              Guardar cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
