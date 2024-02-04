export default defineEventHandler(async (event) => {
  const db = await useDb()
  const { message } = await readBody(event)

  return await db.insert(RoomTable).values({})
})
