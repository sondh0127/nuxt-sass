import { Lucia } from 'lucia'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { GitHub } from 'arctic'
import type { UserDB } from '../db/schema'
import { sessionTable, userTable } from '../db/schema'
import { db } from './db'

let luciaIns: Lucia
export async function useLucia() {
  if (!luciaIns) {
    const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)

    luciaIns = new Lucia(adapter, {
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
  }
  return luciaIns
}
// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof luciaIns
    DatabaseUserAttributes: Omit<UserDB, 'id'>
  }
}

const config = useRuntimeConfig()

export const github = new GitHub(config.githubClientId, config.githubClientSecret)
