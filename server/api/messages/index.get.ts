export default defineEventHandler(async (event) => {
  const db = await useDb()

  const messages = await db
    .select()
    .from(MessagesTable)
    .orderBy(asc(MessagesTable.timeStamp))

  return messages
})
