import { getDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get stateLimit param: "all", "3", "5", "10", etc. Default to "all"
    const stateLimitParam = searchParams.get("stateLimit") || "all"
    const stateLimit = stateLimitParam === "all" ? null : parseInt(stateLimitParam, 10)

    const db = await getDatabase()
    const collection = db.collection("tecnologicos")

    // Basic counts
    const [totalOpportunities, uniqueUniversities, uniqueStates, uniquePrograms] =
      await Promise.all([
        collection.countDocuments(),
        collection.distinct("Nombre del tecnológico"),
        collection.distinct("Estado"),
        collection.distinct("Programa"),
      ])

    const totalUniversities = uniqueUniversities.length
    const totalStates = uniqueStates.length
    const totalPrograms = uniquePrograms.length

    // Aggregations
    const [
      modalityBreakdown,
      degreeBreakdown,
      typeBreakdown,
      topUniversities,
      topStates,
      modalityBreakdownByState,
    ] = await Promise.all([
      collection.aggregate([
        { $match: { Modalidad: { $exists: true, $ne: null } } },
        { $group: { _id: "$Modalidad", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]).toArray(),

      collection.aggregate([
        { $group: { _id: "$Grado que otorga", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]).toArray(),

      collection.aggregate([
        { $group: { _id: "$Tipo", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]).toArray(),

      collection.aggregate([
        { $group: { _id: "$Nombre del tecnológico", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]).toArray(),

      collection.aggregate([
        { $group: { _id: "$Estado", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]).toArray(),

      collection.aggregate([
        { $match: { Estado: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: { state: "$Estado", modality: "$Modalidad" },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.state": 1 } },
      ]).toArray(),
    ])

    // Process modality by state data
    const allModalities = [...new Set(modalityBreakdown.map(m => m._id).filter(Boolean))]
    const modalityByStateMap = new Map<string, Record<string, any>>()

    for (const item of modalityBreakdownByState) {
      const state = item._id?.state
      const modality = item._id?.modality
      const count = item.count

      if (!state) continue

      if (!modalityByStateMap.has(state)) {
        const initial: Record<string, any> = { name: state, total: 0 }
        allModalities.forEach(mod => { initial[mod] = 0 })
        modalityByStateMap.set(state, initial)
      }

      const stateData = modalityByStateMap.get(state)!
      if (modality) {
        stateData[modality] = count
      }
      stateData.total += count
    }

    // Convert to array, sort by total, and add percentages
    let modalityByState = Array.from(modalityByStateMap.values())
      .map(stateData => {
        const result = { ...stateData }
        allModalities.forEach(mod => {
          const count = result[mod] || 0
          result[`${mod}Pct`] = result.total > 0 
            ? Number.parseFloat(((count / result.total) * 100).toFixed(1)) 
            : 0
        })
        return result
      })
      .sort((a, b) => b.total - a.total)

    // Apply state limit if specified
    if (stateLimit && stateLimit > 0) {
      modalityByState = modalityByState.slice(0, stateLimit)
    }

    const totalLicenciaturas = typeBreakdown.find(t => t._id === "Licenciatura")?.count || 0
    const totalPosgrados = typeBreakdown.find(t => t._id === "Posgrado")?.count || 0

    return NextResponse.json({
      success: true,
      data: {
        totalOpportunities,
        totalUniversities,
        totalStates,
        totalPrograms,
        totalLicenciaturas,
        totalPosgrados,

        modalityBreakdown: modalityBreakdown.map(m => ({
          name: m._id || "Sin modalidad",
          count: m.count,
        })),
        degreeBreakdown: degreeBreakdown.map(d => ({
          name: d._id || "Sin grado",
          count: d.count,
        })),
        typeBreakdown: typeBreakdown.map(t => ({
          name: t._id || "Sin tipo",
          count: t.count,
        })),

        topUniversities: topUniversities.map(u => ({
          name: u._id || "Desconocido",
          count: u.count,
        })),
        topStates: topStates.map(s => ({
          name: s._id || "Desconocido",
          count: s.count,
        })),

        modalityByState,
        modalityNames: allModalities,
        
        // Include metadata about the limit applied
        stateLimitApplied: stateLimit || "all",
      },
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch statistics" },
      { status: 500 }
    )
  }
}
