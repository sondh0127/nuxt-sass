import { bigserial, boolean, date, index, integer, jsonb, pgTable, primaryKey, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { vector } from 'pgvector/drizzle-orm'

export const UserTable = pgTable('user', {
  id: text('id').primaryKey(),
  githubId: text('github_id').unique(),
  username: text('username'),
})
export type UserDB = typeof UserTable.$inferSelect

export const SessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => UserTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})

export const TodoTable = pgTable('todo', {
  id: serial('id').primaryKey().notNull(),
  text: text('text').notNull(),
  done: boolean('done').default(false),
  createdAt: date('createdAt').defaultNow(),
})

export const RoomTable = pgTable('room', {
  id: uuid('id').unique().primaryKey().defaultRandom(),
  createdTime: timestamp('created_time').defaultNow(),
  // Will have to manually update
  modifiedTime: timestamp('modified_time').defaultNow(),
  summary: text('summary'),
  // truncateIndexes: integer('truncate_indexes').array().default([0]),
}, table => ({
  modifiedIndex: index('modified_time_index').on(table.modifiedTime).desc(),
}))

export const MessagesTable = pgTable('messages', {
  id: uuid('id').defaultRandom(),
  roomId: uuid('room_id').references(() => RoomTable.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  timeStamp: timestamp('time_stamp').defaultNow(),
  persona: text('persona'),
  content: text('content'),
  // documentTitles: text('document_titles').array().default([]),
  // isAborted: boolean('is_aborted').default(false),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.roomId, table.id] }),
    timeIndex: index('time_stamp_index').on(table.timeStamp).asc(),
  }
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

export const DocumentsTable = pgTable(DocumentsTableConf.name, {
  id: bigserial(DocumentsTableConf.columns.id.name, { mode: 'number' }).primaryKey(),
  content: text(DocumentsTableConf.columns.content.name),
  metadata: jsonb(DocumentsTableConf.columns.metadata.name),
  embedding: vector(DocumentsTableConf.columns.embedding.name, { dimensions: 384 }),
})

export type DocumentsInsert = typeof DocumentsTable.$inferInsert
