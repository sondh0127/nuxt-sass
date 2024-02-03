import { ChatOllama } from '@langchain/community/chat_models/ollama'
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama'

let ChatOllamaSingleton: ChatOllama

export async function useOllamaChat() {
  if (!ChatOllamaSingleton) {
    ChatOllamaSingleton = new ChatOllama({
      model: 'mistral',
      // numCtx: 32678,
    })
  }
  return ChatOllamaSingleton
}

let OllamaEmbeddingSingleton: OllamaEmbeddings
export async function useOllamaEmbedding() {
  if (!OllamaEmbeddingSingleton) {
    OllamaEmbeddingSingleton = new OllamaEmbeddings({
      model: 'mistral',
      requestOptions: {
        useMMap: true,
        numThread: 6,
        numGpu: 1,
      },
    })
  }
  return OllamaEmbeddingSingleton
}
