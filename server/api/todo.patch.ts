export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return db.update(todo).set(body)
})
