import { db } from '../../../db/client'
import { users } from '../../../db/schema'
import { publicProcedure, router } from '../trpc'

export const authRouter = router({
  getDBUser: publicProcedure
    .query(({ ctx }) => {
      return {
        dbUser: ctx.dbUser,
      }
    }),
  getAllUser: publicProcedure.query(({ ctx }) => {
    return db.select().from(users)
  }),
})
