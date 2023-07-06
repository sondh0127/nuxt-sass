import { AnyPgColumn, boolean, foreignKey, index, integer, pgEnum, pgSchema, pgTable, primaryKey, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

import { sql } from 'drizzle-orm'

export const keyStatus = pgEnum('key_status', ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum('key_type', ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const aalLevel = pgEnum('aal_level', ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum('code_challenge_method', ['s256', 'plain'])
export const factorStatus = pgEnum('factor_status', ['unverified', 'verified'])
export const factorType = pgEnum('factor_type', ['totp', 'webauthn'])
export const accountAccess = pgEnum('ACCOUNT_ACCESS', ['READ_ONLY', 'READ_WRITE', 'ADMIN', 'OWNER'])

export const account = pgTable('account', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  currentPeriodEnds: timestamp('current_period_ends', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  features: text('features').array(),
  planId: integer('plan_id').notNull().references(() => plan.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  planName: text('plan_name').notNull(),
  maxNotes: integer('max_notes').default(100).notNull(),
  stripeSubscriptionId: text('stripe_subscription_id'),
  stripeCustomerId: text('stripe_customer_id'),
  maxMembers: integer('max_members').default(1).notNull(),
  joinPassword: text('join_password').notNull(),
},
(table) => {
  return {
    joinPasswordKey: uniqueIndex('account_join_password_key').on(table.joinPassword),
  }
})

export const note = pgTable('note', {
  id: serial('id').primaryKey().notNull(),
  accountId: integer('account_id').references(() => account.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  noteText: text('note_text').notNull(),
})

export const membership = pgTable('membership', {
  id: serial('id').primaryKey().notNull(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  access: accountAccess('access').default('READ_ONLY').notNull(),
  pending: boolean('pending').notNull(),
  accountId: integer('account_id').notNull().references(() => account.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
},
(table) => {
  return {
    userIdAccountIdKey: uniqueIndex('membership_user_id_account_id_key').on(table.userId, table.accountId),
  }
})

export const token = pgTable('token', {
  id: serial('id').primaryKey().notNull(),
  accountId: integer('account_id').references(() => account.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  tokenText: text('token_text').notNull(),
})
