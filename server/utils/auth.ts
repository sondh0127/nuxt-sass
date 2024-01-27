import { Lucia } from 'lucia'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { GitHub } from 'arctic'
import type { UserDB } from '../db/schema'
import { sessionTable, userTable } from '../db/schema'
import { db } from './db'

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // IMPORTANT!
    attributes: {
      // set to `true` when using HTTPS
      secure: !import.meta.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      githubId: attributes.githubId,
      username: attributes.username,
    }
  },
})

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<UserDB, 'id'>
  }
}

const config = useRuntimeConfig()

export const github = new GitHub(config.githubClientId, config.githubClientSecret)
