import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../db/schema'

const connectionString = process.env.DATABASE_URL!
export const client = postgres(connectionString)
await client`CREATE EXTENSION IF NOT EXISTS vector`

export const db = drizzle(client, { schema })
