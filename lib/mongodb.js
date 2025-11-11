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
  // Enhanced mock client for build time
  clientPromise = Promise.resolve({
    db: () => ({
      collection: () => ({
        countDocuments: async () => 0,
        distinct: async () => [],
        aggregate: () => ({
          toArray: async () => []
        }),
        find: () => ({
          sort: () => ({
            skip: () => ({
              limit: () => ({
                toArray: async () => []
              })
            })
          }),
          limit: () => ({
            skip: () => ({
              toArray: async () => []
            })
          }),
          toArray: async () => []
        }),
        findOne: async () => null,
        insertOne: async () => ({ insertedId: null, acknowledged: true }),
        updateOne: async () => ({ modifiedCount: 0, acknowledged: true }),
        deleteOne: async () => ({ deletedCount: 0, acknowledged: true }),
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