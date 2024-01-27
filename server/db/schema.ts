import { boolean, date, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
})

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})

export const todoTable = pgTable('todo', {
  id: serial('id').primaryKey().notNull(),
  text: text('text').notNull(),
  done: boolean('done').default(false),
  createdAt: date('createdAt').defaultNow(),
})
