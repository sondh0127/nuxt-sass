import ollama from 'ollama'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { p } from '@antfu/utils'
import type { DocumentsInsert } from '../db/schema'

export default defineEventHandler(async (event: any) => {
  const text = await useStorage('assets:server').getItem('1.introduction.md')
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    separators: ['\n\n', '\n', ' ', '', '##', '###', '####'],
    chunkOverlap: 50,
  })

  const output = await splitter.createDocuments([text!.toString()])
  const newItems = await p(output)
    .map(async (i) => {
      const response = await ollama.embeddings({
        model: 'mistral',
        prompt: i.pageContent,
        options: {},
      })

      return { embedding: response.embedding, content: i.pageContent, metadata: i.metadata }
    })

  await db.insert(documentsTable).values(newItems)

  return 'done'
})
