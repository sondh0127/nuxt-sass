import { items } from '../db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newItems = [
    { embedding: [1, 2, 3] },
    { embedding: [4, 5, 6] },
  ]

  await db.insert(items).values(newItems)

  return true
})
