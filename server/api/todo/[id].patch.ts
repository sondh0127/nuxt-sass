export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const body = await readBody(event)

  return db.update(todo).set(body).where(eq(todo.id, Number(id)))
})
