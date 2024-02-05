import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../db/schema'

let _db: PostgresJsDatabase<typeof schema>
export async function useDb() {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL!
    if (connectionString) {
      const client = postgres(connectionString)
      await client`CREATE EXTENSION IF NOT EXISTS vector`
      _db = drizzle(client, { schema })
    }
  }
  else {
    throw new Error('No database configured for production')
  }
  return _db
}
