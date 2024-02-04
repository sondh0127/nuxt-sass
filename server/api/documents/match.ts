import ollama from 'ollama'
import { l2Distance } from 'pgvector/drizzle-orm'

export default defineEventHandler(async (event: any) => {
  const { prompt } = await readBody(event)
  const response = await ollama.embeddings({
    model: 'mistral',
    prompt,
    options: {
    },
  })
  const allItems = await db.select()
    .from(DocumentsTable)
    .orderBy(l2Distance(DocumentsTable.embedding, response.embedding))
    .limit(5)

  return allItems
})
