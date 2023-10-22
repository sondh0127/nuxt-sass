export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, InsertSchemaTodo.parse) // or `.parse` to throw an error
  return db.insert(todo).values(body)
})
