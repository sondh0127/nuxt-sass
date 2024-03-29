import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import type { Context } from './context'

// import { ACCOUNT_ACCESS } from '~~/prisma/account-access-enum'
// import { AccountLimitError } from '~~/lib/services/errors'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: (opts) => {
    const { shape, error } = opts
    // if (!(error.cause instanceof AccountLimitError))
    //   return shape

    return {
      ...shape,
      data: {
        ...shape.data,
        httpStatus: 401,
        code: 'UNAUTHORIZED',
      },
    }
  },
})

/**
 * auth middlewares
 */
// const isAuthed = t.middleware(({ next, ctx }) => {
//   if (!ctx.user)
//     throw new TRPCError({ code: 'UNAUTHORIZED' })

//   return next({
//     ctx: {
//       user: ctx.user,
//     },
//   })
// })

// function isMemberWithAccessesForActiveAccountId(access: ACCOUNT_ACCESS[]) {
//   return t.middleware(({ next, ctx }) => {
//     if (!ctx.dbUser || !ctx.activeAccountId)
//       throw new TRPCError({ code: 'UNAUTHORIZED', message: 'no user or active account information was found' })

//     const activeMembership = ctx.dbUser.memberships.find(membership => membership.account_id == ctx.activeAccountId)

//     console.log(`isMemberWithAccessesForActiveAccountId(${access}) activeMembership?.access:${activeMembership?.access}`)

//     if (!activeMembership)
//       throw new TRPCError({ code: 'UNAUTHORIZED', message: 'user is not a member of the active account' })

//     if (activeMembership.pending)
//       throw new TRPCError({ code: 'UNAUTHORIZED', message: `membership ${activeMembership?.id} is pending approval` })

//     if (access.length > 0 && !access.includes(activeMembership.access))
//       throw new TRPCError({ code: 'UNAUTHORIZED', message: `activeMembership ${activeMembership?.id} has insufficient access (${activeMembership?.access})` })

//     return next({ ctx })
//   })
// }

// export function isAccountWithFeature(feature: string) {
//   return t.middleware(({ next, ctx }) => {
//     if (!ctx.dbUser || !ctx.activeAccountId)
//       throw new TRPCError({ code: 'UNAUTHORIZED' })

//     const activeMembership = ctx.dbUser.memberships.find(membership => membership.account_id == ctx.activeAccountId)

//     console.log(`isAccountWithFeature(${feature}) activeMembership?.account.features:${activeMembership?.account.features}`)
//     if (!activeMembership?.account.features.includes(feature))
//       throw new TRPCError({ code: 'UNAUTHORIZED', message: `Account does not have the ${feature} feature` })

//     return next({ ctx })
//   })
// }

/**
 * Procedures
 */
export const publicProcedure = t.procedure
// export const protectedProcedure = t.procedure.use(isAuthed)
// export const memberProcedure = protectedProcedure.use(isMemberWithAccessesForActiveAccountId([]))
// export const readWriteProcedure = protectedProcedure.use(isMemberWithAccessesForActiveAccountId([ACCOUNT_ACCESS.READ_WRITE, ACCOUNT_ACCESS.ADMIN, ACCOUNT_ACCESS.OWNER]))
// export const adminProcedure = protectedProcedure.use(isMemberWithAccessesForActiveAccountId([ACCOUNT_ACCESS.ADMIN, ACCOUNT_ACCESS.OWNER]))
// export const ownerProcedure = protectedProcedure.use(isMemberWithAccessesForActiveAccountId([ACCOUNT_ACCESS.OWNER]))
// export const accountHasSpecialFeature = isAccountWithFeature('SPECIAL_FEATURE')

export const router = t.router
export const middleware = t.middleware
