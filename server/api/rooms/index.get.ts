export default defineEventHandler(async (event) => {
  const db = await useDb()
  return await db.select().from(RoomTable)
})
