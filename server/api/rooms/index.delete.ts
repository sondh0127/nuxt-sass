export default defineEventHandler(async (event) => {
  const { id } = await readBody(event)
  const db = useDb()
  await db.delete(RoomTable)
    .where(eq(RoomTable.id, id))
    .returning()
})
