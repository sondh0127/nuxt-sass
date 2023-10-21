import { boolean, integer, pgTable, serial, text, time, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

// export const plan = pgTable('plan', {
//   id: serial('id').primaryKey().notNull(),
//   name: text('name').notNull(),
//   features: text('features').array(),
//   maxNotes: integer('max_notes').default(100).notNull(),
//   stripeProductId: text('stripe_product_id'),
//   maxMembers: integer('max_members').default(1).notNull(),
// },
// (table) => {
//   return {
//     nameKey: uniqueIndex('plan_name_key').on(table.name),
//   }
// })

export const users = pgTable('users', {
  id: serial('id').notNull(),
  supabaseUid: text('supabase_uid').notNull(),
  email: text('email'),
  displayName: text('display_name'),
})

export const account = pgTable('account', {
  // id: serial('id').primaryKey().notNull(),
  // name: text('name').notNull(),
  // currentPeriodEnds: timestamp('current_period_ends', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  // features: text('features').array(),
  // planId: integer('plan_id').notNull().references(() => plan.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  // planName: text('plan_name').notNull(),
  // maxNotes: integer('max_notes').default(100).notNull(),
  // stripeSubscriptionId: text('stripe_subscription_id'),
  // stripeCustomerId: text('stripe_customer_id'),
  // maxMembers: integer('max_members').default(1).notNull(),
  // joinPassword: text('join_password').notNull(),
})

export const todo = pgTable('todo', {
  id: serial('id').primaryKey().notNull(),
  text: text('text').notNull(),
  done: boolean('done').default(false),
  createdAt: time('createdAt'),
})
