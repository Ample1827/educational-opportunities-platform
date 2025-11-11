import { getDatabase } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const estado = searchParams.get('estado') // NEW: Filter by estado

    const db = await getDatabase()
    const collection = db.collection('tecnologicos')

    let field
    switch(type) {
      case 'estados':
        field = 'Estado'
        break
      case 'universidades':
        field = 'Nombre del tecnológico'
        break
      case 'modalidades':
        field = 'Modalidad'
        break
      case 'grados':
        field = 'Grado que otorga'
        break
      case 'carreras':
        field = 'Carrera'
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid filter type' },
          { status: 400 }
        )
    }

    // Build query - if estado is provided, only return options for that estado
    let query = {}
    if (estado && type !== 'estados') {
      query.Estado = estado
    }

    // Get distinct values with optional estado filter
    const values = await collection.distinct(field, query)
    const sorted = values.filter(v => v).sort()

    return NextResponse.json({
      success: true,
      data: sorted
    })
  } catch (error) {
    console.error('Error fetching filters:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch filter options' },
      { status: 500 }
    )
  }
}
