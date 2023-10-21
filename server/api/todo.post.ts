export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('[LOG] ~ file: todo.post.ts:3 ~ body:', body)

  return db.insert(todo).values({ text: body.text })
})
