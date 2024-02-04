export default defineEventHandler(async (event) => {
  const { id } = await readBody(event)

  await db.delete(RoomTable)
    .where(eq(RoomTable.id, id))
    .returning()
})
