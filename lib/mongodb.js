import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
}

let client
let clientPromise

// Handle missing URI gracefully during build
if (!uri) {
  console.warn('⚠️ MONGODB_URI not found. Using mock client for build.')
  // Mock client for build time
  clientPromise = Promise.resolve({
    db: () => ({
      collection: () => ({
        find: () => ({ toArray: async () => [] }),
        distinct: async () => [],
        findOne: async () => null,
        insertOne: async () => ({ insertedId: null }),
        updateOne: async () => ({ modifiedCount: 0 }),
      })
    })
  })
} else if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Helper function to get the database
export async function getDatabase() {
  const client = await clientPromise
  return client.db(process.env.MONGODB_DB || 'tecnmDB')
}

export default clientPromise