export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, InsertSchemaTodo.parse) // or `.parse` to throw an error
    return db.insert(todo).values(body)
  }
  catch (error) {
    console.log('[LOG] ~ file: todo.post.ts:6 ~ error:', error)
  }
})
