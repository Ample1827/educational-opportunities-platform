import { getDatabase } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const db = await getDatabase()
    const collection = db.collection('tecnologicos')

    const [
      totalOpportunities,
      totalUniversities,
      totalStates,
      totalCareers
    ] = await Promise.all([
      collection.countDocuments(),
      collection.distinct('Nombre del tecnológico').then(arr => arr.length),
      collection.distinct('Estado').then(arr => arr.length),
      collection.distinct('Carrera').then(arr => arr.length)
    ])

    const modalityBreakdown = await collection.aggregate([
      { $group: { _id: '$Modalidad', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray()

    const degreeBreakdown = await collection.aggregate([
      { $group: { _id: '$Grado que otorga', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray()

    return NextResponse.json({
      success: true,
      data: {
        totalOpportunities,
        totalUniversities,
        totalStates,
        totalCareers,
        modalityBreakdown: modalityBreakdown.map(m => ({
          name: m._id,
          count: m.count
        })),
        degreeBreakdown: degreeBreakdown.map(d => ({
          name: d._id,
          count: d.count
        }))
      }
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
