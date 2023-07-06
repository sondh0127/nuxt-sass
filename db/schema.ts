import { integer, pgTable, serial, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

export const plan = pgTable('plan', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  features: text('features').array(),
  maxNotes: integer('max_notes').default(100).notNull(),
  stripeProductId: text('stripe_product_id'),
  maxMembers: integer('max_members').default(1).notNull(),
},
(table) => {
  return {
    nameKey: uniqueIndex('plan_name_key').on(table.name),
  }
})

export const users = pgTable('users', {
  id: serial('id').notNull(),
  supabaseUid: text('supabase_uid').notNull(),
  email: text('email'),
  displayName: text('display_name'),
})
