import type { inferAsyncReturnType } from '@trpc/server'
import { TRPCError } from '@trpc/server'
import type { H3Event } from 'h3'

import type { User } from '@supabase/supabase-js'
import { serverSupabaseUser } from '#supabase/server'

import type { FullDBUser } from '~~/lib/services/service.types'
import AuthService from '~/lib/services/auth.service'

export async function createContext(event: H3Event) {
  let user: User | null = null
  let dbUser: FullDBUser | null = null
  const activeAccountId: number | null = null

  if (!user)
    user = await serverSupabaseUser(event)

  if (!dbUser && user) {
    const authService = new AuthService()
    dbUser = await authService.getFullUserBySupabaseId(user.id)

    if (!dbUser && user) {
      dbUser = await authService.createUser(user.id, user.user_metadata.full_name ? user.user_metadata.full_name : 'no name supplied', user.email ? user.email : 'no@email.supplied')
      console.log(`\n Created DB User \n ${JSON.stringify(dbUser)}\n`)
    }

    // if (dbUser) {
    //   const preferredAccountId = getCookie(event, 'preferred-active-account-id')
    //   if (preferredAccountId && dbUser?.memberships.find(m => m.account_id === +preferredAccountId && !m.pending)) {
    //     activeAccountId = +preferredAccountId
    //   }
    //   else {
    //     const defaultActive = dbUser.memberships[0].account_id.toString()
    //     setCookie(event, 'preferred-active-account-id', defaultActive, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10) })
    //     activeAccountId = +defaultActive
    //   }
    // }
  }

  return {
    user, // the Supabase User
    dbUser, // the corresponding Database User
    activeAccountId, // the account ID that is active for the user
    event, // required to enable setCookie in accountRouter
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
