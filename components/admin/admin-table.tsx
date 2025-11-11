"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"

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

interface AdminTableProps {
  opportunities: Opportunity[]
  onEdit: (opportunity: Opportunity) => void
  onDelete: (opportunity: Opportunity) => void
}

export function AdminTable({ opportunities, onEdit, onDelete }: AdminTableProps) {
  if (opportunities.length === 0) {
    return (
      <Card className="p-12 text-center border border-border">
        <p className="text-muted-foreground text-lg">No hay oportunidades que mostrar</p>
      </Card>
    )
  }

  return (
    <Card className="border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/50">
              <TableHead className="font-bold text-foreground">Clave Oficial</TableHead>
              <TableHead className="font-bold text-foreground">Estado</TableHead>
              <TableHead className="font-bold text-foreground">Tecnológico</TableHead>
              <TableHead className="font-bold text-foreground">Carrera</TableHead>
              <TableHead className="font-bold text-foreground">Modalidad</TableHead>
              <TableHead className="font-bold text-foreground">Grado</TableHead>
              <TableHead className="font-bold text-foreground text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunities.map((opp) => (
              <TableRow key={opp._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <TableCell className="text-foreground font-medium">{opp["Clave oficial"]}</TableCell>
                <TableCell className="text-foreground">{opp.Estado}</TableCell>
                <TableCell className="text-foreground text-sm">{opp["Nombre del tecnológico"]}</TableCell>
                <TableCell className="text-foreground">{opp.Carrera}</TableCell>
                <TableCell className="text-foreground">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {opp.Modalidad}
                  </span>
                </TableCell>
                <TableCell className="text-foreground text-sm">{opp["Grado que otorga"]}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(opp)}
                    className="text-primary hover:bg-primary/10"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(opp)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
