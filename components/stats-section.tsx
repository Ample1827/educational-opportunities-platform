import { Card } from "@/components/ui/card"

const STATS = [
  { label: "Programas", value: "2,450+" },
  { label: "Instituciones", value: "254" },
  { label: "Estados", value: "32" },
]

export function StatsSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STATS.map((stat) => (
            <Card
              key={stat.label}
              className="p-8 text-center border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <p className="text-muted-foreground text-sm font-medium mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-primary">{stat.value}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
