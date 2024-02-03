import { Readable, Transform } from 'node:stream'
import ollama from 'ollama'
import { PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables'
import type { Document } from 'langchain/document'

function formatDocsAsString(docs: Document[]) {
  return docs
    // .map((document, index) => `<doc id='${index}'>${document.pageContent}</doc>`)
    .map((document, index) => document.pageContent)
    .join('\r\n')
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
    // const { messages } = await readBody(event)

    const standaloneQuestionTemplate = `[INST]
    Give a question, convert it to a standalone question.

    Question: {question}

    Standalone Question:
    [/INST]
    `
    const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate)

    const answerTemplate = `
    You are a helpful and enthusastic support bot who can answer questions about Scrimba based on the context provided below. Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to email help@scrimba.com. Don't try to make up an answer. Always speak as if you were chatting to a friend.
    Make sure to use the short answer.

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
      prevResult => prevResult.standalone_question,
      retriever,
      formatDocsAsString,
    ])

    const answerChain = RunnableSequence.from([
      answerPrompt,
      model,
      new StringOutputParser(),
    ])

    // const chain = standaloneQuestionPrompt
    //   .pipe(model)
    //   .pipe(new StringOutputParser())
    //   .pipe(retriever)
    //   .pipe(formatDocsAsString)
    //   .pipe(answerPrompt)

    const chain = RunnableSequence.from([
      {
        standalone_question: standaloneChain,
        original_input: new RunnablePassthrough(),
      },
      {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question,
      },
      answerChain,
    ])

    const question = 'What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.'
    const result = await chain.invoke({ question })
    return result

    // const response = await ollama.chat({
    //   model: 'mistral',
    //   messages,
    //   stream: true,
    // })
    // // Create a readable stream from the response array
    // const readableStream = Readable.from(response)

    // const transformStream = new Transform({
    //   objectMode: true,
    //   transform(chunk, encoding, callback) {
    //     const transformedChunk = chunk?.message?.content

    //     this.push(transformedChunk)

    //     callback()
    //   },
    // })
    // readableStream.pipe(transformStream)

    // return sendStream(event, transformStream)

    return 'ok'

    // TODO: support more model
    // // Convert the response into a friendly text-stream
    // const stream = OpenAIStream(response)
    // console.log('[LOG] ~ stream:', stream)

    // // Respond with the stream
    // return new StreamingTextResponse(stream)
  })
})
