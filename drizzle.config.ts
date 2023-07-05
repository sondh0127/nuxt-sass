import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgresql://postgres:ueMuLtWpdS3fW09v@db.okzbeljxnotjgbpdlskv.supabase.co:5432/postgres',
  },
} satisfies Config
