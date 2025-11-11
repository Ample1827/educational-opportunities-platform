"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateOpportunityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateSuccess: (opportunity: any) => void
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

export function CreateOpportunityModal({ open, onOpenChange, onCreateSuccess }: CreateOpportunityModalProps) {
  const [formData, setFormData] = useState({
    Estado: "",
    "Nombre del tecnológico": "",
    Carrera: "",
    Modalidad: "",
    "Grado que otorga": "",
    "Clave oficial": "",
    "URL del tecnológico": "",
    "URL de la carrera": "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateSuccess(formData)
    setFormData({
      Estado: "",
      "Nombre del tecnológico": "",
      Carrera: "",
      Modalidad: "",
      "Grado que otorga": "",
      "Clave oficial": "",
      "URL del tecnológico": "",
      "URL de la carrera": "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Agregar Nueva Oportunidad</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-foreground">
              Estado <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.Estado} onValueChange={(value) => setFormData({ ...formData, Estado: value })}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Seleccionar" />
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
            <Label className="text-foreground">
              Nombre del Tecnológico <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="Ej: Instituto Tecnológico de Aguascalientes"
              value={formData["Nombre del tecnológico"]}
              onChange={(e) => setFormData({ ...formData, "Nombre del tecnológico": e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">
              Clave Oficial <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="Ej: IIND-2010-227"
              value={formData["Clave oficial"]}
              onChange={(e) => setFormData({ ...formData, "Clave oficial": e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">
              Carrera <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="Ej: Ingeniería Industrial"
              value={formData.Carrera}
              onChange={(e) => setFormData({ ...formData, Carrera: e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">
              Modalidad <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.Modalidad}
              onValueChange={(value) => setFormData({ ...formData, Modalidad: value })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Seleccionar" />
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
            <Label className="text-foreground">
              Grado que Otorga <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData["Grado que otorga"]}
              onValueChange={(value) => setFormData({ ...formData, "Grado que otorga": value })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Seleccionar" />
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
            <Label className="text-foreground">
              URL del Tecnológico <span className="text-destructive">*</span>
            </Label>
            <Input
              type="url"
              placeholder="https://aguascalientes.tecnm.mx"
              value={formData["URL del tecnológico"]}
              onChange={(e) => setFormData({ ...formData, "URL del tecnológico": e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>

          <div>
            <Label className="text-foreground">
              URL de la Carrera <span className="text-destructive">*</span>
            </Label>
            <Input
              type="url"
              placeholder="https://aguascalientes.tecnm.mx/ingenieria-industrial"
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
              Crear
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
