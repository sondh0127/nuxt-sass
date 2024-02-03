import { bigserial, boolean, date, integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

import { vector } from 'pgvector/drizzle-orm'

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  githubId: text('github_id').unique(),
  username: text('username'),
})
export type UserDB = typeof userTable.$inferSelect

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

export const DocumentsTableConf = {
  name: 'documents',
  columns: {
    id: { name: 'id' },
    content: { name: 'content' },
    metadata: { name: 'metadata' },
    embedding: { name: 'embedding' },
  },
}

export const documentsTable = pgTable(DocumentsTableConf.name, {
  id: bigserial(DocumentsTableConf.columns.id.name, { mode: 'number' }).primaryKey(),
  content: text(DocumentsTableConf.columns.content.name),
  metadata: jsonb(DocumentsTableConf.columns.metadata.name),
  embedding: vector(DocumentsTableConf.columns.embedding.name, { dimensions: 4096 }),
})

export type DocumentsInsert = typeof documentsTable.$inferInsert
