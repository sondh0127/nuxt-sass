export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return db.insert(todo).values(body)
})
