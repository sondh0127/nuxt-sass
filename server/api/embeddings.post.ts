import ollama from 'ollama'
import type { DocumentsInsert } from '../db/schema'
import { documentsTable } from '../db/schema'

export default defineEventHandler(async (event: any) => {
  const { prompt } = await readBody(event)

  const response = await ollama.embeddings({
    model: 'mistral',
    prompt,
    options: {

    },

  })
  const newItems: DocumentsInsert[] = [
    { embedding: response.embedding, content: prompt, metadata: {} },
  ]
  await db.insert(documentsTable).values(newItems)

  return 'done'
})
