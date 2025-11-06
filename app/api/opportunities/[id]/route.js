import { getDatabase } from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

// GET - Fetch single opportunity by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid opportunity ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const collection = db.collection('tecnologicos')
    
    const opportunity = await collection.findOne({ _id: new ObjectId(id) })

    if (!opportunity) {
      return NextResponse.json(
        { success: false, error: 'Opportunity not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: opportunity
    })
  } catch (error) {
    console.error('Error fetching opportunity:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch opportunity' },
      { status: 500 }
    )
  }
}

// PUT - Update opportunity
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid opportunity ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const collection = db.collection('tecnologicos')

    const { _id, ...updateData } = body
    updateData.updatedAt = new Date()

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Opportunity not found' },
        { status: 404 }
      )
    }

    const updated = await collection.findOne({ _id: new ObjectId(id) })

    return NextResponse.json({
      success: true,
      data: updated
    })
  } catch (error) {
    console.error('Error updating opportunity:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update opportunity' },
      { status: 500 }
    )
  }
}

// DELETE - Remove opportunity
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid opportunity ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const collection = db.collection('tecnologicos')
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Opportunity not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Opportunity deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting opportunity:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete opportunity' },
      { status: 500 }
    )
  }
}