import { Readable, Transform } from 'node:stream'
import ollama from 'ollama'

export default defineLazyEventHandler(async () => {
  // const apiKey = useRuntimeConfig().openaiApiKey
  // if (!apiKey)
  //   throw new Error('Missing OpenAI API key')
  // const openai = new OpenAI({
  //   apiKey,
  // })

  // Create a custom Transform stream

  return defineEventHandler(async (event: any) => {
    const { messages } = await readBody(event)

    const response = await ollama.chat({
      model: 'mistral',
      messages,
      stream: true,
    })
    // Create a readable stream from the response array
    const readableStream = Readable.from(response)

    const transformStream = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        const transformedChunk = chunk?.message?.content

        this.push(transformedChunk)

        callback()
      },
    })
    readableStream.pipe(transformStream)

    return sendStream(event, transformStream)
    // TODO: support more model
    // // Convert the response into a friendly text-stream
    // const stream = OpenAIStream(response)
    // console.log('[LOG] ~ stream:', stream)

    // // Respond with the stream
    // return new StreamingTextResponse(stream)
  })
})
