import { lucia } from 'lucia'
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql'
import { client } from './db'

export const auth = lucia({
  env: 'DEV',
  adapter: postgresAdapter(client, {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session',
  }),
})

export type Auth = typeof auth
