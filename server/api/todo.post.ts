export default defineEventHandler(async (event) => {
  const schema = createInsertSchema(todo)
  const body = await readValidatedBody(event, schema.parse) // or `.parse` to throw an error
  return db.insert(todo).values(body)
})
