import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers'

let HFEmbeddingSingleton: HuggingFaceTransformersEmbeddings
export async function useHuggingFaceEmbedding() {
  if (!HFEmbeddingSingleton) {
    HFEmbeddingSingleton = new HuggingFaceTransformersEmbeddings({
      modelName: 'Xenova/bge-small-en-v1.5',
    })
  }
  return HFEmbeddingSingleton
}
