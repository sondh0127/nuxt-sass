import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  return await db.query.todo.findMany({
    orderBy: [asc(todo.id)],
  })
})
