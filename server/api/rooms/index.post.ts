export default defineEventHandler(async (event) => {
  const db = useDb()
  return await db.insert(RoomTable).values({})
})
