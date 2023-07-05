import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  supabase_uid: text('supabase_uid').notNull(),
  email: text('email').notNull(),
  display_name: text('display_name'),
})
