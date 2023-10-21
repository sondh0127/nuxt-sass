export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  return db.delete(todo).where(eq(todo.id, Number(id)))
})
