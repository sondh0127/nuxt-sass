import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config()
export default {
  schema: './server/db/schema.ts',
  out: './server/db/migration',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
