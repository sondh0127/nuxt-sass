import ollama from 'ollama'
import { OpenAIStream, Stream, StreamingTextResponse } from 'ai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat'

export default defineLazyEventHandler(async () => {
  // const apiKey = useRuntimeConfig().openaiApiKey
  // if (!apiKey)
  //   throw new Error('Missing OpenAI API key')
  // const openai = new OpenAI({
  //   apiKey,
  // })

  return defineEventHandler(async (event: any) => {
    // const body = await readBody(event)

    // const response = await ollama.chat({
    //   model: 'mistral',
    //   messages: [
    //     {
    //       role: 'user',
    //       content: body.content,
    //     },
    //   ],
    // })
    // return response

    // Extract the `prompt` from the body of the request
    const { messages } = (await readBody(event)) as {
      messages: ChatCompletionMessageParam[]
    }

    const response = await ollama.chat({
      model: 'mistral',
      messages,
      stream: true,
    })
    for await (const part of response)
      console.log('[LOG] ~ part.message.content:', part.message.content)

    return response

    // // Convert the response into a friendly text-stream
    // const stream = OpenAIStream(response)
    // console.log('[LOG] ~ stream:', stream)

    // // Respond with the stream
    // return new StreamingTextResponse(stream)
  })
})
