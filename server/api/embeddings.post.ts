import ollama from 'ollama'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import type { DocumentsInsert } from '../db/schema'

export default defineEventHandler(async () => {
  const text = await useStorage('assets:server').getItem('scrimba-info.txt')
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    separators: ['\n\n', '\n', ' ', '', '##', '###', '####'],
    chunkOverlap: 50,
  })

  const vectorstore = await useVectorStore()

  const output = await splitter.createDocuments([text!.toString()])
  await vectorstore.addDocuments(output)

  return 'done'
})
