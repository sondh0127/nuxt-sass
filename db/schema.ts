import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').notNull(),
  supabaseUid: text('supabase_uid').notNull(),
  email: text('email'),
  displayName: text('display_name'),
})
