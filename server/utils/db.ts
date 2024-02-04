import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../db/schema'

const connectionString = process.env.DATABASE_URL!
export const client = postgres(connectionString)

export const db = drizzle(client, { schema })

let dbInstance: PostgresJsDatabase<typeof schema>
export async function useDb() {
  if (!dbInstance) {
    await client`CREATE EXTENSION IF NOT EXISTS vector`
    dbInstance = drizzle(client, { schema })
  }
  return dbInstance
}
