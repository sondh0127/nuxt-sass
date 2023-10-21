export const todoRouter = router({
  getAllTodo: publicProcedure.query(({ ctx }) => {
    return db.select().from(todo)
  }),
})
