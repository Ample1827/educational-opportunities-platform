"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

interface EditOpportunityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  opportunity: Opportunity
  onEditSuccess: (opportunity: Opportunity) => void
}

const STATES = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "CDMX",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "México",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
]

const MODALIDADES = ["Escolarizada", "No Escolarizada", "Mixta"]
const GRADOS = ["Licenciatura", "Ingeniería", "Maestría", "Doctorado"]

export function EditOpportunityModal({ open, onOpenChange, opportunity, onEditSuccess }: EditOpportunityModalProps) {
  const [formData, setFormData] = useState<Opportunity>(opportunity)

  useEffect(() => {
    setFormData(opportunity)
  }, [opportunity])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEditSuccess(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Editar Oportunidad</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-foreground">Estado</Label>
            <Select value={formData.Estado} onValueChange={(value) => setFormData({ ...formData, Estado: value })}>
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
            <Label className="text-foreground">Nombre del Tecnológico</Label>
            <Input
              value={formData["Nombre del tecnológico"]}
              onChange={(e) => setFormData({ ...formData, "Nombre del tecnológico": e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">Clave Oficial</Label>
            <Input
              value={formData["Clave oficial"]}
              onChange={(e) => setFormData({ ...formData, "Clave oficial": e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">Carrera</Label>
            <Input
              value={formData.Carrera}
              onChange={(e) => setFormData({ ...formData, Carrera: e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">Modalidad</Label>
            <Select
              value={formData.Modalidad}
              onValueChange={(value) => setFormData({ ...formData, Modalidad: value })}
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
            <Label className="text-foreground">Grado que Otorga</Label>
            <Select
              value={formData["Grado que otorga"]}
              onValueChange={(value) => setFormData({ ...formData, "Grado que otorga": value })}
            >
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
            <Label className="text-foreground">URL del Tecnológico</Label>
            <Input
              type="url"
              value={formData["URL del tecnológico"]}
              onChange={(e) => setFormData({ ...formData, "URL del tecnológico": e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">URL de la Carrera</Label>
            <Input
              type="url"
              value={formData["URL de la carrera"]}
              onChange={(e) => setFormData({ ...formData, "URL de la carrera": e.target.value })}
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
