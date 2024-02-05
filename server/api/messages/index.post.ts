export default defineEventHandler(async (event) => {
  const db = useDb()
  const { message } = await readBody(event)

  return await db.insert(RoomTable).values({})
})
