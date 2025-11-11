import { getDatabase } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

// GET - Search opportunities with filters and pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const estado = searchParams.get('estado')
    const universidad = searchParams.get('universidad')
    const modalidad = searchParams.get('modalidad')
    const grado = searchParams.get('grado')
    const carrera = searchParams.get('carrera')
    const search = searchParams.get('search')
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '25')
    const skip = (page - 1) * limit

    const db = await getDatabase()
    const collection = db.collection('tecnologicos')

    let query = {}
    
    if (estado) query.Estado = estado
    if (universidad) query['Nombre del tecnológico'] = universidad
    if (modalidad) query.Modalidad = modalidad
    if (grado) query['Grado que otorga'] = grado
    if (carrera) query.Carrera = { $regex: carrera, $options: 'i' }
    if (search) {
      query.$or = [
        { Estado: { $regex: search, $options: 'i' } },
        { 'Nombre del tecnológico': { $regex: search, $options: 'i' } },
        { Carrera: { $regex: search, $options: 'i' } }
      ]
    }

    const total = await collection.countDocuments(query)

    const opportunities = await collection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      success: true,
      data: opportunities,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching opportunities:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch opportunities' },
      { status: 500 }
    )
  }
}

// POST - Create new opportunity
export async function POST(request) {
  try {
    const body = await request.json()
    
    const requiredFields = [
      'Estado',
      'Nombre del tecnológico',
      'Carrera',
      'Modalidad',
      'Grado que otorga'
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const db = await getDatabase()
    const collection = db.collection('tecnologicos')

    const newOpportunity = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await collection.insertOne(newOpportunity)

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...newOpportunity }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating opportunity:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create opportunity' },
      { status: 500 }
    )
  }
}
