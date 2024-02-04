export default defineEventHandler(async (event) => {
  const db = await useDb()
  return await db.insert(RoomTable).values({})
})
