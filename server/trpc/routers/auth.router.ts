export const authRouter = router({
  // getDBUser: publicProcedure
  //   .query(({ ctx }) => {
  //     return {
  //       dbUser: ctx.dbUser,
  //     }
  //   }),
  getAllUser: publicProcedure.query(({ ctx }) => {
    return db.select().from(users)
  }),
})
