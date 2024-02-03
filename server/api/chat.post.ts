import { PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables'
import type { Document } from 'langchain/document'

function formatDocsAsString(docs: Document[]) {
  return docs
    // .map((document, index) => `<doc id='${index}'>${document.pageContent}</doc>`)
    .map((document, index) => document.pageContent)
    .join('\n\n')
}

export default defineLazyEventHandler(async () => {
  // const apiKey = useRuntimeConfig().openaiApiKey
  // if (!apiKey)
  //   throw new Error('Missing OpenAI API key')
  // const openai = new OpenAI({
  //   apiKey,
  // })

  // Create a custom Transform stream

  return defineEventHandler(async (event) => {
    const { messages } = await readBody(event)

    const standaloneQuestionTemplate = `[INST]
    Give a question, convert it to a standalone question.

    Question: {question}

    Standalone Question:
    [/INST]
    `
    const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate)

    const answerTemplate = `
    You are a helpful and enthusastic support bot who can answer questions about Scrimba based on the context provided below. Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that.". And direct the questioner to email help@scrimba.com. otherwise return the relevent answer. Don't try to make up an answer. Always speak as if you were chatting to a friend.

    Context: {context}

    Question: {question}
    `
    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)

    const model = await useOllamaChat()
    const vectorstore = await useVectorStore()
    // SECTION: Retriever
    const retriever = vectorstore.asRetriever()

    // SECTION: Chain

    const standaloneChain = RunnableSequence.from([
      standaloneQuestionPrompt,
      model,
      new StringOutputParser(),
    ])

    const retrieverChain = RunnableSequence.from([
      prevResult => prevResult.question,
      retriever,
      formatDocsAsString,
    ])

    const answerChain = RunnableSequence.from([
      answerPrompt,
      model,
      new StringOutputParser(),
    ])

    const chain = RunnableSequence.from([
      {
        question: standaloneChain,
        original_input: new RunnablePassthrough(),
      },
      {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question,
      },
      answerChain,
    ])

    const question = messages[messages.length - 1].content
    return chain.stream({ question })
  })
})
