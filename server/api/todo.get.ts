export default defineEventHandler(async (event) => {
  return db.select().from(todo)
})
