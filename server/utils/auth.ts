import { webcrypto } from 'node:crypto'
import { Lucia } from 'lucia'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { GitHub } from 'arctic'
import type { UserDB } from '../db/schema'
import { SessionTable, UserTable } from '../db/schema'

globalThis.crypto = webcrypto as Crypto

let _lucia: Lucia
export async function useLucia() {
  if (!_lucia) {
    const db = await useDb()
    const adapter = new DrizzlePostgreSQLAdapter(db, SessionTable, UserTable)

    _lucia = new Lucia(adapter, {
      sessionCookie: {
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
  return _lucia
}
// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof _lucia
    DatabaseUserAttributes: Omit<UserDB, 'id'>
  }
}

export const github = new GitHub(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET)
