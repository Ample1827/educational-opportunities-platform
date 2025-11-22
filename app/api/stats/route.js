import { getDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const db = await getDatabase()
    const collection = db.collection("tecnologicos")

    const [totalOpportunities, totalUniversities, totalStates, totalPrograms, totalLicenciaturas, totalPosgrados] =
      await Promise.all([
        collection.countDocuments(),
        collection.distinct("Nombre del tecnológico").then((arr) => arr.length),
        collection.distinct("Estado").then((arr) => arr.length),
        collection
          .distinct("Programa")
          .then((arr) => arr.length),
        collection.countDocuments({ "Tipo de carrera": "Licenciatura" }), // FIXED: Use correct field name
        collection.countDocuments({ "Tipo de carrera": "Posgrado" }), // FIXED: Use correct field name
      ])

    const [
      modalityBreakdown,
      degreeBreakdown,
      typeBreakdown,
      topUniversities,
      topStates,
      modalityBreakdownByState,
    ] = await Promise.all([
      collection.aggregate([{ $group: { _id: "$Modalidad", count: { $sum: 1 } } }, { $sort: { count: -1 } }]).toArray(),

      collection
        .aggregate([{ $group: { _id: "$Grado que otorga", count: { $sum: 1 } } }, { $sort: { count: -1 } }])
        .toArray(),

      // FIXED: Use correct field name "Tipo de carrera"
      collection
        .aggregate([{ $group: { _id: "$Tipo de carrera", count: { $sum: 1 } } }, { $sort: { count: -1 } }])
        .toArray(),

      // Top universities by program count
      collection
        .aggregate([
          { $group: { _id: "$Nombre del tecnológico", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ])
        .toArray(),

      // Top states by program count
      collection
        .aggregate([{ $group: { _id: "$Estado", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }])
        .toArray(),

      // Aggregation for modality by state
      collection
        .aggregate([
          {
            $group: {
              _id: { state: "$Estado", modality: "$Modalidad" },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.state": 1 } },
        ])
        .toArray(),
    ])

    const modalityByStateMap = new Map()

    // Get all unique modalities to ensure we have keys for them
    const allModalities = new Set()

    // Group by state
    modalityBreakdownByState[0] &&
      modalityBreakdownByState.forEach((item) => {
        const state = item._id.state
        const modality = item._id.modality
        const count = item.count

        allModalities.add(modality)

        if (!modalityByStateMap.has(state)) {
          modalityByStateMap.set(state, { name: state, total: 0 })
        }

        const stateData = modalityByStateMap.get(state)
        stateData[modality] = count
        stateData.total += count
      })

    // Convert map to array and calculate percentages
    const modalityByState = Array.from(modalityByStateMap.values())
      .map((stateData) => {
        const result = { ...stateData }
        // Add percentage fields
        allModalities.forEach((mod) => {
          const count = result[mod] || 0
          result[`${mod}Pct`] = result.total > 0 ? Number.parseFloat(((count / result.total) * 100).toFixed(1)) : 0
          result[mod] = count // Ensure 0s are present
        })
        return result
      })
      .sort((a, b) => b.total - a.total) // Sort by total programs desc

    return NextResponse.json({
      success: true,
      data: {
        // Overall stats
        totalOpportunities,
        totalUniversities,
        totalStates,
        totalPrograms,
        totalLicenciaturas,
        totalPosgrados,

        // Breakdowns
        modalityBreakdown: modalityBreakdown.map((m) => ({
          name: m._id || "Sin modalidad",
          count: m.count,
        })),
        degreeBreakdown: degreeBreakdown.map((d) => ({
          name: d._id || "Sin grado",
          count: d.count,
        })),
        typeBreakdown: typeBreakdown.map((t) => ({
          name: t._id || "Sin tipo",
          count: t.count,
        })),

        // Top rankings
        topUniversities: topUniversities.map((u) => ({
          name: u._id,
          count: u.count,
        })),
        topStates: topStates.map((s) => ({
          name: s._id,
          count: s.count,
        })),
        modalityByState, // Return the processed breakdown
      },
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch statistics" }, { status: 500 })
  }
}