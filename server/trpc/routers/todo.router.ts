export const todoRouter = router({
  getAllUser: publicProcedure.query(({ ctx }) => {
    return db.select().from(users)
  }),
})
