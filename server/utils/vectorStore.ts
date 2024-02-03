import { PGVectorStore } from '@langchain/community/vectorstores/pgvector'
import type { PGVectorStoreArgs } from '@langchain/community/vectorstores/pgvector'

export const PgVectorStoreConfig: PGVectorStoreArgs = {
  postgresConnectionOptions: {
    connectionString: process.env.DATABASE_URL!,
  },
  tableName: DocumentsTableConf.name,
  columns: {
    idColumnName: DocumentsTableConf.columns.id.name,
    vectorColumnName: DocumentsTableConf.columns.embedding.name,
    contentColumnName: DocumentsTableConf.columns.content.name,
    metadataColumnName: DocumentsTableConf.columns.metadata.name,
  },
}

let VectorStore: PGVectorStore

export async function useVectorStore() {
  if (!VectorStore) {
    // const embeddings = await HuggingFaceEmbeddingSingleton.getInstance()
    const embeddings = await useHuggingFaceEmbedding()
    VectorStore = await PGVectorStore.initialize(embeddings, PgVectorStoreConfig)
    // Initialise cleanup on initial
    process.on('beforeExit', () => {
      VectorStore?.end()
      VectorStore = null
    })
  }
  return VectorStore
}
