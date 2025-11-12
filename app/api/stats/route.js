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
      totalPrograms,
      totalLicenciaturas,
      totalPosgrados
    ] = await Promise.all([
      collection.countDocuments(),
      collection.distinct('Nombre del tecnológico').then(arr => arr.length),
      collection.distinct('Estado').then(arr => arr.length),
      collection.distinct('Programa').then(arr => arr.length), // Updated from 'Carrera'
      collection.countDocuments({ Tipo: 'Licenciatura' }), // NEW
      collection.countDocuments({ Tipo: 'Posgrado' }) // NEW
    ])

    const [
      modalityBreakdown,
      degreeBreakdown,
      typeBreakdown, // NEW: Breakdown by Licenciatura/Posgrado
      topUniversities,
      topStates
    ] = await Promise.all([
      collection.aggregate([
        { $group: { _id: '$Modalidad', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]).toArray(),
      
      collection.aggregate([
        { $group: { _id: '$Grado que otorga', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]).toArray(),
      
      // NEW: Type breakdown
      collection.aggregate([
        { $group: { _id: '$Tipo', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]).toArray(),
      
      // NEW: Top universities by program count
      collection.aggregate([
        { $group: { _id: '$Nombre del tecnológico', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]).toArray(),
      
      // NEW: Top states by program count
      collection.aggregate([
        { $group: { _id: '$Estado', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]).toArray()
    ])

    return NextResponse.json({
      success: true,
      data: {
        // Overall stats
        totalOpportunities,
        totalUniversities,
        totalStates,
        totalPrograms, // Updated from totalCareers
        totalLicenciaturas, // NEW
        totalPosgrados, // NEW
        
        // Breakdowns
        modalityBreakdown: modalityBreakdown.map(m => ({
          name: m._id || 'Sin modalidad',
          count: m.count
        })),
        degreeBreakdown: degreeBreakdown.map(d => ({
          name: d._id || 'Sin grado',
          count: d.count
        })),
        typeBreakdown: typeBreakdown.map(t => ({
          name: t._id || 'Sin tipo',
          count: t.count
        })), // NEW
        
        // Top rankings
        topUniversities: topUniversities.map(u => ({
          name: u._id,
          count: u.count
        })), // NEW
        topStates: topStates.map(s => ({
          name: s._id,
          count: s.count
        })) // NEW
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