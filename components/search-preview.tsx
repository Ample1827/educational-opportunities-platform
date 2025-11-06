"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const UNIVERSITIES = [
  "Instituto Tecnológico de Aguascalientes",
  "Instituto Tecnológico de Apizaco",
  "Instituto Tecnológico de Celaya",
  "Instituto Tecnológico de Chihuahua",
  "Instituto Tecnológico de Ciudad Madero",
]

const STATES = ["Aguascalientes", "Baja California", "CDMX", "Jalisco", "Nuevo León", "Veracruz"]

export function SearchPreview() {
  const [searchTab, setSearchTab] = useState<"university" | "state">("university")
  const [selectedUniversity, setSelectedUniversity] = useState("")
  const [selectedState, setSelectedState] = useState("")

  return (
    <section className="py-16 sm:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Busca programas por:</h2>
          <div className="flex gap-4 justify-center">
            <Button
              variant={searchTab === "university" ? "default" : "outline"}
              onClick={() => setSearchTab("university")}
              className={searchTab === "university" ? "bg-primary text-primary-foreground" : ""}
            >
              Universidad
            </Button>
            <Button
              variant={searchTab === "state" ? "default" : "outline"}
              onClick={() => setSearchTab("state")}
              className={searchTab === "state" ? "bg-primary text-primary-foreground" : ""}
            >
              Estado
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {searchTab === "university" && (
            <div className="space-y-4">
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una universidad" />
                </SelectTrigger>
                <SelectContent>
                  {UNIVERSITIES.map((uni) => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link href={selectedUniversity ? `/search?university=${encodeURIComponent(selectedUniversity)}` : "#"}>
                <Button
                  disabled={!selectedUniversity}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  Buscar programas
                </Button>
              </Link>
            </div>
          )}

          {searchTab === "state" && (
            <div className="space-y-4">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link href={selectedState ? `/search?state=${encodeURIComponent(selectedState)}` : "#"}>
                <Button
                  disabled={!selectedState}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  Buscar programas
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
